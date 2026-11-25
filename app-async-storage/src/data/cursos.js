// Arquivo: src/data/cursos.js
// ============================================================================
// AULA 9 — PRÁTICA GUIADA (Passo 1): Base de Dados do Catálogo de Cursos
// Contém os dados estáticos (autocontidos) usados pelo Catálogo de Cursos e
// pela tela de Minhas Matrículas.
//
// CONCEITO DIDÁTICO:
// Separar os dados em 'src/data/' evita poluir as telas e permite que
// CatalogoScreen e MinhasMatriculasScreen consultem a mesma fonte de dados.
// No AsyncStorage, salvaremos apenas os IDs matriculados (ex.: ['101', '103']),
// e cruzaremos esses IDs com LISTA_CURSOS para exibir os detalhes completos.
// ============================================================================

// Exporta a lista fixa de categorias exibidas nos chips do filtro horizontal
export const CATEGORIAS = [
  'Todos',          // Opção especial que desativa o filtro e mostra todos os cursos
  'Mobile',         // Categoria de desenvolvimento de aplicativos móveis
  'Back-end',       // Categoria de servidores e APIs
  'Dados',          // Categoria de bancos de dados e análise
  'Infraestrutura', // Categoria de redes e automação
];

// Exporta o Array de objetos que representa o catálogo completo de cursos disponíveis
export const LISTA_CURSOS = [
  {
    id: '101', // Identificador único (String) usado como key na FlatList e salvo no AsyncStorage
    titulo: 'Desenvolvimento Mobile com React Native', // Nome principal do curso
    categoria: 'Mobile', // Categoria usada para filtragem no CatalogoScreen
    nivel: 'Iniciante', // Nível de dificuldade exibido no card e nos detalhes
    cargaHoraria: '60h', // Texto formatado da duração para exibição na interface
    horasNumericas: 60, // Valor numérico (Number) usado para somar horas com .reduce()
    instrutor: 'Prof. Joelson Silva', // Nome do(a) docente responsável
    vagas: 12, // Quantidade base de vagas (decrementada em 1 quando o aluno se matricula)
    descricao:
      'Construa aplicativos multiplataforma para Android e iOS utilizando JavaScript ES6+ e Expo.', // Resumo do curso
    ementa: [
      // Lista de tópicos percorrida com .map() na tela DetalhesCursoScreen
      'Fundamentos de JSX, View, Text e Flexbox',
      'Gerenciamento de estado com useState e eventos',
      'Consumo de APIs REST com useEffect e fetch',
      'Listas performáticas com FlatList e Componentização',
      'Navegação em Pilha (Stack), Abas (Tabs) e AsyncStorage',
    ],
  },
  {
    id: '102', // Identificador único do segundo curso
    titulo: 'APIs RESTful com Node.js e Express', // Nome do curso
    categoria: 'Back-end', // Categoria para filtro
    nivel: 'Intermediário', // Nível de dificuldade
    cargaHoraria: '40h', // Texto de carga horária
    horasNumericas: 40, // Número de horas para soma em MinhasMatriculasScreen
    instrutor: 'Prof. Joelson Silva', // Nome do instrutor
    vagas: 8, // Total de vagas disponíveis
    descricao:
      'Crie servidores robustos, rotas, middlewares e integração com bancos relacionais.', // Descrição do curso
    ementa: [
      // Tópicos da ementa
      'Arquitetura Cliente-Servidor e protocolo HTTP',
      'Rotas, parâmetros e verbos GET, POST, PUT e DELETE',
      'Middlewares de validação e tratamento de erros',
      'Integração com PostgreSQL e variáveis de ambiente',
    ],
  },
  {
    id: '103', // Identificador único do terceiro curso
    titulo: 'Banco de Dados PostgreSQL na Prática', // Nome do curso
    categoria: 'Dados', // Categoria para filtro
    nivel: 'Iniciante', // Nível de dificuldade
    cargaHoraria: '32h', // Texto de carga horária
    horasNumericas: 32, // Número de horas para soma em MinhasMatriculasScreen
    instrutor: 'Profa. Camila Rocha', // Nome da instrutora
    vagas: 15, // Total de vagas disponíveis
    descricao:
      'Modelagem relacional, consultas SQL avançadas, índices e boas práticas de persistência.', // Descrição do curso
    ementa: [
      // Tópicos da ementa
      'Modelagem Conceitual, Lógica e Física',
      'Comandos DDL e DML na prática',
      'Junções (INNER JOIN, LEFT JOIN) e agregações',
      'Otimização de consultas com índices',
    ],
  },
  {
    id: '104', // Identificador único do quarto curso
    titulo: 'Excel do Zero ao Pro: Dashboards e Fórmulas', // Nome do curso
    categoria: 'Dados', // Categoria para filtro
    nivel: 'Todos os níveis', // Nível de dificuldade
    cargaHoraria: '36h', // Texto de carga horária
    horasNumericas: 36, // Número de horas para soma em MinhasMatriculasScreen
    instrutor: 'Prof. Joelson Silva', // Nome do instrutor
    vagas: 20, // Total de vagas disponíveis
    descricao:
      'Domine PROCV, PROCX, tabelas dinâmicas, indicadores e automação de planilhas.', // Descrição do curso
    ementa: [
      // Tópicos da ementa
      'Formatação condicional e validação de dados',
      'Funções lógicas (SE, E, OU) e somas condicionais',
      'Funções de busca modernas (PROCX, ÍNDICE e CORRESP)',
      'Construção de Dashboards executivos',
    ],
  },
  {
    id: '105', // Identificador único do quinto curso
    titulo: 'Automação de Redes e Windows com Scripts', // Nome do curso
    categoria: 'Infraestrutura', // Categoria para filtro
    nivel: 'Intermediário', // Nível de dificuldade
    cargaHoraria: '24h', // Texto de carga horária
    horasNumericas: 24, // Número de horas para soma em MinhasMatriculasScreen
    instrutor: 'Prof. Joelson Silva', // Nome do instrutor
    vagas: 10, // Total de vagas disponíveis
    descricao:
      'Gerencie laboratórios, implante softwares silenciosamente e automatize tarefas administrativas.', // Descrição do curso
    ementa: [
      // Tópicos da ementa
      'Comandos essenciais, pipelines e automação de rotina',
      'Gerenciamento remoto de estações e serviços',
      'Instalação silenciosa de pacotes em laboratório',
      'Agendamento de tarefas administrativas',
    ],
  },
];
