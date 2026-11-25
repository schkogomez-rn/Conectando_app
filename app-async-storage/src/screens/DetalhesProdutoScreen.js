// Arquivo: src/screens/DetalhesProdutoScreen.js
// ============================================================================
// AULA 9 — EXERCÍCIO PRÁTICO (Seção 4 - Vitrine Tech com Carrinho Persistente):
// Tela de Detalhes do Produto dentro do VitrineStack.
// - Recebe o objeto 'produto' via route.params
// - Consulta o estado global 'carrinho' (persistido no AsyncStorage pelo App.js)
// - Permite adicionar ou remover o item do carrinho; toda alteração é gravada
//   automaticamente na chave '@vitrine_tech:carrinho' pelo useEffect do App.js
// ============================================================================

// Importa o React para habilitar a sintaxe JSX
import React from 'react';
// Importa View, Text, Image, ScrollView, TouchableOpacity e StyleSheet do React Native
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta a tela 'DetalhesProdutoScreen' recebendo:
// - route / navigation: injetados pelo Stack Navigator
// - carrinho: Array global de produtos salvo no AsyncStorage
// - onAdicionarAoCarrinho / onRemoverDoCarrinho: funções globais do App.js
export default function DetalhesProdutoScreen({
  route,
  navigation,
  carrinho = [],
  onAdicionarAoCarrinho,
  onRemoverDoCarrinho,
}) {
  // Extrai com segurança o produto recebido via parâmetros da rota
  const produto = route?.params?.produto;

  // Proteção defensiva caso a tela seja aberta sem parâmetro de produto
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

  // Verifica se já existe no carrinho algum item com o mesmo ID deste produto
  const noCarrinho = carrinho.some((item) => item.id === produto.id);

  // Alterna a presença do produto no carrinho global (e dispara a gravação no AsyncStorage)
  function handleAcaoCarrinho() {
    if (noCarrinho) {
      onRemoverDoCarrinho(produto.id); // Remove pelo ID
    } else {
      onAdicionarAoCarrinho(produto);  // Adiciona o objeto completo do produto
    }
  }

  // Retorna a tela rolável com os detalhes completos do produto
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {/* Quadro branco com a imagem ampliada do produto */}
      <View style={styles.caixaImagem}>
        <Image source={{ uri: produto.image }} style={styles.imagemAmpliada} />
      </View>

      {/* Linha superior com etiqueta de categoria e avaliação média */}
      <View style={styles.linhaTopo}>
        <View style={styles.tagCategoria}>
          <Text style={styles.tagTexto}>{(produto.category || '').toUpperCase()}</Text>
        </View>

        {/* Só renderiza a nota caso o objeto rating exista no produto */}
        {produto.rating && (
          <Text style={styles.avaliacao}>
            ⭐ {produto.rating.rate} ({produto.rating.count} avaliações)
          </Text>
        )}
      </View>

      {/* Título completo e preço formatado com 2 casas decimais */}
      <Text style={styles.titulo}>{produto.title}</Text>
      <Text style={styles.preco}>R$ {Number(produto.price || 0).toFixed(2)}</Text>

      {/* Seção de descrição completa */}
      <Text style={styles.subtitulo}>Descrição do Produto</Text>
      <View style={styles.descricaoBox}>
        <Text style={styles.descricao}>{produto.description}</Text>
      </View>

      {/* Botão principal que adiciona ou remove do carrinho persistente */}
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

      {/* Atalho para abrir diretamente a aba 'CarrinhoTab' quando o item já está no carrinho */}
      {noCarrinho && (
        <TouchableOpacity
          style={styles.botaoIrCarrinho}
          onPress={() => navigation.navigate('CarrinhoTab')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoIrCarrinho}>Ir para o Carrinho →</Text>
        </TouchableOpacity>
      )}

      {/* Botão secundário para voltar à vitrine desempilhando a tela atual */}
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
  // Fundo claro do ScrollView
  tela: {
    flex: 1,                    // Ocupa toda a tela
    backgroundColor: '#F8FAFC', // Cinza claro
  },
  // Espaçamento interno do conteúdo rolável
  conteudo: {
    padding: 20,       // Margem nos 4 lados
    paddingBottom: 40, // Folga no final da rolagem
  },
  // Cartão branco que emoldura a imagem ampliada
  caixaImagem: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 16,           // Cantos arredondados
    padding: 20,                // Espaçamento interno
    alignItems: 'center',       // Centraliza horizontalmente
    justifyContent: 'center',   // Centraliza verticalmente
    borderWidth: 1,             // Borda fina
    borderColor: '#E2E8F0',     // Cinza claro
    marginBottom: 16,           // Espaço abaixo da foto
  },
  // Imagem ampliada do produto
  imagemAmpliada: {
    width: '100%',         // Ocupa a largura total do quadro
    height: 220,           // Altura ampla para visualização
    resizeMode: 'contain', // Exibe o produto inteiro sem cortar
  },
  // Linha superior com categoria à esquerda e nota à direita
  linhaTopo: {
    flexDirection: 'row',            // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center',            // Centralizados verticalmente
    marginBottom: 10,                // Espaço antes do título
  },
  // Etiqueta azul clara da categoria
  tagCategoria: {
    backgroundColor: '#DBEAFE', // Fundo azul suave
    paddingHorizontal: 10,      // Largura interna
    paddingVertical: 4,         // Altura interna
    borderRadius: 6,            // Arredondamento
  },
  // Texto da etiqueta de categoria
  tagTexto: {
    fontSize: 11,       // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#1E40AF',   // Azul escuro
  },
  // Nota de avaliação do produto
  avaliacao: {
    fontSize: 13,       // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#D97706',   // Âmbar/dourado
  },
  // Título completo do produto
  titulo: {
    fontSize: 20,       // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Escuro
    marginBottom: 8,    // Espaço antes do preço
    lineHeight: 26,     // Altura de linha confortável
  },
  // Preço em destaque
  preco: {
    fontSize: 26,       // Fonte bem grande
    fontWeight: 'bold', // Negrito
    color: '#059669',   // Verde esmeralda
    marginBottom: 18,   // Espaço antes da descrição
  },
  // Subtítulo da seção de descrição
  subtitulo: {
    fontSize: 16,       // Destaque secundário
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Escuro
    marginBottom: 8,    // Espaço antes do cartão de texto
  },
  // Cartão branco envolvendo o texto de descrição
  descricaoBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12,           // Cantos arredondados
    padding: 16,                // Espaçamento interno
    borderWidth: 1,             // Borda fina
    borderColor: '#E2E8F0',     // Cinza claro
    marginBottom: 22,           // Espaço antes dos botões
  },
  // Texto da descrição completa
  descricao: {
    fontSize: 14,     // Fonte de leitura
    color: '#475569', // Cinza escuro
    lineHeight: 21,   // Entrelinha confortável
  },
  // Botão azul padrão "Adicionar ao Carrinho"
  botaoCarrinho: {
    backgroundColor: '#2563EB', // Azul vibrante
    paddingVertical: 15,        // Altura confortável
    borderRadius: 10,           // Cantos arredondados
    alignItems: 'center',       // Centraliza o texto
    marginBottom: 10,           // Espaço inferior
  },
  // Cor verde aplicada quando o produto já está no carrinho
  botaoAdicionado: {
    backgroundColor: '#059669', // Verde esmeralda
  },
  // Texto branco do botão principal
  textoBotao: {
    color: '#FFFFFF',   // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 15,       // Fonte destacada
  },
  // Botão de atalho "Ir para o Carrinho →"
  botaoIrCarrinho: {
    backgroundColor: '#EFF6FF', // Fundo azul suave
    paddingVertical: 12,        // Altura interna
    borderRadius: 10,           // Cantos arredondados
    alignItems: 'center',       // Centraliza o texto
    marginBottom: 10,           // Espaço inferior
    borderWidth: 1,             // Borda fina
    borderColor: '#BFDBFE',     // Azul claro
  },
  // Texto do botão "Ir para o Carrinho →"
  textoIrCarrinho: {
    color: '#1D4ED8',   // Azul forte
    fontWeight: 'bold', // Negrito
    fontSize: 14,       // Fonte padrão
  },
  // Botão secundário "Continuar Comprando"
  botaoVoltar: {
    paddingVertical: 12,  // Altura interna
    alignItems: 'center', // Centraliza o texto
  },
  // Texto do botão de voltar
  textoVoltar: {
    color: '#475569',  // Cinza escuro
    fontWeight: '600', // Semi-negrito
    fontSize: 14,      // Fonte padrão
  },
});
