import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface RatingProps {
  rating: number;
  total?: number;
  size?: number;
  showNumber?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  total,
  size = 16,
  showNumber = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <View className="flex-row items-center gap-1">
      <View className="flex-row">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <Ionicons
                key={index}
                name="star"
                size={size}
                color="#fbbf24"
              />
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <Ionicons
                key={index}
                name="star-half"
                size={size}
                color="#fbbf24"
              />
            );
          } else {
            return (
              <Ionicons
                key={index}
                name="star-outline"
                size={size}
                color={colors.text.muted}
              />
            );
          }
        })}
      </View>
      {showNumber && (
        <Text className="text-text-subtitle text-sm font-medium ml-1">
          {rating.toFixed(1)}
          {total && <Text className="text-text-muted"> ({total})</Text>}
        </Text>
      )}
    </View>
  );
};
