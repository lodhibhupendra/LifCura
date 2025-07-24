import React from "react";
import researchImg from "../assets/Laboratory.png";
import "./ResearchSection.css";

const researchCards = [
  {
    icon: "fas fa-vial",
    title: "Formulation Research",
    desc: "Developing novel drug delivery systems with enhanced bioavailability and stability profiles."
  },
  {
    icon: "fas fa-leaf",
    title: "Phytochemical Analysis",
    desc: "Scientific validation of herbal compounds using HPLC, GC-MS and other advanced techniques."
  },
  {
    icon: "fas fa-dna",
    title: "Biotechnology",
    desc: "Exploring plant cell culture and molecular techniques for enhanced therapeutic compounds."
  }
];

function ResearchSection() {
  return (
    <section className="research-section" id="research">
      <div className="research-container">
        <div className="section-header">
          <h2 className="research-title">Innovating the Future of Medicine</h2>
          <p className="research-subtitle">Our dedicated R&D team combines cutting-edge science with traditional knowledge to develop safe, effective pharmaceutical solutions.</p>
        </div>
        <div className="research-flex">
          <div className="research-img-col">
            <img src={researchImg} alt="LifCura Research Laboratory" className="research-img" />
          </div>
          <div className="research-cards-col">
            {researchCards.map((card, idx) => (
              <div className="research-card" key={idx}>
                <div className="research-card-icon">
                  <i className={card.icon}></i>
                </div>
                <div className="research-card-content">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResearchSection; 