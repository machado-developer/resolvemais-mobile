import type { Categoria } from "@/types";
import DC from "../../assets/images/categorias/domesticos.jpg";
export const CATEGORIAS: Categoria[] = [
  {
    id: 0,
    nome: "Domésticos & Cuidados",
    icone: "home-outline",
    imagemDestaque: DC,
    slug: "domesticos-cuidados",
    subcategorias: [
      "Empregada Doméstica",
      "Babá",
      "Cuidador(a) de Idosos",
      "Cuidador(a) de Pessoas com Deficiência",
      "Passadeira",
      "Jardineiro(a)",
      "Piscineiro(a)",
      "Faxineiro(a)",
      "Arrumadeira",
      "Motorista Particular",
      "Motorista com Carro Próprio"
    ]

  }
  ,
  {
    id: 1,
    nome: "Automóvel",
    icone: "car-outline",
    imagemDestaque: "",
    slug: "automovel",
    subcategorias: [
      "Diagnóstico",
      "Alinhamento e Balanceamento",
      "Lavagem e Polimento de Carros",
      "Instalador de Som e Acessórios",
      "Tecnico de GPS e Alarme"
    ]
  },
  {
    id: 2,
    nome: "Identidade & Comunicação",
    slug: "identidade-comunicacao",
    icone: "color-palette-outline",
    subcategorias: [
      "Designer Gráfico",
      "Fotógrafo e Editor de Imagem",
      "Produtor e Editor de Vídeos",
      "Gestor de Redes Sociais",
      "Motion Design",
      "Gestor de Marca",
      "Web Designer",
      "Designer de UI/UX",
      "Assessor de Comunicação Institucional",
      "Gestor de Tráfego pago"
    ]
  },
  {
    id: 3,
    nome: "Educação e Formação",
    icone: "book-outline",
    slug: "educacao-formacao",
    subcategorias: [
      "Professor(a) Particular",
      "Explicador(a)",
      "Educador(a) Infantil",
      "Professor(a) de Educação Física",
      "Professor(a) de Dança",
      "Formador de Línguas",
      "Coach",
      "Instrutor(a) de Condução",
      "Instrutor(a) Técnico",
      "Formador(a) em Gestão e Empreendedorismo",
      "Instrutor(a) de Segurança no Trabalho",
      "Instrutor(a) de Moda / Corte e Costura"
    ]
  },
  {
    id: 4,
    nome: "Eventos e Festas",
    slug: "eventos-festas",
    icone: "party-popper-outline",
    subcategorias: [
      "Organizador(a) de Festas",
      "Decorador(a) de Eventos",
      "Decorador(a) Floral",
      "Animador(a)",
      "DJ",
      "Mestre de Cerimónia",
      "Técnico(a) Iluminação",
      "Fotógrafo de eventos",
      "Videógrafo de Eventos",
      "Garçom",
      "Serviços de Catering",
      "Barman"
    ]
  },
  {
    id: 5,
    nome: "Segurança e Defesa Pessoal",
    icone: "shield-checkmark-outline",
    slug: "seguranca-defesa-pessoal",
    subcategorias: [
      "Segurança Privado",
      "Vigilante",
      "Guarda-Costas",
      "Inspetor de Segurança",
      "Supervisor de Segurança",
      "Instrutor de Defesa Pessoal",
      "Mestre de Artes Marciais",
      "Agente de Controlo de Acesso",
      "Operador de CCTV"
    ]
  },
  {
    id: 6,
    icone: "brush-outline",
    nome: "Beleza e Estética",
    slug: "beleza-estetica",
    subcategorias: [
      "Cabeleireiro(a)",
      "Manicure / Pedicure",
      "Maquilhadora Profissional",
      "Esteticista",
      "Barbeiro",
      "Massagista",
      "Depiladora",
      "Trançadeira",
      "Consultor(a) de Imagem"
    ]
  },
  {
    id: 7,
    icone: "hammer-outline",
    nome: "Construção Civil",
    slug: "construcao-civil",
    subcategorias: [
      "Pedreiro",
      "Pintor",
      "Canalizador",
      "Electricista",
      "Carpinteiro / Marceneiro",
      "Estucador / Rebocador",
      "Serralheiro",
      "Mestre de Obras",
      "Técnico de frio",
      "Soldador",
      "Ladrilhador",
      "Tecto Falso"
    ]
  },
  {
    id: 8,
    icone: "laptop-outline",
    slug: "tecnologia-informatica",
    nome: "Tecnologia e Informática",
    subcategorias: [
      "Técnico de Informática",
      "Reparador de Computadores",
      "Técnico de Cablagem",
      "Tecnico Redes",
      "Programador",
      "Desenvolvedor de Software",
      "Analista de Sistemas",
      "Técnico de Cyber Security",
      "Técnico de Impressoras",
      "Técnico de CCTV",
      "Técnico de Servidores",
      "Técnico de Fibra Óptica"
    ]
  },
  {
    id: 9,
    icone: "briefcase-outline",
    nome: "Serviços Corporativos & Consultoria",
    slug: "servicos-corporativos-consultoria",
    subcategorias: [
      "Técnico de Contabilidade",
      "Técnico Financeiro",
      "Consultor de Negócios",
      "Jurista / Advogado",
      "Técnico Administrativo",
      "Técnico de Projectos",
      "Técnico Software de Gestão",
      "Recursos Humanos",
      "Intermediário Imobiliário",
      "Relações Públicas",
      "Técnico Administrativo e Financeiro",
      "Call Center"
    ]
  },
  {
    id: 10,
    slug: "transporte-entregas",
    nome: "Transporte & Entregas",
    subcategorias: [
      "Motorista Particular",
      "Motorista com Carro Próprio",
      "Motorista Executivo",
      "Motoboy",
      "Entregador carro",
      "Entregador motoboy",
      "Motorista de amador",
      "Motorista Profissional",
      "Motorista de Caminhão",
      "Serviço de Carga e Descarga",
      "Reboque e Guincho",
      "Motorista de turismo",
      "Rent Car"
    ]
  },
  {
    id: 11,
    nome: "Outros Serviços",
    slug: "outros-servicos",
    subcategorias: [
      "Distribuidor de água para casa",
      "Casa de jogos ambulante",
      "Casa Inteligente",
      "Entrega de gás butano",
      "Chaveiro",
      "Lavagem de tapetes",
      "Lavagem de sofá",
      "Lavagem de cortina",
      "Técnico de parabólica"
    ]
  }
];



