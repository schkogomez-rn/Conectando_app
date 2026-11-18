// Arquivo: src/components/FiltroCategoria.js
// ============================================================================
// PASSO 2 (Prática Guiada): Barra Horizontal de Filtros (ScrollView Horizontal)
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa ScrollView, TouchableOpacity, Text, StyleSheet e View do React Native
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// Exporta o componente 'FiltroCategoria' recebendo 3 Props desestruturadas:
// - categorias: Array com os nomes das categorias disponíveis
// - ativa: String com o nome da categoria atualmente selecionada
// - aoSelecionar: função callback para atualizar a categoria ativa na tela Pai
export default function FiltroCategoria({ categorias, ativa, aoSelecionar }) {
  // Retorna o contêiner com a lista horizontal de botões (chips)
  return (
    // View externa que aplica espaçamento vertical ao redor da barra de filtros
    <View style={styles.wrapper}>
      {/* ScrollView com a propriedade 'horizontal' para rolagem lateral */}
      <ScrollView
        horizontal // Define o sentido da rolagem como horizontal
        showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem inferior
        contentContainerStyle={styles.container} // Aplica espaçamento lateral interno
      >
        {/* Percorre cada categoria do Array para renderizar um botão individual */}
        {categorias.map((categoria) => {
          // Verifica se a categoria do loop é a que está ativa no momento
          const selecionada = categoria === ativa;

          return (
            // Botão clicável em formato de pílula (chip)
            <TouchableOpacity
              key={categoria} // Chave única obrigatória para itens gerados com .map()
              style={[styles.chip, selecionada && styles.chipAtivo]} // Aplica cor azul se selecionada
              onPress={() => aoSelecionar(categoria)} // Informa à tela Pai qual categoria foi clicada
              activeOpacity={0.75} // Controla a opacidade no momento do toque
            >
              {/* Rótulo de texto com o nome da categoria */}
              <Text style={[styles.texto, selecionada && styles.textoAtivo]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// Folha de estilos do componente FiltroCategoria
const styles = StyleSheet.create({
  // Espaçamento externo acima e abaixo da barra de categorias
  wrapper: {
    marginVertical: 14, // Margem superior e inferior de 14px
  },
  // Espaçamento interno do conteúdo rolável
  container: {
    paddingHorizontal: 16, // Margem interna esquerda e direita de 16px
  },
  // Estilo base de cada botão (chip) inativo
  chip: {
    backgroundColor: '#E2E8F0', // Fundo cinza claro
    paddingVertical: 8, // Altura interna
    paddingHorizontal: 16, // Largura interna
    borderRadius: 20, // Arredondamento em formato de pílula
    marginRight: 8, // Espaço à direita entre um chip e outro
  },
  // Estilo adicional aplicado quando o chip está selecionado
  chipAtivo: {
    backgroundColor: '#2563EB', // Fundo azul vibrante
  },
  // Estilo do texto no estado normal (inativo)
  texto: {
    color: '#334155', // Cor cinza escuro
    fontWeight: '600', // Peso semi-negrito
    fontSize: 13, // Tamanho da fonte
  },
  // Estilo adicional do texto quando o chip está ativo
  textoAtivo: {
    color: '#FFFFFF', // Texto branco para contraste com o azul
  },
});
