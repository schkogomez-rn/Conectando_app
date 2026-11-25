// Arquivo: src/components/HeaderCatalogo.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Requisito 2): Cabeçalho com Contador de Matrículas
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text e StyleSheet do React Native
import { View, Text, StyleSheet } from 'react-native';

// Exporta o componente 'HeaderCatalogo' recebendo via Props:
// - titulo: título principal do catálogo
// - subtitulo: descrição curta abaixo do título
// - totalInscritos: número de cursos em que o aluno está matriculado
export default function HeaderCatalogo({ titulo, subtitulo, totalInscritos = 0 }) {
  // Retorna o JSX do cabeçalho
  return (
    // Contêiner principal alinhando textos à esquerda e o badge contador à direita
    <View style={styles.container}>
      {/* Coluna esquerda com título e subtítulo */}
      <View style={styles.textosContainer}>
        {/* Exibe o título recebido via Prop */}
        <Text style={styles.titulo}>{titulo}</Text>
        {/* Exibe o subtítulo recebido via Prop */}
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      </View>

      {/* Badge numérico no canto direito exibindo a quantidade de cursos matriculados */}
      <View style={styles.badgeContador}>
        {/* Número de inscrições ativas */}
        <Text style={styles.numeroContador}>{totalInscritos}</Text>
        {/* Rótulo no singular ou plural conforme a quantidade */}
        <Text style={styles.rotuloContador}>
          {totalInscritos === 1 ? 'Inscrito' : 'Inscritos'}
        </Text>
      </View>
    </View>
  );
}

// Folha de estilos do HeaderCatalogo
const styles = StyleSheet.create({
  // Estilo da barra superior do catálogo
  container: {
    backgroundColor: '#0F172A', // Azul-marinho escuro
    paddingTop: 18, // Espaçamento interno superior
    paddingBottom: 18, // Espaçamento interno inferior
    paddingHorizontal: 18, // Espaçamento interno nas laterais
    flexDirection: 'row', // Coloca textos e badge lado a lado
    alignItems: 'center', // Centraliza verticalmente os itens
    justifyContent: 'space-between', // Separa textos à esquerda e badge à direita
    borderBottomLeftRadius: 16, // Arredonda o canto inferior esquerdo
    borderBottomRightRadius: 16, // Arredonda o canto inferior direito
  },
  // Ocupa o espaço disponível à esquerda do badge
  textosContainer: {
    flex: 1, // Expande para ocupar o espaço livre
    paddingRight: 12, // Evita que o texto encoste no badge
  },
  // Estilo do título principal
  titulo: {
    fontSize: 20, // Tamanho da fonte
    fontWeight: 'bold', // Negrito
    color: '#F8FAFC', // Branco suave
  },
  // Estilo do subtítulo
  subtitulo: {
    fontSize: 13, // Fonte menor
    color: '#94A3B8', // Cinza-azulado claro
    marginTop: 3, // Espaço acima do subtítulo
  },
  // Caixa verde/esmeralda no canto direito para o contador de matrículas
  badgeContador: {
    backgroundColor: '#10B981', // Verde esmeralda vibrante
    paddingVertical: 8, // Espaçamento vertical interno
    paddingHorizontal: 14, // Espaçamento horizontal interno
    borderRadius: 12, // Cantos arredondados
    alignItems: 'center', // Centraliza número e rótulo
    minWidth: 74, // Largura mínima para manter proporção uniforme
  },
  // Número grande dentro do badge
  numeroContador: {
    fontSize: 18, // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#FFFFFF', // Branco
  },
  // Texto pequeno abaixo do número ("Inscrito" / "Inscritos")
  rotuloContador: {
    fontSize: 10, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#ECFDF5', // Branco esverdeado claro
    textTransform: 'uppercase', // Letras maiúsculas
  },
});
