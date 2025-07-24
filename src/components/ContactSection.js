import React, { useState } from "react";
import logo from "../assets/LOGO.png";
import "./ContactSection.css";

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="contact-section premium-bg" id="contact">
      <div style={{textAlign:'center', marginBottom:'2.5rem'}}>
        <h2 style={{fontSize:'2.2rem', fontWeight:800, color:'#17624b', marginBottom:'0.5rem', letterSpacing:'-1px'}}>Contact Us</h2>
        <p style={{color:'#4a4a68', fontSize:'1.1rem', maxWidth:520, margin:'0 auto'}}>Have a question or want to connect? Fill out the form or use the details below and our team will get back to you soon.</p>
      </div>
      <div className="contact-container">
        <div className="contact-info-card premium">
          <img src={logo} alt="LifCura Logo" className="contact-logo" />
          <div className="contact-tagline">Nurturing Health, Globally</div>
          <ul className="contact-info-list">
            <li><i className="fas fa-map-marker-alt"></i> <span style={{fontWeight:600}}>TIRCHHI GHAZIPUR 275202</span></li>
            <li><i className="fas fa-home"></i> H.No.8008, Ghazipur, India</li>
            <li><i className="fas fa-envelope"></i> <a href="mailto:lifcura@gmail.com">lifcura@gmail.com</a></li>
            <li><i className="fas fa-phone"></i> <a href="tel:+917007057412">+91 7007057412</a></li>
            <li><i className="fas fa-phone"></i> <a href="tel:+918090755501">+91 8090755501</a></li>
            <li><i className="fas fa-clock"></i> Mon-Sat: 9:00am - 6:00pm</li>
            <li><a href="https://goo.gl/maps/2v8kQw8Qw8Qw8Qw8A" target="_blank" rel="noopener noreferrer"><i className="fas fa-map"></i> View on Google Maps</a></li>
          </ul>
          <div className="contact-socials premium">
            <a href="mailto:lifcura@gmail.com" title="Email"><i className="fas fa-envelope"></i></a>
            <a href="tel:+917007057412" title="Call"><i className="fas fa-phone"></i></a>
            <a href="https://wa.me/917007057412" target="_blank" rel="noopener noreferrer" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="contact-form-card premium">
          <h2 style={{textAlign:'center', fontWeight:700, color:'#17624b', marginBottom:'1.2rem'}}>Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-row">
              <div className="form-group">
                <input type="text" required placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input type="email" required placeholder="Email Address" />
              </div>
            </div>
            <div className="form-group">
              <input type="text" required placeholder="Subject" />
            </div>
            <div className="form-group">
              <textarea rows={5} required placeholder="Message"></textarea>
            </div>
            <button type="submit" className="contact-btn premium-btn">Send Message <i className="fas fa-paper-plane"></i></button>
            {submitted && <div className="contact-success" style={{fontSize:'1.12rem', fontWeight:700, marginTop:18}}>Thank you! Your message has been sent.</div>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection; 