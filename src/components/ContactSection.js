import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import logo from "../assets/LOGO.png";
import "./ContactSection.css";

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // EmailJS configuration - Real values from EmailJS dashboard
  const SERVICE_ID = 'service_ar1psu8'; // Gmail/Outlook service ID
  const TEMPLATE_ID = 'template_r5yovbk'; // Email template ID
  const PUBLIC_KEY = '1VDVxABjgefz3LEsc'; // EmailJS public key

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    // Check if EmailJS is configured
    const isEmailJSConfigured = true; 
                              
    try {
      if (isEmailJSConfigured) {
        // Use EmailJS if configured
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          to_name: 'LifCura Team',
        };
        
        const result = await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );
        
        if (result.status === 200) {
          setSubmitted(true);
          form.reset();
          setTimeout(() => setSubmitted(false), 3500);
        }
      } else {
        // Fallback to mailto if EmailJS not configured
        const mailtoLink = `mailto:lifcura@gmail.com?subject=${encodeURIComponent(`Contact Form: ${formData.subject}`)}&body=${encodeURIComponent(
          `नाम: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Phone: ${formData.phone}\n` +
          `विषय: ${formData.subject}\n\n` +
          `संदेश:\n${formData.message}\n\n` +
          `---\n` +
          `यह message LifCura website से भेजा गया है।`
        )}`;
        
        window.open(mailtoLink, '_blank');
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 3500);
      }
    } catch (error) {
      console.error('Email Error:', error);
      // Fallback to mailto on any error
      const mailtoLink = `mailto:lifcura@gmail.com?subject=${encodeURIComponent(`Contact Form: ${formData.subject}`)}&body=${encodeURIComponent(
        `नाम: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `विषय: ${formData.subject}\n\n` +
        `संदेश:\n${formData.message}\n\n` +
        `---\n` +
        `यह message LifCura website से भेजा गया है।`
      )}`;
      
      window.open(mailtoLink, '_blank');
      alert('आपका default email client खुल गया है। कृपया email भेजें।');
    } finally {
      setLoading(false);
    }
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
            <li><a href="https://www.google.com/maps/place/LIFCURA+PHARMACEUTICAL+MANUFACTURING+COMPANY/@25.7904173,83.3915058,17z/data=!3m1!4b1!4m6!3m5!1s0x3991ef1606b6402b:0xb93ede0147c8aa06!8m2!3d25.7904125!4d83.3940807!16s%2Fg%2F11xlj_r197?hl=en-us&entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><i className="fas fa-map"></i> View on Google Maps</a></li>
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
                <input type="text" name="name" required placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input type="email" name="email" required placeholder="Email Address" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="tel" name="phone" required placeholder="Phone Number" />
              </div>
              <div className="form-group">
                <input type="text" name="subject" required placeholder="Subject" />
              </div>
            </div>
            <div className="form-group">
              <textarea name="message" rows={5} required placeholder="Message"></textarea>
            </div>
            <button type="submit" className="contact-btn premium-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane"></i>
            </button>
            {submitted && <div className="contact-success" style={{fontSize:'1.12rem', fontWeight:700, marginTop:18}}>Thank you! Your message has been sent.</div>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection; 