// components/ServiceCategoryCarousel.tsx
import type { Categoria } from '@/types';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Category {
  id: string;
  name: string;
  image: any;
}

interface ServiceCategoryCarouselProps {
  categories: Categoria[];
  title: string;
  onCategoryPress: (category: Categoria) => void;
}

const ServiceCategoryCarousel: React.FC<ServiceCategoryCarouselProps> = ({
  categories = [],
  title,
  onCategoryPress,
}) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, paddingHorizontal: 16 }}>
        {title}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={{
              marginHorizontal: 8,
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 15,
              alignItems: 'center',
              minWidth: 120,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => onCategoryPress(category)}
          >
            <Image
              source={category.imagemDestaque || require('../../assets/images/icon.png')}
              style={{ width: 50, height: 50, marginBottom: 8 }}
            />
            <Text style={{ fontSize: 14, fontWeight: '500', textAlign: 'center' }}>
              {category.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ServiceCategoryCarousel;