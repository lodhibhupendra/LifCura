import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Particles from 'react-tsparticles';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TherapySection from './components/TherapySection';
import ManufacturingSection from './components/ManufacturingSection';
import ResearchSection from './components/ResearchSection';
// Product list moved to its own page
import ProductsPage from './pages/ProductsPage';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ExportSection from './components/ExportSection';
import SEOOptimizer from './components/SEOOptimizer';
import GoogleAnalytics from './components/GoogleAnalytics';
import { createOrganizationStructuredData } from './utils/seoUtils';
import AdminLogin from './pages/AdminLogin';
import AdminProducts from './pages/AdminProducts';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
// Product preview images for marquee
import ImgAmlodipine from './assets/ProductsImg/Amlodipine.jpeg';
import ImgAmoxicillin from './assets/ProductsImg/Amoxicillin.jpeg';
import ImgAzithromycin from './assets/ProductsImg/Azithromycin.jpeg';
import ImgCefixime from './assets/ProductsImg/Cefixime.jpeg';
import ImgEtoricoxib from './assets/ProductsImg/Etoricoxib.jpeg';
import ImgEsomeprazole from './assets/ProductsImg/Esomeprazole.jpeg';
import ImgCalcium from './assets/ProductsImg/Calcium.jpeg';
import ImgClobetasol from './assets/ProductsImg/Clobetasol.jpeg';
// import { db } from './firebase';
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

function Home() {

  return (
    <>
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
          {/* Teaser banner: scrolling product images + CTA to products */}
          <section aria-label="Products teaser" style={{
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(90deg, #e6fff6 0%, #f0fffb 50%, #e6fff6 100%)',
            border: '1px solid #bfe7d8',
            boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
            margin: '26px auto',
            padding: '14px 18px',
            borderRadius: 14,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            maxWidth: 1100
          }}>
            <style>{`
              .teaser-viewport { overflow: hidden; height: 168px; position: relative; 
                -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
                        mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
              }
              .teaser-track { display: inline-flex; align-items: center; gap: 16px; padding-right: 1rem; }
              .teaser-anim { display: inline-flex; animation: lifcura-teaser 24s linear infinite; will-change: transform; }
              .teaser-img { height: 150px; width: auto; display: block; border-radius: 12px; 
                box-shadow: 0 6px 18px rgba(0,0,0,0.08); background: #f8fafc; border: 1px solid #e2e8f0; transition: transform .18s ease, box-shadow .18s ease;
              }
              .teaser-img:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 12px 28px rgba(0,0,0,0.12); }
              .teaser-wrap { display: flex; align-items: center; gap: 14px; justify-content: space-between; }
              .teaser-btn { background: transparent; color: #128463; text-decoration: none; padding: 0; border: none; font-weight: 700; letter-spacing: .1px; 
                box-shadow: none; transition: color .15s ease; }
              .teaser-btn::before{ content: none; }
              @keyframes lifcura-teaser { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              .teaser-btn:hover { color: #0f6c59; text-decoration: underline; }
              @keyframes lifcura-btn-shine { 0% { left:-150%; } 100% { left: 150%; } }
              @keyframes lifcura-btn-pulse { 0% { } 100% { } }
              .teaser-anim:hover { animation-play-state: paused; }
              @media (max-width: 1024px) { .teaser-img { height: 128px; } .teaser-viewport { height: 144px; } }
              @media (max-width: 640px)  { .teaser-img { height: 108px; } .teaser-viewport { height: 124px; } .teaser-btn { padding: 0; font-weight: 700; } }
            `}</style>
            <div className="teaser-wrap">
              <div className="teaser-viewport" aria-hidden="false">
                <div className="teaser-anim">
                  <div className="teaser-track">
                    <Link to="/products" aria-label="View Amlodipine"><img className="teaser-img" src={ImgAmlodipine} alt="Amlodipine" /></Link>
                    <Link to="/products" aria-label="View Amoxicillin"><img className="teaser-img" src={ImgAmoxicillin} alt="Amoxicillin" /></Link>
                    <Link to="/products" aria-label="View Azithromycin"><img className="teaser-img" src={ImgAzithromycin} alt="Azithromycin" /></Link>
                    <Link to="/products" aria-label="View Cefixime"><img className="teaser-img" src={ImgCefixime} alt="Cefixime" /></Link>
                    <Link to="/products" aria-label="View Etoricoxib"><img className="teaser-img" src={ImgEtoricoxib} alt="Etoricoxib" /></Link>
                    <Link to="/products" aria-label="View Esomeprazole"><img className="teaser-img" src={ImgEsomeprazole} alt="Esomeprazole" /></Link>
                    <Link to="/products" aria-label="View Calcium"><img className="teaser-img" src={ImgCalcium} alt="Calcium" /></Link>
                    <Link to="/products" aria-label="View Clobetasol"><img className="teaser-img" src={ImgClobetasol} alt="Clobetasol" /></Link>
                  </div>
                  {/* duplicate for seamless loop */}
                  <div className="teaser-track" aria-hidden="true">
                    <Link to="/products"><img className="teaser-img" src={ImgAmlodipine} alt="" /></Link>
                    <Link to="/products"><img className="teaser-img" src={ImgAmoxicillin} alt="" /></Link>
                    <Link to="/products"><img className="teaser-img" src={ImgAzithromycin} alt="" /></Link>
                    <Link to="/products"><img className="teaser-img" src={ImgCefixime} alt="" /></Link>
                    <Link to="/products"><img className="teaser-img" src={ImgEtoricoxib} alt="" /></Link>
                    <Link to="/products"><img className="teaser-img" src={ImgEsomeprazole} alt="" /></Link>
                    <Link to="/products"><img className="teaser-img" src={ImgCalcium} alt="" /></Link>
                    <Link to="/products"><img className="teaser-img" src={ImgClobetasol} alt="" /></Link>
                  </div>
                </div>
              </div>
              <Link to="/products" className="teaser-btn" aria-label="Show more products">
                Show more
              </Link>
            </div>
          </section>
          <TherapySection />
          <ManufacturingSection />
          <ResearchSection />
          <ExportSection />
          {/* Products moved to /products */}
          <ContactSection />
          <AboutSection />
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  // Scroll handler: supports hash targets like /#about from any page
  const ScrollHandler = () => {
    const location = useLocation();
    useEffect(() => {
      // If there's a hash, try to scroll to that element after route updates
      if (location.hash) {
        const id = location.hash.replace('#', '');
        // Use a small timeout to allow content to render
        setTimeout(() => {
          const el = document.getElementById(id) || document.querySelector(location.hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 0);
      } else {
        // No hash: scroll to top on route change
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, [location.pathname, location.hash]);
    return null;
  };

  return (
    <HelmetProvider>
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
