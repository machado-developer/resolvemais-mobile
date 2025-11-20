import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { colors } from '@/constants/colors';
import { authService } from '@/services/api';
import { PerfilUsuario } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const RegisterScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      setLoading(true);
      await authService.register({
        nome,
        email,
        telefone,
        senha,
        perfil: PerfilUsuario.CLIENTE,
      });
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.response?.data?.message || 'Erro ao criar conta'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-brand-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-8 pb-6">
            {/* Header */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mb-8"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-white mb-2">
              Criar Conta
            </Text>
            <Text className="text-text-subtitle mb-8">
              Preencha os dados para começar
            </Text>

            {/* Form */}
            <Input
              label="Nome Completo"
              placeholder="Seu nome"
              value={nome}
              onChangeText={setNome}
              leftIcon={
                <Ionicons name="person-outline" size={20} color={colors.text.muted} />
              }
            />

            <Input
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              leftIcon={
                <Ionicons name="mail-outline" size={20} color={colors.text.muted} />
              }
            />

            <Input
              label="Telefone"
              placeholder="+244 900 000 000"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
              leftIcon={
                <Ionicons name="call-outline" size={20} color={colors.text.muted} />
              }
            />

            <Input
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
              leftIcon={
                <Ionicons name="lock-closed-outline" size={20} color={colors.text.muted} />
              }
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.text.muted}
                  />
                </TouchableOpacity>
              }
            />

            <Input
              label="Confirmar Senha"
              placeholder="Digite a senha novamente"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!showPassword}
              leftIcon={
                <Ionicons name="lock-closed-outline" size={20} color={colors.text.muted} />
              }
            />

            <Button
              title="Criar Conta"
              onPress={handleRegister}
              loading={loading}
              fullWidth
            />

            {/* Login Link */}
            <View className="flex-row items-center justify-center gap-2 mt-6">
              <Text className="text-text-subtitle">Já tem uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-button-orange font-bold">
                  Fazer login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
