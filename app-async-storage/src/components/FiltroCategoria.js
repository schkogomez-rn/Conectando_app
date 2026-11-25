// Arquivo: src/components/FiltroCategoria.js
// ============================================================================
// AULA 9 — PRÁTICA GUIADA (Passo 2): Componente Reutilizável FiltroCategoria
// Renderiza uma barra horizontal rolável de botões em formato de "chips"
// para filtrar os cursos por área ('Todos', 'Mobile', 'Back-end', etc.).
// ============================================================================

// Importa o React para habilitar a sintaxe JSX
import React from 'react';
// Importa ScrollView (rolagem horizontal), TouchableOpacity (botão clicável),
// Text (rótulo), StyleSheet (estilos) e View (contêiner)
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// Exporta o componente recebendo 3 Props:
// - categorias: Array de strings com os nomes das categorias disponíveis
// - ativa: string da categoria atualmente selecionada no estado do pai
// - aoSelecionar: função callback (setCategoriaAtiva) disparada ao tocar em um chip
export default function FiltroCategoria({ categorias, ativa, aoSelecionar }) {
  // Retorna o contêiner com a lista horizontal de filtros
  return (
    <View style={styles.wrapper}>
      {/* ScrollView com rolagem horizontal para comportar várias categorias em telas estreitas */}
      <ScrollView
        horizontal                           // Habilita o deslize da esquerda para a direita
        showsHorizontalScrollIndicator={false} // Oculta a barrinha de rolagem visual
        contentContainerStyle={styles.container} // Aplica espaçamento lateral interno aos chips
      >
        {/* Percorre cada categoria com .map() para gerar um chip clicável */}
        {categorias.map((categoria) => {
          // Compara a categoria atual do laço com a categoria selecionada no estado
          const selecionada = categoria === ativa;

          return (
            <TouchableOpacity
              key={categoria} // Chave única obrigatória para listas geradas via .map()
              // Estilo composto: aplica styles.chip sempre e adiciona styles.chipAtivo se selecionada for true
              style={[styles.chip, selecionada && styles.chipAtivo]}
              // Envia o nome da categoria clicada de volta para o componente pai (CatalogoScreen)
              onPress={() => aoSelecionar(categoria)}
              activeOpacity={0.75} // Efeito visual de toque suave
            >
              {/* Aplica cor branca ao texto quando o chip está selecionado */}
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

// Folha de estilos encapsulada do FiltroCategoria
const styles = StyleSheet.create({
  // Margem externa acima e abaixo da faixa de filtros
  wrapper: {
    marginVertical: 14,
  },
  // Espaçamento nas bordas esquerda e direita dentro do ScrollView
  container: {
    paddingHorizontal: 16,
  },
  // Aparência padrão de um chip inativo (formato pílula)
  chip: {
    backgroundColor: '#E2E8F0', // Fundo cinza claro
    paddingVertical: 8,         // Espaçamento interno vertical
    paddingHorizontal: 16,      // Espaçamento interno horizontal
    borderRadius: 20,           // Arredondamento acentuado formando pílula
    marginRight: 8,             // Distância entre um chip e o próximo
  },
  // Destaque aplicado quando o chip corresponde à categoria ativa
  chipAtivo: {
    backgroundColor: '#2563EB', // Azul vibrante
  },
  // Estilo padrão do texto dentro do chip inativo
  texto: {
    color: '#334155',  // Cinza escuro legível
    fontWeight: '600', // Semi-negrito
    fontSize: 13,      // Fonte compacta
  },
  // Cor do texto quando o chip está ativo
  textoAtivo: {
    color: '#FFFFFF', // Branco puro para contraste sobre o fundo azul
  },
});
