// Arquivo: src/components/ProdutoCard.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Aba de Carrinho):
// Card reutilizável de produto exibido na FlatList da VitrineScreen.
// Mostra imagem, categoria, título (limitado a 2 linhas), preço formatado em R$,
// selo visual quando o item já foi adicionado ao carrinho e dispara onPress.
// ============================================================================

// Importa o React para habilitar a sintaxe JSX
import React from 'react';
// Importa View, Text, Image, TouchableOpacity e StyleSheet do React Native
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta o componente 'ProdutoCard' recebendo 3 Props:
// - item: objeto do produto (id, title, price, category, image, description, rating)
// - noCarrinho: booleano opcional que indica se o produto já está no carrinho
// - onPress: função callback chamada ao tocar no card (abre DetalhesProduto)
export default function ProdutoCard({ item, noCarrinho = false, onPress }) {
  // Retorna o card horizontal clicável
  return (
    <TouchableOpacity
      style={[styles.card, noCarrinho && styles.cardNoCarrinho]} // Destaca a borda em verde se estiver no carrinho
      activeOpacity={0.8} // Transparência suave ao pressionar
      onPress={onPress} // Navega para os detalhes do produto ao tocar
    >
      {/* Miniatura da imagem do produto carregada a partir da URL (item.image) */}
      <Image source={{ uri: item.image }} style={styles.imagem} />

      {/* Coluna à direita contendo categoria, título, preço e status */}
      <View style={styles.infoContainer}>
        {/* Linha superior com a categoria em maiúsculas e badge se já estiver no carrinho */}
        <View style={styles.topoLinha}>
          <Text style={styles.categoria}>{(item.category || '').toUpperCase()}</Text>
          {noCarrinho && (
            <View style={styles.badgeCarrinho}>
              <Text style={styles.badgeCarrinhoTexto}>✓ No carrinho</Text>
            </View>
          )}
        </View>

        {/* Título do produto limitado a 2 linhas para manter alinhamento da lista */}
        <Text style={styles.titulo} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Rodapé do card com o preço formatado com 2 casas decimais e indicação de detalhes */}
        <View style={styles.rodape}>
          <Text style={styles.preco}>R$ {Number(item.price || 0).toFixed(2)}</Text>
          <Text style={styles.verMais}>Detalhes →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Folha de estilos exclusiva do componente ProdutoCard
const styles = StyleSheet.create({
  // Estilo base do cartão em linha (imagem à esquerda + informações à direita)
  card: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 14, // Cantos arredondados
    padding: 14, // Espaçamento interno
    marginBottom: 12, // Espaço vertical entre os cards
    flexDirection: 'row', // Alinha imagem e textos lado a lado
    alignItems: 'center', // Centraliza verticalmente os elementos
    borderWidth: 1.5, // Borda visível
    borderColor: '#E2E8F0', // Cinza claro padrão
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Cor da sombra no iOS/Web
    shadowOpacity: 0.06, // Opacidade sutil
    shadowRadius: 4, // Difusão da sombra
    shadowOffset: { width: 0, height: 1 }, // Deslocamento vertical
  },
  // Destaque visual quando o produto já está presente no carrinho
  cardNoCarrinho: {
    borderColor: '#10B981', // Borda verde esmeralda
    backgroundColor: '#F0FDF4', // Fundo esverdeado suave
  },
  // Miniatura da imagem do produto
  imagem: {
    width: 75, // Largura fixa
    height: 75, // Altura fixa
    resizeMode: 'contain', // Exibe a foto inteira sem distorcer nem cortar
    marginRight: 14, // Espaço à direita entre a imagem e o texto
    backgroundColor: '#FFFFFF', // Fundo branco limpo atrás da imagem
    borderRadius: 8, // Cantos levemente arredondados
  },
  // Contêiner dos textos que ocupa toda a largura disponível à direita
  infoContainer: {
    flex: 1, // Expande para ocupar o espaço restante
  },
  // Linha superior com categoria e badge de carrinho
  topoLinha: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Centralizado verticalmente
    marginBottom: 4, // Espaço antes do título
    gap: 6, // Espaço mínimo entre os elementos
  },
  // Estilo da categoria do produto
  categoria: {
    fontSize: 10, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#2563EB', // Azul de destaque
    flexShrink: 1, // Evita sobrepor o badge caso a categoria seja longa
  },
  // Selo verde indicando que o item já está no carrinho
  badgeCarrinho: {
    backgroundColor: '#DCFCE7', // Verde muito claro
    paddingHorizontal: 7, // Largura interna
    paddingVertical: 2, // Altura interna
    borderRadius: 6, // Arredondamento
  },
  // Texto do selo "✓ No carrinho"
  badgeCarrinhoTexto: {
    fontSize: 10, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#047857', // Verde escuro
  },
  // Título do produto
  titulo: {
    fontSize: 15, // Tamanho médio
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    lineHeight: 20, // Altura de linha
    marginBottom: 8, // Espaço antes do preço
  },
  // Rodapé com preço e link de detalhes
  rodape: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Alinhamento vertical
  },
  // Preço em destaque
  preco: {
    fontSize: 17, // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#059669', // Verde esmeralda
  },
  // Texto auxiliar de navegação
  verMais: {
    fontSize: 12, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#64748B', // Cinza médio
  },
});
