// Arquivo: src/data/cursos.js
// ============================================================================
// PASSO 1 (Prática Guiada): Base de Dados de Categorias e Cursos com Ementas
// ============================================================================

// Exporta o Array de categorias para alimentar a barra horizontal de filtros
export const CATEGORIAS = ['Todos', 'Mobile', 'Back-end', 'Dados', 'Infraestrutura'];

// Exporta o Array LISTA_CURSOS contendo os cursos e suas respectivas ementas (Array de tópicos)
export const LISTA_CURSOS = [
  {
    id: '101', // Identificador único do curso (String)
    titulo: 'Desenvolvimento Mobile com React Native', // Título principal
    categoria: 'Mobile', // Categoria usada no filtro da tela inicial
    nivel: 'Iniciante', // Nível de dificuldade
    cargaHoraria: '60h', // Carga horária total
    instrutor: 'Prof. Joelson Silva', // Nome do professor responsável
    vagas: 12, // Quantidade inicial de vagas disponíveis
    descricao: 'Construa aplicativos multiplataforma para Android e iOS utilizando JavaScript ES6+ e Expo.', // Resumo do curso
    // Array de Strings com o conteúdo programático exibido na tela de Detalhes
    ementa: [
      'Fundamentos de Flexbox e StyleSheet',
      'Gerenciamento de Estado com useState e useEffect',
      'Listas performáticas com FlatList',
      'Componentização, Props e Navegação Stack',
    ],
  },
  {
    id: '102',
    titulo: 'APIs RESTful com Node.js e Express',
    categoria: 'Back-end',
    nivel: 'Intermediário',
    cargaHoraria: '40h',
    instrutor: 'Prof. Joelson Silva',
    vagas: 8,
    descricao: 'Crie servidores robustos, rotas, middlewares e integração com bancos relacionais.',
    ementa: [
      'Arquitetura HTTP e verbos REST',
      'Criação de rotas e middlewares no Express',
      'Validação de dados e tratamento de erros',
      'Conexão com banco de dados PostgreSQL',
    ],
  },
  {
    id: '103',
    titulo: 'Banco de Dados PostgreSQL na Prática',
    categoria: 'Dados',
    nivel: 'Iniciante',
    cargaHoraria: '32h',
    instrutor: 'Profa. Camila Rocha',
    vagas: 15,
    descricao: 'Modelagem relacional, consultas SQL avançadas, índices e boas práticas de persistência.',
    ementa: [
      'Modelagem Conceitual e Lógica (DER)',
      'Comandos DDL e DML na prática',
      'Consultas com JOIN, GROUP BY e Subqueries',
      'Otimização de desempenho com Índices',
    ],
  },
  {
    id: '104',
    titulo: 'Automação de Redes e Windows com PowerShell',
    categoria: 'Infraestrutura',
    nivel: 'Intermediário',
    cargaHoraria: '24h',
    instrutor: 'Prof. Joelson Silva',
    vagas: 10,
    descricao: 'Gerencie laboratórios, implante softwares silenciosamente e automatize tarefas administrativas.',
    ementa: [
      'Cmdlets essenciais e Pipeline de objetos',
      'Manipulação de arquivos, serviços e registro',
      'Scripts de implantação silenciosa em rede',
      'Agendamento de tarefas administrativas',
    ],
  },
];
