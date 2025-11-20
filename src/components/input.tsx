import { colors } from '@/constants/colors';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  error,
  leftIcon,
  rightIcon,
}) => {
  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-text-subtitle text-sm font-medium mb-2">
          {label}
        </Text>
      )}
      <View className="relative">
        <View className="flex-row items-center bg-white/10 rounded-xl border-2 border-white/20 px-4 py-3">
          {leftIcon && <View className="mr-3">{leftIcon}</View>}
          <TextInput
            className={`flex-1 text-white text-base ${multiline ? 'min-h-[100px]' : ''}`}
            placeholder={placeholder}
            placeholderTextColor={colors.text.muted}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={multiline ? 'top' : 'center'}
          />
          {rightIcon && <View className="ml-3">{rightIcon}</View>}
        </View>
      </View>
      {error && (
        <Text className="text-state-error text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};
