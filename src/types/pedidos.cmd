import { Card } from '@/components/card';
import { StatusBadge } from '@/components/statusBadge';
import { colors } from '@/constants/colors';
import { solicitacaoService } from '@/services/api';
import { SolicitacaoServico, SolicitacaoStatus } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MyRequestsScreen = ({ navigation }: any) => {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoServico[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'all' | SolicitacaoStatus>('all');

  useEffect(() => {
    loadSolicitacoes();
  }, [selectedTab]);

  const loadSolicitacoes = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (selectedTab !== 'all') {
        params.status = selectedTab;
      }
      const response = await solicitacaoService.getAll(params);
      setSolicitacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { label: 'Todas', value: 'all' },
    { label: 'Pendentes', value: SolicitacaoStatus.PENDENTE },
    { label: 'Em Andamento', value: SolicitacaoStatus.EM_ANDAMENTO },
    { label: 'Concluídas', value: SolicitacaoStatus.CONCLUIDO },
  ];

  const getPriorityIcon = (prioridade: string) => {
    switch (prioridade) {
      case 'URGENTE':
        return { name: 'alert-circle', color: colors.state.error };
      case 'ALTA':
        return { name: 'alert', color: colors.state.warning };
      default:
        return { name: 'information-circle-outline', color: colors.text.muted };
    }
  };

  return (
    <View className="flex-1 bg-brand-primary">
      {/* Header */}
      <View className="px-6 pt-4 pb-4 border-b border-white/10">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-2xl font-bold">
            Minhas Solicitações
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewRequest')}
            className="w-10 h-10 rounded-full bg-button-orange items-center justify-center"
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tabs}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTab(item.value as any)}
              className={`px-4 py-2 rounded-full mr-3 ${selectedTab === item.value
                ? 'bg-button-orange'
                : 'bg-white/10 border border-white/20'
                }`}
            >
              <Text
                className={`font-semibold ${selectedTab === item.value
                  ? 'text-white'
                  : 'text-text-subtitle'
                  }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* List */}
      <FlatList
        className="flex-1 px-6 pt-4"
        data={solicitacoes}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadSolicitacoes}
            tintColor={colors.text.title}
          />
        }
        renderItem={({ item }) => {
          const priorityIcon = getPriorityIcon(item.prioridade);

          return (
            <Card
              onPress={() =>
                navigation.navigate('RequestDetail', { id: item.id })
              }
              variant="outlined"
              className="mb-4"
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1 mr-2">
                  <Text className="text-white font-bold text-base mb-1">
                    {item.servico}
                  </Text>
                  <Text className="text-text-muted text-xs">
                    Ref: {item.referencia}
                  </Text>
                </View>
                <StatusBadge status={item.status} />
              </View>

              {/* Beneficiário */}
              <View className="flex-row items-center mb-2">
                <Ionicons
                  name="person-outline"
                  size={14}
                  color={colors.text.muted}
                />
                <Text className="text-text-subtitle text-sm ml-2">
                  {item.nomeBeneficiario}
                </Text>
              </View>

              {/* Endereço */}
              {item.endereco && (
                <View className="flex-row items-center mb-2">
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={colors.text.muted}
                  />
                  <Text className="text-text-subtitle text-sm ml-2 flex-1">
                    {item.endereco}
                  </Text>
                </View>
              )}

              {/* Footer */}
              <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-white/10">
                <View className="flex-row items-center">
                  <Ionicons
                    name={priorityIcon.name as any}
                    size={16}
                    color={priorityIcon.color}
                  />
                  <Text
                    className="text-sm ml-1 font-semibold"
                    style={{ color: priorityIcon.color }}
                  >
                    {item.prioridade}
                  </Text>
                </View>
                <Text className="text-text-muted text-xs">
                  {new Date(item.criadoEm).toLocaleDateString('pt-AO')}
                </Text>
              </View>
            </Card>
          );
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Ionicons
              name="document-text-outline"
              size={64}
              color={colors.text.muted}
            />
            <Text className="text-text-muted text-center mt-4">
              Nenhuma solicitação encontrada
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('NewRequest')}
              className="mt-4"
            >
              <Text className="text-button-orange font-bold">
                Criar primeira solicitação
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default MyRequestsScreen;
