import axios from 'axios';

const API_BASE_URL = 'https://resolvemais.ao/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  async (config: any) => {
    // TODO: Pegar token do AsyncStorage
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // TODO: Redirecionar para login
    }
    return Promise.reject(error);
  }
);

// Serviços de Autenticação
export const authService = {
  login: (email: string, senha: string) =>
    api.post('/auth/login', { email, senha }),

  register: (data: any) =>
    api.post('/auth/register', data),

  logout: () =>
    api.post('/auth/logout'),
};

// Serviços de Usuário
export const userService = {
  getProfile: () =>
    api.get('/usuarios/me'),

  updateProfile: (data: any) =>
    api.put('/usuarios/me', data),

  getProfissionais: (params?: any) =>
    api.get('/tecnicos', { params }),

  getProfissionalById: (id: number) =>
    api.get(`/usuarios/profissionais/${id}`),
};

// Serviços de Categorias
export const categoryService = {
  getAll: () =>
    api.get('/categorias'),


  getById: (id: number) =>
    api.get(`/categorias/${id}`),

  getSubcategorias: (categoriaId: number) =>
    api.get(`/categorias/${categoriaId}/subcategorias`),
};

// Serviços de Solicitações
export const solicitacaoService = {
  getAll: (params?: any) =>
    api.get('/solicitacoes', { params }),

  getById: (id: number) =>
    api.get(`/solicitacoes/${id}`),

  create: (data: any) =>
    api.post('/solicitacoes', data),

  update: (id: number, data: any) =>
    api.put(`/solicitacoes/${id}`, data),

  cancel: (id: number) =>
    api.put(`/solicitacoes/${id}/cancelar`),
};

// Serviços de Avaliações
export const avaliacaoService = {
  getByProfissional: (tecnicoId: number) =>
    api.get(`/avaliacoes/profissional/${tecnicoId}`),

  create: (data: any) =>
    api.post('/avaliacoes', data),
};

// Serviços de Mensagens
export const mensagemService = {
  getConversas: () =>
    api.get('/conversas'),

  getConversa: (id: number) =>
    api.get(`/conversas/${id}`),

  sendMessage: (conversaId: number, conteudo: string) =>
    api.post(`/conversas/${conversaId}/mensagens`, { conteudo }),
};

// Serviços de Favoritos
export const favoritoService = {
  getAll: () =>
    api.get('/favoritos'),

  add: (profissionalId: number) =>
    api.post('/favoritos', { profissionalId }),

  remove: (profissionalId: number) =>
    api.delete(`/favoritos/${profissionalId}`),
};

// Serviços de Artigos
export const artigoService = {
  getAll: (params?: any) =>
    api.get('/artigos', { params }),

  getById: (id: number) =>
    api.get(`/artigos/${id}`),
};

// Serviços de Notificações
export const notificacaoService = {
  getAll: () =>
    api.get('/notificacoes'),

  markAsRead: (id: number) =>
    api.put(`/notificacoes/${id}/ler`),

  markAllAsRead: () =>
    api.put('/notificacoes/ler-todas'),
};
