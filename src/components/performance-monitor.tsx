// components/performance-monitor.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

interface PerformanceMonitorProps {
  showInitially?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showInitially = false
}) => {
  const [isVisible, setIsVisible] = useState(showInitially);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastFpsUpdate = useRef(Date.now());

  useEffect(() => {
    // FPS counter
    const fpsInterval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastFpsUpdate.current;

      if (delta >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / delta));
        frameCount.current = 0;
        lastFpsUpdate.current = now;
      }

      frameCount.current++;
    }, 16);

    // Listen for performance metrics
    const messageHandler = (event: any) => {
      if (event.data?.type === 'PERFORMANCE_METRIC') {
        setMetrics(prev => [...prev.slice(-49), event.data.metric]);
      }
    };

    // @ts-ignore
    const originalConsoleLog = console.log;
    // @ts-ignore
    console.log = (...args) => {
      originalConsoleLog.apply(console, args);
      // Capture performance related logs
      if (args[0]?.includes?.('[PERF]')) {
        const metric: PerformanceMetric = {
          name: args[1],
          duration: args[2],
          timestamp: Date.now()
        };
        setMetrics(prev => [...prev.slice(-49), metric]);
      }
    };

    return () => {
      clearInterval(fpsInterval);
      // @ts-ignore
      console.log = originalConsoleLog;
    };
  }, []);

  const clearMetrics = () => setMetrics([]);

  const getPerformanceColor = (fps: number) => {
    if (fps >= 55) return '#10B981'; // green
    if (fps >= 45) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  if (!isVisible) {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 50,
          right: 10,
          backgroundColor: '#3B82F6',
          padding: 8,
          borderRadius: 20,
          zIndex: 9999,
        }}
        onPress={() => setIsVisible(true)}
      >
        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
          PERF
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        zIndex: 9999,
        maxWidth: 300,
        maxHeight: 400,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Performance Monitor</Text>
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Text style={{ color: 'white', fontSize: 16 }}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: getPerformanceColor(fps), fontSize: 12 }}>
          FPS: {fps}
        </Text>
        <Text style={{ color: 'white', fontSize: 12 }}>
          Metrics: {metrics.length}
        </Text>
        <Text style={{ color: 'white', fontSize: 12 }}>
          Memory: {Math.round((performance as any).memory?.usedJSHeapSize / 1048576) || 0}MB
        </Text>
      </View>

      <ScrollView style={{ maxHeight: 300 }}>
        {metrics.slice().reverse().map((metric, index) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 4 }}>
            <Text style={{ color: '#93C5FD', fontSize: 10, flex: 2 }}>
              {metric.name}
            </Text>
            <Text style={{
              color: metric.duration > 100 ? '#EF4444' : '#10B981',
              fontSize: 10,
              flex: 1,
              textAlign: 'right'
            }}>
              {metric.duration}ms
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={clearMetrics}
        style={{
          backgroundColor: '#6B7280',
          padding: 6,
          borderRadius: 4,
          marginTop: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 10 }}>Clear Metrics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PerformanceMonitor;