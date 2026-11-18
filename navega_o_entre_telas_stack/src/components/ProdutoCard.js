// Arquivo: src/components/ProdutoCard.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Requisito 2): Card Reutilizável de Produto
// Exibe imagem (item.image), categoria, título (numberOfLines={2}) e preço
// formatado (R$ {item.price.toFixed(2)}), executando a prop onPress ao tocar.
// ============================================================================

// Importa o React
import React from 'react';
// Importa View, Text, Image, TouchableOpacity e StyleSheet do React Native
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta o componente 'ProdutoCard' recebendo 'item' e 'onPress' via Props
export default function ProdutoCard({ item, onPress }) {
  // Retorna um cartão clicável (TouchableOpacity)
  return (
    <TouchableOpacity
      style={styles.card} // Aplica o estilo de cartão horizontal com sombra
      activeOpacity={0.8} // Transparência suave ao tocar
      onPress={onPress} // Dispara a função de navegação recebida via Prop
    >
      {/* Imagem do produto vinda da URL da API FakeStore (item.image) */}
      <Image source={{ uri: item.image }} style={styles.imagem} />

      {/* Coluna à direita da imagem com as informações do produto */}
      <View style={styles.infoContainer}>
        {/* Categoria do produto em letras maiúsculas com proteção contra undefined */}
        <Text style={styles.categoria}>{(item.category || '').toUpperCase()}</Text>

        {/* Título do produto limitado a 2 linhas conforme o Requisito 2 */}
        <Text style={styles.titulo} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Linha inferior com o preço formatado em 2 casas decimais e indicador de detalhes */}
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
  // Estilo do card em formato de linha (imagem à esquerda e textos à direita)
  card: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 14, // Cantos arredondados
    padding: 14, // Espaçamento interno
    marginBottom: 12, // Espaço vertical entre um produto e outro
    flexDirection: 'row', // Alinha imagem e textos lado a lado
    alignItems: 'center', // Centraliza verticalmente
    borderWidth: 1, // Borda sutil
    borderColor: '#E2E8F0', // Cor cinza clara na borda
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Cor da sombra no iOS/Web
    shadowOpacity: 0.06, // Transparência da sombra
    shadowRadius: 4, // Difusão da sombra
    shadowOffset: { width: 0, height: 1 }, // Deslocamento vertical da sombra
  },
  // Estilo da miniatura de imagem do produto
  imagem: {
    width: 75, // Largura fixa de 75px
    height: 75, // Altura fixa de 75px
    resizeMode: 'contain', // Ajusta a imagem inteira sem cortar bordas
    marginRight: 14, // Espaço entre a imagem e os textos
    backgroundColor: '#F8FAFC', // Fundo claro suave atrás da imagem
    borderRadius: 8, // Cantos levemente arredondados
  },
  // Contêiner dos textos que ocupa todo o espaço restante à direita
  infoContainer: {
    flex: 1, // Expande para ocupar a largura disponível
  },
  // Estilo da categoria do produto
  categoria: {
    fontSize: 10, // Fonte pequena
    fontWeight: 'bold', // Negrito
    color: '#2563EB', // Azul de destaque
    marginBottom: 4, // Espaço antes do título
  },
  // Estilo do título do produto
  titulo: {
    fontSize: 15, // Fonte média
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    lineHeight: 20, // Altura de linha
    marginBottom: 8, // Espaço antes do preço
  },
  // Linha inferior com preço à esquerda e link "Detalhes →" à direita
  rodape: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Centralizados verticalmente
  },
  // Estilo do preço em destaque
  preco: {
    fontSize: 17, // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#059669', // Verde esmeralda
  },
  // Texto indicativo de navegação
  verMais: {
    fontSize: 12, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#64748B', // Cinza médio
  },
});
