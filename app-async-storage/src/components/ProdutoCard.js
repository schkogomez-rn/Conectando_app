// Arquivo: src/components/ProdutoCard.js
// ============================================================================
// AULA 9 — EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Carrinho Persistente):
// Card reutilizável de produto exibido na FlatList da VitrineScreen.
// Exibe a miniatura da imagem, categoria, título (até 2 linhas), preço em R$,
// selo visual verde se o produto já estiver salvo no carrinho persistente
// e executa a navegação ao ser tocado.
// ============================================================================

// Importa o React para habilitar a sintaxe JSX
import React from 'react';
// Importa View, Text, Image, TouchableOpacity e StyleSheet do React Native
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta o componente funcional 'ProdutoCard' recebendo 3 Props:
// - item: objeto do produto (id, title, price, category, image, description, rating)
// - noCarrinho: booleano que indica se o item já consta no carrinho persistente
// - onPress: função callback chamada ao tocar no card (abre DetalhesProduto)
export default function ProdutoCard({ item, noCarrinho = false, onPress }) {
  // Retorna o cartão horizontal clicável
  return (
    <TouchableOpacity
      // Destaca a borda e o fundo em verde caso o produto já esteja no carrinho
      style={[styles.card, noCarrinho && styles.cardNoCarrinho]}
      activeOpacity={0.8} // Transparência suave ao toque
      onPress={onPress}   // Abre a tela de detalhes passando o objeto 'item'
    >
      {/* Miniatura da imagem carregada dinamicamente pela URL externa (item.image) */}
      <Image source={{ uri: item.image }} style={styles.imagem} />

      {/* Coluna à direita contendo categoria, badge, título e preço */}
      <View style={styles.infoContainer}>
        {/* Linha superior com categoria em letras maiúsculas e selo condicional */}
        <View style={styles.topoLinha}>
          <Text style={styles.categoria}>{(item.category || '').toUpperCase()}</Text>
          {/* Renderização condicional (&&): só exibe o selo se 'noCarrinho' for true */}
          {noCarrinho && (
            <View style={styles.badgeCarrinho}>
              <Text style={styles.badgeCarrinhoTexto}>✓ No carrinho</Text>
            </View>
          )}
        </View>

        {/* Título do produto limitado a 2 linhas para manter uniformidade na FlatList */}
        <Text style={styles.titulo} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Rodapé do card com preço formatado com 2 casas decimais e atalho visual */}
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
  // Estilo base do card horizontal (foto à esquerda + informações à direita)
  card: {
    backgroundColor: '#FFFFFF',             // Fundo branco
    borderRadius: 14,                       // Cantos arredondados
    padding: 14,                            // Espaçamento interno
    marginBottom: 12,                       // Espaço entre cards na lista
    flexDirection: 'row',                   // Alinha imagem e coluna de textos lado a lado
    alignItems: 'center',                   // Centraliza verticalmente os elementos
    borderWidth: 1.5,                       // Borda visível
    borderColor: '#E2E8F0',                 // Cinza claro padrão
    elevation: 2,                           // Sombra no Android
    shadowColor: '#000',                    // Cor da sombra no iOS/Web
    shadowOpacity: 0.06,                    // Opacidade sutil
    shadowRadius: 4,                        // Difusão da sombra
    shadowOffset: { width: 0, height: 1 },  // Deslocamento vertical
  },
  // Destaque aplicado quando o produto já está salvo no carrinho
  cardNoCarrinho: {
    borderColor: '#10B981',     // Borda verde esmeralda
    backgroundColor: '#F0FDF4', // Fundo esverdeado suave
  },
  // Miniatura da imagem do produto
  imagem: {
    width: 75,                  // Largura fixa
    height: 75,                 // Altura fixa
    resizeMode: 'contain',      // Exibe o produto inteiro sem cortes ou distorção
    marginRight: 14,            // Espaço entre a imagem e o texto
    backgroundColor: '#FFFFFF', // Fundo branco limpo atrás da imagem
    borderRadius: 8,            // Cantos levemente arredondados
  },
  // Contêiner dos textos que ocupa toda a largura restante à direita
  infoContainer: {
    flex: 1, // Expande para ocupar o espaço livre
  },
  // Linha superior com categoria e badge de carrinho
  topoLinha: {
    flexDirection: 'row',            // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center',            // Centralizados verticalmente
    marginBottom: 4,                 // Espaço antes do título
    gap: 6,                          // Espaço mínimo entre categoria e badge
  },
  // Estilo do texto de categoria
  categoria: {
    fontSize: 10,       // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#2563EB',   // Azul de destaque
    flexShrink: 1,      // Permite encolher caso o nome da categoria seja longo
  },
  // Selo verde indicando que o item já está salvo no carrinho
  badgeCarrinho: {
    backgroundColor: '#DCFCE7', // Verde bem claro
    paddingHorizontal: 7,       // Largura interna
    paddingVertical: 2,         // Altura interna
    borderRadius: 6,            // Arredondamento
  },
  // Texto do selo "✓ No carrinho"
  badgeCarrinhoTexto: {
    fontSize: 10,       // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#047857',   // Verde escuro
  },
  // Título do produto
  titulo: {
    fontSize: 15,       // Tamanho médio
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Escuro
    lineHeight: 20,     // Altura de linha confortável
    marginBottom: 8,    // Espaço antes do preço
  },
  // Rodapé com preço e indicação de navegação
  rodape: {
    flexDirection: 'row',            // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center',            // Centralizados verticalmente
  },
  // Preço em destaque
  preco: {
    fontSize: 17,       // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#059669',   // Verde esmeralda
  },
  // Texto auxiliar de navegação
  verMais: {
    fontSize: 12,       // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#64748B',   // Cinza médio
  },
});
