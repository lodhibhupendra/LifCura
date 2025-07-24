import React, { useState } from "react";
import logo from "../assets/LOGO.png";
import "./Header.css";

function Header() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="LifCura Logo" />
          <div>
            <div className="header-company">LifCura</div>
            <div className="header-tagline">Nurturing Health</div>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#products" className="nav-link">Products</a>
          <a href="#segments" className="nav-link">Present In</a>
          <a href="#contact" className="nav-link">Contact</a>
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
          <a href="#home" className="nav-link" onClick={() => setMobileNav(false)}>Home</a>
          <a href="#about" className="nav-link" onClick={() => setMobileNav(false)}>About Us</a>
          <a href="#products" className="nav-link" onClick={() => setMobileNav(false)}>Products</a>
          <a href="#segments" className="nav-link" onClick={() => setMobileNav(false)}>Present In</a>
          <a href="#contact" className="nav-link" onClick={() => setMobileNav(false)}>Contact</a>
        </div>
      )}
    </header>
  );
}

export default Header; 