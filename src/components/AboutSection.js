import React from "react";
import "./AboutSection.css";
import founderImg from '../assets/Founder.jpeg';
import directorImg from '../assets/Director.jpg';
import BhupendraImg from '../assets/bhupendra.png';
import PrachiImg from '../assets/Prachi.jpg';
import ChetnaImg from '../assets/Chetan.jpg';
import MansiImg from '../assets/mansi.JPG';
function AboutSection() {
  return (
    <section id="about">
      <div className="about-outer">
        <div className="header animated">
          <h1>About LifCura</h1>
          <p className="subtitle">Leading Pharmaceutical Company | Presented by Bio Nectar Revolution</p>
        </div>

        <div className="about-content">
          <p>
            <strong>LifCura</strong> is a leading pharmaceutical company that believes in the power of nature fused
            with cutting-edge science to deliver{" "}
            <strong>safe, effective, and holistic healthcare solutions</strong>.
            As a trusted name in the pharmaceutical and nutraceutical industry,
            <strong>LifCura</strong> is committed to enhancing lives through{" "}
            <strong>
              innovative medicines, supplements, and wellness products
            </strong>{" "}
            that prioritize purity, potency, and sustainability. Choose <strong>LifCura</strong> for premium medical products and therapeutic solutions.
          </p>

          <div className="mission-vision">
            <div className="card">
              <h3>
                <i className="fas fa-eye"></i> Our Vision
              </h3>
              <p>
                To revolutionize healthcare by bridging{" "}
                <strong>traditional wisdom with modern research</strong>, making
                high-quality, natural remedies accessible to all.
              </p>
            </div>
            <div className="card">
              <h3>
                <i className="fas fa-bullseye"></i> Our Mission
              </h3>
              <ul>
                <li>
                  <strong>Innovate</strong>: Develop scientifically validated,
                  plant-based and bio-engineered medicines.
                </li>
                <li>
                  <strong>Heal</strong>: Offer solutions for chronic ailments,
                  immunity, and preventive care.
                </li>
                <li>
                  <strong>Trust</strong>: Maintain transparency, stringent
                  quality control, and ethical practices.
                </li>
              </ul>
            </div>
          </div>

         

          {/* Founder Section */}
          <div className="founder-section">
  <div className="founder-content">
    <img src={founderImg} alt="Rohit - Founder" className="founder-image" />
    <div className="founder-text">
      <h2>Rohit Singh</h2>
      <p className="title">Founder & CEO</p>
      <p className="bio">
        Rohit is the visionary behind LifCura. With a passion for health tech and years of industry experience,
        he leads the company with innovation and dedication.
      </p>
    </div>
  </div>
</div>


<div className="founder-section">
  <div className="founder-container reverse">
    <img src={directorImg} alt="Manoj Chauhan - Director" className="founder-image rounded" />
    <div className="founder-text">
      <h2>Manoj Chauhan</h2>
      <p className="title">Director</p>
      <p>
        Manoj Chauhan plays a vital role in steering LifCura’s operations and strategy.
        His dedication and leadership have helped shape the company’s growth and long-term vision.
      </p>
    </div>
  </div>
</div>

  {/* Team Section */}
<div className="team-section">
  <h2>Our Team</h2>
  <div className="team-grid">
    <div className="team-member">
      <img src={ChetnaImg} alt="Prachi - Operations" />
      <h4>Chetna Singh</h4>
      <p>Admin</p>
    </div>
    <div className="team-member">
      <img src={PrachiImg} alt="Prachi - Operations" />
      <h4>Prachi Singh</h4>
      <p>Operations Team</p>
    </div>
    <div className="team-member">
      <img src={BhupendraImg} alt="Bhupendra - Tech Support" />
      <h4>Bhupendra</h4>
      <p>Tech Support</p>
    </div>
    <div className="team-member">
      <img src={MansiImg} alt="Mansi - Sales Executive" />
      <h4>Mansi Singh</h4>
      <p>Sales Executive</p>
    </div>
    
    
  </div>
</div>
<p className="tagline">
            Lifcura – Where Nature Meets Science for a Healthier Tomorrow.
          </p>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;
