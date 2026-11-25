// Arquivo: src/screens/DetalhesCursoScreen.js
// ============================================================================
// AULA 9 — PRÁTICA GUIADA (Passo 3): Tela DetalhesCursoScreen
// Exibe a descrição completa, metadados (instrutor, carga horária, vagas) e a
// ementa detalhada do curso recebido via route.params.
// Permite confirmar ou cancelar a matrícula acionando onToggleMatricula, o que
// atualiza o estado no App.js e dispara automaticamente a gravação no AsyncStorage.
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text, ScrollView, TouchableOpacity e StyleSheet do React Native
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta a tela 'DetalhesCursoScreen' recebendo:
// - route: contém os parâmetros enviados pela navegação (route.params.curso)
// - navigation: permite voltar à tela anterior com navigation.goBack()
// - idsMatriculados: Array global com os IDs dos cursos em que o aluno está inscrito
// - onToggleMatricula: função do App.js que adiciona/remove o ID e sincroniza o AsyncStorage
export default function DetalhesCursoScreen({
  route,
  navigation,
  idsMatriculados,
  onToggleMatricula,
}) {
  // Desestrutura o objeto 'curso' enviado na chamada navigation.navigate('DetalhesCurso', { curso })
  const { curso } = route.params;

  // Verifica se o ID deste curso já faz parte da lista global de matrículas
  const matriculado = idsMatriculados.includes(curso.id);

  // Calcula o número de vagas exibido ao aluno (reduz 1 se já estiver inscrito)
  const vagasRestantes = matriculado ? curso.vagas - 1 : curso.vagas;

  // Retorna o conteúdo em ScrollView para permitir rolagem vertical confortável
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {/* Linha superior com a etiqueta de categoria e o nível do curso */}
      <View style={styles.topoTags}>
        <View style={styles.badgeCategoria}>
          <Text style={styles.badgeCategoriaTexto}>{curso.categoria}</Text>
        </View>
        <Text style={styles.nivelTexto}>Nível: {curso.nivel}</Text>
      </View>

      {/* Título principal e descrição detalhada do curso */}
      <Text style={styles.titulo}>{curso.titulo}</Text>
      <Text style={styles.descricao}>{curso.descricao}</Text>

      {/* Cartão branco com informações estruturadas em linhas chave -> valor */}
      <View style={styles.infoBox}>
        {/* Linha 1: Instrutor(a) */}
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Instrutor(a):</Text>
          <Text style={styles.infoValor}>{curso.instrutor}</Text>
        </View>

        {/* Linha 2: Carga Horária */}
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Carga Horária:</Text>
          <Text style={styles.infoValor}>{curso.cargaHoraria}</Text>
        </View>

        {/* Linha 3: Vagas Disponíveis (remove a borda inferior nesta última linha) */}
        <View style={[styles.infoLinha, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoLabel}>Vagas Disponíveis:</Text>
          <Text style={[styles.infoValor, { color: '#059669' }]}>
            {/* Ajusta singular/plural conforme a quantidade de vagas restantes */}
            {vagasRestantes} {vagasRestantes === 1 ? 'vaga' : 'vagas'}
          </Text>
        </View>
      </View>

      {/* Título da seção de conteúdo programático */}
      <Text style={styles.secaoTitulo}>O que você vai aprender</Text>

      {/* Cartão branco listando os tópicos da ementa usando .map() */}
      <View style={styles.ementaBox}>
        {curso.ementa.map((topico, index) => (
          <View key={index} style={styles.topicoLinha}>
            {/* Exibe numeração amigável começando em 1 (index + 1) */}
            <Text style={styles.topicoNumero}>{index + 1}.</Text>
            <Text style={styles.topicoTexto}>{topico}</Text>
          </View>
        ))}
      </View>

      {/* Botão principal: alterna matrícula no App.js e salva automaticamente no dispositivo */}
      <TouchableOpacity
        // Alterna a cor de fundo entre azul (confirmar) e verde (já matriculado)
        style={[
          styles.botaoPrincipal,
          matriculado ? styles.botaoCancelar : styles.botaoConfirmar,
        ]}
        onPress={() => onToggleMatricula(curso.id)} // Dispara atualização + AsyncStorage
        activeOpacity={0.85}                        // Efeito de toque
      >
        <Text style={styles.textoBotaoPrincipal}>
          {matriculado
            ? 'Matriculado (Cancelar Inscrição)'
            : 'Confirmar Matrícula no Curso'}
        </Text>
      </TouchableOpacity>

      {/* Botão secundário que desempilha a tela atual usando navigation.goBack() */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()} // Retorna para a tela anterior da pilha
        activeOpacity={0.8}                 // Efeito de toque
      >
        <Text style={styles.textoBotaoVoltar}>Voltar para o Catálogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Folha de estilos exclusiva da tela DetalhesCursoScreen
const styles = StyleSheet.create({
  // Fundo claro do ScrollView
  tela: {
    flex: 1,                    // Ocupa toda a altura
    backgroundColor: '#F8FAFC', // Cinza muito claro
  },
  // Espaçamento interno do conteúdo rolável
  conteudo: {
    padding: 20,       // Margem interna nos 4 lados
    paddingBottom: 36, // Folga extra no final da rolagem
  },
  // Linha superior separando badge de categoria e nível
  topoTags: {
    flexDirection: 'row',            // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center',            // Centralizados verticalmente
    marginBottom: 12,                // Espaço antes do título
  },
  // Etiqueta azul clara da categoria
  badgeCategoria: {
    backgroundColor: '#DBEAFE', // Fundo azul suave
    paddingHorizontal: 12,      // Largura interna
    paddingVertical: 5,         // Altura interna
    borderRadius: 8,            // Cantos arredondados
  },
  // Texto da etiqueta de categoria
  badgeCategoriaTexto: {
    color: '#1E40AF',   // Azul escuro
    fontWeight: 'bold', // Negrito
    fontSize: 13,       // Fonte compacta
  },
  // Texto informativo de nível
  nivelTexto: {
    fontSize: 13,      // Fonte compacta
    color: '#64748B',  // Cinza médio
    fontWeight: '600', // Semi-negrito
  },
  // Título grande do curso
  titulo: {
    fontSize: 22,       // Destaque principal
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Escuro
    marginBottom: 10,   // Espaço antes da descrição
  },
  // Parágrafo de descrição
  descricao: {
    fontSize: 15,     // Fonte de leitura confortável
    color: '#475569', // Cinza escuro
    lineHeight: 22,   // Entrelinha arejada
    marginBottom: 20, // Espaço antes da caixa de metadados
  },
  // Cartão branco de informações gerais
  infoBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12,           // Cantos arredondados
    padding: 16,                // Espaçamento interno
    borderWidth: 1,             // Borda fina
    borderColor: '#E2E8F0',     // Cinza claro
    marginBottom: 22,           // Espaço antes da seção de ementa
  },
  // Cada linha de informação com rótulo à esquerda e valor à direita
  infoLinha: {
    flexDirection: 'row',            // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    paddingVertical: 10,             // Altura da linha
    borderBottomWidth: 1,            // Divisória entre linhas
    borderBottomColor: '#F1F5F9',    // Cinza bem suave
  },
  // Rótulo à esquerda
  infoLabel: {
    fontSize: 14,     // Fonte padrão
    color: '#64748B', // Cinza médio
  },
  // Valor em destaque à direita
  infoValor: {
    fontSize: 14,       // Fonte padrão
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Escuro
  },
  // Subtítulo da seção de ementa
  secaoTitulo: {
    fontSize: 17,       // Destaque secundário
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Escuro
    marginBottom: 10,   // Espaço antes do cartão da ementa
  },
  // Cartão branco contendo a lista numerada de tópicos
  ementaBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12,           // Cantos arredondados
    padding: 16,                // Espaçamento interno
    borderWidth: 1,             // Borda fina
    borderColor: '#E2E8F0',     // Cinza claro
    marginBottom: 24,           // Espaço antes dos botões de ação
  },
  // Linha de cada tópico da ementa
  topicoLinha: {
    flexDirection: 'row', // Número e texto lado a lado
    marginBottom: 10,     // Espaço entre tópicos
  },
  // Número azul do tópico
  topicoNumero: {
    fontWeight: 'bold', // Negrito
    color: '#2563EB',   // Azul principal
    marginRight: 8,     // Espaço entre o número e o texto
    fontSize: 14,       // Tamanho padrão
  },
  // Texto descritivo do tópico
  topicoTexto: {
    flex: 1,          // Permite quebra de linha sem vazar da tela
    fontSize: 14,     // Tamanho padrão
    color: '#334155', // Cinza escuro
    lineHeight: 20,   // Entrelinha legível
  },
  // Estilo base do botão principal (Confirmar / Cancelar Matrícula)
  botaoPrincipal: {
    paddingVertical: 14,  // Altura confortável de toque
    borderRadius: 10,     // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    marginBottom: 12,     // Espaço antes do botão Voltar
  },
  // Cor azul quando o aluno ainda não está matriculado
  botaoConfirmar: {
    backgroundColor: '#2563EB', // Azul vibrante
  },
  // Cor verde indicando status matriculado (com opção de cancelar ao clicar)
  botaoCancelar: {
    backgroundColor: '#059669', // Verde esmeralda
  },
  // Texto branco do botão principal
  textoBotaoPrincipal: {
    color: '#FFFFFF',   // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 15,       // Fonte destacada
  },
  // Botão secundário com contorno para voltar ao catálogo
  botaoVoltar: {
    paddingVertical: 12,        // Altura interna
    borderRadius: 10,           // Cantos arredondados
    alignItems: 'center',       // Centraliza o texto
    borderWidth: 1.5,           // Borda visível
    borderColor: '#CBD5E1',     // Cinza claro
    backgroundColor: '#FFFFFF', // Fundo branco
  },
  // Texto do botão de voltar
  textoBotaoVoltar: {
    color: '#334155',   // Cinza escuro
    fontWeight: 'bold', // Negrito
    fontSize: 14,       // Fonte padrão
  },
});
