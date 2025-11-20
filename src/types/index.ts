export enum PerfilUsuario {
  CLIENTE = 'CLIENTE',
  CALLCENTER = 'CALLCENTER',
  TECNICO = 'TECNICO',
  ADMIN = 'ADMIN',
  VENDEDOR = 'VENDEDOR',
}

export enum SolicitacaoStatus {
  PENDENTE = 'PENDENTE',
  VALIDADO = 'VALIDADO',
  REATRIBUIDO = 'REATRIBUIDO',
  ATRIBUIDO = 'ATRIBUIDO',
  ACEITO = 'ACEITO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export enum Prioridade {
  BAIXA = 'BAIXA',
  NORMAL = 'NORMAL',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE',
}

export enum NivelExperiencia {
  INICIANTE = 'INICIANTE',
  INTERMEDIARIO = 'INTERMEDIARIO',
  AVANCADO = 'AVANCADO',
  ESPECIALISTA = 'ESPECIALISTA',
}

export enum Disponibilidade {
  DISPONIVEL = 'DISPONIVEL',
  OCUPADO = 'OCUPADO',
  AUSENTE = 'AUSENTE',
}

export interface Usuario {
  id: number;
  nome: string;
  email?: string;
  nif?: string;
  telefone?: string;
  perfil: PerfilUsuario;
  fotoUrl?: string;
  tituloProfissional?: string;
  sobre?: string;
  habilidades?: string;
  anoExperiencia?: number;
  disponibilidade?: Disponibilidade;
  localizacao?: string;
  nivelExperiencia?: NivelExperiencia;
  avaliacaoMedia?: number;
  totalAvaliacoes?: number;
  projetosConcluidos?: number;
  precoBase?: number;
  trabalhaRemoto?: boolean;
  ativo?: boolean;
}

export interface Categoria {
  id: number;
  nome: string;
  slug: string;
  subcategorias?: string[];
  descricao?: string;
  icone?: string;
  imagemDestaque?: string;
  cor?: string;
  ordem?: number;
}

export interface Subcategoria {
  id: number;
  nome: string;
  slug: string;
  descricao?: string;
  icone?: string;
  cor?: string;
  ordem?: number;
  categoriaId: number;
  ativa?: boolean;
}

export interface SolicitacaoServico {
  id: number;
  referencia: string;
  status: SolicitacaoStatus;
  servico: string;
  prioridade: Prioridade;
  nomeBeneficiario: string;
  telefone: string;
  email?: string;
  descricao: string;
  endereco?: string;
  requerenteId?: number;
  profissionalEscolhidoId?: number;
  profissionalAtribuidoId?: number;
  especialidadeId?: number;
  criadoEm: string;
  aprovado: boolean;
}

export interface Avaliacao {
  id: number;
  tecnicoId: number;
  autorId?: number;
  estrelas: number;
  comentario?: string;
  titulo?: string;
  servicoRelacionado?: string;
  criadoEm: string;
  autor?: Usuario;
}

export interface Conversa {
  id: number;
  titulo?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Mensagem {
  id: number;
  conversaId: number;
  autorId: number;
  conteudo: string;
  lidaEm?: string;
  criadoEm: string;
  autor?: Usuario;
}

export interface Notificacao {
  id: number;
  usuarioId: number;
  titulo: string;
  corpo: string;
  dados?: any;
  lidaEm?: string;
  criadaEm: string;
  tipo?: string;
  categoria?: string;
  nivel: number;
}

export interface Artigo {
  id: number;
  vendedorId: number;
  nome: string;
  descricao?: string;
  imagemUrl?: string;
  tipo: 'PRODUTO' | 'SERVICO';
  preco: number;
  status: string;
  tags?: string;
  destacado?: boolean;
}
