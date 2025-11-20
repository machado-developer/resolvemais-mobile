import { colors } from '@/constants/colors';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle = 'py-4 px-6 rounded-xl flex-row items-center justify-center';

    if (disabled) {
      return `${baseStyle} bg-gray-400`;
    }

    switch (variant) {
      case 'primary':
        return `${baseStyle} bg-button-orange`;
      case 'secondary':
        return `${baseStyle} bg-brand-secondary`;
      case 'outline':
        return `${baseStyle} bg-transparent border-2 border-white/30`;
      default:
        return `${baseStyle} bg-button-orange`;
    }
  };

  const getTextStyle = () => {
    return 'text-white text-base font-bold';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${getButtonStyle()} ${fullWidth ? 'w-full' : ''}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.text.title} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && <View>{icon}</View>}
          <Text className={getTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
