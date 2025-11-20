import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
  className = '',
}) => {
  const getCardStyle = () => {
    const baseStyle = 'rounded-2xl p-4';

    switch (variant) {
      case 'elevated':
        return `${baseStyle} bg-white shadow-lg`;
      case 'outlined':
        return `${baseStyle} bg-transparent border-2 border-white/20`;
      case 'default':
      default:
        return `${baseStyle} bg-white/10`;
    }
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      className={`${getCardStyle()} ${className}`}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {children}
    </Container>
  );
};
