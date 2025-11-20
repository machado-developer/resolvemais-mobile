// components/network-status.tsx
import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';

interface NetworkStatusProps {
  showOfflineOnly?: boolean;
}

type ConnectionType = NetInfoStateType | 'unknown';
const NetworkStatus: React.FC<NetworkStatusProps> = ({
  showOfflineOnly = true
}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [connectionType, setConnectionType] = useState<ConnectionType>('unknown');
  const [isVisible, setIsVisible] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const connected = state.isConnected ?? false;
      setIsConnected(connected);
      setConnectionType(state.type);

      // Update React Query online manager
      onlineManager.setOnline(connected);

      // Show/hide banner based on connection status
      if (!connected) {
        showBanner();
      } else if (connected && isVisible) {
        hideBanner();
      }
    });

    return () => unsubscribe();
  }, [isVisible]);

  const showBanner = () => {
    setIsVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideBanner = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  };

  const getStatusColor = () => {
    if (isConnected === null) return '#6B7280'; // gray
    return isConnected ? '#10B981' : '#EF4444'; // green : red
  };

  const getStatusText = () => {
    if (isConnected === null) return 'Verificando conexão...';
    if (!isConnected) return 'Sem conexão com a internet';

    switch (connectionType) {
      case 'wifi':
        return 'Conectado via Wi-Fi';
      case 'cellular':
        return 'Conectado via Dados Móveis';
      case 'ethernet':
        return 'Conectado via Ethernet';
      default:
        return 'Conectado à internet';
    }
  };

  if (showOfflineOnly && isConnected && isVisible) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: getStatusColor(),
        padding: 12,
        zIndex: 9998,
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            }),
          },
        ],
      }}
    >
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 14,
        }}
      >
        {getStatusText()}
      </Text>

      {!isConnected && (
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 12,
            marginTop: 4,
            opacity: 0.9,
          }}
        >
          Algumas funcionalidades podem estar indisponíveis
        </Text>
      )}
    </Animated.View>
  );
};

export default NetworkStatus;