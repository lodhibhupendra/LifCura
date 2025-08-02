import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const WebVitalsTracker = () => {
  useEffect(() => {
    // Track Core Web Vitals
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }, []);

  const sendToAnalytics = (metric) => {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
      
      // Provide performance recommendations
      if (metric.name === 'LCP' && metric.value > 2500) {
        console.warn('⚠️ LCP is slow. Consider optimizing images and server response times.');
      }
      if (metric.name === 'FID' && metric.value > 100) {
        console.warn('⚠️ FID is high. Consider reducing JavaScript execution time.');
      }
      if (metric.name === 'CLS' && metric.value > 0.1) {
        console.warn('⚠️ CLS is high. Check for layout shifts in images and ads.');
      }
    }
  };

  return null; // This component doesn't render anything
};

export default WebVitalsTracker;
