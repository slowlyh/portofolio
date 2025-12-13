// Performance monitoring utilities
export const performanceMetrics = {
  // Measure page load performance
  measurePageLoad: () => {
    if (typeof window !== 'undefined') {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      };
    }
    return null;
  },

  // Measure Core Web Vitals
  measureCoreWebVitals: () => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(null);
        return;
      }

      const vitals = {
        lcp: 0, // Largest Contentful Paint
        fid: 0, // First Input Delay
        cls: 0, // Cumulative Layout Shift
      };

      // Measure LCP
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.lcp = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Measure FID
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          vitals.fid = entry.processingStart - entry.startTime;
        });
      }).observe({ entryTypes: ['first-input'] });

      // Measure CLS
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        vitals.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });

      // Resolve after a short delay to allow measurements
      setTimeout(() => resolve(vitals), 3000);
    });
  },

  // Log performance metrics
  logMetrics: async () => {
    const pageLoad = performanceMetrics.measurePageLoad();
    const coreVitals = await performanceMetrics.measureCoreWebVitals();

    console.group('🚀 Performance Metrics');
    if (pageLoad) {
      console.log('Page Load Times:', pageLoad);
    }
    if (coreVitals) {
      console.log('Core Web Vitals:', coreVitals);
    }
    console.groupEnd();

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Send metrics to your analytics service
      // analytics.track('performance_metrics', { pageLoad, coreVitals });
    }
  },
};

// Intersection Observer for lazy loading optimization
export const createIntersectionObserver = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Resource loading optimization
export const preloadResource = (href: string, as: string) => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

export const prefetchResource = (href: string) => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};