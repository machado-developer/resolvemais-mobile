import { LinearGradient } from 'expo-linear-gradient';
import {
  Building2,
  CheckCircle2,
  Play,
  Search,
  UserCog,
  Users,
  X
} from 'lucide-react-native';
import { MotiView } from 'moti';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Componente para contagem animada
function Counter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start();

    animatedValue.addListener(({ value }) => {
      setCount(Math.floor(value * value));
    });

    return () => animatedValue.removeAllListeners();
  }, []);

  return <Text style={styles.counterText}>{count.toLocaleString()}+</Text>;
}

// Componente de card de estatística
function StatCard({ number, label, icon: Icon, delay }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 30, scale: 0.9 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'timing', duration: 600, delay }}
      style={styles.statCard}
    >
      <View style={styles.statHeader}>
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          style={styles.statIcon}
        >
          <Icon size={20} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.statNumber}>
          <Counter value={number} />
        </Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </MotiView>
  );
}

export default function Hero() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    "Design de Sites",
    "Instalação de Fibra Óptica",
    "Consultoria Empresarial",
    "Cursos de Programação",
    "Marketing Digital",
    "Manutenção de Computadores",
  ];

  const filtered = suggestions.filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const stats = [
    { number: 10000, label: "Profissionais Ativos", icon: Users, delay: 100 },
    { number: 5000, label: "Empresas Parceiras", icon: Building2, delay: 200 },
    { number: 50000, label: "Serviços Realizados", icon: CheckCircle2, delay: 300 },
  ];

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0A3D62', '#1E5A8A', '#2D7BB5']}
        style={styles.background}
      />

      {/* Floating Elements */}
      <View style={styles.floatingCircle1} />
      <View style={styles.floatingCircle2} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header Section */}
          <MotiView
            from={{ opacity: 0, translateX: -30 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            style={styles.headerSection}
          >
            {/* Badge */}
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 200, duration: 500 }}
              style={styles.badge}
            >
              <CheckCircle2 size={14} color="#F97316" />
              <Text style={styles.badgeText}>Plataforma Verificada</Text>
            </MotiView>

            {/* Main Title */}
            <Text style={styles.title}>
              Conectamos{' '}
              <Text style={styles.highlight}>Famílias</Text>
              {' '}e{' '}
              <Text style={styles.highlight}>Empresas</Text>
              {' '}a{' '}
              <Text style={styles.highlight}>Técnicos</Text>
              {' '}que{' '}
              <Text style={styles.highlight}>Resolvem +</Text>
            </Text>

            <Text style={styles.subtitle}>
              Serviços rápidos, confiáveis e soluções completas para sua casa ou
              empresa. Conectamos você aos melhores profissionais do mercado.
            </Text>
          </MotiView>

          {/* Search Bar - Estilo Alibaba */}
          <View style={styles.searchSection}>
            <MotiView
              animate={{
                borderColor: isFocused ? '#F97316' : 'rgba(255,255,255,0.3)',
                backgroundColor: isFocused ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
              }}
              transition={{ type: 'timing', duration: 300 }}
              style={styles.searchContainer}
            >
              <Search size={20} color={isFocused ? '#F97316' : 'rgba(255,255,255,0.7)'} />
              <TextInput
                style={styles.searchInput}
                placeholder="O que você precisa hoje?"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={query}
                onChangeText={setQuery}
                onFocus={() => {
                  setIsFocused(true);
                  setShowSuggestions(true);
                }}
                onBlur={() => setIsFocused(false)}
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                  <X size={16} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
              )}
            </MotiView>

            {/* Search Suggestions */}
            {showSuggestions && filtered.length > 0 && (
              <MotiView
                from={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                style={styles.suggestionsContainer}
              >
                {filtered.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => {
                      setQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search size={16} color="rgba(255,255,255,0.6)" />
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </MotiView>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <MotiView
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TouchableOpacity style={styles.primaryButton}>
                <Users size={16} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Nossos Serviços</Text>
                <Play size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </MotiView>

            <View style={styles.secondaryButtons}>
              <MotiView
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TouchableOpacity style={styles.secondaryButton}>
                  <UserCog size={16} color="#FFFFFF" />
                  <Text style={styles.secondaryButtonText}>Torne-se Técnico</Text>
                </TouchableOpacity>
              </MotiView>

              <MotiView
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TouchableOpacity style={styles.secondaryButton}>
                  <Building2 size={16} color="#FFFFFF" />
                  <Text style={styles.secondaryButtonText}>Torne-se Parceiro</Text>
                </TouchableOpacity>
              </MotiView>
            </View>
          </View>

          {/* Statistics */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 600, duration: 500 }}
            style={styles.statsContainer}
          >
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                number={stat.number}
                label={stat.label}
                icon={stat.icon}
                delay={stat.delay}
              />
            ))}
          </MotiView>

          {/* Hero Image */}
          <MotiView
            from={{ opacity: 0, translateX: 30 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 600, delay: 200 }}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: '/assets/img/hero.svg' }}
              style={styles.heroImage}
              resizeMode="contain"
            />

            {/* Badge sobre a imagem */}
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 800, duration: 500 }}
              style={styles.imageBadge}
            >
              <Text style={styles.imageBadgeText}>100% Digital</Text>
            </MotiView>
          </MotiView>
        </View>
      </ScrollView>

      {/* Orange Bar at Bottom */}
      <LinearGradient
        colors={['#F97316', '#EA580C']}
        style={styles.orangeBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A3D62',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  floatingCircle1: {
    position: 'absolute',
    top: 80,
    left: 40,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderRadius: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#F97316',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  floatingCircle2: {
    position: 'absolute',
    bottom: 100,
    right: 40,
    width: 120,
    height: 120,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 60,
    ...Platform.select({
      ios: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    backdropFilter: 'blur(10px)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },
  highlight: {
    color: '#F97316',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  searchSection: {
    marginBottom: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
    marginRight: 8,
  },
  clearButton: {
    padding: 4,
  },
  suggestionsContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    marginTop: 8,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  suggestionText: {
    color: '#374151',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F97316',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#F97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: width * 0.8,
    height: 200,
  },
  imageBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#F97316',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  imageBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  orangeBar: {
    height: 6,
    width: '100%',
    transform: [{ skewY: '-2deg' }],
  },
});