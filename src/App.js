import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Particles from 'react-tsparticles';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TherapySection from './components/TherapySection';
import ManufacturingSection from './components/ManufacturingSection';
import ResearchSection from './components/ResearchSection';
import ProductCard from './pages/ProductCard';
import { medicalProducts } from './data/medicalProductsData';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ExportSection from './components/ExportSection';
import SEOOptimizer from './components/SEOOptimizer';
import GoogleAnalytics from './components/GoogleAnalytics';
import { createOrganizationStructuredData } from './utils/seoUtils';

function App() {
  return (
    <HelmetProvider>
      <SEOOptimizer />
      <GoogleAnalytics trackingId={process.env.REACT_APP_GA_TRACKING_ID} />
      
      <Helmet>
        <script type="application/ld+json">
          {createOrganizationStructuredData()}
        </script>
      </Helmet>
      
      <div style={{position: 'relative', zIndex: 1}}>
        <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "#f8fafc" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 80, duration: 0.4 } }
          },
          particles: {
            color: { value: "#1a936f" },
            links: { enable: true, color: "#1a936f", distance: 120, opacity: 0.3 },
            move: { enable: true, speed: 1 },
            number: { value: 40 },
            opacity: { value: 0.25 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } }
          },
          detectRetina: true
        }}
        style={{
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh"
        }}
        />
        <div style={{position: 'relative', zIndex: 1}}>
          <Header />
          <HeroSection />
          <AboutSection />
          <TherapySection />
          <ManufacturingSection />
          <ResearchSection />
          <ExportSection />
          <ProductCard products={medicalProducts} />
          <ContactSection />
          <Footer />
        
        
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
