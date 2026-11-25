// Arquivo: src/components/CursoCard.js
// ============================================================================
// AULA 9 — PRÁTICA GUIADA (Passo 2): Componente Reutilizável CursoCard
// Representa cada cartão de curso exibido dentro da FlatList do catálogo.
// Muda visualmente (borda e fundo verdes) quando o curso consta na lista de
// matrículas salvas no AsyncStorage.
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text, TouchableOpacity e StyleSheet do React Native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta o componente recebendo 3 Props:
// - curso: objeto completo do curso (id, titulo, categoria, nivel, cargaHoraria, etc.)
// - matriculado: booleano indicando se curso.id está em idsMatriculados
// - onAbrirDetalhes: função callback executada ao tocar no cartão
export default function CursoCard({ curso, matriculado, onAbrirDetalhes }) {
  // Calcula dinamicamente as vagas restantes: subtrai 1 vaga se o aluno já está inscrito
  const vagasRestantes = matriculado ? curso.vagas - 1 : curso.vagas;

  // Retorna o cartão clicável completo
  return (
    <TouchableOpacity
      // Estilo condicional: aplica destaque verde se 'matriculado' for verdadeiro
      style={[styles.card, matriculado && styles.cardMatriculado]}
      onPress={onAbrirDetalhes} // Dispara a navegação para a tela DetalhesCurso
      activeOpacity={0.85}      // Feedback tátil visual ao pressionar o cartão
    >
      {/* Linha superior contendo a tag de categoria à esquerda e carga horária/nível à direita */}
      <View style={styles.linhaTags}>
        <View style={styles.tagCategoria}>
          <Text style={styles.tagCategoriaTexto}>{curso.categoria}</Text>
        </View>
        <Text style={styles.cargaHoraria}>
          {curso.cargaHoraria} • {curso.nivel}
        </Text>
      </View>

      {/* Título principal do curso */}
      <Text style={styles.titulo}>{curso.titulo}</Text>

      {/* Descrição resumida com limite máximo de 2 linhas (reticências automáticas se passar) */}
      <Text style={styles.descricao} numberOfLines={2}>
        {curso.descricao}
      </Text>

      {/* Linha de informações adicionais separada por uma borda superior sutil */}
      <View style={styles.infoRodape}>
        <Text style={styles.instrutor}>{curso.instrutor}</Text>
        {/* Exibe "Matriculado" caso o curso esteja salvo ou a quantidade de vagas livres */}
        <Text style={styles.vagas}>
          {matriculado ? 'Matriculado' : `${vagasRestantes} vagas`}
        </Text>
      </View>

      {/* Indicação visual de chamada para ação (CTA) no rodapé do cartão */}
      <View style={styles.botaoDetalhes}>
        <Text style={styles.textoBotaoDetalhes}>Ver Detalhes e Ementa</Text>
      </View>
    </TouchableOpacity>
  );
}

// Folha de estilos exclusiva do componente CursoCard
const styles = StyleSheet.create({
  // Estilo padrão do cartão branco com borda e sombra suave
  card: {
    backgroundColor: '#FFFFFF',             // Fundo branco
    borderRadius: 14,                       // Cantos arredondados
    padding: 16,                            // Espaçamento interno nos 4 lados
    marginBottom: 14,                       // Espaço abaixo de cada card na lista
    borderWidth: 1.5,                       // Espessura da borda
    borderColor: '#E2E8F0',                 // Cor cinza clara padrão
    elevation: 2,                           // Sombra nativa no Android
    shadowColor: '#000',                    // Cor da sombra no iOS/Web
    shadowOffset: { width: 0, height: 1 },  // Deslocamento vertical da sombra
    shadowOpacity: 0.08,                    // Opacidade discreta
    shadowRadius: 4,                        // Raio de difusão da sombra
  },
  // Sobrescrita visual aplicada quando o aluno está matriculado no curso
  cardMatriculado: {
    borderColor: '#10B981',     // Borda verde esmeralda
    backgroundColor: '#F0FDF4', // Fundo esverdeado bem suave
  },
  // Linha superior do card com categoria e carga horária
  linhaTags: {
    flexDirection: 'row',            // Elementos lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center',            // Alinhados verticalmente
    marginBottom: 8,                 // Espaço antes do título
  },
  // Etiqueta azul clara envolvendo o nome da categoria
  tagCategoria: {
    backgroundColor: '#EFF6FF', // Fundo azul bem claro
    paddingHorizontal: 10,      // Largura interna
    paddingVertical: 4,         // Altura interna
    borderRadius: 6,            // Arredondamento suave
  },
  // Texto azul dentro da etiqueta de categoria
  tagCategoriaTexto: {
    color: '#1D4ED8',   // Azul escuro
    fontWeight: 'bold', // Negrito
    fontSize: 12,       // Fonte compacta
  },
  // Texto da carga horária e nível à direita
  cargaHoraria: {
    fontSize: 12,      // Fonte compacta
    color: '#64748B',  // Cinza médio
    fontWeight: '600', // Semi-negrito
  },
  // Título do curso
  titulo: {
    fontSize: 17,       // Tamanho de destaque
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Cor bem escura
    marginBottom: 6,    // Espaço antes da descrição
  },
  // Descrição curta do curso
  descricao: {
    fontSize: 13,     // Fonte de leitura
    color: '#475569', // Cinza escuro
    lineHeight: 19,   // Altura de linha confortável
    marginBottom: 12, // Espaço antes do rodapé
  },
  // Rodapé de metadados (instrutor e status de vagas)
  infoRodape: {
    flexDirection: 'row',            // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center',            // Centralizados verticalmente
    paddingTop: 10,                  // Espaço após a borda divisória
    borderTopWidth: 1,               // Linha divisória superior
    borderTopColor: '#E2E8F0',       // Cor cinza clara da divisória
    marginBottom: 12,                // Espaço antes do botão inferior
  },
  // Nome do(a) instrutor(a)
  instrutor: {
    fontSize: 12,      // Fonte compacta
    color: '#334155',  // Cinza escuro
    fontWeight: '600', // Semi-negrito
  },
  // Indicador de vagas ou status "Matriculado"
  vagas: {
    fontSize: 12,       // Fonte compacta
    color: '#059669',   // Verde esmeralda
    fontWeight: 'bold', // Negrito
  },
  // Faixa azul clara que sinaliza que o cartão leva aos detalhes
  botaoDetalhes: {
    backgroundColor: '#EFF6FF', // Fundo azul suave
    paddingVertical: 10,        // Altura interna
    borderRadius: 8,            // Cantos arredondados
    alignItems: 'center',       // Centraliza o texto
  },
  // Texto do botão de detalhes
  textoBotaoDetalhes: {
    color: '#1D4ED8',   // Azul forte
    fontWeight: 'bold', // Negrito
    fontSize: 13,       // Fonte legível
  },
});
