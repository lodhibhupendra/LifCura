import React, { useState, useEffect, useRef } from 'react';
import './ProductCard.css';
import { FiSearch, FiEye } from 'react-icons/fi';
import ReactModal from 'react-modal';
import useWindowWidth from '../utils/useWindowWidth';


const ProductCard = ({ products = [] }) => {
  // Dynamically compute header height to avoid overlap on mobile fixed controls
  useEffect(() => {
    const computeHeights = () => {
      const header = document.querySelector('.main-header') ||
        document.querySelector('header') ||
        document.querySelector('.site-header') ||
        document.querySelector('#header');
      const h = header ? Math.ceil(header.getBoundingClientRect().height) : 64;
      document.documentElement.style.setProperty('--header-height', `${h}px`);

      const controls = document.querySelector('.advanced-controls');
      const ch = controls ? Math.ceil(controls.getBoundingClientRect().height) : 96;
      document.documentElement.style.setProperty('--controls-height', `${ch}px`);
    };

    computeHeights();
    const t = setTimeout(computeHeights, 200); // re-measure after layout/fonts
    window.addEventListener('resize', computeHeights);
    window.addEventListener('orientationchange', computeHeights);

    // Observe live size changes of header and controls (e.g., mobile menu open)
    let headerObserver, controlsObserver;
    const headerEl = document.querySelector('.main-header') ||
      document.querySelector('header') ||
      document.querySelector('.site-header') ||
      document.querySelector('#header');
    const controlsEl = document.querySelector('.advanced-controls');
    if (window.ResizeObserver) {
      if (headerEl) {
        headerObserver = new ResizeObserver(computeHeights);
        headerObserver.observe(headerEl);
      }
      if (controlsEl) {
        controlsObserver = new ResizeObserver(computeHeights);
        controlsObserver.observe(controlsEl);
      }
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', computeHeights);
      window.removeEventListener('orientationchange', computeHeights);
      if (headerObserver && headerEl) headerObserver.disconnect();
      if (controlsObserver && controlsEl) controlsObserver.disconnect();
    };
  }, []);

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreBtnRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Helper: search match
  const matchesSearch = (product) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    const inName = (product.name || '').toLowerCase().includes(q);
    const inDesc = (product.description || '').toLowerCase().includes(q);
    return inName || inDesc;
  };

  // Get all unique sections (stable, includes 'All')
  const allSections = ['All', ...new Set(products.map(product => product.section))];

  // Live counts based on current search (ignoring activeFilter so user sees potential results)
  const searchMatchedProducts = products.filter(p => matchesSearch(p));
  const sectionCounts = searchMatchedProducts.reduce((acc, p) => {
    const key = p.section || 'General';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const totalCount = searchMatchedProducts.length;

  // Filter logic
  const filteredProducts = products.filter(product => {
    const bySection = activeFilter === 'All' || product.section === activeFilter;
    return bySection && matchesSearch(product);
  });

  // Sort logic removed; keep original order (relevance)
  const sortedProducts = filteredProducts;

  // Group by section
  const groupedProducts = sortedProducts.reduce((acc, product) => {
    const section = product.section || 'General';
    if (!acc[section]) acc[section] = [];
    acc[section].push(product);
    return acc;
  }, {});

  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState([]);
  // Show More/Less button refs for scroll
  const showMoreRefs = useRef({});
  // Section refs for scroll (for collapse)
  const sectionRefs = useRef({});

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const isExpanding = !prev.includes(section);
      const newSections = isExpanding
        ? [...prev, section]
        : prev.filter(s => s !== section);
      setTimeout(() => {
        if (isExpanding && showMoreRefs.current[section]) {
          // Expand: scroll to Show More/Less button (section ke niche tak)
          showMoreRefs.current[section].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (!isExpanding && sectionRefs.current[section]) {
          // Collapse: scroll to section top (Show Less button)
          sectionRefs.current[section].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return newSections;
    });
  };

  // Placeholder image
  const getProductImage = (productName) => {
    return `https://source.unsplash.com/400x300/?medical,${
      encodeURIComponent(productName.split(' ')[0].toLowerCase())
    }`;
  };

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 600;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close More menu on outside click
  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e) => {
      const btn = moreBtnRef.current;
      const menu = moreMenuRef.current;
      if (btn && btn.contains(e.target)) return;
      if (menu && menu.contains(e.target)) return;
      setMoreOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [moreOpen]);

  // Price formatter (IN locale)
  const formatPrice = (val) => {
    const num = val !== undefined && val !== null ? Number(val) : 0;
    try {
      return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
    } catch (_) {
      return num;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="product-card shimmer"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="product-app-container" id="products">
      {/* Controls + Title Area */}

      {/* Advanced Filter Controls */}
      <div className="advanced-controls">
        <div className="controls-bar">
          <div className="controls-left">
            <h2 className="controls-title">Our <span className="gradient-text">Products</span></h2>
            <p className="controls-sub">Explore our active product range.</p>
          </div>
          <div className="controls-right">
            {/* View toggle removed per request */}
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Sort dropdown removed per request */}
            {!isMobile && (
              <>
              <span className="filters-label" aria-hidden="true">Sections</span>
              <div className="filter-tabs">
                {(() => {
                  // Show only 'All' as chip; move every other section to More
                  const sections = allSections;
                  const visible = ['All'];
                  const overflow = sections.filter(s => s !== 'All');
                  return (
                    <>
                      {visible.map(section => (
                        <button
                          key={section}
                          className={`filter-tab ${activeFilter === section ? 'active' : ''}`}
                          onClick={() => setActiveFilter(section)}
                        >
                          <span className="tab-label">{section}</span>
                          <span className="active-indicator" style={{opacity: activeFilter === section ? 1 : 0}}></span>
                          <span className="count-badge">
                            {section === 'All' ? totalCount : (sectionCounts[section] || 0)}
                          </span>
                        </button>
                      ))}
                      {overflow.length > 0 && (
                        <div className="more-wrap" style={{position:'relative'}}>
                          <button
                            ref={moreBtnRef}
                            className={`filter-tab more-btn ${moreOpen ? 'active' : ''}`}
                            onClick={() => setMoreOpen(o => !o)}
                            aria-haspopup="menu"
                            aria-expanded={moreOpen}
                            aria-label="Browse sections"
                            title="Browse sections"
                          >
                            Sections ▾
                          </button>
                          {moreOpen && (
                            <div ref={moreMenuRef} className="more-menu" role="menu">
                              {overflow.map(section => (
                                <button
                                  key={section}
                                  className={`more-item ${activeFilter === section ? 'active' : ''}`}
                                  role="menuitem"
                                  onClick={() => { setActiveFilter(section); setMoreOpen(false); }}
                                >
                                  <span className="label">{section}</span>
                                  <span className="count">{sectionCounts[section] || 0}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
              </>
            )}
          </div>
        </div>
        {isMobile && (
          <div className="filter-dropdown-container">
            {isMobile ? (
              <div className="mobile-filter">
                <button
                  type="button"
                  className="mobile-filter-button"
                  aria-haspopup="listbox"
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(v => !v)}
                >
                  <span className="mobile-filter-label">{activeFilter}</span>
                  <span className="mobile-filter-caret" aria-hidden>▾</span>
                </button>
                {mobileMenuOpen && (
                  <ul
                    className="mobile-filter-menu"
                    role="listbox"
                    aria-label="Filter by section"
                  >
                    {allSections.map(section => (
                      <li key={section} role="option" aria-selected={activeFilter === section}>
                        <button
                          type="button"
                          className={`mobile-filter-option ${activeFilter === section ? 'is-active' : ''}`}
                          onClick={() => {
                            setActiveFilter(section);
                            setMobileMenuOpen(false);
                          }}
                        >
                          {section}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <select
                className="filter-dropdown"
                value={activeFilter}
                onChange={e => setActiveFilter(e.target.value)}
                aria-label="Filter by section"
              >
                {allSections.map(section => {
                  const count = section === 'All' ? totalCount : (sectionCounts[section] || 0);
                  return (
                    <option key={section} value={section}>
                      {section} ({count})
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([section, items]) => {
          const isExpanded = expandedSections.includes(section);
          return (
            <section
              key={section}
              className="product-section"
              ref={el => { sectionRefs.current[section] = el; }}
            >
              <h2 className="section-title">
                <span>{section}</span>
                <small>{items.length} Products</small>
              </h2>
              <div
                className={`products-grid animated-grid${isExpanded ? ' expanded' : ''}`}
                style={{
                  maxHeight: isExpanded ? `${(items.length * 370)}px` : `${(4 * 370)}px`,
                  transition: 'max-height 0.6s cubic-bezier(0.4,0,0.2,1)',
                  overflow: 'hidden',
                }}
              >
                <div className="products-grid">
                {items.slice(0, isExpanded ? items.length : 4).map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-container">
                      <div className="product-badge-pill">{product.category || 'New'}</div>
                      <img 
                        src={product.image || getProductImage(product.name)} 
                        alt={product.name}
                        loading="lazy"
                      />
                      <button className="quick-view-btn" onClick={() => setModalProduct(product)}>
                        <FiEye /> Quick view
                      </button>
                    </div>
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <div className="description">{product.description}</div>
                      <div className="price-badge">
                        ₹ {formatPrice(product.price)}
                      </div>
                      <div className="product-meta">
                        {product.category && <span className="category">{product.category}</span>}
                        {product.inStock && <span className="stock">In Stock</span>}
                      </div>
                      <div className="product-actions"></div>
                    </div>
                  </article>
                ))}
              </div>
              </div>
              {/* Show More/Less Button */}
              {items.length > 4 && (
                <div
                  className="show-more-container"
                  ref={el => { showMoreRefs.current[section] = el; }}
                >
                  <button
                    className="show-more-btn"
                    onClick={() => toggleSection(section)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Show Less' : `Show More (${items.length - 4})`}
                  </button>
                </div>
              )}
            </section>
          );
        })
      ) : (
        <div className="no-results">
          <img src="/no-results.svg" alt="No products found" />
          <h3>No products match your search</h3>
          <button onClick={() => {
            setSearchQuery('');
            setActiveFilter('All');
          }}>
            Reset Filters
          </button>
        </div>
      )}
      <ReactModal
        isOpen={!!modalProduct}
        onRequestClose={() => setModalProduct(null)}
        ariaHideApp={false}
        style={{
          overlay: { backgroundColor: 'rgba(30,40,80,0.18)', zIndex: 10000 },
          content: { maxWidth: 420, margin: 'auto', borderRadius: 18, padding: '2.2rem 2rem 1.5rem 2rem', boxShadow: '0 8px 32px rgba(67,97,238,0.13)', position: 'relative', minHeight: 320 }
        }}
      >
        {modalProduct && (
          <div style={{textAlign:'center', position:'relative'}}>
            <img src={modalProduct.image} alt={modalProduct.name} style={{width:'100%',maxWidth:260,borderRadius:12,marginBottom:18,marginTop:8, boxShadow:'0 2px 12px #4895ef22'}} />
            <h2 style={{marginBottom:8, fontWeight:700, fontSize:'1.35rem'}}>{modalProduct.name}</h2>
            <div style={{color:'#2563eb',fontWeight:800,marginBottom:14,fontSize:'1.15rem'}}>₹ {formatPrice(modalProduct.price)}</div>
            <div style={{marginBottom:10, color:'#444', fontSize:'1.05rem'}}>{modalProduct.description}</div>
            {modalProduct.category && <div style={{marginBottom:6, color:'#4895ef',fontWeight:600}}>{modalProduct.category}</div>}
            {modalProduct.section && <div style={{marginBottom:6, color:'#888'}}>{modalProduct.section}</div>}
            {modalProduct.inStock && <div style={{color:'#28a745',fontWeight:600,marginBottom:8}}>In Stock</div>}
            {/* Niche bhi close button (optional) */}
            <button className="view-btn" style={{marginTop:18}} onClick={() => setModalProduct(null)}>Close</button>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default ProductCard;