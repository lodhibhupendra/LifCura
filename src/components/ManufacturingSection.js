import React from "react";
import manufacturingImg from "../assets/manufacturing.png";
import "./ManufacturingSection.css";

const features = [
  {
    icon: "fas fa-flask",
    title: "Advanced Technology",
    desc: "We use cutting-edge technology to ensure the highest standards of production."
  },
  {
    icon: "fas fa-check-circle",
    title: "Quality Control",
    desc: "Our quality control processes are designed to ensure that every product meets our high standards."
  },
  {
    icon: "fas fa-bicycle",
    title: "Customized Solutions",
    desc: "We offer customized solutions to meet the specific needs of our clients."
  },
  {
    icon: "fas fa-users",
    title: "Expert Team",
    desc: "Our team of experts ensures that every product is manufactured with precision and care."
  }
];

const certifications = [
  { icon: "fas fa-certificate", label: "ISO 9001:2015" },
  { icon: "fas fa-certificate", label: "WHO-GMP" },
 
  { icon: "fas fa-certificate", label: "CDSCO Approved" }
];

function ManufacturingSection() {
  return (
    <section className="manufacturing-section" id="manufacturing">
      <div className="manufacturing-container">
        <div className="section-header">
          <h2>Our Manufacturing Facility</h2>
        </div>
        <div className="facility-content">
          <div className="facility-image">
            <img src={manufacturingImg} alt="Manufacturing Facility" />
          </div>
          <div className="facility-details">
            <p>Our state-of-the-art manufacturing facility is equipped with the latest technology and follows stringent quality control standards. We produce high-quality pharmaceutical products that meet international standards.</p>
            <div className="features-grid">
              {features.map((feature, idx) => (
                <div className="feature-card" key={idx}>
                  <div className="feature-icon"><i className={feature.icon}></i></div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
            <div className="certifications">
              {certifications.map((cert, idx) => (
                <div className="cert-badge" key={idx}>
                  <i className={cert.icon}></i>
                  <span>{cert.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManufacturingSection; 