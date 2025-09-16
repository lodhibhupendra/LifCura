import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from "../assets/LOGO.png";
import "./Header.css";

function Header() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-logo" onDoubleClick={() => { window.location.href = '/admin/login'; }}>
          <img src={logo} alt="LifCura Logo" />
          <div>
            {/* <div className="header-company">LifCura</div>
            <div className="header-tagline">Nurturing Health</div> */}
          </div>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/#about" className="nav-link">About Us</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/#segments" className="nav-link">Present In</Link>
          <Link to="/#contact" className="nav-link">Contact</Link>
        </nav>
        <button
          className={`header-menu-btn${mobileNav ? ' open' : ''}`}
          id="menuBtn"
          onClick={() => setMobileNav((v) => !v)}
          aria-label={mobileNav ? 'Close menu' : 'Open menu'}
        >
          <span className="hamburger">
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
          </span>
        </button>
      </div>
      {mobileNav && (
        <div className="header-mobile-nav" id="mobileNav">
          <Link to="/" className="nav-link" onClick={() => setMobileNav(false)}>Home</Link>
          <Link to="/#about" className="nav-link" onClick={() => setMobileNav(false)}>About Us</Link>
          <Link to="/products" className="nav-link" onClick={() => setMobileNav(false)}>Products</Link>
          <Link to="/#segments" className="nav-link" onClick={() => setMobileNav(false)}>Present In</Link>
          <Link to="/#contact" className="nav-link" onClick={() => setMobileNav(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}

export default Header; 