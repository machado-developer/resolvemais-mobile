/**
 * Constantes da aplicação
 */

export const APP_NAME = 'Resolve+';
export const APP_VERSION = '1.0.0';

// Status de Solicitação
export const SOLICITACAO_STATUS = {
  PENDENTE: 'Pendente',
  VALIDADO: 'Validado',
  REATRIBUIDO: 'Reatribuído',
  ATRIBUIDO: 'Atribuído',
  ACEITO: 'Aceito',
  EM_ANDAMENTO: 'Em Andamento',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
};

// Níveis de Prioridade
export const PRIORIDADE = {
  BAIXA: 'Baixa',
  NORMAL: 'Normal',
  ALTA: 'Alta',
  URGENTE: 'Urgente',
};

// Níveis de Experiência
export const NIVEL_EXPERIENCIA = {
  INICIANTE: 'Iniciante',
  INTERMEDIARIO: 'Intermediário',
  AVANCADO: 'Avançado',
  ESPECIALISTA: 'Especialista',
};

// Disponibilidade
export const DISPONIBILIDADE = {
  DISPONIVEL: 'Disponível',
  OCUPADO: 'Ocupado',
  AUSENTE: 'Ausente',
};

// Perfis de Usuário
export const PERFIL_USUARIO = {
  CLIENTE: 'Cliente',
  CALLCENTER: 'Call Center',
  TECNICO: 'Técnico',
  ADMIN: 'Administrador',
  VENDEDOR: 'Vendedor',
};

// Configurações de Paginação
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

// Timeouts
export const TIMEOUTS = {
  API_REQUEST: 10000,
  DEBOUNCE_SEARCH: 500,
  TOAST_DURATION: 3000,
};

// Limites
export const LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES: 5,
  MIN_PASSWORD_LENGTH: 6,
  MAX_MESSAGE_LENGTH: 500,
  MAX_DESCRIPTION_LENGTH: 1000,
};

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{9}$/,
  NIF: /^[0-9]{14}$/,
};

// Tipos de arquivo aceitos
export const ACCEPTED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png'],
  DOCUMENTS: ['application/pdf', 'application/msword'],
};
