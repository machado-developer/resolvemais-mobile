// services/performance.ts
interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface PerformanceConfig {
  enabled: boolean;
  sampleRate: number;
  maxMetrics: number;
  longTaskThreshold: number;
}

class PerformanceMonitorService {
  private config: PerformanceConfig = {
    enabled: true,
    sampleRate: 1.0, // 100%
    maxMetrics: 1000,
    longTaskThreshold: 100, // milliseconds
  };

  private metrics: PerformanceMetric[] = [];
  private measurements: Map<string, number> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor() {
    this.setupPerformanceObservers();
  }

  private setupPerformanceObservers(): void {
    if (!this.config.enabled || !this.shouldSample()) return;

    try {
      // Long Task Observer (if available)
      if (typeof PerformanceObserver !== 'undefined') {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.recordMetric('long_task', entry.duration, {
              entryType: entry.entryType,
              startTime: entry.startTime,
            });
          });
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.set('longtask', longTaskObserver);
      }

      // Navigation Timing (if available)
      if (typeof performance !== 'undefined' && performance.getEntriesByType) {
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0] as any;
          this.recordMetric('navigation_load', navEntry.loadEventEnd - navEntry.loadEventStart);
          this.recordMetric('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
        }
      }
    } catch (error) {
      console.warn('[PERFORMANCE] Could not setup all performance observers:', error);
    }
  }

  startMeasurement(name: string): void {
    if (!this.config.enabled || !this.shouldSample()) return;

    this.measurements.set(name, performance.now());
  }

  endMeasurement(name: string, metadata?: Record<string, any>): number {
    if (!this.config.enabled || !this.shouldSample()) return 0;

    const startTime = this.measurements.get(name);
    if (!startTime) return 0;

    const duration = performance.now() - startTime;
    this.measurements.delete(name);

    this.recordMetric(name, duration, metadata);

    // Log long tasks
    if (duration > this.config.longTaskThreshold) {
      console.warn(`[PERFORMANCE] Long task detected: ${name} took ${duration}ms`);
    }

    return duration;
  }

  recordMetric(name: string, duration: number, metadata?: Record<string, any>): void {
    if (!this.config.enabled || !this.shouldSample()) return;

    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.unshift(metric);

    // Keep metrics under limit
    if (this.metrics.length > this.config.maxMetrics) {
      this.metrics = this.metrics.slice(0, this.config.maxMetrics);
    }

    // Send to analytics
    // analytics.logPerformance(name, duration, metadata);

    console.log(`[PERF] ${name}`, duration, metadata);
  }

  private shouldSample(): boolean {
    return Math.random() < this.config.sampleRate;
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name);
  }

  getAverageDuration(name: string): number {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;

    const total = metrics.reduce((sum, metric) => sum + metric.duration, 0);
    return total / metrics.length;
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  setConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // React Component Render Tracking
  trackComponentRender(componentName: string): () => void {
    const startTime = performance.now();

    return () => {
      const duration = performance.now() - startTime;
      this.recordMetric(`component_render_${componentName}`, duration);
    };
  }

  // API Call Tracking
  trackApiCall(apiName: string): () => void {
    const startTime = performance.now();

    return () => {
      const duration = performance.now() - startTime;
      this.recordMetric(`api_call_${apiName}`, duration);
    };
  }

  // Memory monitoring
  getMemoryInfo(): { used: number; total: number; limit: number } | null {
    if ((performance as any).memory) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  }

  // Cleanup
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

export const performanceMonitor = new PerformanceMonitorService();