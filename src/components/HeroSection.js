import React, { useState, useEffect } from "react";
import logo from "../assets/LOGO.png";
import team from "../assets/team.png";
import "./HeroSection.css";

function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <section className="hero-section" id="home">
      <img
        src={isMobile ? team : logo}
        className="hero-bg-logo"
        alt="LifCura Hero Background"
        style={isMobile ? {opacity: 0.18, filter: 'blur(2px)'} : {}}
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-flex">
          <div className="hero-left">
            <div className="logo-container">
              <div className="logo">
                <div className="logo-main">LIFCURA</div>
                <div className="logo-highlight"></div>
                <div className="logo-tagline">Nurturing Health</div>
                <div className="logo-presented">Presented by Bio Nectar Revolution</div>
              </div>
            </div>
            <h1>
              <span>Innovating for </span>
              <span className="text-primary-light pulse-text">Healthier</span>
              <span> Tomorrows</span>
            </h1>
            <p className="lead">
              Pioneering pharmaceutical solutions that transform lives through cutting-edge research and compassionate care.
            </p>
            <div className="hero-buttons">
              <a href="#products" className="btn btn-primary">Our Medications</a>
              <a href="#research" className="btn btn-outline">Our Research</a>
            </div>
            <div className="trust-badges">
              <div className="badge-item">
                <div className="badge-icon">✓</div>
                <div>5+ Years Experience</div>
              </div>
              <div className="badge-item">
                <div className="badge-icon">✓</div>
                <div>ISO Certified</div>
              </div>
            </div>
          </div>
          {/* Desktop par hi team image dikhaye */}
          {!isMobile && (
            <div className="hero-right">
              <div className="hero-image-container">
                <img src={team} alt="LifCura Research Team" className="hero-image" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 