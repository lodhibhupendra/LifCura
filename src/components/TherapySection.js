import React from "react";
import "./TherapySection.css";

const therapies = [
  {
    icon: "fas fa-brain",
    name: "Neuropsychiatry",
    desc: "Innovative treatments for neurological and psychiatric disorders"
  },
  {
    icon: "fas fa-heartbeat",
    name: "Cardiovascular",
    desc: "Medications for heart diseases and circulatory conditions"
  },
  {
    icon: "fas fa-user-md", // fa-stomach nahi hai, doctor icon
    name: "Gastroenterology",
    desc: "Solutions for digestive system disorders"
  },
  {
    icon: "fas fa-procedures",
    name: "Pain & Surgery",
    desc: "Anesthetics and post-operative care medications"
  },
  {
    icon: "fas fa-eye",
    name: "Ophthalmology",
    desc: "Eye care treatments and vision health"
  },
  {
    icon: "fas fa-lungs",
    name: "Respiratory",
    desc: "Medications for lung conditions and breathing disorders"
  },
  {
    icon: "fas fa-venus-mars", // fa-venus nahi hai, venus-mars for gynaecology
    name: "Gynaecology",
    desc: "Women's health and reproductive medications"
  },
  {
    icon: "fas fa-procedures", // fa-kidneys nahi hai, use procedures
    name: "Urology",
    desc: "Treatments for urinary tract and male reproductive health"
  },
  {
    icon: "fas fa-dna",
    name: "Oncology",
    desc: "Innovative cancer treatments and therapies"
  },
  {
    icon: "fas fa-allergies", // fa-allergies is available in pro, fallback to fa-band-aid
    name: "Dermatology",
    desc: "Skin care treatments and dermatological solutions"
  },
  {
    icon: "fas fa-virus", // fa-virus is available in pro, fallback to fa-bug
    name: "Anti-infectives",
    desc: "Antibiotics, antivirals and antimicrobial medications"
  },
  {
    icon: "fas fa-tint", // fa-kidney nahi hai, use fa-tint for nephrology
    name: "Nephrology",
    desc: "Kidney disease treatments and dialysis medications"
  }
];

function TherapySection() {
  return (
    <section className="therapy-section" id="segments">
      <div className="therapy-container-outer">
        <div className="section-header">
          <h2 className="section-title">Therapies We Are Present In</h2>
          <p className="text-muted">LifCura develops innovative pharmaceutical solutions across these therapeutic areas</p>
        </div>
        <div className="therapy-container">
          {therapies.map((therapy, idx) => (
            <div className="therapy-card" key={idx}>
              <div>
                <div className="therapy-icon">
                  <i className={therapy.icon}></i>
                </div>
                <h3 className="therapy-name">{therapy.name}</h3>
              </div>
              <p className="therapy-desc">{therapy.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TherapySection; 