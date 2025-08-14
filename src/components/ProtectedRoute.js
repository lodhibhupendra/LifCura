import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function ProtectedRoute({ children }) {
  const [state, setState] = useState({ loading: true, allowed: false });
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        try { sessionStorage.setItem('intended', location?.pathname || '/admin/products'); } catch {}
        return setState({ loading: false, allowed: false });
      }
      try {
        const ref = doc(db, 'roles', user.uid);
        const snap = await getDoc(ref);
        const isAdmin = snap.exists() && snap.data().admin === true;
        if (!isAdmin) {
          try { sessionStorage.setItem('intended', location?.pathname || '/admin/products'); } catch {}
        }
        setState({ loading: false, allowed: isAdmin });
      } catch (e) {
        console.error('Role check failed', e);
        setState({ loading: false, allowed: false });
      }
    });
    return () => unsub();
  }, []);

  if (state.loading) return (
    <div style={styles.splash}>
      <svg width="36" height="36" viewBox="0 0 50 50" aria-label="Loading">
        <circle cx="25" cy="25" r="20" stroke="#e5e7eb" strokeWidth="6" fill="none" />
        <path d="M25 5 a20 20 0 0 1 0 40" stroke="#16a34a" strokeWidth="6" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
      <div style={{marginTop: 12, color:'#374151'}}>Checking access…</div>
    </div>
  );
  if (!state.allowed) {
    return <Navigate to="/admin/login" replace state={{ from: location?.pathname || '/admin/products' }} />;
  }
  return children;
}

const styles = {
  splash: {
    minHeight: '100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
    background: 'linear-gradient(135deg, #f7fffb 0%, #f6f9ff 100%)'
  },
  spinner: {}
};
