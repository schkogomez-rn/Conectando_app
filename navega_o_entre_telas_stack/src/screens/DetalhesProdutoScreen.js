// Arquivo: src/screens/DetalhesProdutoScreen.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Requisito 4): Tela de Detalhes do Produto
// - Recebe route.params.produto e exibe imagem ampliada, título completo,
//   descrição (produto.description), avaliação (produto.rating.rate) e preço.
// - Possui botão interativo "Adicionar ao Carrinho" -> "✓ Adicionado ao Carrinho".
// - Possui botão "← Continuar Comprando" utilizando navigation.goBack().
// ============================================================================

// Importa o React e o Hook useState para controlar o botão do carrinho
import React, { useState } from 'react';
// Importa View, Text, Image, ScrollView, TouchableOpacity e StyleSheet do React Native
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta a tela 'DetalhesProdutoScreen' recebendo { route, navigation }
export default function DetalhesProdutoScreen({ route, navigation }) {
  // Extrai o objeto 'produto' enviado pela VitrineScreen via route.params com proteção segura
  const produto = route?.params?.produto;

  // Estado booleano local para alternar o botão "Adicionar ao Carrinho"
  const [noCarrinho, setNoCarrinho] = useState(false);

  // Proteção caso a tela seja acessada sem o parâmetro 'produto'
  if (!produto) {
    return (
      <View style={[styles.tela, styles.conteudo]}>
        <Text style={styles.titulo}>Produto não encontrado</Text>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoVoltar}>← Continuar Comprando</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Retorna um ScrollView com os detalhes completos do produto selecionado
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {/* Caixa branca com a imagem ampliada do produto */}
      <View style={styles.caixaImagem}>
        <Image source={{ uri: produto.image }} style={styles.imagemAmpliada} />
      </View>

      {/* Linha com a tag de categoria e a nota de avaliação (produto.rating.rate) */}
      <View style={styles.linhaTopo}>
        <View style={styles.tagCategoria}>
          <Text style={styles.tagTexto}>{(produto.category || '').toUpperCase()}</Text>
        </View>

        {/* Exibe a nota média de avaliação e a quantidade de avaliações se existir */}
        {produto.rating && (
          <Text style={styles.avaliacao}>
            ⭐ {produto.rating.rate} ({produto.rating.count} avaliações)
          </Text>
        )}
      </View>

      {/* Título completo do produto */}
      <Text style={styles.titulo}>{produto.title}</Text>

      {/* Preço formatado em destaque com conversão numérica segura */}
      <Text style={styles.preco}>R$ {Number(produto.price || 0).toFixed(2)}</Text>

      {/* Seção com a descrição completa do produto (produto.description) */}
      <Text style={styles.subtitulo}>Descrição do Produto</Text>
      <View style={styles.descricaoBox}>
        <Text style={styles.descricao}>{produto.description}</Text>
      </View>

      {/* Requisito 4: Botão interativo "Adicionar ao Carrinho" / "✓ Adicionado ao Carrinho" */}
      <TouchableOpacity
        style={[styles.botaoCarrinho, noCarrinho && styles.botaoAdicionado]}
        onPress={() => setNoCarrinho(!noCarrinho)}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>
          {noCarrinho ? '✓ Adicionado ao Carrinho' : 'Adicionar ao Carrinho'}
        </Text>
      </TouchableOpacity>

      {/* Requisito 4: Botão "← Continuar Comprando" que chama navigation.goBack() */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.textoVoltar}>← Continuar Comprando</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Folha de estilos da tela DetalhesProdutoScreen
const styles = StyleSheet.create({
  // Estilo do ScrollView ocupando toda a tela
  tela: {
    flex: 1, // Ocupa 100% da altura
    backgroundColor: '#F8FAFC', // Fundo claro
  },
  // Espaçamento interno do conteúdo rolável
  conteudo: {
    padding: 20, // Margem interna
    paddingBottom: 40, // Espaço extra no final da rolagem
  },
  // Quadro branco para destacar a foto ampliada do produto
  caixaImagem: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 16, // Cantos arredondados
    padding: 20, // Espaçamento interno
    alignItems: 'center', // Centraliza a imagem
    justifyContent: 'center',
    borderWidth: 1, // Borda sutil
    borderColor: '#E2E8F0', // Cinza claro
    marginBottom: 16, // Espaço abaixo da imagem
  },
  // Estilo da imagem ampliada
  imagemAmpliada: {
    width: '100%', // Largura total da caixa
    height: 220, // Altura generosa para visualizar detalhes
    resizeMode: 'contain', // Mostra o produto inteiro sem cortes
  },
  // Linha que separa a categoria à esquerda e a avaliação à direita
  linhaTopo: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Alinhados ao centro
    marginBottom: 10, // Espaço abaixo da linha
  },
  // Etiqueta azul clara da categoria
  tagCategoria: {
    backgroundColor: '#DBEAFE', // Fundo azul suave
    paddingHorizontal: 10, // Largura interna
    paddingVertical: 4, // Altura interna
    borderRadius: 6, // Arredondamento
  },
  // Texto da etiqueta de categoria
  tagTexto: {
    fontSize: 11, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#1E40AF', // Azul escuro
  },
  // Texto da nota de avaliação (⭐)
  avaliacao: {
    fontSize: 13, // Fonte média-pequena
    fontWeight: 'bold', // Negrito
    color: '#D97706', // Cor âmbar/dourado
  },
  // Estilo do título completo do produto
  titulo: {
    fontSize: 20, // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 8, // Espaço antes do preço
    lineHeight: 26, // Altura da linha
  },
  // Estilo do preço em destaque
  preco: {
    fontSize: 26, // Fonte bem grande
    fontWeight: 'bold', // Negrito
    color: '#059669', // Verde esmeralda
    marginBottom: 18, // Espaço antes da descrição
  },
  // Subtítulo da seção de descrição
  subtitulo: {
    fontSize: 16, // Fonte média
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 8, // Espaço antes do quadro de descrição
  },
  // Caixa branca da descrição
  descricaoBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    borderWidth: 1, // Borda fina
    borderColor: '#E2E8F0', // Cinza claro
    marginBottom: 22, // Espaço antes dos botões
  },
  // Texto da descrição completa do produto
  descricao: {
    fontSize: 14, // Tamanho legível
    color: '#475569', // Cinza escuro
    lineHeight: 21, // Espaçamento entre linhas
  },
  // Estilo padrão do botão "Adicionar ao Carrinho"
  botaoCarrinho: {
    backgroundColor: '#2563EB', // Azul vibrante
    paddingVertical: 15, // Altura interna confortável
    borderRadius: 10, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    marginBottom: 12, // Espaço antes do botão de voltar
  },
  // Estilo do botão quando o item foi adicionado ao carrinho
  botaoAdicionado: {
    backgroundColor: '#059669', // Verde esmeralda
  },
  // Texto do botão principal
  textoBotao: {
    color: '#FFFFFF', // Branco
    fontWeight: 'bold', // Negrito
    fontSize: 16, // Tamanho destacado
  },
  // Botão secundário para voltar à vitrine
  botaoVoltar: {
    paddingVertical: 12, // Altura interna
    alignItems: 'center', // Centraliza o texto
  },
  // Texto do botão "← Continuar Comprando"
  textoVoltar: {
    color: '#475569', // Cinza escuro
    fontWeight: '600', // Semi-negrito
    fontSize: 14, // Tamanho padrão
  },
});
