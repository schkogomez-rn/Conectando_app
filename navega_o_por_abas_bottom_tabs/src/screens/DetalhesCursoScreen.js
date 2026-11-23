// Arquivo: src/screens/DetalhesCursoScreen.js
// ============================================================================
// PASSO 3 (Prática Guiada - Aula 8): Tela de Detalhes e Ementa do Curso
// - Recebe o curso selecionado através de route.params.curso
// - Consulta o estado global 'idsMatriculados' para saber se já está inscrito
// - Chama 'onToggleMatricula(curso.id)' para matricular ou cancelar inscrição,
//   atualizando simultaneamente o Catálogo, o Badge da aba e Minhas Matrículas
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text, ScrollView, TouchableOpacity e StyleSheet do React Native
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Exporta a tela 'DetalhesCursoScreen' recebendo:
// - route: contém os parâmetros enviados via navigation.navigate(..., { curso })
// - navigation: controla o retorno (navigation.goBack())
// - idsMatriculados: Array global de IDs matriculados vindo do App.js
// - onToggleMatricula: função do App.js que adiciona ou remove o ID do curso
export default function DetalhesCursoScreen({
  route,
  navigation,
  idsMatriculados,
  onToggleMatricula,
}) {
  // Extrai com segurança o objeto 'curso' enviado pelos parâmetros da rota
  const curso = route?.params?.curso;

  // Proteção defensiva caso a tela seja aberta sem o parâmetro 'curso'
  if (!curso) {
    return (
      <View style={[styles.tela, styles.conteudo]}>
        <Text style={styles.titulo}>Curso não encontrado</Text>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoVoltar}>← Voltar para o Catálogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Verifica se o ID deste curso já está incluído no estado global de matrículas
  const matriculado = idsMatriculados.includes(curso.id);
  // Atualiza a contagem de vagas em tempo real com base no status de matrícula
  const vagasRestantes = matriculado ? curso.vagas - 1 : curso.vagas;

  // Retorna um ScrollView para permitir rolagem vertical de toda a ementa
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {/* Linha superior com etiqueta da categoria e indicação do nível */}
      <View style={styles.topoTags}>
        <View style={styles.badgeCategoria}>
          <Text style={styles.badgeCategoriaTexto}>{curso.categoria}</Text>
        </View>
        <Text style={styles.nivelTexto}>Nível: {curso.nivel}</Text>
      </View>

      {/* Título completo e descrição detalhada do curso */}
      <Text style={styles.titulo}>{curso.titulo}</Text>
      <Text style={styles.descricao}>{curso.descricao}</Text>

      {/* Cartão branco com as informações estruturadas (Instrutor, Carga Horária, Vagas) */}
      <View style={styles.infoBox}>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Instrutor(a):</Text>
          <Text style={styles.infoValor}>{curso.instrutor}</Text>
        </View>

        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Carga Horária:</Text>
          <Text style={styles.infoValor}>{curso.cargaHoraria}</Text>
        </View>

        {/* Última linha sem borda inferior (borderBottomWidth: 0) */}
        <View style={[styles.infoLinha, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoLabel}>Vagas Disponíveis:</Text>
          <Text style={[styles.infoValor, { color: '#059669' }]}>
            {vagasRestantes} {vagasRestantes === 1 ? 'vaga' : 'vagas'}
          </Text>
        </View>
      </View>

      {/* Título da seção de conteúdo programático */}
      <Text style={styles.secaoTitulo}>O que você vai aprender</Text>

      {/* Quadro branco que percorre o Array 'curso.ementa' com .map() */}
      <View style={styles.ementaBox}>
        {curso.ementa.map((topico, index) => (
          // Cada tópico numerado da ementa (key={index} para listas estáticas)
          <View key={index} style={styles.topicoLinha}>
            <Text style={styles.topicoNumero}>{index + 1}.</Text>
            <Text style={styles.topicoTexto}>{topico}</Text>
          </View>
        ))}
      </View>

      {/* Botão principal: alterna entre Confirmar Matrícula (azul) e Cancelar Inscrição (verde) */}
      <TouchableOpacity
        style={[
          styles.botaoPrincipal,
          matriculado ? styles.botaoCancelar : styles.botaoConfirmar,
        ]}
        onPress={() => onToggleMatricula(curso.id)} // Dispara a função global do App.js
        activeOpacity={0.85} // Suaviza o feedback de toque
      >
        <Text style={styles.textoBotaoPrincipal}>
          {matriculado
            ? '✓ Matriculado (Cancelar Inscrição)'
            : 'Confirmar Matrícula no Curso'}
        </Text>
      </TouchableOpacity>

      {/* Botão secundário que desempilha a tela atual e retorna à tela anterior */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()} // Retorna na pilha do Stack Navigator
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoVoltar}>← Voltar para o Catálogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Folha de estilos exclusiva da tela DetalhesCursoScreen
const styles = StyleSheet.create({
  // ScrollView ocupando toda a área disponível
  tela: {
    flex: 1, // Altura total
    backgroundColor: '#F8FAFC', // Fundo cinza muito claro
  },
  // Espaçamento interno do conteúdo rolável
  conteudo: {
    padding: 20, // Margem interna nos 4 lados
    paddingBottom: 36, // Espaço extra no final da rolagem
  },
  // Linha superior de categoria e nível
  topoTags: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    alignItems: 'center', // Centralizado verticalmente
    marginBottom: 12, // Espaço antes do título
  },
  // Etiqueta azul clara da categoria
  badgeCategoria: {
    backgroundColor: '#DBEAFE', // Fundo azul suave
    paddingHorizontal: 12, // Largura interna
    paddingVertical: 5, // Altura interna
    borderRadius: 8, // Cantos arredondados
  },
  // Texto da etiqueta de categoria
  badgeCategoriaTexto: {
    color: '#1E40AF', // Azul escuro
    fontWeight: 'bold', // Negrito
    fontSize: 13, // Fonte compacta
  },
  // Texto do nível do curso
  nivelTexto: {
    fontSize: 13, // Fonte compacta
    color: '#64748B', // Cinza médio
    fontWeight: '600', // Semi-negrito
  },
  // Título principal do curso
  titulo: {
    fontSize: 22, // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 10, // Espaço abaixo do título
  },
  // Descrição do curso
  descricao: {
    fontSize: 15, // Fonte legível
    color: '#475569', // Cinza escuro
    lineHeight: 22, // Entrelinha confortável
    marginBottom: 20, // Espaço antes do bloco de informações
  },
  // Cartão branco com os dados técnicos do curso
  infoBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    borderWidth: 1, // Borda sutil
    borderColor: '#E2E8F0', // Cinza claro
    marginBottom: 22, // Espaço antes da ementa
  },
  // Cada linha chave-valor dentro do cartão de informações
  infoLinha: {
    flexDirection: 'row', // Rótulo à esquerda e valor à direita
    justifyContent: 'space-between', // Extremos opostos
    paddingVertical: 10, // Espaçamento vertical da linha
    borderBottomWidth: 1, // Separador inferior
    borderBottomColor: '#F1F5F9', // Cinza bem suave
  },
  // Rótulo à esquerda da linha de informação
  infoLabel: {
    fontSize: 14, // Fonte padrão
    color: '#64748B', // Cinza médio
  },
  // Valor à direita da linha de informação
  infoValor: {
    fontSize: 14, // Fonte padrão
    fontWeight: 'bold', // Negrito para destaque
    color: '#0F172A', // Escuro
  },
  // Subtítulo da seção de ementa
  secaoTitulo: {
    fontSize: 17, // Fonte média-grande
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 10, // Espaço antes da caixa de tópicos
  },
  // Quadro branco da lista de tópicos da ementa
  ementaBox: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    borderWidth: 1, // Borda fina
    borderColor: '#E2E8F0', // Cinza claro
    marginBottom: 24, // Espaço antes dos botões
  },
  // Linha individual de um tópico numerado
  topicoLinha: {
    flexDirection: 'row', // Número e texto lado a lado
    marginBottom: 10, // Espaço entre os tópicos
  },
  // Numeração azul do tópico
  topicoNumero: {
    fontWeight: 'bold', // Negrito
    color: '#2563EB', // Azul vibrante
    marginRight: 8, // Distância entre o número e o texto
    fontSize: 14, // Tamanho compatível com o texto
  },
  // Descrição do tópico da ementa
  topicoTexto: {
    flex: 1, // Permite quebra de linha sem estourar a largura da tela
    fontSize: 14, // Fonte legível
    color: '#334155', // Cinza escuro
    lineHeight: 20, // Entrelinha agradável
  },
  // Estilo base do botão de ação principal
  botaoPrincipal: {
    paddingVertical: 14, // Altura confortável para toque
    borderRadius: 10, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    marginBottom: 12, // Espaço antes do botão de voltar
  },
  // Cor azul quando o aluno ainda não está matriculado
  botaoConfirmar: {
    backgroundColor: '#2563EB', // Azul principal
  },
  // Cor verde quando o aluno já está matriculado
  botaoCancelar: {
    backgroundColor: '#059669', // Verde esmeralda
  },
  // Texto branco dentro do botão principal
  textoBotaoPrincipal: {
    color: '#FFFFFF', // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 15, // Fonte destacada
  },
  // Botão secundário com borda para voltar ao catálogo
  botaoVoltar: {
    paddingVertical: 12, // Altura interna
    borderRadius: 10, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    borderWidth: 1.5, // Borda contornada
    borderColor: '#CBD5E1', // Cinza médio-claro
    backgroundColor: '#FFFFFF', // Fundo branco
  },
  // Texto do botão de voltar
  textoBotaoVoltar: {
    color: '#334155', // Cinza escuro
    fontWeight: 'bold', // Negrito
    fontSize: 14, // Fonte padrão
  },
});
