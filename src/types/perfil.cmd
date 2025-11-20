import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { colors } from '@/constants/colors';
import { authService, userService } from '@/services/api';
import { Usuario } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const ProfileScreen = ({ navigation }: any) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await userService.getProfile();
      setUsuario(response.data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.logout();
              navigation.replace('Login');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'person-outline',
      label: 'Editar Perfil',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      icon: 'heart-outline',
      label: 'Favoritos',
      onPress: () => navigation.navigate('Favorites'),
    },
    {
      icon: 'document-text-outline',
      label: 'Minhas Solicitações',
      onPress: () => navigation.navigate('MyRequests'),
    },
    {
      icon: 'notifications-outline',
      label: 'Notificações',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      icon: 'settings-outline',
      label: 'Configurações',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      icon: 'help-circle-outline',
      label: 'Ajuda e Suporte',
      onPress: () => navigation.navigate('Support'),
    },
  ];

  if (loading) {
    return (
      <View className="flex-1 bg-brand-primary items-center justify-center">
        <Text className="text-white">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brand-primary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-8 items-center">
          <Avatar
            imageUrl={usuario?.fotoUrl}
            name={usuario?.nome}
            size="xl"
          />
          <Text className="text-white text-2xl font-bold mt-4">
            {usuario?.nome || 'Usuário'}
          </Text>
          {usuario?.email && (
            <Text className="text-text-subtitle mt-1">{usuario.email}</Text>
          )}
          {usuario?.telefone && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="call-outline" size={14} color={colors.text.muted} />
              <Text className="text-text-subtitle ml-2">{usuario.telefone}</Text>
            </View>
          )}
        </View>

        {/* Stats Cards */}
        {usuario?.perfil === 'TECNICO' && (
          <View className="px-6 mb-6">
            <View className="flex-row gap-3">
              <Card variant="elevated" className="flex-1 items-center py-4">
                <Text className="text-button-orange text-2xl font-bold">
                  {usuario.projetosConcluidos || 0}
                </Text>
                <Text className="text-text-inverse text-sm mt-1">Projetos</Text>
              </Card>
              <Card variant="elevated" className="flex-1 items-center py-4">
                <View className="flex-row items-center">
                  <Ionicons name="star" size={20} color="#fbbf24" />
                  <Text className="text-button-orange text-2xl font-bold ml-1">
                    {usuario.avaliacaoMedia?.toFixed(1) || '0.0'}
                  </Text>
                </View>
                <Text className="text-text-inverse text-sm mt-1">Avaliação</Text>
              </Card>
            </View>
          </View>
        )}

        {/* Menu Items */}
        <View className="px-6 pb-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              onPress={item.onPress}
              variant="outlined"
              className="mb-3"
            >
              <View className="flex-row items-center py-2">
                <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={colors.text.subtitle}
                  />
                </View>
                <Text className="text-white text-base ml-4 flex-1">
                  {item.label}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.text.muted}
                />
              </View>
            </Card>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="mt-4"
          >
            <Card variant="outlined" className="border-state-error">
              <View className="flex-row items-center py-2">
                <View className="w-10 h-10 rounded-full bg-state-error/20 items-center justify-center">
                  <Ionicons
                    name="log-out-outline"
                    size={20}
                    color={colors.state.error}
                  />
                </View>
                <Text className="text-state-error text-base ml-4 font-semibold">
                  Sair da Conta
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View className="items-center pb-6">
          <Text className="text-text-muted text-xs">
            Resolve+ v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
