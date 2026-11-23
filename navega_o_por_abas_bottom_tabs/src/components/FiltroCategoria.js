// Arquivo: src/components/FiltroCategoria.js
// ============================================================================
// PASSO 2 (Prática Guiada - Aula 8): Barra Horizontal de Filtros por Categoria
// Renderiza botões em formato de pílula (chips) dentro de um ScrollView
// horizontal, destacando a categoria atualmente ativa e notificando a tela pai.
// ============================================================================

// Importa o React para habilitar a sintaxe JSX
import React from 'react';
// Importa ScrollView, TouchableOpacity, Text, StyleSheet e View do React Native
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// Exporta o componente 'FiltroCategoria' recebendo 3 Props:
// - categorias: Array de Strings com os nomes das categorias disponíveis
// - ativa: String indicando qual categoria está selecionada no estado da tela
// - aoSelecionar: função callback disparada quando o usuário toca em um chip
export default function FiltroCategoria({ categorias, ativa, aoSelecionar }) {
  // Retorna o contêiner com rolagem horizontal contendo todos os chips
  return (
    // View externa que define a margem superior e inferior da faixa de filtros
    <View style={styles.wrapper}>
      {/* ScrollView configurado para rolar lateralmente sem mostrar a barra de rolagem */}
      <ScrollView
        horizontal // Habilita a rolagem no eixo horizontal
        showsHorizontalScrollIndicator={false} // Esconde o indicador visual da barra de rolagem
        contentContainerStyle={styles.container} // Aplica espaçamento interno nas bordas esquerda/direita
      >
        {/* Percorre o Array de categorias criando um botão clicável para cada uma */}
        {categorias.map((categoria) => {
          // Compara a categoria atual do loop com a categoria ativa no estado
          const selecionada = categoria === ativa;

          return (
            // Botão clicável em formato de chip/pílula
            <TouchableOpacity
              key={categoria} // Chave única exigida pelo React em listas geradas com .map()
              style={[styles.chip, selecionada && styles.chipAtivo]} // Mescla o estilo azul se estiver selecionado
              onPress={() => aoSelecionar(categoria)} // Envia o nome da categoria clicada para o componente pai
              activeOpacity={0.75} // Efeito de opacidade durante o toque
            >
              {/* Rótulo textual da categoria com cor condicional */}
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
  // Espaçamento vertical externo da barra de filtros
  wrapper: {
    marginVertical: 14, // Margem de 14px acima e abaixo
  },
  // Espaçamento lateral interno do ScrollView
  container: {
    paddingHorizontal: 16, // Impede que o primeiro e último chip encostem na borda da tela
  },
  // Aparência padrão de um chip não selecionado
  chip: {
    backgroundColor: '#E2E8F0', // Fundo cinza claro
    paddingVertical: 8, // Espaçamento vertical interno
    paddingHorizontal: 16, // Espaçamento horizontal interno
    borderRadius: 20, // Cantos totalmente arredondados (formato de pílula)
    marginRight: 8, // Distância entre um chip e o próximo
  },
  // Estilo adicional aplicado somente ao chip selecionado
  chipAtivo: {
    backgroundColor: '#2563EB', // Fundo azul vibrante para indicar seleção
  },
  // Estilo padrão do texto dentro do chip
  texto: {
    color: '#334155', // Cinza escuro legível
    fontWeight: '600', // Semi-negrito
    fontSize: 13, // Tamanho compacto
  },
  // Cor do texto quando o chip está ativo
  textoAtivo: {
    color: '#FFFFFF', // Branco puro para alto contraste com o fundo azul
  },
});
