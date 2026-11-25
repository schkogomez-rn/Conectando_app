// Arquivo: src/components/CursoCard.js
// ============================================================================
// EXERCÍCIO PRÁTICO (Requisito 4): Card de Curso Interativo com Controle de Vagas
// ============================================================================

// Importa o React
import React from 'react';
// Importa View, Text, TouchableOpacity e StyleSheet do React Native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta o componente 'CursoCard' recebendo via Props:
// - curso: objeto completo com { id, titulo, categoria, nivel, cargaHoraria, instrutor, vagas, descricao }
// - matriculado: booleano indicando se o usuário já está inscrito neste curso
// - onToggleMatricula: função enviada pelo Pai para matricular ou cancelar matrícula
export default function CursoCard({ curso, matriculado, onToggleMatricula }) {
  // Regra do Requisito 4:
  // Se 'matriculado' for true, subtrai 1 da exibição de vagas disponíveis;
  // caso contrário, mostra o total original de vagas do curso
  const vagasRestantes = matriculado ? curso.vagas - 1 : curso.vagas;

  return (
    // Se 'matriculado' for true, destaca a borda do card em verde (#10B981)
    <View style={[styles.card, matriculado && styles.cardMatriculado]}>
      {/* Linha superior com a etiqueta de Categoria e a Carga Horária / Nível */}
      <View style={styles.linhaTopo}>
        {/* Etiqueta (badge) da categoria do curso */}
        <View style={styles.badgeCategoria}>
          <Text style={styles.textoCategoria}>{curso.categoria}</Text>
        </View>

        {/* Exibe o nível e a carga horária do curso */}
        <Text style={styles.metaInfo}>
          {curso.nivel} • {curso.cargaHoraria}
        </Text>
      </View>

      {/* Título do curso em destaque */}
      <Text style={styles.titulo}>{curso.titulo}</Text>

      {/* Descrição detalhada do curso */}
      <Text style={styles.descricao}>{curso.descricao}</Text>

      {/* Linha com nome do instrutor e quantidade dinâmica de vagas disponíveis */}
      <View style={styles.rodapeInfo}>
        <Text style={styles.instrutor}>👨‍🏫 {curso.instrutor}</Text>
        <Text style={[styles.vagas, matriculado && styles.vagasMatriculado]}>
          🎟️ {vagasRestantes} vagas disponíveis
        </Text>
      </View>

      {/* Botão de ação que alterna texto e cor conforme o estado 'matriculado' */}
      <TouchableOpacity
        style={[styles.botao, matriculado ? styles.botaoMatriculado : styles.botaoDisponivel]}
        onPress={onToggleMatricula} // Chama a função do componente Pai ao clicar
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>
          {matriculado
            ? '✓ Matriculado (Toque para cancelar)'
            : 'Garantir Vaga'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Folha de estilos exclusiva do CursoCard
const styles = StyleSheet.create({
  // Estilo base do card de curso
  card: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    marginBottom: 14, // Espaço abaixo de cada card
    borderWidth: 2, // Espessura da borda
    borderColor: '#E2E8F0', // Borda cinza clara quando não matriculado
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Cor da sombra no iOS/Web
    shadowOpacity: 0.06, // Opacidade suave da sombra
    shadowRadius: 4, // Difusão da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento vertical da sombra
  },
  // Requisito 4: Destaca a borda do card em verde (#10B981) quando matriculado
  cardMatriculado: {
    borderColor: '#10B981', // Borda verde esmeralda
    backgroundColor: '#F0FDF4', // Fundo verde super suave indicando inscrição ativa
  },
  // Linha superior que separa a categoria e a carga horária
  linhaTopo: {
    flexDirection: 'row', // Alinha lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Centraliza verticalmente
    marginBottom: 8, // Espaço inferior
  },
  // Etiqueta azul clara para a categoria
  badgeCategoria: {
    backgroundColor: '#DBEAFE', // Azul claro
    paddingHorizontal: 10, // Espaçamento lateral interno
    paddingVertical: 3, // Espaçamento vertical interno
    borderRadius: 8, // Borda arredondada
  },
  // Texto da categoria
  textoCategoria: {
    fontSize: 11, // Fonte pequena
    fontWeight: 'bold', // Negrito
    color: '#1D4ED8', // Azul forte
    textTransform: 'uppercase', // Maiúsculas
  },
  // Texto de nível e carga horária
  metaInfo: {
    fontSize: 12, // Fonte pequena
    color: '#64748B', // Cinza médio
    fontWeight: '600', // Semi-negrito
  },
  // Estilo do título do curso
  titulo: {
    fontSize: 17, // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Azul escuro quase preto
    marginBottom: 6, // Espaço antes da descrição
  },
  // Estilo da descrição do curso
  descricao: {
    fontSize: 13, // Fonte média-pequena
    color: '#475569', // Cinza escuro confortável para leitura
    lineHeight: 19, // Altura de linha para melhorar legibilidade
    marginBottom: 12, // Espaço antes das informações do instrutor/vagas
  },
  // Linha que exibe o instrutor à esquerda e as vagas à direita
  rodapeInfo: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Alinhados ao centro
    marginBottom: 12, // Espaço antes do botão
  },
  // Texto do instrutor
  instrutor: {
    fontSize: 12, // Fonte compacta
    color: '#334155', // Cinza escuro
    fontWeight: '500', // Peso médio
  },
  // Texto da contagem de vagas disponíveis
  vagas: {
    fontSize: 12, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#2563EB', // Azul padrão
  },
  // Cor verde para o contador de vagas quando o aluno garantiu sua vaga
  vagasMatriculado: {
    color: '#059669', // Verde escuro
  },
  // Estilo base do botão de matrícula
  botao: {
    paddingVertical: 11, // Altura interna do botão
    borderRadius: 8, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto horizontalmente
  },
  // Cor do botão quando ainda não está matriculado ("Garantir Vaga")
  botaoDisponivel: {
    backgroundColor: '#2563EB', // Azul vibrante
  },
  // Cor do botão quando já está matriculado ("✓ Matriculado")
  botaoMatriculado: {
    backgroundColor: '#10B981', // Verde esmeralda (#10B981)
  },
  // Estilo do texto interno do botão
  textoBotao: {
    color: '#FFFFFF', // Texto branco
    fontWeight: 'bold', // Negrito
    fontSize: 14, // Tamanho legível
  },
});
