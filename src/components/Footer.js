import React, { useState, useEffect } from "react";
import logo from "../assets/LOGO.png";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (isMobile) {
    return (
      <footer className="footer-section premium-footer">
        <div className="footer-bottom premium only-mobile-copyright">
          <p>
            &copy; {year} LifCura. All Rights Reserved. 
          </p>
        </div>
      </footer>
    );
  }
  return (
    <footer className="footer-section premium-footer">
      <div className="footer-bg-svg">
        <svg width="100%" height="100" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 Q360,0 720,60 T1440,40 V100 H0 Z" fill="#e6f4ee"/>
        </svg>
      </div>
      <div className="footer-container premium">
        <div className="footer-col footer-about premium">
          <img src={logo} alt="LifCura Logo" className="footer-logo premium" />
          <div className="footer-company premium">LifCura</div>
          <div className="footer-tagline premium">Nurturing Health</div>
          <p className="footer-desc premium">
            <span role="img" aria-label="leaf">🌱</span> Empowering lives with innovative, quality healthcare. <br />WHO-GMP certified, trusted globally.
          </p>
        </div>
        <div className="footer-col footer-links premium">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#segments">Therapeutic Segments</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col footer-contact premium">
          <h3>Contact</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> TIRCHHI GHAZIPUR 275202</li>
            <li><i className="fas fa-home"></i> H.No.8008, Ghazipur, India</li>
            <li><i className="fas fa-envelope"></i> lifcura@gmail.com</li>
            <li><i className="fas fa-phone"></i> +91 7007057412</li>
            <li><i className="fas fa-phone"></i> +91 8090755501</li>
          </ul>
          <div className="footer-socials premium">
            <a href="mailto:lifcura@gmail.com" title="Email" className="footer-social-tooltip"><i className="fas fa-envelope"></i><span>Email</span></a>
            <a href="tel:+917007057412" title="Call" className="footer-social-tooltip"><i className="fas fa-phone"></i><span>Call</span></a>
            <a href="https://wa.me/917007057412" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="footer-social-tooltip"><i className="fab fa-whatsapp"></i><span>WhatsApp</span></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="footer-social-tooltip"><i className="fab fa-linkedin-in"></i><span>LinkedIn</span></a>
          </div>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom premium">
        <p>
          &copy; {year} LifCura. All Rights Reserved. 
        </p>
      </div>
    </footer>
  );
}

export default Footer; 