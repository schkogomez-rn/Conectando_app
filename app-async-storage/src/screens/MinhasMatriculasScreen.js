// Arquivo: src/screens/MinhasMatriculasScreen.js
// ============================================================================
// AULA 9 — PRÁTICA GUIADA (Passo 3): Tela MinhasMatriculasScreen
// Tela da segunda aba inferior ('MinhasMatriculasTab').
// Novidade da Aula 9:
// - Recebe a Prop 'onLimparMatriculas' vinda do App.js
// - Exibe um botão no rodapé da lista ("Limpar Todas as Matrículas Salvas")
//   com confirmação via Alert.alert() (e fallback window.confirm na Web)
// - Ao limpar tudo, o App.js zera idsMatriculados e chama
//   AsyncStorage.removeItem('@catalogo_cursos:matriculas') automaticamente!
// ============================================================================

// Importa o React para habilitar JSX
import React from 'react';
// Importa View, Text, FlatList, TouchableOpacity, Alert, Platform e StyleSheet
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
// Importa os ícones vetoriais Ionicons inclusos no Expo
import { Ionicons } from '@expo/vector-icons';

// Importa o catálogo completo para cruzar com os IDs salvos no AsyncStorage
import { LISTA_CURSOS } from '../data/cursos';

// Exporta a tela 'MinhasMatriculasScreen' recebendo 4 Props:
// - navigation: permite navegar para a aba 'ExplorarTab' (inclusive direto para 'DetalhesCurso')
// - idsMatriculados: Array de IDs salvos e restaurados do AsyncStorage
// - onToggleMatricula: cancela a inscrição de 1 curso específico
// - onLimparMatriculas: remove todas as matrículas de uma vez (testa AsyncStorage.removeItem)
export default function MinhasMatriculasScreen({
  navigation,
  idsMatriculados,
  onToggleMatricula,
  onLimparMatriculas,
}) {
  // Filtra LISTA_CURSOS mantendo apenas os objetos cujos IDs estão em idsMatriculados
  const cursosInscritos = LISTA_CURSOS.filter((curso) =>
    idsMatriculados.includes(curso.id)
  );

  // Soma a carga horária numérica total dos cursos inscritos usando Array.reduce()
  // Começa o acumulador em 0 para retornar 0h quando não houver cursos matriculados
  const totalHoras = cursosInscritos.reduce(
    (acumulador, curso) => acumulador + curso.horasNumericas,
    0
  );

  // Função disparada ao tocar em "Limpar Todas as Matrículas Salvas"
  // Pede confirmação explícita antes de apagar os dados persistidos no aparelho
  function confirmarLimpeza() {
    const titulo = 'Limpar Matrículas';
    const mensagem = 'Deseja remover todas as suas inscrições salvas no dispositivo?';

    // Na Web, Alert.alert não exibe diálogo nativo com múltiplos botões; usamos window.confirm
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(`${titulo}\n\n${mensagem}`);
      if (confirmou) {
        onLimparMatriculas(); // Chama a limpeza que disparará AsyncStorage.removeItem
      }
      return;
    }

    // No Android e iOS, exibe o diálogo nativo Alert.alert com opções Cancelar e Limpar Tudo
    Alert.alert(titulo, mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar Tudo',
        style: 'destructive',
        onPress: () => onLimparMatriculas(), // Aciona limpeza global no App.js
      },
    ]);
  }

  // Retorna a interface da aba Minhas Matrículas
  return (
    <View style={styles.tela}>
      {/* Painel escuro no topo com dois indicadores: Cursos Ativos e Carga Horária Total */}
      <View style={styles.resumoCard}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{cursosInscritos.length}</Text>
          <Text style={styles.resumoLabel}>Cursos Ativos</Text>
        </View>

        {/* Linha divisória vertical entre os dois indicadores */}
        <View style={styles.divisorVertical} />

        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{totalHoras}h</Text>
          <Text style={styles.resumoLabel}>Carga Horária Total</Text>
        </View>
      </View>

      {/* Lista performática das matrículas ativas */}
      <FlatList
        data={cursosInscritos}           // Array de cursos em que o aluno está matriculado
        keyExtractor={(item) => item.id} // Chave única do curso
        contentContainerStyle={styles.lista} // Espaçamento interno e flexGrow para estado vazio
        // Exibido quando o aluno não possui nenhuma matrícula salva
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Ionicons name="school-outline" size={56} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Nenhuma matrícula ativa</Text>
            <Text style={styles.vazioSubtitulo}>
              Você ainda não se inscreveu em nenhum curso. Explore o catálogo para garantir sua vaga.
            </Text>
            {/* Botão de atalho que muda diretamente para a primeira aba ('ExplorarTab') */}
            <TouchableOpacity
              style={styles.botaoExplorar}
              onPress={() => navigation.navigate('ExplorarTab')}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoExplorar}>Ir para o Catálogo</Text>
            </TouchableOpacity>
          </View>
        }
        // Rodapé da lista (Novidade da Aula 9): exibe botão de limpeza total se houver matrículas
        ListFooterComponent={
          cursosInscritos.length > 0 ? (
            <TouchableOpacity
              style={styles.botaoLimparTudo}
              onPress={confirmarLimpeza} // Abre confirmação antes de apagar o AsyncStorage
              activeOpacity={0.8}
            >
              <Ionicons name="trash-bin-outline" size={18} color="#DC2626" />
              <Text style={styles.textoBotaoLimparTudo}>
                Limpar Todas as Matrículas Salvas
              </Text>
            </TouchableOpacity>
          ) : null
        }
        // Renderiza cada cartão de curso matriculado
        renderItem={({ item }) => (
          <View style={styles.cardMatricula}>
            {/* Cabeçalho do card: categoria à esquerda e carga horária à direita */}
            <View style={styles.cardTopo}>
              <Text style={styles.categoria}>{item.categoria}</Text>
              <Text style={styles.cargaHoraria}>{item.cargaHoraria}</Text>
            </View>

            {/* Título e instrutor do curso */}
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.instrutor}>{item.instrutor}</Text>

            {/* Linha de ações: navegar para a ementa na outra aba ou cancelar esta matrícula */}
            <View style={styles.acoesLinha}>
              {/* Navegação cruzada (Nested Navigation): vai para ExplorarTab -> DetalhesCurso */}
              <TouchableOpacity
                style={styles.botaoEmenta}
                onPress={() =>
                  navigation.navigate('ExplorarTab', {
                    screen: 'DetalhesCurso',
                    params: { curso: item },
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoEmenta}>Ver Ementa</Text>
              </TouchableOpacity>

              {/* Remove apenas este curso da lista (e atualiza automaticamente o AsyncStorage) */}
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
  // Fundo claro da tela inteira
  tela: {
    flex: 1,                    // Altura total
    backgroundColor: '#F8FAFC', // Cinza muito claro
  },
  // Painel de resumo escuro no topo
  resumoCard: {
    flexDirection: 'row',       // Dois blocos lado a lado
    backgroundColor: '#1E293B', // Azul petróleo escuro (Slate 800)
    margin: 16,                 // Margem externa nos 4 lados
    borderRadius: 14,           // Cantos arredondados
    paddingVertical: 16,        // Espaçamento interno vertical
    alignItems: 'center',       // Centraliza os itens verticalmente
  },
  // Coluna individual do resumo
  resumoItem: {
    flex: 1,              // Divide igualmente a largura (50% cada)
    alignItems: 'center', // Centraliza número e legenda
  },
  // Número em destaque no resumo
  resumoValor: {
    fontSize: 22,       // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#38BDF8',   // Azul celeste vibrante
  },
  // Legenda abaixo do número
  resumoLabel: {
    fontSize: 12,     // Fonte compacta
    color: '#CBD5E1', // Cinza claro
    marginTop: 2,     // Pequeno espaço acima
  },
  // Linha vertical separando os dois indicadores
  divisorVertical: {
    width: 1,                   // Espessura fina
    height: 34,                 // Altura fixa
    backgroundColor: '#334155', // Cinza azulado
  },
  // Espaçamento da FlatList (flexGrow: 1 permite centralizar o estado vazio)
  lista: {
    paddingHorizontal: 16, // Margens laterais
    paddingBottom: 28,     // Folga no final da lista
    flexGrow: 1,           // Expande quando vazia para centralizar ListEmptyComponent
  },
  // Contêiner do estado vazio
  vazioBox: {
    flex: 1,                   // Ocupa o espaço disponível
    justifyContent: 'center',  // Centraliza verticalmente
    alignItems: 'center',      // Centraliza horizontalmente
    paddingHorizontal: 28,     // Evita texto colado nas bordas
    paddingVertical: 48,       // Respiro vertical
  },
  // Título do estado vazio
  vazioTitulo: {
    fontSize: 18,       // Destaque
    fontWeight: 'bold', // Negrito
    color: '#1E293B',   // Escuro
    marginTop: 14,      // Espaço abaixo do ícone
    marginBottom: 6,    // Espaço antes do subtítulo
  },
  // Texto explicativo do estado vazio
  vazioSubtitulo: {
    fontSize: 14,        // Fonte padrão
    color: '#64748B',    // Cinza médio
    textAlign: 'center', // Texto centralizado
    lineHeight: 20,      // Entrelinha legível
    marginBottom: 20,    // Espaço antes do botão
  },
  // Botão azul "Ir para o Catálogo"
  botaoExplorar: {
    backgroundColor: '#2563EB', // Azul vibrante
    paddingVertical: 12,        // Altura interna
    paddingHorizontal: 22,      // Largura interna
    borderRadius: 10,           // Cantos arredondados
  },
  // Texto do botão "Ir para o Catálogo"
  textoBotaoExplorar: {
    color: '#FFFFFF',   // Branco puro
    fontWeight: 'bold', // Negrito
    fontSize: 14,       // Fonte padrão
  },
  // Cartão de cada curso matriculado com barra lateral verde indicando matrícula ativa
  cardMatricula: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12,           // Cantos arredondados
    padding: 16,                // Espaçamento interno
    marginBottom: 12,           // Distância entre cartões
    borderLeftWidth: 5,         // Faixa lateral destacada à esquerda
    borderLeftColor: '#10B981', // Verde esmeralda
    borderWidth: 1,             // Borda fina nos demais lados
    borderColor: '#E2E8F0',     // Cinza claro
  },
  // Linha superior do card (categoria + carga horária)
  cardTopo: {
    flexDirection: 'row',            // Lado a lado
    justifyContent: 'space-between', // Extremos opostos
    marginBottom: 6,                 // Espaço antes do título
  },
  // Nome da categoria em maiúsculas
  categoria: {
    fontSize: 12,                // Fonte compacta
    fontWeight: 'bold',          // Negrito
    color: '#1D4ED8',            // Azul forte
    textTransform: 'uppercase',  // Converte visualmente para CAIXA ALTA
  },
  // Carga horária à direita
  cargaHoraria: {
    fontSize: 12,      // Fonte compacta
    fontWeight: '600', // Semi-negrito
    color: '#64748B',  // Cinza médio
  },
  // Título do curso
  titulo: {
    fontSize: 16,       // Fonte destacada
    fontWeight: 'bold', // Negrito
    color: '#0F172A',   // Escuro
    marginBottom: 4,    // Espaço antes do instrutor
  },
  // Nome do(a) instrutor(a)
  instrutor: {
    fontSize: 13,     // Fonte secundária
    color: '#475569', // Cinza escuro
    marginBottom: 14, // Espaço antes dos botões
  },
  // Linha horizontal contendo os botões "Ver Ementa" e "Cancelar"
  acoesLinha: {
    flexDirection: 'row', // Botões lado a lado
    gap: 10,              // Distância entre os botões
  },
  // Botão azul suave "Ver Ementa"
  botaoEmenta: {
    flex: 1,                    // Ocupa o espaço livre à esquerda
    backgroundColor: '#EFF6FF', // Fundo azul claro
    paddingVertical: 9,         // Altura interna
    borderRadius: 8,            // Cantos arredondados
    alignItems: 'center',       // Centraliza o texto
  },
  // Texto do botão "Ver Ementa"
  textoBotaoEmenta: {
    color: '#1D4ED8',   // Azul forte
    fontWeight: 'bold', // Negrito
    fontSize: 13,       // Fonte legível
  },
  // Botão vermelho suave "Cancelar"
  botaoCancelar: {
    flexDirection: 'row',       // Ícone e texto lado a lado
    alignItems: 'center',       // Centraliza verticalmente
    justifyContent: 'center',   // Centraliza horizontalmente
    backgroundColor: '#FEF2F2', // Fundo vermelho bem claro
    paddingVertical: 9,         // Altura interna
    paddingHorizontal: 14,      // Largura interna
    borderRadius: 8,            // Cantos arredondados
    gap: 4,                     // Espaço entre o ícone de lixeira e o texto
  },
  // Texto do botão "Cancelar"
  textoBotaoCancelar: {
    color: '#DC2626',   // Vermelho de exclusão
    fontWeight: 'bold', // Negrito
    fontSize: 13,       // Fonte legível
  },
  // Botão de rodapé "Limpar Todas as Matrículas Salvas" (testa AsyncStorage.removeItem)
  botaoLimparTudo: {
    flexDirection: 'row',       // Ícone e texto lado a lado
    alignItems: 'center',       // Centralizados verticalmente
    justifyContent: 'center',   // Centralizados horizontalmente
    backgroundColor: '#FEF2F2', // Fundo vermelho suave
    borderWidth: 1,             // Borda fina
    borderColor: '#FECACA',     // Vermelho claro na borda
    paddingVertical: 12,        // Altura confortável
    borderRadius: 10,           // Cantos arredondados
    marginTop: 8,               // Espaço acima do botão
    gap: 6,                     // Espaço entre o ícone e o texto
  },
  // Texto do botão de limpar todas as matrículas
  textoBotaoLimparTudo: {
    color: '#DC2626',   // Vermelho forte
    fontWeight: 'bold', // Negrito
    fontSize: 13,       // Fonte legível
  },
});
