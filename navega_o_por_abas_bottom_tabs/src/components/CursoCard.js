// Arquivo: src/components/CursoCard.js
// ============================================================================
// PASSO 2 (Prática Guiada - Aula 8): Card Reutilizável de Curso
// Exibe resumo do curso (categoria, carga horária, nível, título, descrição,
// instrutor e vagas). Muda de cor (borda e fundo verdes) quando o aluno já
// está matriculado e aciona a navegação para DetalhesCurso ao ser tocado.
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text, TouchableOpacity e StyleSheet do React Native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta o componente 'CursoCard' recebendo 3 Props:
// - curso: objeto completo do curso vindo de LISTA_CURSOS
// - matriculado: booleano indicando se o ID do curso está em idsMatriculados
// - onAbrirDetalhes: função callback que navega para a tela DetalhesCurso
export default function CursoCard({ curso, matriculado, onAbrirDetalhes }) {
  // Calcula dinamicamente as vagas restantes: subtrai 1 se o aluno já estiver inscrito
  const vagasRestantes = matriculado ? curso.vagas - 1 : curso.vagas;

  // Retorna o card clicável completo
  return (
    <TouchableOpacity
      style={[styles.card, matriculado && styles.cardMatriculado]} // Aplica destaque verde se matriculado === true
      onPress={onAbrirDetalhes} // Dispara a função de navegação para abrir os detalhes do curso
      activeOpacity={0.85} // Suaviza a opacidade no momento do toque
    >
      {/* Linha superior com a etiqueta de categoria à esquerda e carga horária/nível à direita */}
      <View style={styles.linhaTags}>
        <View style={styles.tagCategoria}>
          <Text style={styles.tagCategoriaTexto}>{curso.categoria}</Text>
        </View>
        {/* Concatena carga horária e nível separados por ponto central */}
        <Text style={styles.cargaHoraria}>
          {curso.cargaHoraria} • {curso.nivel}
        </Text>
      </View>

      {/* Título principal do curso */}
      <Text style={styles.titulo}>{curso.titulo}</Text>

      {/* Descrição resumida limitada a no máximo 2 linhas para manter os cards uniformes */}
      <Text style={styles.descricao} numberOfLines={2}>
        {curso.descricao}
      </Text>

      {/* Rodapé informativo separando o nome do instrutor e o status de vagas/matrícula */}
      <View style={styles.infoRodape}>
        <Text style={styles.instrutor}>{curso.instrutor}</Text>
        {/* Exibe "✓ Matriculado" quando inscrito ou a quantidade restante de vagas */}
        <Text style={styles.vagas}>
          {matriculado ? '✓ Matriculado' : `${vagasRestantes} vagas`}
        </Text>
      </View>

      {/* Barra visual de chamada para ação (CTA) incentivando o toque no card */}
      <View style={styles.botaoDetalhes}>
        <Text style={styles.textoBotaoDetalhes}>Ver Detalhes e Ementa →</Text>
      </View>
    </TouchableOpacity>
  );
}

// Folha de estilos exclusiva do componente CursoCard
const styles = StyleSheet.create({
  // Estilo base do cartão de curso
  card: {
    backgroundColor: '#FFFFFF', // Fundo branco limpo
    borderRadius: 14, // Cantos arredondados
    padding: 16, // Espaçamento interno
    marginBottom: 14, // Espaço vertical entre os cards da lista
    borderWidth: 1.5, // Espessura da borda
    borderColor: '#E2E8F0', // Borda cinza clara padrão
    elevation: 2, // Sombra nativa no Android
    shadowColor: '#000', // Cor da sombra no iOS/Web
    shadowOffset: { width: 0, height: 1 }, // Deslocamento da sombra
    shadowOpacity: 0.08, // Intensidade sutil da sombra
    shadowRadius: 4, // Suavidade da sombra
  },
  // Estilo condicional sobreposto quando o aluno está matriculado no curso
  cardMatriculado: {
    borderColor: '#10B981', // Borda verde esmeralda
    backgroundColor: '#F0FDF4', // Fundo verde bem suave
  },
  // Linha superior de metadados (categoria + carga horária)
  linhaTags: {
    flexDirection: 'row', // Itens lado a lado
    justifyContent: 'space-between', // Alinhados nos extremos
    alignItems: 'center', // Alinhados verticalmente ao centro
    marginBottom: 8, // Espaço antes do título
  },
  // Etiqueta azul clara da categoria
  tagCategoria: {
    backgroundColor: '#EFF6FF', // Azul clarinho
    paddingHorizontal: 10, // Largura interna
    paddingVertical: 4, // Altura interna
    borderRadius: 6, // Arredondamento suave
  },
  // Texto interno da etiqueta de categoria
  tagCategoriaTexto: {
    color: '#1D4ED8', // Azul forte
    fontWeight: 'bold', // Negrito
    fontSize: 12, // Fonte pequena
  },
  // Texto de carga horária e nível
  cargaHoraria: {
    fontSize: 12, // Fonte compacta
    color: '#64748B', // Cinza médio
    fontWeight: '600', // Semi-negrito
  },
  // Título do curso
  titulo: {
    fontSize: 17, // Destaque principal
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Quase preto
    marginBottom: 6, // Espaço antes da descrição
  },
  // Descrição curta do curso
  descricao: {
    fontSize: 13, // Fonte secundária
    color: '#475569', // Cinza escuro
    lineHeight: 19, // Altura da linha para boa leitura
    marginBottom: 12, // Espaço antes do rodapé
  },
  // Linha inferior separada por borda superior fina
  infoRodape: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Centralizado verticalmente
    paddingTop: 10, // Espaço acima do texto após a linha divisória
    borderTopWidth: 1, // Linha divisória horizontal
    borderTopColor: '#E2E8F0', // Cinza claro
    marginBottom: 12, // Espaço antes do botão de detalhes
  },
  // Nome do instrutor
  instrutor: {
    fontSize: 12, // Fonte compacta
    color: '#334155', // Cinza escuro
    fontWeight: '600', // Semi-negrito
  },
  // Indicador de vagas ou status de matriculado
  vagas: {
    fontSize: 12, // Fonte compacta
    color: '#059669', // Verde de confirmação
    fontWeight: 'bold', // Negrito
  },
  // Faixa de ação no rodapé do card
  botaoDetalhes: {
    backgroundColor: '#EFF6FF', // Fundo azul suave
    paddingVertical: 10, // Altura interna
    borderRadius: 8, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
  },
  // Texto da faixa de ação
  textoBotaoDetalhes: {
    color: '#1D4ED8', // Azul vibrante
    fontWeight: 'bold', // Negrito
    fontSize: 13, // Fonte legível
  },
});
