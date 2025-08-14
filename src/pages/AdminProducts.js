import { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  // Full product schema fields
  const [name, setName] = useState('');
  const [strength, setStrength] = useState('');
  const [formVal, setFormVal] = useState('');
  const [section, setSection] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [search, setSearch] = useState('');

  // Derived filtered items based on search query
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(p => {
      const fields = [
        p.name,
        p.category,
        p.section,
        p.form,
        p.strength,
        p.description,
        p.price != null ? String(p.price) : ''
      ];
      return fields.some(v => String(v || '').toLowerCase().includes(q));
    });
  }, [items, search]);

  // Backend upload API (Supabase via our server)
  const UPLOAD_API = process.env.REACT_APP_UPLOAD_API || 'http://localhost:4000';

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setImageFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
      return;
    }
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG/PNG/WebP).');
      setImageFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
      return;
    }
    const maxBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxBytes) {
      setErrorMsg('Image too large. Max allowed size is 5MB.');
      setImageFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
      return;
    }
    setErrorMsg('');
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Cleanup preview URL on unmount or when imageFile changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const load = async () => {
    const snap = await getDocs(collection(db, 'products'));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setUploadProgress(0);
    try {
      // Basic validations
      const nameOk = name.trim().length > 0;
      const priceOk = String(price).trim() !== '' && !isNaN(Number(price));
      if (!nameOk) throw new Error('Name is required');
      if (!priceOk) throw new Error('Valid price is required');
      if (!editingId && !imageFile) throw new Error('Please select an image for new product');
      // Keep previous info if editing
      const prev = editingId ? items.find(it => it.id === editingId) : null;
      const prevFileId = prev?.imageFileId;
      const prevImageUrl = prev?.image;

      let imageUrl = '';
      let imageFileId = '';
      if (imageFile) {
        // Upload to our backend (Supabase uploader)
        imageUrl = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `${UPLOAD_API}/upload`);
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const pct = Math.round((e.loaded / e.total) * 100);
              setUploadProgress(pct);
            }
          };
          xhr.onerror = () => {
            const msg = 'Image upload failed (network error)';
            setErrorMsg(msg);
            reject(new Error(msg));
          };
          xhr.onload = () => {
            try {
              const status = xhr.status;
              const raw = xhr.responseText || '';
              let res = null;
              try {
                res = raw ? JSON.parse(raw) : null;
              } catch (_) {
                res = null;
              }
              if (status >= 200 && status < 300 && res && res.url) {
                imageFileId = res.fileId || '';
                resolve(res.url);
              } else {
                const msg = (res && (res.error || res.message)) || `Upload failed (${status})`;
                setErrorMsg(msg);
                reject(new Error(msg));
              }
            } catch (e) {
              setErrorMsg('Invalid server response');
              reject(e);
            }
          };
          const form = new FormData();
          form.append('file', imageFile);
          xhr.send(form);
        });
      }
      if (editingId) {
        // Update existing product
        const payload = {
          name: name.trim(),
          strength: strength.trim(),
          form: formVal.trim(),
          section: section.trim(),
          description: description.trim(),
          // If a new image uploaded, replace; else keep existing (do not overwrite with empty string)
          ...(imageUrl ? { image: imageUrl, imageFileId: imageFileId || null } : {}),
          inStock: Boolean(inStock),
          price: Number(price) || 0,
          category: category.trim(),
          updatedAt: serverTimestamp(),
        };
        await updateDoc(doc(db, 'products', editingId), payload);
        // If replaced image, attempt to delete old file
        if (imageUrl && prevFileId && prevImageUrl !== imageUrl) {
          try {
            await fetch(`${UPLOAD_API}/image`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fileId: prevFileId })
            });
          } catch (_) { /* ignore */ }
        }
      } else {
        // Create new
        await addDoc(collection(db, 'products'), {
          // Align with frontend display (ProductCard)
          name: name.trim(),
          strength: strength.trim(),
          form: formVal.trim(),
          section: section.trim(),
          description: description.trim(),
          image: imageUrl || '',
          imageFileId: imageFileId || null,
          inStock: Boolean(inStock),
          price: Number(price) || 0,
          category: category.trim(),
          isActive: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      // reset form
      setName('');
      setStrength('');
      setFormVal('');
      setSection('');
      setDescription('');
      setPrice('');
      setCategory('');
      setInStock(true);
      setImageFile(null);
      if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(''); }
      setEditingId(null);
      setUploadProgress(0);
      await load();
    } catch (e) {
      console.error('Save failed:', e);
      setErrorMsg(e.code || e.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (p) => {
    await updateDoc(doc(db, 'products', p.id), { isActive: !p.isActive, updatedAt: serverTimestamp() });
    await load();
  };

  const remove = async (p) => {
    // Try deleting the image from ImageKit first (if we have fileId)
    try {
      if (p.imageFileId) {
        await fetch(`${UPLOAD_API}/image`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileId: p.imageFileId })
        });
      }
    } catch (_) { /* best-effort */ }
    await deleteDoc(doc(db, 'products', p.id));
    await load();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin: Products</h2>
        {errorMsg && (
          <div style={styles.alertError}>{errorMsg}</div>
        )}

        <div style={styles.split}>
          <div style={styles.left}>
            <div style={styles.card}>
              <div style={styles.sectionHeader}>Create / Edit Product</div>
              <div style={styles.subtitle}>
                {editingId ? (
                  <span style={{...styles.badgeMode, background:'#eef2ff', color:'#3730a3', borderColor:'#c7d2fe'}}>Editing existing</span>
                ) : (
                  <span style={{...styles.badgeMode, background:'#ecfdf5', color:'#065f46', borderColor:'#a7f3d0'}}>New product</span>
                )}
              </div>
              <form onSubmit={handleCreate} style={styles.formGrid}>
            <label style={{...styles.field, gridColumn:'1 / -1'}}>
              <span style={styles.label}>Product Name <span style={styles.req}>*</span></span>
              <input placeholder="e.g., Paracetamol" value={name} onChange={(e)=>setName(e.target.value)} required style={styles.input} />
            </label>
            <label style={{...styles.field, gridColumn:'1 / span 2'}}>
              <span style={styles.label}>Strength</span>
              <input placeholder="e.g., 500 mg" value={strength} onChange={(e)=>setStrength(e.target.value)} style={styles.input} />
            </label>
            <label style={{...styles.field, gridColumn:'3 / span 2'}}>
              <span style={styles.label}>Form</span>
              <input list="formOptions" placeholder="e.g., Tablet / Syrup" value={formVal} onChange={(e)=>setFormVal(e.target.value)} style={styles.input} />
            </label>
            <label style={{...styles.field, gridColumn:'1 / span 2'}}>
              <span style={styles.label}>Section</span>
              <input list="sectionOptions" placeholder="e.g., Gynecology" value={section} onChange={(e)=>setSection(e.target.value)} style={styles.input} />
            </label>
            <label style={{...styles.field, gridColumn:'3 / span 2'}}>
              <span style={styles.label}>Category</span>
              <input list="categoryOptions" placeholder="e.g., Analgesic" value={category} onChange={(e)=>setCategory(e.target.value)} style={styles.input} />
            </label>
            <label style={{...styles.field, gridColumn:'1 / span 2'}}>
              <span style={styles.label}>Price (INR) <span style={styles.req}>*</span></span>
              <input type="number" min="0" step="0.01" placeholder="e.g., 49.00" value={price} onChange={(e)=>setPrice(e.target.value)} required style={styles.input} />
              <span style={styles.helper}>Enter inclusive price in rupees</span>
            </label>
            <label style={{...styles.field, gridColumn:'1 / span 4'}}>
              <span style={styles.label}>Description</span>
              <textarea placeholder="Short product description" value={description} onChange={(e)=>setDescription(e.target.value)} style={styles.textarea} rows={3} />
            </label>
            <label style={{display:'flex',alignItems:'center',gap:8, gridColumn:'1 / -1'}}>
              <input type="checkbox" checked={inStock} onChange={(e)=>setInStock(e.target.checked)} /> In Stock
            </label>
            <label style={{...styles.field, gridColumn:'1 / -1'}}>
              <span style={styles.label}>Product Image {editingId ? '' : <span style={styles.req}>*</span>}</span>
              <input type="file" accept="image/*" onChange={handleFileChange} style={styles.input}
              />
              <span style={styles.helper}>Max 5MB • JPG/PNG recommended</span>
            </label>

                {(imageFile || editingId) && (
                  <div style={{gridColumn:'1 / -1', display:'flex', alignItems:'center', gap:12}}>
                    {imageFile && previewUrl && (
                      <div style={{...styles.previewBox, width:112, height:112}}>
                        {(() => {
                          if (previewUrl) return <img src={previewUrl} alt="preview" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                          return null;
                        })()}
                      </div>
                    )}
                    {!imageFile && editingId && (()=>{
                      const current = items.find(it => it.id === editingId);
                      return current?.image ? (
                        <div style={styles.previewBox}>
                          <img src={current.image} alt="Current" style={styles.previewImg} />
                        </div>
                      ) : null;
                    })()}
                    {imageFile && (
                      <div style={{flex:1}}>
                        <div style={styles.progressTrack}>
                          <div style={{...styles.progressBar, width:`${uploadProgress}%`}} />
                        </div>
                        <div style={{fontSize:12, color:'#6b7280', marginTop:4}}>Uploading… {uploadProgress}%</div>
                      </div>
                    )}
                  </div>
                )}
            
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <button
                type="submit"
                disabled={loading || !name.trim() || String(price).trim()==='' || (!editingId && !imageFile)}
                style={styles.primaryBtn}
              >
                {loading ? (editingId ? 'Saving...' : 'Adding...') : (editingId ? 'Save' : 'Add')}
              </button>
              {editingId && (
                <button type="button" onClick={() => {
                  setEditingId(null);
                  setName(''); setStrength(''); setFormVal(''); setSection(''); setDescription(''); setPrice(''); setCategory(''); setInStock(true); setImageFile(null);
                  if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(''); }
                }} style={styles.secondaryBtn}>Cancel</button>
              )}
            </div>
              </form>
            </div>
            <datalist id="formOptions">
              <option value="Tablet" />
              <option value="Capsule" />
              <option value="Syrup" />
              <option value="Injection" />
              <option value="Ointment" />
            </datalist>
            <datalist id="sectionOptions">
              <option value="Gynecology" />
              <option value="Orthopedics" />
              <option value="Pediatrics" />
              <option value="General" />
              <option value="Cardiology" />
              <option value="Dermatology" />
            </datalist>
            <datalist id="categoryOptions">
              <option value="Analgesic" />
              <option value="Antibiotic" />
              <option value="Antacid" />
              <option value="Vitamin" />
              <option value="Antiseptic" />
            </datalist>
          </div>

          <div style={styles.right}>
            <div style={styles.rightHeader}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
              <div style={styles.sectionHeader}>All Products</div>
              <div style={styles.searchWrap}>
                <div style={styles.searchInner}>
                  <span style={styles.searchIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search name, category, section..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    style={styles.searchInput}
                  />
                  {search && (
                    <button type="button" onClick={() => setSearch('')} title="Clear"
                      style={styles.clearBtn}>
                      ×
                    </button>
                  )}
                </div>
              </div>
              </div>
            </div>
            <ul style={styles.list}>
              {filteredItems.map(p => (
                <li key={p.id} style={styles.item}>
                  {p.image && (
                    <img src={p.image} alt={p.name} style={styles.cardImg} />
                  )}
                  <div style={{flex:1}}>
                    <div style={styles.itemTitle}>{p.name}</div>
                    <div style={styles.itemMeta}>
                      <span>₹{p.price}</span>
                      <span>• {p.category || '-'}</span>
                      <span>• {p.section || '-'}</span>
                    </div>
                    <div style={{marginTop:6}}>
                      <span style={{...styles.badge, background: p.isActive ? '#e7fee8' : '#fee2e2', color: p.isActive ? '#065f46' : '#b91c1c'}}>
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, marginTop:10}}>
                    <button onClick={() => toggleActive(p)} style={styles.smallBtn}>{p.isActive ? 'Deactivate' : 'Activate'}</button>
                    <button onClick={() => {
                      setEditingId(p.id);
                      setName(p.name || '');
                      setStrength(p.strength || '');
                      setFormVal(p.form || '');
                      setSection(p.section || '');
                      setDescription(p.description || '');
                      setPrice(String(p.price ?? ''));
                      setCategory(p.category || '');
                      setInStock(Boolean(p.inStock));
                      setImageFile(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} style={styles.smallBtn}>Edit</button>
                    <button onClick={() => remove(p)} style={{...styles.smallBtn, color:'#b91c1c', borderColor:'#fecaca'}}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles for AdminProducts
const styles = {
  page: {
    background: 'linear-gradient(135deg, #f7fffb 0%, #f6f9ff 100%)',
    minHeight: '100vh',
    padding: 16
  },
  container: {
    maxWidth: 1000,
    margin: '0 auto'
  },
  split: {
    display: 'grid',
    gridTemplateColumns: '380px 1fr',
    gap: 16,
    alignItems: 'start'
  },
  left: { position: 'sticky', top: 72, alignSelf: 'start' },
  right: { minHeight: 300, maxHeight: 'calc(100vh - 140px)', overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingRight: 4 },
  title: { margin: '8px 0 16px', fontSize: 22 },
  subtitle: { marginTop: -6, marginBottom: 8 },
  badgeMode: { display:'inline-block', padding:'4px 8px', borderRadius:999, border:'1px solid transparent', fontSize:12, fontWeight:600 },
  card: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 6px 16px rgba(0,0,0,0.04)'
  },
  sectionHeader: { fontSize: 16, fontWeight: 700, marginBottom: 12 },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 10,
    marginTop: 8
  },
  field: { display: 'grid', gap: 6 },
  label: { fontSize: 12, color: '#374151', fontWeight: 600 },
  req: { color: '#dc2626' },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    outline: 'none',
    fontSize: 14,
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    outline: 'none',
    fontSize: 14,
    resize: 'vertical',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
  },
  helper: { fontSize: 12, color: '#6b7280' },
  progressTrack: { height: 6, background: '#f3f4f6', borderRadius: 999, overflow:'hidden' },
  progressBar: { height: '100%', background: 'linear-gradient(90deg, #10b981, #22c55e)', borderRadius: 999 },
  previewBox: {
    width: 92, height: 92, borderRadius: 10, overflow: 'hidden', border: '1px solid #e5e7eb', background:'#f9fafb'
  },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
  primaryBtn: {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #34d399',
    background: 'linear-gradient(135deg, #1a936f, #16a34a)',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer'
  },
  secondaryBtn: {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    background: '#fff',
    color: '#111827',
    cursor: 'pointer'
  },
  list: { listStyle: 'none', padding: 0, marginTop: 16, display:'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' },
  item: {
    display: 'block', padding: 12,
    background: '#fff', border: '1px solid #eef2f7', borderRadius: 12,
    boxShadow:'0 2px 8px rgba(0,0,0,0.03)'
  },
  cardImg: { width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, border:'1px solid #e5e7eb', marginBottom: 8 },
  itemTitle: { fontWeight: 600, marginBottom: 6 },
  itemMeta: { display:'flex', gap:8, alignItems:'center', color:'#6b7280', fontSize: 13, flexWrap:'wrap' },
  badge: { padding:'2px 8px', borderRadius: 999, fontSize: 12, border:'1px solid #e5e7eb' },
  smallBtn: { padding:'8px 10px', borderRadius: 8, border:'1px solid #e5e7eb', background:'#fff', cursor:'pointer' },
  alertError: { background:'#fee2e2', color:'#b91c1c', padding:10, borderRadius:8, marginBottom:10 },
  rightHeader: { position:'sticky', top: 0, zIndex: 1, padding: '8px 0', background: 'linear-gradient(135deg, #f7fffb 0%, #f6f9ff 100%)', borderBottom: '1px solid #eef2f7' },
  searchWrap: { minWidth: 260 },
  searchInner: { position:'relative', display:'flex', alignItems:'center', background:'#fff', border:'1px solid #e5e7eb', borderRadius: 999, padding:'6px 10px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' },
  searchIcon: { display:'inline-flex', width:18, height:18, marginRight:8, color:'#6b7280' },
  searchInput: { flex:1, width: '100%', padding: '6px 6px', border: 'none', outline: 'none', fontSize: 14, background:'transparent' },
  clearBtn: { border:'none', background:'transparent', cursor:'pointer', color:'#9ca3af', fontSize:18, lineHeight:1, padding:'0 4px' }
};
