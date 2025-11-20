import { colors } from '@/constants/colors';
import { SolicitacaoStatus } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';

interface StatusBadgeProps {
  status: SolicitacaoStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case SolicitacaoStatus.PENDENTE:
        return {
          label: 'Pendente',
          color: colors.state.warning,
          bgColor: 'rgba(234, 179, 8, 0.1)',
        };
      case SolicitacaoStatus.VALIDADO:
        return {
          label: 'Validado',
          color: colors.state.info,
          bgColor: 'rgba(59, 130, 246, 0.1)',
        };
      case SolicitacaoStatus.ATRIBUIDO:
      case SolicitacaoStatus.ACEITO:
        return {
          label: status === SolicitacaoStatus.ATRIBUIDO ? 'Atribuído' : 'Aceito',
          color: colors.state.info,
          bgColor: 'rgba(59, 130, 246, 0.1)',
        };
      case SolicitacaoStatus.EM_ANDAMENTO:
        return {
          label: 'Em Andamento',
          color: colors.button.primary.bg,
          bgColor: 'rgba(249, 115, 22, 0.1)',
        };
      case SolicitacaoStatus.CONCLUIDO:
        return {
          label: 'Concluído',
          color: colors.state.success,
          bgColor: 'rgba(34, 197, 94, 0.1)',
        };
      case SolicitacaoStatus.CANCELADO:
        return {
          label: 'Cancelado',
          color: colors.state.error,
          bgColor: 'rgba(239, 68, 68, 0.1)',
        };
      default:
        return {
          label: status,
          color: colors.text.muted,
          bgColor: 'rgba(156, 163, 175, 0.1)',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View
      className="px-3 py-1 rounded-full self-start"
      style={{ backgroundColor: config.bgColor }}
    >
      <Text
        className="text-xs font-semibold"
        style={{ color: config.color }}
      >
        {config.label}
      </Text>
    </View>
  );
};
