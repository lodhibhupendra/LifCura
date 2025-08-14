import React from 'react';
import logo from "../assets/LOGO.png";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login', { replace: true });
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  return (
    <div style={styles.shell}>
      <header style={styles.header}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <img src={logo} alt="LifCura" style={{width:32, height:32, borderRadius:6}} />
          <div style={{fontWeight:700}}>LifCura Admin</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          {user?.email && <span style={{fontSize:14, color:'#374151'}}>{user.email}</span>}
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

const styles = {
  shell: { minHeight:'100vh', background: 'linear-gradient(135deg, #f7fffb 0%, #f6f9ff 100%)' },
  header: {
    position:'sticky', top:0, zIndex:10,
    display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'10px 16px', background:'#ffffffcc', backdropFilter:'saturate(180%) blur(10px)',
    borderBottom:'1px solid #eef2f7'
  },
  logoutBtn: {
    padding:'8px 12px', borderRadius:8, border:'1px solid #e5e7eb', background:'#fff', cursor:'pointer'
  }
};
