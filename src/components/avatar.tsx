import React from 'react';
import { Image, Text, View } from 'react-native';

interface AvatarProps {
  imageUrl?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <View
      className={`${sizeClasses[size]} rounded-full bg-brand-accent items-center justify-center overflow-hidden`}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <Text className={`${textSizeClasses[size]} text-white font-bold`}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};
