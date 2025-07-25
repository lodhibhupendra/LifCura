import React, { useEffect } from "react";
import "./ExportSection.css";
import exportImg from "../assets/EXPORT.png";

const countries = [
  { name: "India", flag: "https://flagcdn.com/w20/in.png", className: "country-item india" },
  { name: "United States", flag: "https://flagcdn.com/w20/us.png" },
  { name: "Canada", flag: "https://flagcdn.com/w20/ca.png" },
  { name: "United Kingdom", flag: "https://flagcdn.com/w20/gb.png" },
  { name: "Germany", flag: "https://flagcdn.com/w20/de.png" },
  { name: "France", flag: "https://flagcdn.com/w20/fr.png" },
  { name: "Italy", flag: "https://flagcdn.com/w20/it.png" },
  { name: "UAE", flag: "https://flagcdn.com/w20/ae.png" },
  { name: "Saudi Arabia", flag: "https://flagcdn.com/w20/sa.png" },
  { name: "South Africa", flag: "https://flagcdn.com/w20/za.png" },
  { name: "Japan", flag: "https://flagcdn.com/w20/jp.png" },
  { name: "Singapore", flag: "https://flagcdn.com/w20/sg.png" },
  { name: "Malaysia", flag: "https://flagcdn.com/w20/my.png" },
  { name: "Thailand", flag: "https://flagcdn.com/w20/th.png" },
  { name: "Australia", flag: "https://flagcdn.com/w20/au.png" },
];

const ExportSection = () => {
  useEffect(() => {
    function animateOnScroll() {
      const elements = document.querySelectorAll(
        ".section-title, .export-image, .countries-grid, .export-stats, .country-item"
      );
      const windowHeight = window.innerHeight;

      elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementPosition < windowHeight - elementVisible) {
          if (element.classList.contains("country-item")) {
            const row = Math.floor(index / 4);
            element.style.transitionDelay = `${row * 0.05}s`;
          }
          element.classList.add("animated");
        }
      });
    }
    animateOnScroll();
    window.addEventListener("scroll", animateOnScroll);
    setTimeout(animateOnScroll, 500);
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <section className="export-section">
      <div className="container">
        <div className="section-title">
          <h2>Global Export Markets</h2>
        </div>
        <div className="export-content">
          <div className="export-image">
            <img src={exportImg} alt="Lifcura Global Exports" />
          </div>
          <div className="countries-grid">
            <h3 className="countries-title">Countries We Export To:</h3>
            <div className="country-list">
              {countries.map((country) => (
                <div
                  className={country.className || "country-item"}
                  key={country.name}
                >
                  <img
                    src={country.flag}
                    className="country-flag"
                    alt={`${country.name} Flag`}
                  />
                  <span className="country-name">{country.name}</span>
                </div>
              ))}
            </div>
            <p className="export-stats">
              <i className="fas fa-globe-asia"></i> Currently exporting to 15+ countries worldwide with GMP certified medicines
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportSection; 