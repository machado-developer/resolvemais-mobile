/**
 * Utilitários para formatação de dados
 */

/**
 * Formata um número como moeda angolana
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
  }).format(value);
};

/**
 * Formata um número de telefone
 */
export const formatPhone = (phone: string): string => {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');

  // Formata como +244 XXX XXX XXX
  if (cleaned.length === 9) {
    return `+244 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }

  return phone;
};

/**
 * Formata uma data
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-AO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
};

/**
 * Formata data e hora
 */
export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-AO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

/**
 * Retorna o tempo relativo (ex: "há 2 horas")
 */
export const timeAgo = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const intervals = {
    ano: 31536000,
    mês: 2592000,
    semana: 604800,
    dia: 86400,
    hora: 3600,
    minuto: 60,
  };

  for (const [name, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `há ${interval} ${name}${interval > 1 ? 's' : ''}`;
    }
  }

  return 'agora mesmo';
};

/**
 * Trunca texto com ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Valida email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida telefone angolano
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 9 || cleaned.length === 12;
};

/**
 * Valida NIF angolano
 */
export const isValidNIF = (nif: string): boolean => {
  const cleaned = nif.replace(/\D/g, '');
  return cleaned.length === 14;
};
