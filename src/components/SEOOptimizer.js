import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOOptimizer = ({ 
  title = "LifCura - Premium Medical Products & Healthcare Solutions",
  description = "LifCura - Leading manufacturer and exporter of high-quality medical products, therapeutic solutions, and healthcare equipment. Trusted by healthcare professionals worldwide.",
  keywords = "medical products, healthcare, therapeutic solutions, medical equipment, pharmaceuticals, LifCura, medical manufacturing, healthcare export",
  image = "https://lifcura.com/iconlifcura.png",
  url = "https://lifcura.com",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="LifCura" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="LifCura" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Helmet>
  );
};

export default SEOOptimizer;
