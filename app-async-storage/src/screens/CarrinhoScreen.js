// Arquivo: src/screens/CarrinhoScreen.js
// ============================================================================
// AULA 9 — EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Carrinho Persistente):
// Tela da segunda aba inferior ('CarrinhoTab').
// Atende a todos os requisitos do desafio da Aula 9:
// 1. Exibe quantidade de itens e o Valor Total Somado (R$) usando .reduce()
// 2. Permite remover itens individuais (atualizando '@vitrine_tech:carrinho')
// 3. Requisito 4 da Aula 9: Possui botão "Esvaziar" no rodapé de checkout
//    ao lado de "Finalizar Pedido", com confirmação via Alert
// 4. Quando o carrinho fica vazio (removendo último item, clicando em "Esvaziar"
//    ou em "Finalizar Pedido"), o App.js executa AsyncStorage.removeItem()!
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
// Importa os ícones vetoriais Ionicons inclusos no Expo
import { Ionicons } from '@expo/vector-icons';

// Exporta a tela 'CarrinhoScreen' recebendo 4 Props:
// - navigation: permite voltar para 'VitrineTab' ou abrir 'DetalhesProduto'
// - carrinho: Array global de produtos restaurado e persistido pelo App.js
// - onRemoverDoCarrinho: remove 1 item específico pelo ID
// - onLimparCarrinho: zera o carrinho (disparando AsyncStorage.removeItem no App.js)
export default function CarrinhoScreen({
  navigation,
  carrinho = [],
  onRemoverDoCarrinho,
  onLimparCarrinho,
}) {
  // Calcula o valor total somando item.price de todos os produtos com .reduce()
  // Valor inicial 0 evita erro quando o carrinho está vazio
  const valorTotal = carrinho.reduce(
    (acumulador, produto) => acumulador + Number(produto.price || 0),
    0
  );

  // Requisito 4 da Aula 9: solicita confirmação via Alert antes de esvaziar o carrinho salvo
  function handleConfirmarEsvaziar() {
    const titulo = 'Esvaziar Carrinho';
    const mensagem =
      'Deseja remover todos os produtos salvos no seu carrinho?';

    // Na Web, utiliza window.confirm para manter compatibilidade multiplataforma
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(`${titulo}\n\n${mensagem}`);
      if (confirmou) {
        onLimparCarrinho(); // Limpa o estado e aciona AsyncStorage.removeItem('@vitrine_tech:carrinho')
      }
      return;
    }

    // No Android e iOS, exibe o diálogo nativo Alert.alert com botões Cancelar e Esvaziar
    Alert.alert(titulo, mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Esvaziar',
        style: 'destructive',
        onPress: () => onLimparCarrinho(), // Zera o carrinho e remove a chave no AsyncStorage
      },
    ]);
  }

  // Conclui o pedido, limpa o carrinho (removendo a chave do AsyncStorage) e exibe confirmação
  function handleFinalizarPedido() {
    // Captura os valores antes de esvaziar o Array do carrinho
    const totalFormatado = valorTotal.toFixed(2);
    const qtdItens = carrinho.length;

    // Esvazia o carrinho global (o useEffect no App.js chamará AsyncStorage.removeItem)
    onLimparCarrinho();

    // Monta a mensagem com concordância singular/plural
    const mensagem = `Seu pedido com ${qtdItens} ${
      qtdItens === 1 ? 'item' : 'itens'
    } no valor total de R$ ${totalFormatado} foi confirmado com sucesso!`;

    // Exibe Alert nativo no celular (ou window.alert se testado no navegador)
    if (Platform.OS === 'web') {
      window.alert(`Pedido Finalizado!\n\n${mensagem}`);
    } else {
      Alert.alert('Pedido Finalizado! 🎉', mensagem, [{ text: 'OK' }]);
    }
  }

  // Retorna a interface completa da tela de Carrinho
  return (
    <View style={styles.tela}>
      {/* Painel escuro no topo exibindo total de itens e valor somado */}
      <View style={styles.resumoCard}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{carrinho.length}</Text>
          <Text style={styles.resumoLabel}>
            {carrinho.length === 1 ? 'Item no Carrinho' : 'Itens no Carrinho'}
          </Text>
        </View>

        {/* Divisória vertical entre os dois indicadores */}
        <View style={styles.divisorVertical} />

        <View style={styles.resumoItem}>
          <Text style={[styles.resumoValor, styles.resumoValorPreco]}>
            R$ {valorTotal.toFixed(2)}
          </Text>
          <Text style={styles.resumoLabel}>Total do Pedido</Text>
        </View>
      </View>

      {/* Lista performática dos itens salvos no carrinho */}
      <FlatList
        data={carrinho}                        // Produtos persistidos no carrinho
        keyExtractor={(item) => String(item.id)} // ID convertido para String
        contentContainerStyle={styles.lista}   // Espaçamento interno e flexGrow
        // Estado vazio amigável com atalho para a Vitrine
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Ionicons name="cart-outline" size={58} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Seu carrinho está vazio</Text>
            <Text style={styles.vazioSubtitulo}>
              Explore a Vitrine Tech e adicione produtos. Eles ficarão salvos automaticamente no aparelho.
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
        // Card de cada item presente no carrinho
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            {/* Miniatura do produto */}
            <Image source={{ uri: item.image }} style={styles.imagem} />

            {/* Informações e botões de ação do item */}
            <View style={styles.infoItem}>
              <Text style={styles.tituloItem} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.precoItem}>
                R$ {Number(item.price || 0).toFixed(2)}
              </Text>

              {/* Botões "Ver Produto" e "Remover" */}
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

                {/* Remove apenas este produto (atualiza ou apaga a chave no AsyncStorage) */}
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

      {/* Rodapé de checkout (Requisito 4 da Aula 9): exibe "Esvaziar" ao lado de "Finalizar Pedido" */}
      {carrinho.length > 0 && (
        <View style={styles.rodapeCheckout}>
          {/* Botão "Esvaziar" com confirmação via Alert */}
          <TouchableOpacity
            style={styles.botaoEsvaziar}
            onPress={handleConfirmarEsvaziar}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-bin-outline" size={18} color="#DC2626" />
            <Text style={styles.textoEsvaziar}>Esvaziar</Text>
          </TouchableOpacity>

          {/* Botão principal "Finalizar Pedido" */}
          <TouchableOpacity
            style={styles.botaoFinalizar}
            onPress={handleFinalizarPedido}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.textoFinalizar}>
              Finalizar Pedido
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Folha de estilos exclusiva da tela CarrinhoScreen
const styles = StyleSheet.create({
  // Fundo claro da tela inteira
  tela: {
    flex: 1,                    // Altura total
    backgroundColor: '#F8FAFC', // Cinza muito claro
  },
  // Painel escuro no topo com quantidade de itens e total em R$
  resumoCard: {
    flexDirection: 'row',       // Duas colunas lado a lado
    backgroundColor: '#1E293B', // Azul petróleo escuro
    margin: 16,                 // Margem externa
    borderRadius: 14,           // Cantos arredondados
    paddingVertical: 16,        // Espaçamento interno vertical
    alignItems: 'center',       // Centralizados verticalmente
  },
  // Coluna individual do resumo
  resumoItem: {
    flex: 1,              // 50% de largura para cada indicador
    alignItems: 'center', // Centraliza número e texto
  },
  // Número em destaque no resumo
  resumoValor: {
    fontSize: 20,       // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#38BDF8',   // Azul celeste
  },
  // Cor verde menta destacando o valor monetário somado
  resumoValorPreco: {
    color: '#34D399', // Verde menta vibrante
  },
  // Legenda abaixo do indicador
  resumoLabel: {
    fontSize: 12,     // Fonte compacta
    color: '#CBD5E1', // Cinza claro
    marginTop: 2,     // Espaço superior
  },
  // Divisória vertical central
  divisorVertical: {
    width: 1,                   // Espessura fina
    height: 34,                 // Altura fixa
    backgroundColor: '#334155', // Cinza azulado
  },
  // Espaçamento da lista
  lista: {
    paddingHorizontal: 16, // Margens laterais
    paddingBottom: 20,     // Folga no final da lista
    flexGrow: 1,           // Permite centralizar o estado vazio
  },
  // Contêiner do estado vazio
  vazioBox: {
    flex: 1,                  // Ocupa espaço livre
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
    paddingHorizontal: 28,    // Margem lateral para leitura
    paddingVertical: 48,      // Respiro vertical
  },
  // Título do carrinho vazio
  vazioTitulo: {
    fontSize: 18,       // Destaque
    fontWeight: 'bold', // Negrito
    color: '#1E293B',   // Escuro
    marginTop: 14,      // Espaço abaixo do ícone
    marginBottom: 6,    // Espaço antes do subtítulo
  },
  // Texto explicativo do estado vazio
  vazioSubtitulo: {
    fontSize: 14,        // Fonte padrão
    color: '#64748B',    // Cinza médio
    textAlign: 'center', // Centralizado
    lineHeight: 20,      // Entrelinha legível
    marginBottom: 20,    // Espaço antes do botão
  },
  // Botão azul para abrir a Vitrine
  botaoVitrine: {
    backgroundColor: '#2563EB', // Azul principal
    paddingVertical: 12,        // Altura interna
    paddingHorizontal: 22,      // Largura interna
    borderRadius: 10,           // Cantos arredondados
  },
  // Texto do botão "Ir para a Vitrine"
  textoBotaoVitrine: {
    color: '#FFFFFF',   // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 14,       // Fonte padrão
  },
  // Card individual de cada item do carrinho
  cardItem: {
    flexDirection: 'row',       // Miniatura à esquerda, textos à direita
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12,           // Cantos arredondados
    padding: 12,                // Espaçamento interno
    marginBottom: 12,           // Espaço entre cards
    borderWidth: 1,             // Borda fina
    borderColor: '#E2E8F0',     // Cinza claro
    alignItems: 'center',       // Centralizados verticalmente
  },
  // Miniatura do produto
  imagem: {
    width: 64,                  // Largura fixa
    height: 64,                 // Altura fixa
    resizeMode: 'contain',      // Sem corte ou distorção
    marginRight: 12,            // Espaço entre imagem e textos
    backgroundColor: '#F8FAFC', // Fundo suave
    borderRadius: 8,            // Arredondamento
  },
  // Coluna direita com título, preço e ações
  infoItem: {
    flex: 1, // Ocupa o restante da largura
  },
  // Título do produto
  tituloItem: {
    fontSize: 14,       // Fonte legível
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Escuro
    marginBottom: 4,    // Espaço antes do preço
  },
  // Preço unitário do item
  precoItem: {
    fontSize: 16,       // Destaque
    fontWeight: 'bold', // Negrito
    color: '#059669',   // Verde esmeralda
    marginBottom: 10,   // Espaço antes dos botões
  },
  // Linha horizontal dos botões "Ver Produto" e "Remover"
  acoesLinha: {
    flexDirection: 'row', // Lado a lado
    gap: 8,               // Espaço entre botões
  },
  // Botão azul claro "Ver Produto"
  botaoDetalhes: {
    flex: 1,                    // Ocupa espaço livre
    backgroundColor: '#EFF6FF', // Fundo azul suave
    paddingVertical: 7,         // Altura interna
    borderRadius: 8,            // Cantos arredondados
    alignItems: 'center',       // Centraliza o texto
  },
  // Texto do botão "Ver Produto"
  textoDetalhes: {
    color: '#1D4ED8',   // Azul forte
    fontWeight: 'bold', // Negrito
    fontSize: 12,       // Fonte compacta
  },
  // Botão vermelho claro "Remover"
  botaoRemover: {
    flexDirection: 'row',       // Ícone e texto lado a lado
    alignItems: 'center',       // Alinhados verticalmente
    justifyContent: 'center',   // Centralizados horizontalmente
    backgroundColor: '#FEF2F2', // Fundo vermelho suave
    paddingVertical: 7,         // Altura interna
    paddingHorizontal: 12,      // Largura interna
    borderRadius: 8,            // Cantos arredondados
    gap: 4,                     // Espaço entre ícone e texto
  },
  // Texto do botão "Remover"
  textoRemover: {
    color: '#DC2626',   // Vermelho de exclusão
    fontWeight: 'bold', // Negrito
    fontSize: 12,       // Fonte compacta
  },
  // Rodapé branco fixo com "Esvaziar" e "Finalizar Pedido" lado a lado (Requisito 4)
  rodapeCheckout: {
    flexDirection: 'row',       // Posiciona "Esvaziar" e "Finalizar Pedido" lado a lado
    backgroundColor: '#FFFFFF', // Fundo branco limpo
    padding: 14,                // Espaçamento interno
    borderTopWidth: 1,          // Linha divisória superior
    borderTopColor: '#E2E8F0',  // Cinza claro
    gap: 10,                    // Espaço entre os dois botões
  },
  // Botão vermelho "Esvaziar" ao lado de "Finalizar Pedido"
  botaoEsvaziar: {
    flexDirection: 'row',       // Ícone de lixeira + texto lado a lado
    alignItems: 'center',       // Alinhamento vertical
    justifyContent: 'center',   // Alinhamento horizontal
    backgroundColor: '#FEF2F2', // Fundo vermelho bem claro
    borderWidth: 1,             // Borda fina
    borderColor: '#FECACA',     // Vermelho claro na borda
    paddingVertical: 14,        // Mesma altura do botão Finalizar Pedido
    paddingHorizontal: 16,      // Largura confortável
    borderRadius: 10,           // Cantos arredondados
    gap: 6,                     // Espaço entre ícone e texto
  },
  // Texto vermelho do botão "Esvaziar"
  textoEsvaziar: {
    color: '#DC2626',   // Vermelho forte
    fontWeight: 'bold', // Negrito
    fontSize: 14,       // Fonte legível
  },
  // Botão verde principal "Finalizar Pedido" ocupando o restante da largura
  botaoFinalizar: {
    flex: 1,                    // Expande para preencher o espaço ao lado de "Esvaziar"
    flexDirection: 'row',       // Ícone + texto lado a lado
    backgroundColor: '#059669', // Verde esmeralda
    paddingVertical: 14,        // Altura confortável
    borderRadius: 10,           // Cantos arredondados
    alignItems: 'center',       // Centraliza verticalmente
    justifyContent: 'center',   // Centraliza horizontalmente
    gap: 8,                     // Espaço entre ícone e texto
  },
  // Texto branco do botão "Finalizar Pedido"
  textoFinalizar: {
    color: '#FFFFFF',   // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 15,       // Fonte destacada
  },
});
