// Arquivo: src/screens/MinhasMatriculasScreen.js
// ============================================================================
// PASSO 3 (Prática Guiada - Aula 8): Tela da Segunda Aba (Minhas Matrículas)
// - Filtra LISTA_CURSOS exibindo apenas os cursos cujo ID está em idsMatriculados
// - Calcula a Carga Horária Total acumulada usando o método .reduce()
// - Exibe um estado vazio (ListEmptyComponent) com atalho para a aba 'ExplorarTab'
// - Permite abrir a ementa diretamente na pilha da outra aba (navegação aninhada)
//   ou cancelar a matrícula instantaneamente com o botão de lixeira
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text, FlatList, TouchableOpacity e StyleSheet do React Native
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// Importa a família de ícones vetoriais Ionicons do Expo
import { Ionicons } from '@expo/vector-icons';

// Importa a lista completa de cursos para cruzá-la com os IDs matriculados
import { LISTA_CURSOS } from '../data/cursos';

// Exporta a tela exibida na segunda aba inferior (Bottom Tab)
export default function MinhasMatriculasScreen({
  navigation,
  idsMatriculados,
  onToggleMatricula,
}) {
  // Filtra o catálogo mantendo apenas os objetos de curso em que o aluno está inscrito
  const cursosInscritos = LISTA_CURSOS.filter((curso) =>
    idsMatriculados.includes(curso.id)
  );

  // Usa .reduce() para somar a propriedade numérica 'horasNumericas' de todos os cursos inscritos
  // O segundo argumento (0) define o valor inicial do acumulador
  const totalHoras = cursosInscritos.reduce(
    (acumulador, curso) => acumulador + curso.horasNumericas,
    0
  );

  // Retorna a interface da aba "Minhas Matrículas"
  return (
    <View style={styles.tela}>
      {/* Painel escuro de resumo acadêmico (Total de Cursos Ativos + Carga Horária Total) */}
      <View style={styles.resumoCard}>
        {/* Coluna 1: Quantidade de cursos ativos */}
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{cursosInscritos.length}</Text>
          <Text style={styles.resumoLabel}>Cursos Ativos</Text>
        </View>

        {/* Linha divisória vertical entre os dois indicadores */}
        <View style={styles.divisorVertical} />

        {/* Coluna 2: Soma total das horas dos cursos matriculados */}
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{totalHoras}h</Text>
          <Text style={styles.resumoLabel}>Carga Horária Total</Text>
        </View>
      </View>

      {/* Lista performática com apenas os cursos matriculados */}
      <FlatList
        data={cursosInscritos} // Array filtrado de cursos inscritos
        keyExtractor={(item) => item.id} // Chave única por curso
        contentContainerStyle={styles.lista} // Espaçamento interno e flexGrow para centralizar o estado vazio
        // Exibido automaticamente quando o aluno ainda não possui nenhuma matrícula
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            {/* Ícone ilustrativo de chapéu de formatura */}
            <Ionicons name="school-outline" size={56} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Nenhuma matrícula ativa</Text>
            <Text style={styles.vazioSubtitulo}>
              Você ainda não se inscreveu em nenhum curso. Explore o catálogo para garantir sua vaga.
            </Text>
            {/* Botão que troca de aba programaticamente para 'ExplorarTab' */}
            <TouchableOpacity
              style={styles.botaoExplorar}
              onPress={() => navigation.navigate('ExplorarTab')}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoExplorar}>Ir para o Catálogo</Text>
            </TouchableOpacity>
          </View>
        }
        // Renderiza o cartão compacto de cada matrícula ativa
        renderItem={({ item }) => (
          <View style={styles.cardMatricula}>
            {/* Topo do card com categoria em maiúsculas e carga horária */}
            <View style={styles.cardTopo}>
              <Text style={styles.categoria}>{item.categoria}</Text>
              <Text style={styles.cargaHoraria}>{item.cargaHoraria}</Text>
            </View>

            {/* Título e instrutor do curso */}
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.instrutor}>{item.instrutor}</Text>

            {/* Linha de botões de ação do card (Ver Ementa e Cancelar) */}
            <View style={styles.acoesLinha}>
              {/* Navegação Aninhada: salta para a aba 'ExplorarTab' abrindo diretamente a tela 'DetalhesCurso' */}
              <TouchableOpacity
                style={styles.botaoEmenta}
                onPress={() =>
                  navigation.navigate('ExplorarTab', {
                    screen: 'DetalhesCurso', // Nome exato da tela dentro do ExplorarStack
                    params: { curso: item }, // Parâmetro entregue para DetalhesCursoScreen
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoEmenta}>Ver Ementa</Text>
              </TouchableOpacity>

              {/* Botão de cancelar matrícula que remove o ID do estado global no App.js */}
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => onToggleMatricula(item.id)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={16} color="#DC2626" />
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Folha de estilos exclusiva da tela MinhasMatriculasScreen
const styles = StyleSheet.create({
  // Fundo claro ocupando toda a tela
  tela: {
    flex: 1, // Altura total
    backgroundColor: '#F8FAFC', // Cinza muito claro
  },
  // Painel superior escuro com os indicadores de resumo acadêmico
  resumoCard: {
    flexDirection: 'row', // Duas colunas lado a lado
    backgroundColor: '#1E293B', // Azul escuro (Slate 800)
    margin: 16, // Margem externa nos 4 lados
    borderRadius: 14, // Cantos arredondados
    paddingVertical: 16, // Espaçamento vertical interno
    alignItems: 'center', // Centraliza verticalmente os itens e o divisor
  },
  // Cada coluna do painel de resumo
  resumoItem: {
    flex: 1, // Cada coluna ocupa 50% da largura
    alignItems: 'center', // Centraliza número e legenda
  },
  // Número destacado em azul claro no painel de resumo
  resumoValor: {
    fontSize: 22, // Número grande
    fontWeight: 'bold', // Negrito
    color: '#38BDF8', // Azul celeste vibrante
  },
  // Legenda abaixo do número no painel de resumo
  resumoLabel: {
    fontSize: 12, // Fonte compacta
    color: '#CBD5E1', // Cinza claro
    marginTop: 2, // Pequena distância do número
  },
  // Linha vertical fina que separa as duas estatísticas
  divisorVertical: {
    width: 1, // Espessura de 1px
    height: 34, // Altura fixa
    backgroundColor: '#334155', // Cinza azulado intermediário
  },
  // Espaçamento interno da FlatList
  lista: {
    paddingHorizontal: 16, // Margens laterais
    paddingBottom: 28, // Folga inferior
    flexGrow: 1, // Garante que o ListEmptyComponent possa centralizar verticalmente na tela
  },
  // Contêiner centralizado quando não há cursos matriculados
  vazioBox: {
    flex: 1, // Ocupa a altura restante
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    paddingHorizontal: 28, // Evita que o texto encoste nas bordas
    paddingVertical: 48, // Respiro vertical
  },
  // Título do estado vazio
  vazioTitulo: {
    fontSize: 18, // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#1E293B', // Escuro
    marginTop: 14, // Espaço abaixo do ícone
    marginBottom: 6, // Espaço antes do subtítulo
  },
  // Texto explicativo do estado vazio
  vazioSubtitulo: {
    fontSize: 14, // Fonte padrão
    color: '#64748B', // Cinza médio
    textAlign: 'center', // Texto centralizado
    lineHeight: 20, // Altura de linha agradável
    marginBottom: 20, // Espaço antes do botão
  },
  // Botão azul de chamada para ação no estado vazio
  botaoExplorar: {
    backgroundColor: '#2563EB', // Azul principal
    paddingVertical: 12, // Altura interna
    paddingHorizontal: 22, // Largura interna
    borderRadius: 10, // Cantos arredondados
  },
  // Texto branco do botão do estado vazio
  textoBotaoExplorar: {
    color: '#FFFFFF', // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 14, // Fonte legível
  },
  // Cartão de curso matriculado com faixa verde na borda esquerda
  cardMatricula: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    marginBottom: 12, // Distância entre os cards
    borderLeftWidth: 5, // Borda esquerda mais larga indicando status ativo
    borderLeftColor: '#10B981', // Cor verde esmeralda na borda esquerda
    borderWidth: 1, // Borda fina nos demais lados
    borderColor: '#E2E8F0', // Cinza claro nos demais lados
  },
  // Linha superior do card com categoria e carga horária
  cardTopo: {
    flexDirection: 'row', // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    marginBottom: 6, // Espaço antes do título
  },
  // Nome da categoria em letras maiúsculas
  categoria: {
    fontSize: 12, // Fonte compacta
    fontWeight: 'bold', // Negrito
    color: '#1D4ED8', // Azul forte
    textTransform: 'uppercase', // Transforma automaticamente para MAIÚSCULAS
  },
  // Carga horária do curso
  cargaHoraria: {
    fontSize: 12, // Fonte compacta
    fontWeight: '600', // Semi-negrito
    color: '#64748B', // Cinza médio
  },
  // Título do curso matriculado
  titulo: {
    fontSize: 16, // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Escuro
    marginBottom: 4, // Espaço antes do instrutor
  },
  // Nome do instrutor
  instrutor: {
    fontSize: 13, // Fonte secundária
    color: '#475569', // Cinza escuro
    marginBottom: 14, // Espaço antes dos botões de ação
  },
  // Linha horizontal dos botões "Ver Ementa" e "Cancelar"
  acoesLinha: {
    flexDirection: 'row', // Lado a lado
    gap: 10, // Espaçamento entre os dois botões
  },
  // Botão azul claro "Ver Ementa" ocupando o espaço principal
  botaoEmenta: {
    flex: 1, // Ocupa todo o espaço restante à esquerda
    backgroundColor: '#EFF6FF', // Fundo azul bem claro
    paddingVertical: 9, // Altura interna
    borderRadius: 8, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
  },
  // Texto do botão "Ver Ementa"
  textoBotaoEmenta: {
    color: '#1D4ED8', // Azul forte
    fontWeight: 'bold', // Negrito
    fontSize: 13, // Fonte compacta
  },
  // Botão vermelho suave "Cancelar" com ícone de lixeira
  botaoCancelar: {
    flexDirection: 'row', // Ícone e texto lado a lado
    alignItems: 'center', // Alinhados ao centro verticalmente
    justifyContent: 'center', // Centralizados na horizontal
    backgroundColor: '#FEF2F2', // Fundo vermelho muito claro
    paddingVertical: 9, // Altura interna
    paddingHorizontal: 14, // Largura interna
    borderRadius: 8, // Cantos arredondados
    gap: 4, // Pequeno espaço entre o ícone e a palavra "Cancelar"
  },
  // Texto vermelho do botão "Cancelar"
  textoBotaoCancelar: {
    color: '#DC2626', // Vermelho de alerta/remoção
    fontWeight: 'bold', // Negrito
    fontSize: 13, // Fonte compacta
  },
});
