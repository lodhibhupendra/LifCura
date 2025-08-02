import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOOptimizer = ({ 
  title = "LifCura - Premium Medical Products & Healthcare Solutions",
  description = "LifCura - Leading manufacturer and exporter of high-quality medical products, therapeutic solutions, and healthcare equipment. Trusted by healthcare professionals worldwide.",
  keywords = "medical products, healthcare, therapeutic solutions, medical equipment, pharmaceuticals, LifCura, medical manufacturing, healthcare export",
  image = "https://lifcura.com/iconlifcura.png",
  url = "https://lifcura.com",
  type = "website",
  structuredData = null,
  breadcrumbs = null,
  article = null
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
      
      {/* Enhanced SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#1a936f" />
      <meta name="msapplication-TileColor" content="#1a936f" />
      
      {/* Article-specific meta tags */}
      {article && (
        <>
          <meta property="article:author" content={article.author} />
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:section" content={article.section} />
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {structuredData}
        </script>
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbs && (
        <script type="application/ld+json">
          {breadcrumbs}
        </script>
      )}
    </Helmet>
  );
};

export default SEOOptimizer;
