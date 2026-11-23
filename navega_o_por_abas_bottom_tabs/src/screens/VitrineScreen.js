// Arquivo: src/screens/VitrineScreen.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Aba de Carrinho):
// Tela inicial da aba 'VitrineTab' (base do VitrineStack).
// - Consome https://fakestoreapi.com/products?limit=10 com useEffect e fetch
// - Exibe ActivityIndicator enquanto os dados estão sendo carregados
// - Em caso de indisponibilidade de rede, carrega PRODUTOS_FALLBACK
// - Ao tocar em um ProdutoCard, navega para 'DetalhesProduto' enviando o item
// ============================================================================

// Importa o React e os Hooks useState (estado) e useEffect (efeito colateral na montagem)
import React, { useState, useEffect } from 'react';
// Importa componentes nativos de lista, carregamento e interação
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Importa o card reutilizável de produto
import ProdutoCard from '../components/ProdutoCard';
// Importa a base de produtos de contingência (fallback offline)
import { PRODUTOS_FALLBACK } from '../data/produtosFallback';

// Exporta a tela 'VitrineScreen' recebendo:
// - navigation: objeto de navegação do Stack da aba VitrineTab
// - carrinho: Array global de produtos adicionados ao carrinho no App.js
export default function VitrineScreen({ navigation, carrinho = [] }) {
  // Estado que armazena a lista de produtos recebida da API (ou do fallback)
  const [produtos, setProdutos] = useState([]);
  // Estado booleano que controla a exibição do indicador de carregamento (spinner)
  const [carregando, setCarregando] = useState(true);
  // Estado booleano que informa se a tela está usando os dados locais de contingência
  const [avisoOffline, setAvisoOffline] = useState(false);

  // Função assíncrona responsável por buscar os 10 produtos na FakeStoreAPI
  const buscarProdutos = async () => {
    setCarregando(true); // Ativa o spinner antes de iniciar a requisição
    setAvisoOffline(false); // Limpa qualquer aviso anterior de modo offline

    try {
      // Faz a requisição HTTP GET limitando o retorno a 10 produtos
      const resposta = await fetch('https://fakestoreapi.com/products?limit=10');

      // Valida se a resposta HTTP retornou sucesso (status 200-299)
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      // Converte o corpo da resposta para um Array de objetos JavaScript
      const dados = await resposta.json();

      // Garante que recebemos um Array válido e não vazio antes de atualizar o estado
      if (Array.isArray(dados) && dados.length > 0) {
        setProdutos(dados);
      } else {
        throw new Error('Formato de resposta inesperado');
      }
    } catch (erro) {
      // Se houver falha de rede ou bloqueio no laboratório, usa os produtos de fallback
      setProdutos(PRODUTOS_FALLBACK);
      setAvisoOffline(true);
    } finally {
      // Sempre desativa o carregamento ao concluir (com sucesso ou fallback)
      setCarregando(false);
    }
  };

  // Hook useEffect com Array de dependências vazio []: executa a busca 1 vez ao abrir a tela
  useEffect(() => {
    buscarProdutos();
  }, []);

  // Retorna a interface da Vitrine de Produtos
  return (
    <View style={styles.tela}>
      {/* Faixa de aviso exibida apenas quando o fallback offline foi ativado */}
      {avisoOffline && (
        <View style={styles.bannerOffline}>
          <Text style={styles.textoOffline}>
            ⚠️ Sem conexão com a FakeStoreAPI. Exibindo catálogo de demonstração.
          </Text>
          <TouchableOpacity onPress={buscarProdutos} style={styles.botaoTentar}>
            <Text style={styles.textoBotaoTentar}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Renderização condicional: mostra o spinner enquanto carrega ou a FlatList pronta */}
      {carregando ? (
        <View style={styles.centroCarregamento}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.textoCarregando}>Carregando produtos da loja...</Text>
        </View>
      ) : (
        <FlatList
          data={produtos} // Array de produtos exibido na vitrine
          keyExtractor={(item) => String(item.id)} // Converte ID numérico para String
          contentContainerStyle={styles.lista} // Espaçamento interno da lista
          showsVerticalScrollIndicator={false} // Oculta barra lateral de rolagem
          onRefresh={buscarProdutos} // Permite puxar para baixo (Pull to Refresh) para recarregar
          refreshing={carregando} // Vincula o estado de atualização ao Pull to Refresh
          renderItem={({ item }) => (
            // Renderiza cada produto e sinaliza se ele já está no carrinho global
            <ProdutoCard
              item={item}
              noCarrinho={carrinho.some((prod) => prod.id === item.id)}
              onPress={() =>
                navigation.navigate('DetalhesProduto', { produto: item })
              }
            />
          )}
        />
      )}
    </View>
  );
}

// Folha de estilos exclusiva da tela VitrineScreen
const styles = StyleSheet.create({
  // Contêiner principal da vitrine
  tela: {
    flex: 1, // Altura total
    backgroundColor: '#F8FAFC', // Fundo claro
  },
  // Banner discreto exibido no modo fallback offline
  bannerOffline: {
    backgroundColor: '#FEF3C7', // Amarelo suave de alerta
    paddingVertical: 8, // Altura interna
    paddingHorizontal: 14, // Largura interna
    flexDirection: 'row', // Texto à esquerda e botão à direita
    alignItems: 'center', // Alinhamento vertical
    justifyContent: 'space-between', // Extremos opostos
    borderBottomWidth: 1, // Divisória inferior
    borderBottomColor: '#FDE68A', // Amarelo um pouco mais escuro
  },
  // Mensagem do banner offline
  textoOffline: {
    flex: 1, // Ocupa a largura disponível
    fontSize: 12, // Fonte compacta
    color: '#92400E', // Marrom/âmbar escuro para contraste
    fontWeight: '600', // Semi-negrito
    marginRight: 8, // Espaço antes do botão
  },
  // Botão "Recarregar" no banner offline
  botaoTentar: {
    backgroundColor: '#D97706', // Âmbar forte
    paddingVertical: 5, // Altura interna
    paddingHorizontal: 10, // Largura interna
    borderRadius: 6, // Cantos arredondados
  },
  // Texto do botão "Recarregar"
  textoBotaoTentar: {
    color: '#FFFFFF', // Branco puro
    fontSize: 11, // Fonte compacta
    fontWeight: 'bold', // Negrito
  },
  // Área centralizada para o ActivityIndicator
  centroCarregamento: {
    flex: 1, // Ocupa toda a tela
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  // Texto informativo abaixo do spinner
  textoCarregando: {
    marginTop: 12, // Espaço acima do texto
    color: '#64748B', // Cinza médio
    fontSize: 14, // Tamanho legível
    fontWeight: '600', // Semi-negrito
  },
  // Espaçamento interno da lista de produtos
  lista: {
    padding: 16, // Margem interna nos 4 lados
    paddingBottom: 28, // Respiro inferior acima das abas
  },
});
