// Arquivo: src/data/produtosFallback.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Aba de Carrinho):
// Base de dados local de contingência (fallback) no mesmo formato JSON da
// FakeStoreAPI, garantindo que o app continue 100% funcional mesmo se a rede
// local ou a API externa estiverem temporariamente indisponíveis em aula.
// ============================================================================

// Exporta o Array de produtos de demonstração com a mesma estrutura da FakeStoreAPI
export const PRODUTOS_FALLBACK = [
  {
    id: 1, // Identificador numérico único do produto
    title: 'Mochila Executiva para Notebook 15.6"', // Título do produto
    price: 109.95, // Preço numérico (Number) usado no cálculo .reduce() do carrinho
    description:
      'Mochila resistente para uso diário e viagens, com compartimento acolchoado para notebook de até 15 polegadas.', // Descrição detalhada
    category: "men's clothing", // Categoria retornada pela API
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', // URL da foto do produto
    rating: { rate: 3.9, count: 120 }, // Objeto de avaliação (nota média e total de votos)
  },
  {
    id: 2, // Identificador único
    title: 'Camiseta Casual Slim Fit Masculina', // Título do produto
    price: 22.3, // Preço numérico
    description:
      'Modelagem slim fit com tecido leve e respirável, gola redonda e acabamento reforçado.', // Descrição detalhada
    category: "men's clothing", // Categoria
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', // URL da imagem
    rating: { rate: 4.1, count: 259 }, // Avaliação
  },
  {
    id: 3, // Identificador único
    title: 'SSD Externo Portátil WD 2TB USB 3.0', // Título do produto
    price: 64.0, // Preço numérico
    description:
      'Compatibilidade USB 3.0 e USB 2.0, transferências rápidas de dados e alta capacidade de armazenamento.', // Descrição detalhada
    category: 'electronics', // Categoria
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', // URL da imagem
    rating: { rate: 3.3, count: 203 }, // Avaliação
  },
  {
    id: 4, // Identificador único
    title: 'SSD Interno SanDisk PLUS 1TB SATA III', // Título do produto
    price: 109.0, // Preço numérico
    description:
      'Inicialização, desligamento e carregamento de aplicativos muito mais rápidos com leitura de até 535MB/s.', // Descrição detalhada
    category: 'electronics', // Categoria
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', // URL da imagem
    rating: { rate: 4.5, count: 470 }, // Avaliação
  },
  {
    id: 5, // Identificador único
    title: 'Monitor Acer SB220Q 21.5" Full HD IPS Ultra-Thin', // Título do produto
    price: 599.0, // Preço numérico
    description:
      'Tela IPS Full HD 1920x1080 com design ultrafino sem bordas, 75Hz e tempo de resposta de 4ms.', // Descrição detalhada
    category: 'electronics', // Categoria
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', // URL da imagem
    rating: { rate: 4.7, count: 250 }, // Avaliação
  },
];
