import AdvancedLoading from "@/components/advanced-loading";
import type { ErrorBoundaryFallbackProps } from "@/components/error-boundary";
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Logo from "../../assets/images/icon.png";
import "./../styles/global.css";

interface AppLayoutProps {
  children?: React.ReactNode;
}

interface FontLoadState {
  loaded: boolean;
  error: string | null;
  progress: number;
}

const { width, height } = Dimensions.get('window');

// Helper para altura da Status Bar
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

// Componente de Splash Screen
const SplashScreen = () => {
  const fadeAnim = useState(new Animated.Value(1))[0];
  const logoScale = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Animação de fade out do splash
    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });

    // Animação de escala do logo (opcional)
    const scaleDown = Animated.timing(logoScale, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    });

    const sequence = Animated.sequence([
      Animated.delay(1000), // Mostra o splash por 1 segundo
      Animated.parallel([fadeOut, scaleDown])
    ]);

    sequence.start();

    return () => sequence.stop();
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: logoScale }],
        }}
      >
        <Image
          source={Logo}
          style={{
            width: 120,
            height: 96,
          }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const FontErrorFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
  resetError
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 32,
          opacity: fadeAnim
        }}
      >
        <View style={{
          alignItems: 'center',
          padding: 24,
          borderRadius: 20,
          backgroundColor: '#F8FAFC',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
          width: '100%',
          maxWidth: 320
        }}>
          <View style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: '#FEE2E2',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ fontSize: 28, color: '#DC2626' }}>⚠️</Text>
          </View>

          <Text style={{
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 8,
            textAlign: 'center',
            color: '#1F2937'
          }}>
            Erro ao Carregar
          </Text>

          <Text style={{
            textAlign: 'center',
            marginBottom: 24,
            color: '#6B7280',
            fontSize: 15,
            lineHeight: 20
          }}>
            {error?.message || 'Não foi possível carregar as fontes do aplicativo. Verifique sua conexão e tente novamente.'}
          </Text>

          <TouchableOpacity
            onPress={resetError}
            style={{
              backgroundColor: '#3B82F6',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 12,
              minWidth: 140,
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 3
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'center'
            }}>
              Tentar Novamente
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const useAdvancedFontLoader = (): FontLoadState => {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setTimeout(() => setProgress(100), 300);
    } else {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 - prev) * 0.3;
          return Math.min(newProgress, 90);
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [fontsLoaded, fontError]);

  return {
    loaded: !!fontsLoaded,
    error: fontError?.message || null,
    progress,
  };
};

export default function AppLayout() {
  const fontState = useAdvancedFontLoader();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (fontState.loaded) {
      // Mostra o splash por pelo menos 1.5 segundos
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [fontState.loaded]);

  // Mostra splash enquanto fontes não carregaram e showSplash for true
  if (showSplash && !fontState.loaded) {
    return <SplashScreen />;
  }

  if (fontState.error) {
    return <FontErrorFallback error={new Error(fontState.error)} resetError={() => window.location.reload()} />;
  }

  if (!fontState.loaded) {
    return <AdvancedLoading progress={fontState.progress} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        animated={true}
        translucent={false} // Mudado para false
      />
      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF'
      }}>
        {/* Header com padding correto para Status Bar */}
        <View
          style={{
            paddingTop: STATUSBAR_HEIGHT, // Usando a altura calculada
            paddingBottom: 12,
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 1,
            borderBottomColor: '#F1F5F9',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            height: 60 // Altura fixa para o conteúdo do header
          }}>
            <Image
              source={Logo}
              style={{
                width: 120,
                height: 96
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Conteúdo Principal */}
        <View className="bg-slate-50/30" style={{
          flex: 1,
        }}>
          <Slot />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}