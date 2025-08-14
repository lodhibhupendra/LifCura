import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated (e.g., after refresh), redirect to intended route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const intended = (() => { try { return sessionStorage.getItem('intended'); } catch { return null; } })();
        const to = (location?.state && location.state.from) || intended || '/admin/products';
        try { sessionStorage.removeItem('intended'); } catch {}
        navigate(to, { replace: true });
      }
    });
    return () => unsub();
  }, [navigate]);

  const mapFirebaseError = (codeOrMsg) => {
    const code = String(codeOrMsg || '').toLowerCase();
    if (code.includes('auth/invalid-credential')) return 'Invalid email or password.';
    if (code.includes('auth/user-not-found')) return 'User not found.';
    if (code.includes('auth/wrong-password')) return 'Incorrect password.';
    if (code.includes('auth/too-many-requests')) return 'Too many attempts. Please wait and try again.';
    if (code.includes('network')) return 'Network error. Check your internet connection.';
    return codeOrMsg;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    setInfo('');
    try {
      if (!email || !password) {
        throw new Error('Please enter email and password');
      }
      // basic email format check
      const okEmail = /.+@.+\..+/.test(email);
      if (!okEmail) throw new Error('Please enter a valid email');
      if (password.length < 6) throw new Error('Password must be at least 6 characters');
      await signInWithEmailAndPassword(auth, email, password);
      setInfo('Login successful. Redirecting...');
      const intended = (() => { try { return sessionStorage.getItem('intended'); } catch { return null; } })();
      const to = (location?.state && location.state.from) || intended || '/admin/products';
      try { sessionStorage.removeItem('intended'); } catch {}
      setTimeout(() => { navigate(to, { replace: true }); }, 400);
    } catch (e) {
      setErr(mapFirebaseError(e.code || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img src="/logo.png" alt="LifCura" style={styles.logo} onError={(e)=>{e.currentTarget.style.display='none';}} />
          <h2 style={styles.title}>Admin Login</h2>
          <p style={styles.subtitle}>Sign in to manage products</p>
        </div>

        {err && <div style={styles.alertError}>{err}</div>}
        {info && <div style={styles.alertInfo}>{info}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={styles.input}
              required
              autoComplete="email"
            />
          </label>

          <label style={styles.label}>
            Password
            <div style={{position:'relative'}}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                style={{...styles.input, paddingRight: 84}}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={()=>setShowPassword(s=>!s)}
                style={styles.toggleBtn}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{...styles.submit, opacity: (loading || !email || !password) ? 0.8 : 1}}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <div style={styles.footerText}>
          Protected area. Authorized personnel only.
        </div>
      </div>
    </div>
  );
}

// Simple styles object for a polished look without external CSS
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #e8fff6 0%, #f3f9ff 100%)'
  },
  card: {
    width: '100%',
    maxWidth: 440,
    background: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    padding: 24,
    backdropFilter: 'blur(6px)'
  },
  header: { textAlign: 'center', marginBottom: 16 },
  logo: { width: 56, height: 56, objectFit: 'contain', marginBottom: 6 },
  title: { margin: 0, fontSize: 24 },
  subtitle: { margin: '4px 0 0', color: '#6b7280', fontSize: 14 },
  form: { display: 'grid', gap: 12, marginTop: 8 },
  label: { display: 'grid', gap: 6, fontSize: 14, color: '#374151' },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    outline: 'none',
    fontSize: 14,
    transition: 'box-shadow .15s ease, border-color .15s ease',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
  },
  toggleBtn: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    border: '1px solid #e5e7eb',
    background: '#f9fafb',
    padding: '6px 10px',
    borderRadius: 8,
    fontSize: 12,
    cursor: 'pointer'
  },
  submit: {
    width: '100%',
    padding: '12px 14px',
    border: 'none',
    borderRadius: 10,
    background: 'linear-gradient(135deg, #1a936f, #16a34a)',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 6px 16px rgba(26,147,111,0.3)'
  },
  alertError: {
    background: '#fee2e2', color: '#b91c1c', padding: '10px 12px', borderRadius: 8, marginBottom: 8, fontSize: 14
  },
  alertInfo: {
    background: '#e1f5eb', color: '#065f46', padding: '10px 12px', borderRadius: 8, marginBottom: 8, fontSize: 14
  },
  footerText: {
    marginTop: 16, textAlign: 'center', color: '#6b7280', fontSize: 12
  }
};
