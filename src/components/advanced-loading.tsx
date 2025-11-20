// components/advanced-loading.tsx
import { MotiView } from 'moti';
import React from 'react';
import { Animated, Easing, Text, View } from 'react-native';

interface AdvancedLoadingProps {
  progress?: number;
  message?: string;
  showAnimation?: boolean;
}

const AdvancedLoading: React.FC<AdvancedLoadingProps> = ({
  progress = 0,
  message = 'Carregando...',
  showAnimation = true,
}) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (showAnimation) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [showAnimation]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      {showAnimation && (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <MotiView
            from={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'timing', duration: 1000, loop: true }}
            style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#3B82F6' }}
          />
        </Animated.View>
      )}

      <Text style={{ marginTop: 20, fontSize: 16, color: '#374151' }}>
        {message}
      </Text>

      {progress > 0 && (
        <View style={{ width: 200, height: 4, backgroundColor: '#E5E7EB', marginTop: 20, borderRadius: 2 }}>
          <View
            style={{
              width: `${progress}%`,
              height: 4,
              backgroundColor: '#10B981',
              borderRadius: 2,
            }}
          />
        </View>
      )}

      <Text style={{ marginTop: 8, fontSize: 12, color: '#6B7280' }}>
        {progress}% concluído
      </Text>
    </View>
  );
};

export default AdvancedLoading;