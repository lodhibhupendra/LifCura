import React from "react";
import "./AboutSection.css";

function AboutSection() {
  return (
    <section id="about">
      <div className="about-outer">
        <div className="header animated">
          <h1>About Lifcura</h1>
          <p className="subtitle">Presented by Bio Nectar Revolution</p>
        </div>
        <div className="about-content">
          <p>
            At <strong>Lifcura</strong>, we believe in the power of nature fused with cutting-edge science to deliver <strong>safe, effective, and holistic healthcare solutions</strong>. As a trusted name in the pharmaceutical and nutraceutical industry, we are committed to enhancing lives through <strong>innovative medicines, supplements, and wellness products</strong> that prioritize purity, potency, and sustainability.
          </p>
          <div className="mission-vision">
            <div className="card">
              <h3><i className="fas fa-eye"></i> Our Vision</h3>
              <p>To revolutionize healthcare by bridging <strong>traditional wisdom with modern research</strong>, making high-quality, natural remedies accessible to all.</p>
            </div>
            <div className="card">
              <h3><i className="fas fa-bullseye"></i> Our Mission</h3>
              <ul>
                <li><strong>Innovate</strong>: Develop scientifically validated, plant-based and bio-engineered medicines.</li>
                <li><strong>Heal</strong>: Offer solutions for chronic ailments, immunity, and preventive care.</li>
                <li><strong>Trust</strong>: Maintain transparency, stringent quality control, and ethical practices.</li>
              </ul>
            </div>
          </div>
          <p className="tagline">Lifcura – Where Nature Meets Science for a Healthier Tomorrow.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection; 