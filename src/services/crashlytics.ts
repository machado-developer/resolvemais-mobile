// services/crashlytics.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CrashReport {
  name: string;
  message: string;
  stack?: string;
  timestamp: number;
  context?: Record<string, any>;
  deviceInfo?: DeviceInfo;
}

interface DeviceInfo {
  platform: string;
  osVersion: string;
  deviceModel: string;
  appVersion: string;
  freeMemory?: number;
}

class CrashlyticsService {
  private enabled: boolean = true;
  private readonly MAX_CRASH_REPORTS = 50;
  private crashReports: CrashReport[] = [];
  private readonly STORAGE_KEY = 'crashlytics_reports';

  constructor() {
    this.setupGlobalErrorHandlers();
    this.loadPersistedReports();
  }

  private setupGlobalErrorHandlers(): void {
    if (!this.enabled) return;

    // React Native Error Handler
    const defaultErrorHandler = ErrorUtils.getGlobalHandler();

    ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
      this.recordError(error, {
        isFatal,
        type: 'global_error',
      });

      // Call original handler
      defaultErrorHandler(error, isFatal);
    });

    // Promise rejection handler
    const defaultPromiseHandler = (global as any).PromiseRejectionHandler;

    (global as any).PromiseRejectionHandler = (error: any) => {
      this.recordError(error, {
        type: 'promise_rejection',
      });

      if (defaultPromiseHandler) {
        defaultPromiseHandler(error);
      }
    };
  }

  async recordError(error: Error, context?: Record<string, any>): Promise<void> {
    if (!this.enabled) return;

    try {
      const deviceInfo = await this.getDeviceInfo();

      const crashReport: CrashReport = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        timestamp: Date.now(),
        context,
        deviceInfo,
      };

      this.crashReports.unshift(crashReport);

      // Keep only the most recent reports
      if (this.crashReports.length > this.MAX_CRASH_REPORTS) {
        this.crashReports = this.crashReports.slice(0, this.MAX_CRASH_REPORTS);
      }

      await this.persistReports();
      await this.sendCrashReport(crashReport);

      console.error('[CRASHLYTICS] Error recorded:', error, context);
    } catch (storageError) {
      console.error('[CRASHLYTICS] Failed to record error:', storageError);
    }
  }

  private async getDeviceInfo(): Promise<DeviceInfo> {
    try {
      const DeviceInfo = await import('react-native-device-info');

      return {
        platform: DeviceInfo.getSystemName(),
        osVersion: DeviceInfo.getSystemVersion(),
        deviceModel: DeviceInfo.getModel(),
        appVersion: DeviceInfo.getVersion(),
        freeMemory: (performance as any).memory?.freeJSHeapSize,
      };
    } catch (error) {
      console.error('[CRASHLYTICS] Failed to get device info:', error);
      return {
        platform: 'unknown',
        osVersion: 'unknown',
        deviceModel: 'unknown',
        appVersion: 'unknown',
      };
    }
  }

  private async sendCrashReport(report: CrashReport): Promise<void> {
    try {
      // Send to your crash reporting service
      await fetch('https://your-crash-reporting-service.com/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
    } catch (error) {
      console.error('[CRASHLYTICS] Failed to send crash report:', error);
    }
  }

  private async persistReports(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.crashReports));
    } catch (error) {
      console.error('[CRASHLYTICS] Failed to persist reports:', error);
    }
  }

  private async loadPersistedReports(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.crashReports = JSON.parse(stored);
      }
    } catch (error) {
      console.error('[CRASHLYTICS] Failed to load persisted reports:', error);
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  getCrashReports(): CrashReport[] {
    return [...this.crashReports];
  }

  async clearCrashReports(): Promise<void> {
    this.crashReports = [];
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('[CRASHLYTICS] Failed to clear crash reports:', error);
    }
  }

  // Log non-fatal issues
  async log(message: string, metadata?: Record<string, any>): Promise<void> {
    const error = new Error(message);
    await this.recordError(error, {
      ...metadata,
      severity: 'log',
    });
  }

  // Log warnings
  async warn(message: string, metadata?: Record<string, any>): Promise<void> {
    const error = new Error(message);
    await this.recordError(error, {
      ...metadata,
      severity: 'warning',
    });
  }

  // Get storage size info
  async getStorageInfo(): Promise<{ count: number; size: number }> {
    const reports = this.getCrashReports();
    const size = JSON.stringify(reports).length;

    return {
      count: reports.length,
      size,
    };
  }

  // Export reports for debugging
  async exportReports(): Promise<string> {
    return JSON.stringify(this.crashReports, null, 2);
  }
}

export const crashlytics = new CrashlyticsService();