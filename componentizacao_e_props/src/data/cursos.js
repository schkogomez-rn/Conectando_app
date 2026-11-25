// Arquivo: src/data/cursos.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Requisito 1): Base de Dados de Categorias e Cursos
// ============================================================================

// Exporta o Array de categorias para alimentar a barra horizontal de filtros
export const CATEGORIAS = [
  'Todos',
  'Mobile',
  'Back-end',
  'Dados',
  'Infraestrutura',
];

// Exporta o Array LISTA_CURSOS contendo os objetos com todos os atributos pedidos no desafio:
// id, titulo, categoria, nivel, cargaHoraria, instrutor, vagas e descricao
export const LISTA_CURSOS = [
  {
    id: '1', // Identificador único do curso (String)
    titulo: 'React Native com Expo na Prática', // Título principal do curso
    categoria: 'Mobile', // Categoria usada no filtro
    nivel: 'Intermediário', // Nível de dificuldade
    cargaHoraria: '40h', // Carga horária total
    instrutor: 'Prof. Marcos Silva', // Nome do instrutor responsável
    vagas: 12, // Quantidade inicial de vagas disponíveis
    descricao: 'Construa aplicativos móveis modernos utilizando Componentização, Props, Hooks e consumo de APIs REST.', // Resumo do curso
  },
  {
    id: '2',
    titulo: 'APIs RESTful com Node.js e Express',
    categoria: 'Back-end',
    nivel: 'Intermediário',
    cargaHoraria: '36h',
    instrutor: 'Profa. Camila Rocha',
    vagas: 8,
    descricao: 'Desenvolva servidores escaláveis, rotas autenticadas com JWT e integração com banco de dados relacional.',
  },
  {
    id: '3',
    titulo: 'Modelagem SQL e Análise de Dados',
    categoria: 'Dados',
    nivel: 'Iniciante',
    cargaHoraria: '32h',
    instrutor: 'Prof. Ricardo Gomes',
    vagas: 15,
    descricao: 'Domine consultas SQL, relacionamentos entre tabelas, agregações e criação de relatórios analíticos.',
  },
  {
    id: '4',
    titulo: 'Docker, Linux e Deploy em Nuvem',
    categoria: 'Infraestrutura',
    nivel: 'Avançado',
    cargaHoraria: '45h',
    instrutor: 'Prof. André Nogueira',
    vagas: 6,
    descricao: 'Empacote aplicações em containers Docker e automatize pipelines de entrega contínua (CI/CD).',
  },
  {
    id: '5',
    titulo: 'UI/UX e Animações no React Native',
    categoria: 'Mobile',
    nivel: 'Avançado',
    cargaHoraria: '28h',
    instrutor: 'Profa. Juliana Alves',
    vagas: 10,
    descricao: 'Crie interfaces fluidas, sistemas de design reutilizáveis e microinterações para Android e iOS.',
  },
];
