// Arquivo: src/screens/VitrineScreen.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Requisitos 1 e 3): Tela de Vitrine de Produtos com API
// - Requisito 1: Usa useEffect para buscar https://fakestoreapi.com/products?limit=10
//   e exibe ActivityIndicator enquanto 'carregando' for true.
// - Requisito 3: Ao tocar em um ProdutoCard, navega para 'DetalhesProduto'
//   enviando { produto: item } via route.params.
// - Correção de Resiliência: Valida resposta HTTP/JSON e possui contingência
//   caso a rede escolar bloqueie ou fique sem internet durante a aula.
// ============================================================================

// Importa o React e os Hooks useState e useEffect
import React, { useState, useEffect } from 'react';
// Importa View, Text, FlatList, ActivityIndicator, TouchableOpacity e StyleSheet do React Native
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// Importa o componente reutilizável ProdutoCard (Requisito 2)
import ProdutoCard from '../components/ProdutoCard';

// Lista de contingência caso a FakeStoreAPI esteja fora do ar ou sem internet no laboratório
const PRODUTOS_CONTINGENCIA = [
  {
    id: 1,
    title: 'Mochila Executiva para Notebook 15.6"',
    price: 109.95,
    description: 'Mochila resistente para uso diário e viagens, com compartimento acolchoado para notebook de até 15 polegadas.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Camiseta Casual Slim Fit Masculina',
    price: 22.3,
    description: 'Modelagem slim fit com tecido leve e respirável, gola redonda e acabamento reforçado.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: 'SSD Externo Portátil WD 2TB USB 3.0',
    price: 64.0,
    description: 'Compatibilidade USB 3.0 e USB 2.0, transferências rápidas de dados e alta capacidade de armazenamento.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: { rate: 3.3, count: 203 },
  },
];

// Exporta a tela 'VitrineScreen' recebendo automaticamente a prop { navigation }
export default function VitrineScreen({ navigation }) {
  // Estado para armazenar o Array de produtos vindo da API FakeStore
  const [produtos, setProdutos] = useState([]);
  // Estado booleano para controlar a animação de carregamento (spinner)
  const [carregando, setCarregando] = useState(true);
  // Estado para informar se está exibindo o modo offline de contingência
  const [avisoOffline, setAvisoOffline] = useState(false);

  // Função assíncrona que busca os produtos na internet
  const buscarProdutos = async () => {
    setCarregando(true); // Ativa o spinner antes da requisição
    setAvisoOffline(false); // Limpa aviso anterior
    try {
      // Faz a chamada GET na FakeStoreAPI limitando a 10 produtos (?limit=10)
      const resposta = await fetch('https://fakestoreapi.com/products?limit=10');
      // Verifica se o status HTTP foi sucesso (200-299)
      if (!resposta.ok) {
        throw new Error(`Status HTTP: ${resposta.status}`);
      }
      // Converte a resposta para JSON (Array de objetos)
      const dados = await resposta.json();
      // Garante que o retorno é um Array válido antes de salvar no estado
      if (Array.isArray(dados) && dados.length > 0) {
        setProdutos(dados);
      } else {
        throw new Error('Formato de resposta inválido');
      }
    } catch (erro) {
      // Caso a internet falhe, carrega os produtos de contingência para não travar a aula
      setProdutos(PRODUTOS_CONTINGENCIA);
      setAvisoOffline(true);
    } finally {
      // Desativa o spinner ao finalizar (com sucesso ou erro)
      setCarregando(false);
    }
  };

  // Requisito 1: useEffect com Array vazio [] executa a busca automaticamente ao abrir a tela
  useEffect(() => {
    buscarProdutos();
  }, []);

  // Retorna a interface da Vitrine de Produtos
  return (
    <View style={styles.tela}>
      {/* Banner discreto caso a API externa esteja inacessível na rede local */}
      {avisoOffline && (
        <View style={styles.bannerOffline}>
          <Text style={styles.textoOffline}>
            ⚠️ Sem conexão com a FakeStoreAPI. Exibindo dados de demonstração.
          </Text>
          <TouchableOpacity onPress={buscarProdutos} style={styles.botaoTentar}>
            <Text style={styles.textoBotaoTentar}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Se 'carregando' for true, mostra o ActivityIndicator; senão, mostra a FlatList */}
      {carregando ? (
        <View style={styles.centroCarregamento}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.textoCarregando}>Carregando vitrine de produtos...</Text>
        </View>
      ) : (
        <FlatList
          data={produtos} // Array de produtos vindo da API
          keyExtractor={(item) => String(item.id)} // Converte o ID numérico para String com segurança
          contentContainerStyle={styles.lista} // Espaçamento interno da lista
          showsVerticalScrollIndicator={false} // Oculta a barra lateral de rolagem
          onRefresh={buscarProdutos} // Permite puxar a lista para baixo para atualizar
          refreshing={carregando} // Estado de atualização do Pull to Refresh
          renderItem={({ item }) => (
            // Renderiza o ProdutoCard passando o item e a ação de navegação (Requisito 3)
            <ProdutoCard
              item={item}
              onPress={() => navigation.navigate('DetalhesProduto', { produto: item })}
            />
          )}
        />
      )}
    </View>
  );
}

// Folha de estilos da tela VitrineScreen
const styles = StyleSheet.create({
  // Contêiner principal da tela
  tela: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#F8FAFC', // Fundo cinza claro
  },
  // Estilo do aviso de modo offline com botão de recarregar
  bannerOffline: {
    backgroundColor: '#FEF3C7', // Amarelo suave de alerta
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
  },
  textoOffline: {
    flex: 1,
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
    marginRight: 8,
  },
  botaoTentar: {
    backgroundColor: '#D97706',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoBotaoTentar: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  // Centraliza o ActivityIndicator enquanto busca na API
  centroCarregamento: {
    flex: 1, // Ocupa toda a área disponível
    justifyContent: 'center', // Centraliza na vertical
    alignItems: 'center', // Centraliza na horizontal
  },
  // Texto abaixo do spinner de carregamento
  textoCarregando: {
    marginTop: 12, // Espaço acima do texto
    color: '#64748B', // Cinza médio
    fontSize: 14, // Tamanho legível
    fontWeight: '600', // Semi-negrito
  },
  // Espaçamento interno da FlatList
  lista: {
    padding: 16, // Margem interna nos 4 lados
    paddingBottom: 28, // Espaço extra no final da lista
  },
});
