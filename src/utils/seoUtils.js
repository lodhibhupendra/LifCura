// SEO Utility Functions
export const generateStructuredData = (type, data) => {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return JSON.stringify(baseStructure);
};

export const createProductStructuredData = (product) => {
  return generateStructuredData("Product", {
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "LifCura"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "LifCura"
    },
    "category": product.category || "Medical Equipment"
  });
};

export const createOrganizationStructuredData = () => {
  return generateStructuredData("Organization", {
    "name": "LifCura",
    "url": "https://lifcura.com",
    "logo": "https://lifcura.com/iconlifcura.png",
    "description": "Leading manufacturer and exporter of high-quality medical products, therapeutic solutions, and healthcare equipment.",
    "foundingDate": "2020",
    "industry": "Healthcare & Medical Equipment",
    "numberOfEmployees": "50-100",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "info@lifcura.com",
        "telephone": "+91-XXXXXXXXXX",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "email": "sales@lifcura.com"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/lifcura",
      "https://twitter.com/lifcura",
      "https://www.facebook.com/lifcura",
      "https://www.instagram.com/lifcura"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Your State",
      "addressLocality": "Your City"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medical Products Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Therapeutic Solutions",
            "category": "Medical Equipment"
          }
        }
      ]
    }
  });
};

// SEO Performance Monitoring
export const trackPageView = (page) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('config', 'GA_TRACKING_ID', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: page
    });
  }
};

// Create FAQ Schema
export const createFAQStructuredData = (faqs) => {
  return generateStructuredData("FAQPage", {
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
};

// Create Breadcrumb Schema
export const createBreadcrumbStructuredData = (breadcrumbs) => {
  return generateStructuredData("BreadcrumbList", {
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });
};

// Meta tag validation
export const validateSEOTags = () => {
  const checks = {
    title: !!document.title && document.title.length > 0 && document.title.length <= 60,
    description: !!document.querySelector('meta[name="description"]')?.content,
    keywords: !!document.querySelector('meta[name="keywords"]')?.content,
    ogTitle: !!document.querySelector('meta[property="og:title"]')?.content,
    ogDescription: !!document.querySelector('meta[property="og:description"]')?.content,
    ogImage: !!document.querySelector('meta[property="og:image"]')?.content,
    canonical: !!document.querySelector('link[rel="canonical"]')?.href
  };
  
  return checks;
};
