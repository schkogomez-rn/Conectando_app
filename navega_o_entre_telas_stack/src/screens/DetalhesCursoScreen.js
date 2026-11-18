// Arquivo: src/screens/DetalhesCursoScreen.js
// ============================================================================
// PASSO 4 (Prática Guiada): Tela de Detalhes do Curso
// Recebe { route, navigation }:
// - route.params: contém os dados enviados pela tela anterior ({ curso })
// - navigation.goBack(): desempilha a tela atual e retorna para a tela anterior
// ============================================================================

// Importa o React e o Hook useState para controlar o status de inscrição na tela
import React, { useState } from 'react';
// Importa View, Text, ScrollView, TouchableOpacity e StyleSheet do React Native
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta a tela 'DetalhesCursoScreen' desestruturando { route, navigation }
export default function DetalhesCursoScreen({ route, navigation }) {
  // Extrai o objeto 'curso' enviado pela CatalogoScreen através de route.params com proteção (optional chaining)
  const curso = route?.params?.curso;

  // Estado local desta tela para controlar se o aluno confirmou a inscrição no curso
  const [inscrito, setInscrito] = useState(false);

  // Proteção caso a tela seja aberta sem parâmetros válidos
  if (!curso) {
    return (
      <View style={[styles.tela, styles.conteudo]}>
        <Text style={styles.titulo}>Curso não encontrado</Text>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoVoltar}>← Voltar para o Catálogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Retorna um ScrollView para permitir rolar todos os detalhes e a ementa do curso
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {/* Badge superior exibindo Categoria e Nível */}
      <View style={styles.tag}>
        <Text style={styles.tagTexto}>{curso.categoria} • {curso.nivel}</Text>
      </View>

      {/* Título completo e Descrição do curso */}
      <Text style={styles.titulo}>{curso.titulo}</Text>
      <Text style={styles.descricao}>{curso.descricao}</Text>

      {/* Painel de Informações Gerais (Instrutor, Carga Horária e Vagas Disponíveis) */}
      <View style={styles.infoBox}>
        {/* Linha 1: Nome do Instrutor */}
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Instrutor(a):</Text>
          <Text style={styles.infoValor}>{curso.instrutor}</Text>
        </View>

        {/* Linha 2: Carga Horária */}
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Carga Horária:</Text>
          <Text style={styles.infoValor}>{curso.cargaHoraria}</Text>
        </View>

        {/* Linha 3: Vagas Disponíveis (subtrai 1 dinamicamente se o aluno estiver inscrito) */}
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Vagas Disponíveis:</Text>
          <Text style={styles.infoValor}>
            {inscrito ? curso.vagas - 1 : curso.vagas} vagas
          </Text>
        </View>
      </View>

      {/* Seção de Conteúdo Programático (Ementa) */}
      <Text style={styles.subtitulo}>Conteúdo Programático</Text>
      <View style={styles.ementaBox}>
        {/* Percorre o Array curso.ementa com .map() numerando cada tópico (index + 1) */}
        {(curso.ementa || []).map((topico, index) => (
          <View key={index} style={styles.topicoLinha}>
            <Text style={styles.topicoNumero}>{index + 1}.</Text>
            <Text style={styles.topicoTexto}>{topico}</Text>
          </View>
        ))}
      </View>

      {/* Botão de Ação Principal: alterna o estado 'inscrito' entre true e false */}
      <TouchableOpacity
        style={[styles.botaoInscrever, inscrito && styles.botaoInscrito]}
        onPress={() => setInscrito(!inscrito)}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>
          {inscrito ? '✓ Inscrição Confirmada!' : 'Confirmar Inscrição no Curso'}
        </Text>
      </TouchableOpacity>

      {/* Botão Programático de Retorno: chama navigation.goBack() para voltar ao Catálogo */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.textoVoltar}>← Voltar para o Catálogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Folha de estilos da tela DetalhesCursoScreen
const styles = StyleSheet.create({
  // Estilo do ScrollView ocupando toda a tela
  tela: {
    flex: 1, // Ocupa 100% da altura disponível
    backgroundColor: '#F8FAFC', // Fundo claro
  },
  // Espaçamento interno do conteúdo rolável
  conteudo: {
    padding: 20, // Margem interna de 20px
    paddingBottom: 40, // Espaço extra no rodapé
  },
  // Etiqueta azul clara de categoria e nível
  tag: {
    alignSelf: 'flex-start', // Ajusta a largura ao tamanho do texto
    backgroundColor: '#DBEAFE', // Fundo azul claro
    paddingHorizontal: 12, // Largura interna
    paddingVertical: 5, // Altura interna
    borderRadius: 8, // Cantos arredondados
    marginBottom: 12, // Espaço abaixo da tag
  },
  // Texto dentro da etiqueta superior
  tagTexto: {
    color: '#1E40AF', // Azul escuro
    fontWeight: 'bold', // Negrito
    fontSize: 12, // Tamanho compacto
  },
  // Estilo do título principal do curso
  titulo: {
    fontSize: 24, // Fonte grande de destaque
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Azul-marinho escuro
    marginBottom: 10, // Espaço abaixo do título
  },
  // Estilo da descrição completa
  descricao: {
    fontSize: 15, // Fonte confortável para leitura
    color: '#475569', // Cinza médio-escuro
    lineHeight: 22, // Espaçamento entre linhas
    marginBottom: 20, // Espaço antes do quadro de informações
  },
  // Quadro branco com informações gerais (Instrutor, Carga Horária, Vagas)
  infoBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    borderWidth: 1, // Borda fina
    borderColor: '#E2E8F0', // Cinza claro
    marginBottom: 22, // Espaço abaixo do quadro
  },
  // Linha horizontal dentro do quadro de informações
  infoLinha: {
    flexDirection: 'row', // Rótulo à esquerda e valor à direita
    justifyContent: 'space-between', // Extremos opostos
    paddingVertical: 6, // Espaçamento vertical entre linhas
  },
  // Rótulo de cada linha ("Instrutor(a):", etc.)
  infoLabel: {
    color: '#64748B', // Cinza médio
    fontSize: 14, // Tamanho padrão
  },
  // Valor em destaque de cada linha
  infoValor: {
    color: '#0F172A', // Escuro
    fontWeight: 'bold', // Negrito
    fontSize: 14, // Tamanho padrão
  },
  // Subtítulo da seção "Conteúdo Programático"
  subtitulo: {
    fontSize: 18, // Fonte média-grande
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 12, // Espaço antes da caixa de ementa
  },
  // Caixa branca que agrupa os tópicos da ementa
  ementaBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    borderWidth: 1, // Borda fina
    borderColor: '#E2E8F0', // Cinza claro
    marginBottom: 24, // Espaço antes dos botões
  },
  // Linha de cada tópico numerado da ementa
  topicoLinha: {
    flexDirection: 'row', // Número e texto lado a lado
    marginBottom: 10, // Espaço entre tópicos
  },
  // Número do tópico (1., 2., 3...)
  topicoNumero: {
    fontWeight: 'bold', // Negrito
    color: '#2563EB', // Azul vibrante
    marginRight: 8, // Espaço à direita do número
    fontSize: 14, // Tamanho da fonte
  },
  // Texto descritivo do tópico da ementa
  topicoTexto: {
    flex: 1, // Quebra linha corretamente sem ultrapassar a caixa
    color: '#334155', // Cinza escuro
    fontSize: 14, // Tamanho da fonte
    lineHeight: 20, // Altura da linha
  },
  // Estilo padrão do botão de inscrição (azul)
  botaoInscrever: {
    backgroundColor: '#2563EB', // Azul vibrante
    paddingVertical: 15, // Altura interna generosa
    borderRadius: 10, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    marginBottom: 12, // Espaço antes do botão de voltar
  },
  // Estilo aplicado quando o aluno confirma a inscrição (verde)
  botaoInscrito: {
    backgroundColor: '#059669', // Verde esmeralda
  },
  // Texto do botão principal
  textoBotao: {
    color: '#FFFFFF', // Branco
    fontWeight: 'bold', // Negrito
    fontSize: 16, // Fonte destacada
  },
  // Botão secundário para voltar ao catálogo
  botaoVoltar: {
    paddingVertical: 12, // Espaçamento vertical
    alignItems: 'center', // Centraliza o texto
  },
  // Texto do botão de voltar
  textoVoltar: {
    color: '#475569', // Cinza escuro
    fontWeight: '600', // Semi-negrito
    fontSize: 14, // Tamanho padrão
  },
});
