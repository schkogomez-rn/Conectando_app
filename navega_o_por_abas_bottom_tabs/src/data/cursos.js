// Arquivo: src/data/cursos.js
// ============================================================================
// PASSO 1 (Prática Guiada - Aula 8): Base de Dados Autocontida de Cursos
// Contém:
// - CATEGORIAS: lista de rótulos exibidos na barra horizontal de filtros
// - LISTA_CURSOS: catálogo de cursos com carga horária numérica (horasNumericas)
//   para permitir a soma automática (.reduce) na aba "Minhas Matrículas",
//   além da ementa completa exibida na tela de Detalhes.
// ============================================================================

// Exporta uma constante com o Array de categorias disponíveis para filtragem
export const CATEGORIAS = ['Todos', 'Mobile', 'Back-end', 'Dados', 'Infraestrutura'];

// Exporta o Array de objetos LISTA_CURSOS que alimenta o Catálogo e as Matrículas
export const LISTA_CURSOS = [
  {
    id: '101', // Identificador único (String) usado como key na FlatList e no controle de matrículas
    titulo: 'Desenvolvimento Mobile com React Native', // Nome principal do curso
    categoria: 'Mobile', // Categoria vinculada aos chips de filtro
    nivel: 'Iniciante', // Grau de dificuldade indicado ao aluno
    cargaHoraria: '60h', // Texto formatado para exibição visual na interface
    horasNumericas: 60, // Valor numérico usado para somar o total de horas na aba Minhas Matrículas
    instrutor: 'Prof. Joelson Silva', // Nome do docente responsável
    vagas: 12, // Total inicial de vagas antes de o aluno se matricular
    descricao:
      'Construa aplicativos multiplataforma para Android e iOS utilizando JavaScript ES6+ e Expo.', // Resumo exibido no card e nos detalhes
    // Array de Strings com os tópicos da ementa percorridos com .map() em DetalhesCursoScreen
    ementa: [
      'Fundamentos de JSX, View, Text e Flexbox',
      'Gerenciamento de estado com useState e eventos',
      'Consumo de APIs REST com useEffect e fetch',
      'Listas performáticas com FlatList e Componentização',
      'Navegação em Pilha (Stack) e por Abas (Bottom Tabs)',
    ],
  },
  {
    id: '102', // Identificador único do curso
    titulo: 'APIs RESTful com Node.js e Express', // Título principal
    categoria: 'Back-end', // Categoria para filtragem
    nivel: 'Intermediário', // Nível recomendado
    cargaHoraria: '40h', // Carga horária em formato de texto
    horasNumericas: 40, // Carga horária numérica para cálculo com .reduce()
    instrutor: 'Prof. Joelson Silva', // Docente responsável
    vagas: 8, // Quantidade inicial de vagas
    descricao:
      'Crie servidores robustos, rotas, middlewares e integração com bancos relacionais.', // Descrição breve
    // Lista de conteúdos programáticos do curso
    ementa: [
      'Arquitetura Cliente-Servidor e protocolo HTTP',
      'Rotas, parâmetros e verbos GET, POST, PUT e DELETE',
      'Middlewares de validação e tratamento de erros',
      'Integração com PostgreSQL e variáveis de ambiente',
    ],
  },
  {
    id: '103', // Identificador único do curso
    titulo: 'Banco de Dados PostgreSQL na Prática', // Título principal
    categoria: 'Dados', // Categoria para filtragem
    nivel: 'Iniciante', // Nível recomendado
    cargaHoraria: '32h', // Texto de carga horária
    horasNumericas: 32, // Número de horas para somatório de matrículas
    instrutor: 'Profa. Camila Rocha', // Docente responsável
    vagas: 15, // Vagas iniciais
    descricao:
      'Modelagem relacional, consultas SQL avançadas, índices e boas práticas de persistência.', // Descrição breve
    // Conteúdo programático exibido na tela de detalhes
    ementa: [
      'Modelagem Conceitual, Lógica e Física',
      'Comandos DDL e DML na prática',
      'Junções (INNER JOIN, LEFT JOIN) e agregações',
      'Otimização de consultas com índices',
    ],
  },
  {
    id: '104', // Identificador único do curso
    titulo: 'Excel do Zero ao Pro: Dashboards e Fórmulas', // Título principal
    categoria: 'Dados', // Categoria para filtragem
    nivel: 'Todos os níveis', // Nível recomendado
    cargaHoraria: '36h', // Texto de carga horária
    horasNumericas: 36, // Número de horas para somatório de matrículas
    instrutor: 'Prof. Joelson Silva', // Docente responsável
    vagas: 20, // Vagas iniciais
    descricao:
      'Domine PROCV, PROCX, tabelas dinâmicas, indicadores e automação de planilhas.', // Descrição breve
    // Tópicos da ementa do curso
    ementa: [
      'Formatação condicional e validação de dados',
      'Funções lógicas (SE, E, OU) e somas condicionais',
      'Funções de busca modernas (PROCX, ÍNDICE e CORRESP)',
      'Construção de Dashboards executivos',
    ],
  },
  {
    id: '105', // Identificador único do curso
    titulo: 'Automação de Redes e Windows com PowerShell', // Título principal
    categoria: 'Infraestrutura', // Categoria para filtragem
    nivel: 'Intermediário', // Nível recomendado
    cargaHoraria: '24h', // Texto de carga horária
    horasNumericas: 24, // Número de horas para somatório de matrículas
    instrutor: 'Prof. Joelson Silva', // Docente responsável
    vagas: 10, // Vagas iniciais
    descricao:
      'Gerencie laboratórios, implante softwares silenciosamente e automatize tarefas administrativas.', // Descrição breve
    // Tópicos da ementa do curso
    ementa: [
      'Cmdlets essenciais, pipelines e objetos',
      'Gerenciamento remoto de estações e serviços',
      'Instalação silenciosa de pacotes em laboratório',
      'Agendamento de tarefas administrativas',
    ],
  },
];
