// Arquivo: src/screens/DetalhesProdutoScreen.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Aba de Carrinho):
// Tela de Detalhes do Produto dentro do VitrineStack.
// - Lê o objeto 'produto' recebido via route.params
// - Consulta o estado global 'carrinho' (vindo do App.js) para verificar se o
//   produto já foi adicionado
// - Permite adicionar ou remover o produto no carrinho compartilhado, atualizando
//   imediatamente o badge numérico da aba 'CarrinhoTab'
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text, Image, ScrollView, TouchableOpacity e StyleSheet do React Native
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta a tela 'DetalhesProdutoScreen' recebendo:
// - route / navigation: injetados pelo Stack Navigator
// - carrinho: Array global de objetos completos de produto mantido no App.js
// - onAdicionarAoCarrinho / onRemoverDoCarrinho: funções globais para alterar o carrinho
export default function DetalhesProdutoScreen({
  route,
  navigation,
  carrinho = [],
  onAdicionarAoCarrinho,
  onRemoverDoCarrinho,
}) {
  // Extrai com segurança o objeto 'produto' enviado pela VitrineScreen ou CarrinhoScreen
  const produto = route?.params?.produto;

  // Proteção defensiva caso a rota seja acessada sem parâmetro de produto
  if (!produto) {
    return (
      <View style={[styles.tela, styles.conteudo]}>
        <Text style={styles.titulo}>Produto não encontrado</Text>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoVoltar}>← Continuar Comprando</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Verifica se algum item do carrinho global possui o mesmo ID deste produto
  const noCarrinho = carrinho.some((item) => item.id === produto.id);

  // Função disparada ao tocar no botão principal: adiciona ou remove do carrinho global
  function handleAcaoCarrinho() {
    if (noCarrinho) {
      onRemoverDoCarrinho(produto.id); // Remove pelo ID se já estiver no carrinho
    } else {
      onAdicionarAoCarrinho(produto); // Adiciona o objeto completo do produto ao carrinho
    }
  }

  // Retorna a visualização completa com rolagem vertical
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {/* Caixa branca com a foto ampliada do produto */}
      <View style={styles.caixaImagem}>
        <Image source={{ uri: produto.image }} style={styles.imagemAmpliada} />
      </View>

      {/* Linha com etiqueta de categoria e avaliação (nota e quantidade de votos) */}
      <View style={styles.linhaTopo}>
        <View style={styles.tagCategoria}>
          <Text style={styles.tagTexto}>{(produto.category || '').toUpperCase()}</Text>
        </View>

        {/* Renderiza a avaliação somente se o objeto produto.rating existir */}
        {produto.rating && (
          <Text style={styles.avaliacao}>
            ⭐ {produto.rating.rate} ({produto.rating.count} avaliações)
          </Text>
        )}
      </View>

      {/* Título completo e preço formatado com 2 casas decimais */}
      <Text style={styles.titulo}>{produto.title}</Text>
      <Text style={styles.preco}>R$ {Number(produto.price || 0).toFixed(2)}</Text>

      {/* Seção de descrição completa do produto */}
      <Text style={styles.subtitulo}>Descrição do Produto</Text>
      <View style={styles.descricaoBox}>
        <Text style={styles.descricao}>{produto.description}</Text>
      </View>

      {/* Botão principal sincronizado com o estado global 'carrinho' do App.js */}
      <TouchableOpacity
        style={[styles.botaoCarrinho, noCarrinho && styles.botaoAdicionado]}
        onPress={handleAcaoCarrinho}
        activeOpacity={0.85}
      >
        <Text style={styles.textoBotao}>
          {noCarrinho
            ? '✓ No Carrinho (Remover Item)'
            : 'Adicionar ao Carrinho'}
        </Text>
      </TouchableOpacity>

      {/* Atalho para ir direto para a aba do carrinho quando o produto já foi adicionado */}
      {noCarrinho && (
        <TouchableOpacity
          style={styles.botaoIrCarrinho}
          onPress={() => navigation.navigate('CarrinhoTab')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoIrCarrinho}>Ir para o Carrinho →</Text>
        </TouchableOpacity>
      )}

      {/* Botão secundário que retorna para a vitrine usando navigation.goBack() */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        activeOpacity={0.75}
      >
        <Text style={styles.textoVoltar}>← Continuar Comprando</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Folha de estilos exclusiva da tela DetalhesProdutoScreen
const styles = StyleSheet.create({
  // Contêiner principal do ScrollView
  tela: {
    flex: 1, // Altura total
    backgroundColor: '#F8FAFC', // Fundo claro
  },
  // Espaçamento interno do conteúdo rolável
  conteudo: {
    padding: 20, // Margem interna
    paddingBottom: 40, // Folga no fim da rolagem
  },
  // Quadro branco que destaca a imagem do produto
  caixaImagem: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 16, // Cantos arredondados
    padding: 20, // Espaçamento interno
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
    borderWidth: 1, // Borda sutil
    borderColor: '#E2E8F0', // Cinza claro
    marginBottom: 16, // Espaço abaixo da foto
  },
  // Estilo da foto ampliada do produto
  imagemAmpliada: {
    width: '100%', // Largura total do quadro
    height: 220, // Altura generosa para visualizar detalhes
    resizeMode: 'contain', // Exibe o produto inteiro sem cortes
  },
  // Linha superior separando categoria e avaliação
  linhaTopo: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Centralizados verticalmente
    marginBottom: 10, // Espaço antes do título
  },
  // Etiqueta azul clara da categoria
  tagCategoria: {
    backgroundColor: '#DBEAFE', // Fundo azul claro
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
  // Texto da nota de avaliação
  avaliacao: {
    fontSize: 13, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#D97706', // Cor dourada/âmbar
  },
  // Título completo do produto
  titulo: {
    fontSize: 20, // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 8, // Espaço antes do preço
    lineHeight: 26, // Altura de linha
  },
  // Preço em destaque
  preco: {
    fontSize: 26, // Fonte bem grande
    fontWeight: 'bold', // Negrito
    color: '#059669', // Verde esmeralda
    marginBottom: 18, // Espaço antes da descrição
  },
  // Subtítulo da descrição
  subtitulo: {
    fontSize: 16, // Fonte média
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 8, // Espaço antes da caixa de texto
  },
  // Cartão branco da descrição
  descricaoBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    borderWidth: 1, // Borda fina
    borderColor: '#E2E8F0', // Cinza claro
    marginBottom: 22, // Espaço antes dos botões
  },
  // Texto completo da descrição
  descricao: {
    fontSize: 14, // Fonte padrão
    color: '#475569', // Cinza escuro
    lineHeight: 21, // Entrelinha confortável
  },
  // Botão azul padrão "Adicionar ao Carrinho"
  botaoCarrinho: {
    backgroundColor: '#2563EB', // Azul vibrante
    paddingVertical: 15, // Altura interna
    borderRadius: 10, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    marginBottom: 10, // Espaço abaixo do botão
  },
  // Cor verde aplicada quando o produto já está no carrinho
  botaoAdicionado: {
    backgroundColor: '#059669', // Verde esmeralda
  },
  // Texto branco do botão principal
  textoBotao: {
    color: '#FFFFFF', // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 15, // Fonte destacada
  },
  // Botão de atalho para abrir diretamente a aba do Carrinho
  botaoIrCarrinho: {
    backgroundColor: '#EFF6FF', // Fundo azul suave
    paddingVertical: 12, // Altura interna
    borderRadius: 10, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    marginBottom: 10, // Espaço antes do botão de voltar
    borderWidth: 1, // Borda fina
    borderColor: '#BFDBFE', // Azul claro
  },
  // Texto do botão "Ir para o Carrinho →"
  textoIrCarrinho: {
    color: '#1D4ED8', // Azul forte
    fontWeight: 'bold', // Negrito
    fontSize: 14, // Fonte padrão
  },
  // Botão secundário para voltar à vitrine
  botaoVoltar: {
    paddingVertical: 12, // Altura interna
    alignItems: 'center', // Centraliza o texto
  },
  // Texto do botão de voltar
  textoVoltar: {
    color: '#475569', // Cinza escuro
    fontWeight: '600', // Semi-negrito
    fontSize: 14, // Fonte padrão
  },
});
