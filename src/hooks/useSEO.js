import { useEffect } from 'react';
import { createOrganizationStructuredData, createBreadcrumbStructuredData, validateSEOTags } from '../utils/seoUtils';

export const useSEO = (seoConfig) => {
  useEffect(() => {
    // Inject organization structured data
    const orgData = createOrganizationStructuredData();
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.textContent = orgData;
    orgScript.id = 'org-structured-data';
    
    // Remove existing org data if present
    const existingOrgScript = document.getElementById('org-structured-data');
    if (existingOrgScript) {
      existingOrgScript.remove();
    }
    
    document.head.appendChild(orgScript);
    
    // Inject breadcrumb data if provided
    if (seoConfig?.breadcrumbs) {
      const breadcrumbData = createBreadcrumbStructuredData(seoConfig.breadcrumbs);
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.textContent = breadcrumbData;
      breadcrumbScript.id = 'breadcrumb-structured-data';
      
      // Remove existing breadcrumb data if present
      const existingBreadcrumbScript = document.getElementById('breadcrumb-structured-data');
      if (existingBreadcrumbScript) {
        existingBreadcrumbScript.remove();
      }
      
      document.head.appendChild(breadcrumbScript);
    }
    
    // Validate SEO tags in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        const validation = validateSEOTags();
        console.log('SEO Validation Results:', validation);
        
        // Warn about missing or suboptimal tags
        Object.entries(validation).forEach(([key, isValid]) => {
          if (!isValid) {
            console.warn(`SEO Warning: ${key} is missing or invalid`);
          }
        });
      }, 1000);
    }
    
    // Cleanup function
    return () => {
      const orgScript = document.getElementById('org-structured-data');
      const breadcrumbScript = document.getElementById('breadcrumb-structured-data');
      if (orgScript) orgScript.remove();
      if (breadcrumbScript) breadcrumbScript.remove();
    };
  }, [seoConfig]);
};

export default useSEO;
