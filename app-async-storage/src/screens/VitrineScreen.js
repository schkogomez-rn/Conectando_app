// Arquivo: src/screens/VitrineScreen.js
// ============================================================================
// AULA 9 — EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Carrinho Persistente):
// Tela inicial da aba 'VitrineTab' (base do VitrineStack).
// Responsabilidades:
// - Buscar 10 produtos na API pública https://fakestoreapi.com/products?limit=10
//   utilizando fetch dentro de useEffect
// - Exibir ActivityIndicator enquanto aguarda a resposta da rede
// - Carregar PRODUTOS_FALLBACK automaticamente se a rede estiver indisponível
// - Destacar os cards que já estão presentes no carrinho persistido no AsyncStorage
// ============================================================================

// Importa o React e os Hooks useState (estado local) e useEffect (requisição ao montar)
import React, { useState, useEffect } from 'react';
// Importa componentes nativos de layout, lista, indicador de carga e toque
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
// Importa a lista de fallback offline para uso em caso de erro de conexão
import { PRODUTOS_FALLBACK } from '../data/produtosFallback';

// Exporta a tela 'VitrineScreen' recebendo:
// - navigation: controla a navegação para 'DetalhesProduto' dentro da pilha VitrineStack
// - carrinho: Array global de produtos persistido no AsyncStorage pelo App.js
export default function VitrineScreen({ navigation, carrinho = [] }) {
  // Estado que guarda a lista de produtos retornada pela API (ou fallback)
  const [produtos, setProdutos] = useState([]);
  // Estado booleano que indica se a requisição HTTP ainda está em andamento
  const [carregando, setCarregando] = useState(true);
  // Estado booleano que sinaliza quando o catálogo local de demonstração está ativo
  const [avisoOffline, setAvisoOffline] = useState(false);

  // Função assíncrona que busca os produtos da FakeStoreAPI com tratamento try/catch/finally
  const buscarProdutos = async () => {
    setCarregando(true);    // Liga o indicador de carregamento
    setAvisoOffline(false); // Limpa o banner de modo offline antes de tentar novamente

    try {
      // Executa a requisição HTTP GET solicitando os 10 primeiros produtos
      const resposta = await fetch('https://fakestoreapi.com/products?limit=10');

      // Verifica se o servidor respondeu com código HTTP de sucesso (200..299)
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      // Converte o JSON retornado pela API para um Array de objetos JavaScript
      const dados = await resposta.json();

      // Garante que os dados recebidos formam um Array válido antes de salvar no estado
      if (Array.isArray(dados) && dados.length > 0) {
        setProdutos(dados);
      } else {
        throw new Error('Formato de resposta inesperado');
      }
    } catch (erro) {
      // Em caso de falha de rede/CORS/timeout, ativa o catálogo de contingência
      setProdutos(PRODUTOS_FALLBACK);
      setAvisoOffline(true);
    } finally {
      // Sempre encerra o indicador de carregamento, dando sucesso ou erro
      setCarregando(false);
    }
  };

  // useEffect com Array de dependências vazio []: dispara buscarProdutos() 1 vez ao abrir a tela
  useEffect(() => {
    buscarProdutos();
  }, []);

  // Retorna a interface visual da vitrine de produtos
  return (
    <View style={styles.tela}>
      {/* Banner discreto exibido somente quando a API não respondeu e entrou o fallback */}
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
          data={produtos}                        // Lista de produtos da loja
          keyExtractor={(item) => String(item.id)} // Converte o ID numérico para String
          contentContainerStyle={styles.lista}   // Margens internas da lista
          showsVerticalScrollIndicator={false}   // Oculta barra de rolagem lateral
          onRefresh={buscarProdutos}             // Habilita "puxar para atualizar" (Pull to Refresh)
          refreshing={carregando}                // Controla o spinner do Pull to Refresh
          renderItem={({ item }) => (
            // Renderiza o card informando se o item já consta no carrinho salvo no aparelho
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
  // Contêiner principal ocupando 100% da altura
  tela: {
    flex: 1,                    // Altura total
    backgroundColor: '#F8FAFC', // Fundo cinza bem claro
  },
  // Faixa amarela exibida caso o app entre em modo offline
  bannerOffline: {
    backgroundColor: '#FEF3C7',      // Amarelo claro de aviso
    paddingVertical: 8,              // Altura interna
    paddingHorizontal: 14,           // Largura interna
    flexDirection: 'row',            // Mensagem à esquerda, botão à direita
    alignItems: 'center',            // Alinhados verticalmente
    justifyContent: 'space-between', // Extremos opostos
    borderBottomWidth: 1,            // Borda inferior sutil
    borderBottomColor: '#FDE68A',    // Amarelo médio
  },
  // Texto do banner offline
  textoOffline: {
    flex: 1,          // Ocupa espaço disponível
    fontSize: 12,     // Fonte compacta
    color: '#92400E', // Âmbar escuro
    fontWeight: '600',// Semi-negrito
    marginRight: 8,   // Folga antes do botão
  },
  // Botão "Recarregar" no banner offline
  botaoTentar: {
    backgroundColor: '#D97706', // Âmbar forte
    paddingVertical: 5,         // Altura interna
    paddingHorizontal: 10,      // Largura interna
    borderRadius: 6,            // Arredondamento
  },
  // Texto branco do botão "Recarregar"
  textoBotaoTentar: {
    color: '#FFFFFF',   // Branco puro
    fontSize: 11,       // Fonte pequena
    fontWeight: 'bold', // Negrito
  },
  // Área centralizada para o ActivityIndicator
  centroCarregamento: {
    flex: 1,                  // Ocupa toda a altura
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
  },
  // Mensagem exibida abaixo do spinner
  textoCarregando: {
    marginTop: 12,    // Espaço após o spinner
    color: '#64748B', // Cinza médio
    fontSize: 14,     // Fonte legível
    fontWeight: '600',// Semi-negrito
  },
  // Margens internas da lista de produtos
  lista: {
    padding: 16,       // Espaçamento nos 4 lados
    paddingBottom: 28, // Respiro extra no final da lista
  },
});
