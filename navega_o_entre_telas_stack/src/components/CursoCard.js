// Arquivo: src/components/CursoCard.js
// ============================================================================
// PASSO 2 (Prática Guiada): Card Clicável de Curso que Dispara a Navegação
// ============================================================================

// Importa o React
import React from 'react';
// Importa View, Text, TouchableOpacity e StyleSheet do React Native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Componente reutilizável que recebe o objeto 'curso' e a função 'onVerDetalhes' via Props
export default function CursoCard({ curso, onVerDetalhes }) {
  // Retorna um card inteiramente clicável (TouchableOpacity)
  return (
    <TouchableOpacity
      style={styles.card} // Estilo visual de cartão branco com sombra
      activeOpacity={0.8} // Leve transparência ao tocar no card
      onPress={onVerDetalhes} // Aciona a navegação para a tela de Detalhes ao tocar
    >
      {/* Linha superior com a tag de categoria à esquerda e carga horária/nível à direita */}
      <View style={styles.linhaTags}>
        {/* Etiqueta (badge) azul clara com o nome da categoria */}
        <View style={styles.tagCategoria}>
          <Text style={styles.tagCategoriaTexto}>{curso.categoria}</Text>
        </View>
        {/* Exibe carga horária e nível separados por um ponto central */}
        <Text style={styles.cargaHoraria}>{curso.cargaHoraria} • {curso.nivel}</Text>
      </View>

      {/* Título do curso em destaque */}
      <Text style={styles.titulo}>{curso.titulo}</Text>

      {/* Descrição resumida limitada a no máximo 2 linhas (numberOfLines={2}) */}
      <Text style={styles.descricao} numberOfLines={2}>
        {curso.descricao}
      </Text>

      {/* Rodapé do card exibindo o nome do instrutor e o indicador "Ver detalhes →" */}
      <View style={styles.rodape}>
        <Text style={styles.instrutor}>{curso.instrutor}</Text>
        <Text style={styles.linkDetalhes}>Ver detalhes →</Text>
      </View>
    </TouchableOpacity>
  );
}

// Folha de estilos do componente CursoCard
const styles = StyleSheet.create({
  // Estilo da caixa principal do card
  card: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 14, // Cantos arredondados
    padding: 16, // Espaçamento interno
    marginBottom: 14, // Espaço inferior entre cards
    borderWidth: 1, // Borda fina de 1px
    borderColor: '#E2E8F0', // Cor cinza clara na borda
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Cor da sombra no iOS/Web
    shadowOffset: { width: 0, height: 1 }, // Deslocamento vertical da sombra
    shadowOpacity: 0.08, // Transparência suave da sombra
    shadowRadius: 4, // Difusão da sombra
  },
  // Linha superior que alinha a categoria e a carga horária nas extremidades
  linhaTags: {
    flexDirection: 'row', // Itens lado a lado
    justifyContent: 'space-between', // Um em cada ponta
    alignItems: 'center', // Alinhados verticalmente ao centro
    marginBottom: 8, // Espaço antes do título
  },
  // Caixa azul clara da etiqueta de categoria
  tagCategoria: {
    backgroundColor: '#EFF6FF', // Azul bem suave
    paddingHorizontal: 10, // Espaçamento interno horizontal
    paddingVertical: 4, // Espaçamento interno vertical
    borderRadius: 6, // Cantos arredondados
  },
  // Texto dentro da etiqueta de categoria
  tagCategoriaTexto: {
    color: '#1D4ED8', // Azul escuro vibrante
    fontWeight: 'bold', // Negrito
    fontSize: 12, // Fonte compacta
  },
  // Texto de carga horária e nível
  cargaHoraria: {
    fontSize: 12, // Fonte compacta
    color: '#64748B', // Cinza médio
    fontWeight: '600', // Semi-negrito
  },
  // Estilo do título do curso
  titulo: {
    fontSize: 17, // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Azul-marinho escuro
    marginBottom: 6, // Espaço abaixo do título
  },
  // Estilo da descrição resumida
  descricao: {
    fontSize: 13, // Fonte média-pequena
    color: '#475569', // Cinza escuro
    lineHeight: 19, // Altura da linha para boa leitura
    marginBottom: 12, // Espaço antes da linha divisória do rodapé
  },
  // Linha inferior do card separada por uma borda no topo
  rodape: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Instrutor à esquerda e link à direita
    alignItems: 'center', // Centralizados verticalmente
    paddingTop: 10, // Espaço interno acima do rodapé
    borderTopWidth: 1, // Linha divisória fina
    borderTopColor: '#E2E8F0', // Cor cinza clara da linha divisória
  },
  // Estilo do nome do instrutor
  instrutor: {
    fontSize: 12, // Fonte pequena
    color: '#334155', // Cinza escuro
    fontWeight: '600', // Semi-negrito
  },
  // Estilo do texto "Ver detalhes →"
  linkDetalhes: {
    fontSize: 13, // Fonte média-pequena
    color: '#2563EB', // Azul de link interativo
    fontWeight: 'bold', // Negrito
  },
});
