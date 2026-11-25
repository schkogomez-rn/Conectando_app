// Arquivo: src/components/FiltroCategoria.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Requisito 3): Barra de Filtros Horizontal com ScrollView
// ============================================================================

// Importa o React
import React from 'react';
// Importa ScrollView, TouchableOpacity, Text, View e StyleSheet do React Native
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

// Exporta o componente 'FiltroCategoria' recebendo via Props:
// - categorias: Array de nomes de categorias (ex: ['Todos', 'Mobile', ...])
// - ativa: String com o nome da categoria selecionada no momento
// - aoSelecionar: função callback para avisar o App.js qual categoria foi clicada
export default function FiltroCategoria({ categorias, ativa, aoSelecionar }) {
  // Retorna o contêiner com a rolagem horizontal de chips
  return (
    <View style={styles.wrapper}>
      {/* ScrollView com a prop 'horizontal' para permitir deslizar os filtros para os lados */}
      <ScrollView
        horizontal // Habilita a rolagem no eixo horizontal (esquerda <-> direita)
        showsHorizontalScrollIndicator={false} // Esconde a barra de rolagem horizontal
        contentContainerStyle={styles.scrollConteudo} // Espaçamento interno da lista horizontal
      >
        {/* Percorre o Array de categorias usando .map() para desenhar um botão (chip) para cada uma */}
        {categorias.map((categoria) => {
          // Verifica se a categoria atual do loop é a categoria ativa no estado do Pai
          const estaAtiva = categoria === ativa;

          return (
            // Botão em formato de pílula (chip) para cada categoria
            <TouchableOpacity
              key={categoria} // Chave única obrigatória no .map()
              style={[styles.chip, estaAtiva && styles.chipAtivo]} // Muda a cor se estiver ativa
              onPress={() => aoSelecionar(categoria)} // Envia a categoria clicada para o componente Pai
              activeOpacity={0.75} // Feedback visual ao toque
            >
              {/* Nome da categoria dentro do chip */}
              <Text style={[styles.textoChip, estaAtiva && styles.textoChipAtivo]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// Folha de estilos do FiltroCategoria
const styles = StyleSheet.create({
  // Contêiner externo que garante altura fixa para a barra de filtros
  wrapper: {
    marginVertical: 12, // Espaço acima e abaixo da barra de categorias
  },
  // Espaçamento interno do ScrollView horizontal
  scrollConteudo: {
    paddingHorizontal: 16, // Margem interna nas extremidades esquerda e direita
  },
  // Estilo padrão do botão (chip) inativo
  chip: {
    backgroundColor: '#E2E8F0', // Fundo cinza claro
    paddingHorizontal: 16, // Largura interna do botão
    paddingVertical: 8, // Altura interna do botão
    borderRadius: 20, // Formato arredondado de pílula
    marginRight: 8, // Espaço entre um chip e o próximo à direita
  },
  // Estilo aplicado quando o chip corresponde à categoria selecionada ('ativa')
  chipAtivo: {
    backgroundColor: '#2563EB', // Fundo azul em destaque
  },
  // Estilo do texto quando o chip está inativo
  textoChip: {
    fontSize: 13, // Tamanho da fonte
    fontWeight: '600', // Semi-negrito
    color: '#334155', // Texto cinza escuro
  },
  // Estilo do texto quando o chip está ativo
  textoChipAtivo: {
    color: '#FFFFFF', // Texto branco para contrastar com o fundo azul
  },
});
