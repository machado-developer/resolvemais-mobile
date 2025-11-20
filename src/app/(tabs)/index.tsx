
import { Card } from '@/components/card';
import ServiceCategoryCarousel from '@/components/serviceCategoryCarrosel';
import { CATEGORIAS } from '@/constants/categorias';
import { colors } from '@/constants/colors';
import { categoryService, userService } from '@/services/api';
import { Categoria, Usuario } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 48; // 48 = padding horizontal (24*2)
const CARD_MARGIN = 12;
interface HomeScreenProps {
  navigation: any;
}
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [profissionais, setProfissionais] = useState<Usuario[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userName] = useState('Usuário');
  const router = useRouter();


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [catResponse, profResponse] = await Promise.all([
        categoryService.getAll(),


        userService.getProfissionais({ limit: 5 }),
      ]);

      setCategorias(CATEGORIAS || []);
      setProfissionais(profResponse.data?.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };
  const handleCategoryPress = (category: any) => {
    console.log('Categoria selecionada:', category.name);
    // navegue para a tela de detalhes ou lista de serviços
  };
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-text-inverse text-2xl font-heading">Boas Vindas</Text>

            </View>
            {/* <TouchableOpacity
              onPress={() => router.push('/')}
              className="w-12 h-12 rounded-full bg-white/10 items-center justify-center"
            >
              <Ionicons name="notifications-outline" size={24} color="white" />
              <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-state-error" />
            </TouchableOpacity> */}
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            onPress={() => router.push('/')}
            className="bg-gray-100/80 rounded-2xl px-4 py-4 flex-row items-center border-2 border-white/20"
          >
            <Ionicons name="search" size={20} color={colors.text.muted} />
            <Text className="text-text-muted ml-3 text-base">
              O quê você está precisando?...
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categorias */}
        <View className=" items">
          <View className=" mb-4 items-start justify-center ">
            {/* <View className="flex-row items-center justify-between px-6 mb-4 w-full">
              <Text className="text-gray-700 text-lg font-bold">
                Categorias
              </Text>
              <TouchableOpacity onPress={() => router.push('/')}>
                <Text className="text-gray-800 font-th-semibold underline">
                  ver todas
                </Text>
              </TouchableOpacity>
            </View> */}

            <FlatList
              horizontal
              className='p-4 px-0'
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              data={categorias.slice(0, 10)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  onPress={() => router.push(`/`)}
                  variant="default"
                  className="mr-4 w-32 items-center"
                >
                  <View className="w-16 h-16 rounded-full   items-center justify-center mb-3">
                    <Ionicons
                      name={item.icone as any || 'construct-outline'}
                      size={32}
                      className='bg-gray-50 p-3 rounded-full text-gray-900'
                    />
                  </View>
                  <Text className="text-gray-900 text-sm font-normal text-center">
                    {item.nome}
                  </Text>
                </Card>
              )}
            />
          </View>

        </View>

        <View className="px-6 mb-8">

          <CardDestaqueTecnicos />
        </View>

        <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
          {/* <ServiceCategoryCarousel
            categories={categorias.slice(3, 6)} // exemplo de grupo de categorias
            title="Assistência Técnica"
            onCategoryPress={handleCategoryPress}
            autoPlayInterval={3000}
            showViewAll={true}
            onViewAllPress={() => console.log('Ver todos')}
          /> */}

          {/* Outro bloco */}
          <ServiceCategoryCarousel
            categories={categorias} // exemplo de outro grupo
            title="Serviços Domésticos"
            onCategoryPress={handleCategoryPress}

          />
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-8">
          <Text className="text-gray-700 text-lg font-bold mb-4">
            Ações Rápidas
          </Text>
          <View className="flex-row gap-4">
            <Card
              onPress={() => router.push('/')}
              variant="elevated"
              className="flex-1 items-center py-6"
            >
              <View className="w-12 h-12 rounded-full bg-button-orange items-center justify-center mb-2">
                <Ionicons name="add" size={28} color="white" />
              </View>
              <Text className="text-text-inverse font-semibold text-center">
                Nova Solicitação
              </Text>
            </Card>

            <Card
              onPress={() => router.push('/')}
              variant="elevated"
              className="flex-1 items-center py-6"
            >
              <View className="w-12 h-12 rounded-full bg-brand-accent items-center justify-center mb-2">
                <Ionicons name="document-text-outline" size={28} color="white" />
              </View>
              <Text className="text-text-inverse font-semibold text-center">
                Minhas Solicitações
              </Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const CardDestaqueTecnicos = () => {
  return (
    <View className="rounded-2xl overflow-hidden shadow-xl shadow-blue-500/20 mb-12">
      {/* Gradiente do Facebook */}
      <View
        style={{
          backgroundColor: '#FFC078',
          backgroundImage: 'linear-gradient(135deg, #FFC078 0%, #FFD8A8 50%, #FFA94D 100%)'
        }}
        className="p-6 "
      >        <View className="flex-row justify-between items-center ">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">

              <Text className="text-white font-bold text-xl">
                Encontre Técnicos de Confiança
              </Text>
            </View>

            <Text className="text-white/90 text-sm leading-5 mt-3">
              Conecte-se com profissionais qualificados para suas necessidades.
            </Text>
          </View>

          {/* Botão com círculo branco sutil */}
          <Link href="/" asChild>
            <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center ml-4 active:bg-white/30">
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </View>
          </Link>
        </View>
      </View>

      {/* Efeito de brilho no bottom */}
      <View
        className=''
        style={{
          height: 4,
          backgroundImage: 'linear-gradient(90deg, transparent 0%, #FFFFFF40 50%, transparent 100%)'
        }}
      />
    </View>
  );
}


