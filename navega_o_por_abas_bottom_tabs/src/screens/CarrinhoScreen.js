// Arquivo: src/screens/CarrinhoScreen.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Aba de Carrinho):
// Tela da segunda aba inferior ('CarrinhoTab').
// Atende todos os requisitos do desafio:
// 1. Calcula e exibe o Valor Total Somado (R$) usando .reduce()
// 2. Renderiza os itens adicionados com FlatList e botão de remover em cada card
// 3. Possui botão "Finalizar Pedido" que limpa o carrinho e exibe um Alert
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text, Image, FlatList, TouchableOpacity, Alert, Platform e StyleSheet
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
// Importa os ícones vetoriais Ionicons do Expo
import { Ionicons } from '@expo/vector-icons';

// Exporta a tela 'CarrinhoScreen' recebendo:
// - navigation: controla a troca para a aba 'VitrineTab'
// - carrinho: Array global de objetos completos de produto vindo do App.js
// - onRemoverDoCarrinho: função que remove 1 item do carrinho pelo ID
// - onLimparCarrinho: função que esvazia o carrinho após finalizar o pedido
export default function CarrinhoScreen({
  navigation,
  carrinho = [],
  onRemoverDoCarrinho,
  onLimparCarrinho,
}) {
  // Requisito do Desafio: usa .reduce() para somar o preço (item.price) de todos os produtos
  // O valor inicial 0 garante retorno numérico seguro mesmo quando o carrinho está vazio
  const valorTotal = carrinho.reduce(
    (acumulador, produto) => acumulador + Number(produto.price || 0),
    0
  );

  // Função executada ao tocar no botão "Finalizar Pedido"
  function handleFinalizarPedido() {
    // Guarda a quantidade e o total formatado antes de limpar o carrinho
    const totalFormatado = valorTotal.toFixed(2);
    const qtdItens = carrinho.length;

    // Esvazia o estado global do carrinho no App.js (zerando também o badge da aba)
    onLimparCarrinho();

    // Mensagem de confirmação exibida ao usuário
    const mensagem = `Seu pedido com ${qtdItens} ${
      qtdItens === 1 ? 'item' : 'itens'
    } no valor total de R$ ${totalFormatado} foi confirmado com sucesso!`;

    // Exibe Alert nativo no Android/iOS (e usa window.alert como fallback caso rode na Web)
    if (Platform.OS === 'web') {
      window.alert(`Pedido Finalizado!\n\n${mensagem}`);
    } else {
      Alert.alert('Pedido Finalizado! 🎉', mensagem, [{ text: 'OK' }]);
    }
  }

  // Retorna a estrutura completa da tela de Carrinho
  return (
    <View style={styles.tela}>
      {/* Painel escuro no topo exibindo quantidade de itens e Valor Total Somado em R$ */}
      <View style={styles.resumoCard}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{carrinho.length}</Text>
          <Text style={styles.resumoLabel}>
            {carrinho.length === 1 ? 'Item no Carrinho' : 'Itens no Carrinho'}
          </Text>
        </View>

        {/* Divisória vertical entre os dois indicadores */}
        <View style={styles.divisorVertical} />

        {/* Valor total calculado dinamicamente via .reduce() */}
        <View style={styles.resumoItem}>
          <Text style={[styles.resumoValor, styles.resumoValorPreco]}>
            R$ {valorTotal.toFixed(2)}
          </Text>
          <Text style={styles.resumoLabel}>Total do Pedido</Text>
        </View>
      </View>

      {/* Lista performática dos produtos presentes no carrinho */}
      <FlatList
        data={carrinho} // Array global de produtos adicionados
        keyExtractor={(item) => String(item.id)} // Chave única convertida para String
        contentContainerStyle={styles.lista} // Espaçamento interno e flexGrow para o estado vazio
        // Estado vazio amigável com botão para voltar à aba da Vitrine
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Ionicons name="cart-outline" size={58} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Seu carrinho está vazio</Text>
            <Text style={styles.vazioSubtitulo}>
              Explore a Vitrine Tech e adicione produtos para acompanhar o valor total por aqui.
            </Text>
            <TouchableOpacity
              style={styles.botaoVitrine}
              onPress={() => navigation.navigate('VitrineTab')}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoVitrine}>Ir para a Vitrine</Text>
            </TouchableOpacity>
          </View>
        }
        // Renderiza o card de cada item do carrinho com miniatura, preço e botão Remover
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            {/* Miniatura do produto */}
            <Image source={{ uri: item.image }} style={styles.imagem} />

            {/* Informações e ações do item */}
            <View style={styles.infoItem}>
              <Text style={styles.tituloItem} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.precoItem}>
                R$ {Number(item.price || 0).toFixed(2)}
              </Text>

              {/* Linha de ações: abrir detalhes na VitrineTab ou remover do carrinho */}
              <View style={styles.acoesLinha}>
                <TouchableOpacity
                  style={styles.botaoDetalhes}
                  onPress={() =>
                    navigation.navigate('VitrineTab', {
                      screen: 'DetalhesProduto',
                      params: { produto: item },
                    })
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.textoDetalhes}>Ver Produto</Text>
                </TouchableOpacity>

                {/* Botão exigido pelo desafio para remover o item do carrinho */}
                <TouchableOpacity
                  style={styles.botaoRemover}
                  onPress={() => onRemoverDoCarrinho(item.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="trash-outline" size={15} color="#DC2626" />
                  <Text style={styles.textoRemover}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Barra fixa inferior com o botão "Finalizar Pedido", exibida quando há itens no carrinho */}
      {carrinho.length > 0 && (
        <View style={styles.rodapeCheckout}>
          <TouchableOpacity
            style={styles.botaoFinalizar}
            onPress={handleFinalizarPedido}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.textoFinalizar}>
              Finalizar Pedido • R$ {valorTotal.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Folha de estilos exclusiva da tela CarrinhoScreen
const styles = StyleSheet.create({
  // Fundo claro ocupando toda a tela
  tela: {
    flex: 1, // Altura total
    backgroundColor: '#F8FAFC', // Cinza claro
  },
  // Painel escuro no topo com contagem e valor total
  resumoCard: {
    flexDirection: 'row', // Duas colunas lado a lado
    backgroundColor: '#1E293B', // Azul petróleo escuro
    margin: 16, // Margem externa
    borderRadius: 14, // Cantos arredondados
    paddingVertical: 16, // Espaçamento vertical interno
    alignItems: 'center', // Centraliza verticalmente
  },
  // Cada coluna do resumo
  resumoItem: {
    flex: 1, // 50% da largura para cada indicador
    alignItems: 'center', // Centraliza textos
  },
  // Valor numérico em destaque
  resumoValor: {
    fontSize: 20, // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#38BDF8', // Azul celeste
  },
  // Cor verde clara específica para destacar o valor monetário total
  resumoValorPreco: {
    color: '#34D399', // Verde menta vibrante
  },
  // Legenda descritiva no resumo
  resumoLabel: {
    fontSize: 12, // Fonte compacta
    color: '#CBD5E1', // Cinza claro
    marginTop: 2, // Espaço acima da legenda
  },
  // Linha divisória vertical entre as colunas do resumo
  divisorVertical: {
    width: 1, // Espessura fina
    height: 34, // Altura fixa
    backgroundColor: '#334155', // Cinza azulado
  },
  // Espaçamento interno da FlatList
  lista: {
    paddingHorizontal: 16, // Margens laterais
    paddingBottom: 20, // Espaço final
    flexGrow: 1, // Permite centralizar o estado vazio
  },
  // Contêiner do estado vazio
  vazioBox: {
    flex: 1, // Ocupa altura disponível
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    paddingHorizontal: 28, // Evita texto encostado nas laterais
    paddingVertical: 48, // Respiro vertical
  },
  // Título do carrinho vazio
  vazioTitulo: {
    fontSize: 18, // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#1E293B', // Escuro
    marginTop: 14, // Espaço após o ícone
    marginBottom: 6, // Espaço antes do subtítulo
  },
  // Subtítulo orientando o usuário a visitar a vitrine
  vazioSubtitulo: {
    fontSize: 14, // Fonte padrão
    color: '#64748B', // Cinza médio
    textAlign: 'center', // Centralizado
    lineHeight: 20, // Entrelinha legível
    marginBottom: 20, // Espaço antes do botão
  },
  // Botão azul para ir à aba VitrineTab
  botaoVitrine: {
    backgroundColor: '#2563EB', // Azul principal
    paddingVertical: 12, // Altura interna
    paddingHorizontal: 22, // Largura interna
    borderRadius: 10, // Cantos arredondados
  },
  // Texto branco do botão de ir para a vitrine
  textoBotaoVitrine: {
    color: '#FFFFFF', // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 14, // Fonte padrão
  },
  // Card de cada produto dentro do carrinho
  cardItem: {
    flexDirection: 'row', // Foto à esquerda e detalhes à direita
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 12, // Espaçamento interno
    marginBottom: 12, // Espaço entre os cards
    borderWidth: 1, // Borda fina
    borderColor: '#E2E8F0', // Cinza claro
    alignItems: 'center', // Centraliza verticalmente
  },
  // Miniatura do produto no carrinho
  imagem: {
    width: 64, // Largura fixa
    height: 64, // Altura fixa
    resizeMode: 'contain', // Sem distorção ou corte
    marginRight: 12, // Distância entre imagem e textos
    backgroundColor: '#F8FAFC', // Fundo suave
    borderRadius: 8, // Cantos arredondados
  },
  // Coluna direita do card
  infoItem: {
    flex: 1, // Ocupa o restante da largura
  },
  // Título do produto no card do carrinho
  tituloItem: {
    fontSize: 14, // Fonte legível
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 4, // Espaço antes do preço
  },
  // Preço unitário do produto
  precoItem: {
    fontSize: 16, // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#059669', // Verde esmeralda
    marginBottom: 10, // Espaço antes dos botões
  },
  // Linha horizontal dos botões "Ver Produto" e "Remover"
  acoesLinha: {
    flexDirection: 'row', // Lado a lado
    gap: 8, // Espaço entre os dois botões
  },
  // Botão azul claro para reabrir os detalhes do produto
  botaoDetalhes: {
    flex: 1, // Expande para ocupar o espaço restante
    backgroundColor: '#EFF6FF', // Azul bem claro
    paddingVertical: 7, // Altura interna
    borderRadius: 8, // Arredondamento
    alignItems: 'center', // Centraliza texto
  },
  // Texto do botão "Ver Produto"
  textoDetalhes: {
    color: '#1D4ED8', // Azul forte
    fontWeight: 'bold', // Negrito
    fontSize: 12, // Fonte compacta
  },
  // Botão vermelho claro de remover produto do carrinho
  botaoRemover: {
    flexDirection: 'row', // Ícone e texto lado a lado
    alignItems: 'center', // Alinhamento vertical
    justifyContent: 'center', // Alinhamento horizontal
    backgroundColor: '#FEF2F2', // Fundo vermelho suave
    paddingVertical: 7, // Altura interna
    paddingHorizontal: 12, // Largura interna
    borderRadius: 8, // Cantos arredondados
    gap: 4, // Espaço entre ícone e texto
  },
  // Texto do botão "Remover"
  textoRemover: {
    color: '#DC2626', // Vermelho de exclusão
    fontWeight: 'bold', // Negrito
    fontSize: 12, // Fonte compacta
  },
  // Barra inferior branca que fixa o botão "Finalizar Pedido" acima das abas
  rodapeCheckout: {
    backgroundColor: '#FFFFFF', // Fundo branco
    padding: 16, // Espaçamento interno
    borderTopWidth: 1, // Linha divisória superior
    borderTopColor: '#E2E8F0', // Cinza claro
  },
  // Botão verde de conclusão do pedido
  botaoFinalizar: {
    flexDirection: 'row', // Ícone e texto lado a lado
    backgroundColor: '#059669', // Verde esmeralda
    paddingVertical: 14, // Altura confortável
    borderRadius: 10, // Cantos arredondados
    alignItems: 'center', // Centraliza verticalmente
    justifyContent: 'center', // Centraliza horizontalmente
    gap: 8, // Espaço entre ícone e texto
  },
  // Texto branco do botão "Finalizar Pedido"
  textoFinalizar: {
    color: '#FFFFFF', // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 15, // Fonte destacada
  },
});
