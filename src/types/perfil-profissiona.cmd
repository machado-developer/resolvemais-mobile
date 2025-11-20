import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Rating } from '@/components/rating';
import { colors } from '@/constants/colors';
import { avaliacaoService, favoritoService, userService } from '@/services/api';
import "@/types";
import { Avaliacao, Usuario } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export const ProfessionalProfileScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [profissional, setProfissional] = useState<Usuario | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [profResponse, avalResponse] = await Promise.all([
        userService.getProfissionalById(id),
        avaliacaoService.getByProfissional(id),
      ]);
      setProfissional(profResponse.data);
      setAvaliacoes(avalResponse.data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await favoritoService.remove(id);
      } else {
        await favoritoService.add(id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erro ao favoritar:', error);
    }
  };

  const handleCallPhone = () => {
    if (profissional?.telefone) {
      Linking.openURL(`tel:${profissional.telefone}`);
    }
  };

  const handleSendMessage = () => {
    navigation.navigate('Chat', { profissionalId: id });
  };

  if (loading || !profissional) {
    return (
      <View className="flex-1 bg-brand-primary items-center justify-center">
        <Text className="text-white">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brand-primary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header com imagem */}
        <View className="relative">
          <View className="h-48 bg-brand-secondary" />

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            onPress={handleToggleFavorite}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 items-center justify-center"
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? colors.state.error : 'white'}
            />
          </TouchableOpacity>

          {/* Avatar */}
          <View className="absolute bottom-0 left-6 transform translate-y-1/2">
            <Avatar
              imageUrl={profissional.fotoUrl}
              name={profissional.nome}
              size="xl"
            />
            {profissional.disponibilidade === 'DISPONIVEL' && (
              <View className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-state-success border-4 border-brand-primary" />
            )}
          </View>
        </View>

        {/* Profile Info */}
        <View className="px-6 pt-16 pb-6">
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold mb-1">
                {profissional.nome}
              </Text>
              <Text className="text-text-subtitle text-base mb-2">
                {profissional.tituloProfissional || 'Profissional'}
              </Text>
            </View>
          </View>

          {profissional.localizacao && (
            <View className="flex-row items-center mb-3">
              <Ionicons name="location" size={16} color={colors.text.muted} />
              <Text className="text-text-subtitle ml-2">
                {profissional.localizacao}
              </Text>
            </View>
          )}

          {/* Stats */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1">
              <Text className="text-text-muted text-xs mb-1">Avaliação</Text>
              <Rating rating={profissional.avaliacaoMedia || 0} />
            </View>
            <View className="flex-1">
              <Text className="text-text-muted text-xs mb-1">Projetos</Text>
              <Text className="text-white text-lg font-bold">
                {profissional.projetosConcluidos || 0}
              </Text>
            </View>
            {profissional.anoExperiencia && (
              <View className="flex-1">
                <Text className="text-text-muted text-xs mb-1">Experiência</Text>
                <Text className="text-white text-lg font-bold">
                  {profissional.anoExperiencia} anos
                </Text>
              </View>
            )}
          </View>

          {/* Preço */}
          {profissional.precoBase && (
            <Card variant="elevated" className="mb-6">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-text-inverse text-sm mb-1">
                    Preço base
                  </Text>
                  <Text className="text-button-orange text-2xl font-bold">
                    {profissional.precoBase.toLocaleString('pt-AO')} Kz
                  </Text>
                  <Text className="text-text-muted text-xs">por hora</Text>
                </View>
                {profissional.trabalhaRemoto && (
                  <View className="bg-brand-accent/20 px-3 py-2 rounded-lg">
                    <Ionicons name="wifi" size={20} color={colors.button.primary.bg} />
                    <Text className="text-text-inverse text-xs mt-1">Remoto</Text>
                  </View>
                )}
              </View>
            </Card>
          )}

          {/* Sobre */}
          {profissional.sobre && (
            <View className="mb-6">
              <Text className="text-white text-lg font-bold mb-3">Sobre</Text>
              <Text className="text-text-subtitle leading-6">
                {profissional.sobre}
              </Text>
            </View>
          )}

          {/* Habilidades */}
          {profissional.habilidades && (
            <View className="mb-6">
              <Text className="text-white text-lg font-bold mb-3">
                Habilidades
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {profissional.habilidades.split(',').map((skill, index) => (
                  <View
                    key={index}
                    className="bg-white/10 px-3 py-2 rounded-lg border border-white/20"
                  >
                    <Text className="text-text-subtitle text-sm">
                      {skill.trim()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Avaliações */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white text-lg font-bold">
                Avaliações ({avaliacoes.length})
              </Text>
            </View>

            {avaliacoes.slice(0, 3).map((avaliacao) => (
              <Card key={avaliacao.id} variant="outlined" className="mb-3">
                <View className="flex-row items-start mb-2">
                  <Avatar
                    imageUrl={avaliacao.autor?.fotoUrl}
                    name={avaliacao.autor?.nome || avaliacao.autor?.nome}
                    size="sm"
                  />
                  <View className="flex-1 ml-3">
                    <Text className="text-white font-semibold">
                      {avaliacao.autor?.nome || avaliacao.autor?.nome || 'Anônimo'}
                    </Text>
                    <Rating rating={avaliacao.estrelas} showNumber={false} size={14} />
                  </View>
                  <Text className="text-text-muted text-xs">
                    {new Date(avaliacao.criadoEm).toLocaleDateString('pt-AO')}
                  </Text>
                </View>
                {avaliacao.titulo && (
                  <Text className="text-white font-semibold mb-1">
                    {avaliacao.titulo}
                  </Text>
                )}
                {avaliacao.comentario && (
                  <Text className="text-text-subtitle text-sm">
                    {avaliacao.comentario}
                  </Text>
                )}
              </Card>
            ))}

            {avaliacoes.length === 0 && (
              <Text className="text-text-muted text-center py-6">
                Ainda sem avaliações
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View className="gap-3 pb-6">
            <Button
              title="Enviar Mensagem"
              onPress={handleSendMessage}
              icon={<Ionicons name="chatbubble-outline" size={20} color="white" />}
              fullWidth
            />
            <Button
              title="Ligar"
              onPress={handleCallPhone}
              variant="outline"
              icon={<Ionicons name="call-outline" size={20} color="white" />}
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
