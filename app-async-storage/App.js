// Arquivo: App.js
// ============================================================================
// AULA 9: Persistência Local com AsyncStorage (Bottom Tabs + Stack Navigator)
// Reúne as duas atividades completas do tutorial, alternáveis pela barra
// didática no topo:
//
// 1. PRÁTICA GUIADA (Seção 3): Catálogo de Cursos com Matrículas Persistentes
//    - Chave no AsyncStorage: '@catalogo_cursos:matriculas'
//    - Aba 1 ('ExplorarTab'): Stack Navigator (Catalogo -> DetalhesCurso)
//    - Aba 2 ('MinhasMatriculasTab'): MinhasMatriculasScreen com badge e botão
//      "Limpar Todas as Matrículas Salvas" (testa AsyncStorage.removeItem)
//
// 2. EXERCÍCIO PRÁTICO (Seção 4): Vitrine Tech com Carrinho Persistente
//    - Chave no AsyncStorage: '@vitrine_tech:carrinho'
//    - Aba 1 ('VitrineTab'): Stack Navigator (Vitrine -> DetalhesProduto)
//    - Aba 2 ('CarrinhoTab'): CarrinhoScreen com soma .reduce(), badge, botão
//      "Esvaziar" (com Alert) e "Finalizar Pedido" (ambos removem a chave)
// ============================================================================
// CONCEITOS-CHAVE DA AULA 9:
// - useState vive na memória RAM (volátil): perde tudo ao fechar o app.
// - AsyncStorage grava no armazenamento interno privado (sandbox) do aparelho:
//   * Android: banco SQLite interno (RKStorage)
//   * iOS: pasta privada RCTAsyncLocalStorage_V1
//   * Web: localStorage do navegador
// - AsyncStorage só aceita textos (string), por isso convertemos Arrays/Objetos
//   com JSON.stringify() ao salvar e JSON.parse() ao ler.
// - ARMADILHA DA SOBRESCRITA INICIAL: usamos o booleano 'dadosCarregados' para
//   impedir que o useEffect de salvamento grave '[]' por cima dos dados antigos
//   enquanto o AsyncStorage.getItem() inicial ainda estiver lendo o disco.
// ============================================================================

// Importa o React e os Hooks:
// - useState: gerencia dados em memória (RAM) que atualizam a interface
// - useEffect: executa efeitos colaterais (ler ao abrir e gravar ao alterar)
import React, { useState, useEffect } from 'react';
// Importa componentes nativos de layout, texto, indicador de carregamento, botão e estilos
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// Importa a barra de status do Expo para manter os ícones claros sobre o topo escuro
import { StatusBar } from 'expo-status-bar';
// Importa o AsyncStorage para persistência assíncrona Chave -> Valor no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa o contêiner raiz obrigatório do React Navigation
import { NavigationContainer } from '@react-navigation/native';
// Importa o criador de navegação em Pilha (Stack Navigator)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importa o criador de navegação por Abas Inferiores (Bottom Tabs Navigator)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importa os ícones vetoriais Ionicons inclusos no Expo
import { Ionicons } from '@expo/vector-icons';

// Importa as 3 telas da Parte 1 (Prática Guiada: Catálogo de Cursos)
import CatalogoScreen from './src/screens/CatalogoScreen';
import DetalhesCursoScreen from './src/screens/DetalhesCursoScreen';
import MinhasMatriculasScreen from './src/screens/MinhasMatriculasScreen';

// Importa as 3 telas da Parte 2 (Exercício Prático: Vitrine Tech + Carrinho)
import VitrineScreen from './src/screens/VitrineScreen';
import DetalhesProdutoScreen from './src/screens/DetalhesProdutoScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';

// Instancia os navegadores (Stack e Tab) da Prática Guiada (Cursos)
const StackCursos = createNativeStackNavigator();
const TabCursos = createBottomTabNavigator();

// Instancia os navegadores (Stack e Tab) do Exercício Prático (Vitrine Tech)
const StackVitrine = createNativeStackNavigator();
const TabVitrine = createBottomTabNavigator();

// ============================================================================
// CHAVES ÚNICAS DE ARMAZENAMENTO NO DISPOSITIVO (Visão Lógica)
// Convenção '@nome_do_app:recurso' evita colisão com outras chaves salvas.
// Lembre-se: estas strings NÃO criam arquivos .json no Gerenciador de Arquivos;
// são identificadores lógicos dentro do banco interno do aplicativo.
// ============================================================================
const CHAVE_MATRICULAS = '@catalogo_cursos:matriculas';
const CHAVE_CARRINHO = '@vitrine_tech:carrinho';

// ============================================================================
// PARTE 1 (PRÁTICA GUIADA): Pilha de navegação da aba 'ExplorarTab'
// Empilha: Catalogo -> DetalhesCurso, compartilhando o estado global persistido
// ============================================================================
function ExplorarStack({ idsMatriculados, onToggleMatricula }) {
  return (
    <StackCursos.Navigator
      // Aparência padrão do cabeçalho nativo para todas as telas desta pilha
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' }, // Fundo azul-marinho escuro
        headerTintColor: '#F8FAFC',                  // Texto e seta de voltar brancos
        headerTitleStyle: { fontWeight: 'bold' },    // Título em negrito
      }}
    >
      {/* Tela 1 da pilha: Catálogo de Cursos */}
      <StackCursos.Screen
        name="Catalogo"                           // Nome interno da rota
        options={{ title: 'Catálogo de Cursos' }} // Título exibido na barra superior
      >
        {/* Render function injeta 'idsMatriculados' junto com {...props} (navigation e route) */}
        {(props) => (
          <CatalogoScreen
            {...props}
            idsMatriculados={idsMatriculados}
          />
        )}
      </StackCursos.Screen>

      {/* Tela 2 da pilha: Detalhes e Ementa do Curso */}
      <StackCursos.Screen
        name="DetalhesCurso"
        // Options dinâmico: exibe no cabeçalho a categoria do curso selecionado
        options={({ route }) => ({
          title: route.params?.curso?.categoria || 'Detalhes do Curso',
        })}
      >
        {(props) => (
          <DetalhesCursoScreen
            {...props}
            idsMatriculados={idsMatriculados}
            onToggleMatricula={onToggleMatricula}
          />
        )}
      </StackCursos.Screen>
    </StackCursos.Navigator>
  );
}

// ============================================================================
// PARTE 2 (EXERCÍCIO PRÁTICO): Pilha de navegação da aba 'VitrineTab'
// Empilha: Vitrine -> DetalhesProduto, compartilhando o carrinho persistido
// ============================================================================
function VitrineStack({ carrinho, onAdicionarAoCarrinho, onRemoverDoCarrinho }) {
  return (
    <StackVitrine.Navigator
      // Estilo padronizado do cabeçalho superior da loja
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* Tela 1 da pilha: Vitrine consumindo a FakeStoreAPI com fallback offline */}
      <StackVitrine.Screen
        name="Vitrine"
        options={{ title: 'Vitrine Tech' }}
      >
        {(props) => (
          <VitrineScreen
            {...props}
            carrinho={carrinho} // Permite exibir o selo "✓ No carrinho" nos cards
          />
        )}
      </StackVitrine.Screen>

      {/* Tela 2 da pilha: Detalhes do Produto selecionado */}
      <StackVitrine.Screen
        name="DetalhesProduto"
        options={{ title: 'Detalhes do Produto' }}
      >
        {(props) => (
          <DetalhesProdutoScreen
            {...props}
            carrinho={carrinho}
            onAdicionarAoCarrinho={onAdicionarAoCarrinho}
            onRemoverDoCarrinho={onRemoverDoCarrinho}
          />
        )}
      </StackVitrine.Screen>
    </StackVitrine.Navigator>
  );
}

// ============================================================================
// COMPONENTE RAIZ DO APLICATIVO (App)
// Responsável por:
// 1. Restaurar matrículas e carrinho do AsyncStorage ao abrir o app
// 2. Exibir ActivityIndicator enquanto os dados estão sendo lidos do disco
// 3. Sincronizar automaticamente qualquer alteração com setItem / removeItem
// ============================================================================
export default function App() {
  // Seletor didático no topo para alternar entre a Prática Guiada e o Exercício Prático
  const [modoAula, setModoAula] = useState('cursos');

  // Estado global da Prática Guiada: Array de IDs dos cursos matriculados (ex.: ['101', '103'])
  const [idsMatriculados, setIdsMatriculados] = useState([]);

  // Estado global do Exercício Prático: Array de objetos completos de produtos no carrinho
  const [carrinho, setCarrinho] = useState([]);

  // Trava de segurança booleana: começa como false e só vira true após concluir a leitura inicial.
  // Evita a "Armadilha da Sobrescrita Inicial" (gravar [] por cima dos dados antigos ao abrir).
  const [dadosCarregados, setDadosCarregados] = useState(false);

  // --------------------------------------------------------------------------
  // 1. LEITURA INICIAL AO ABRIR O APLICATIVO (AsyncStorage.getItem + JSON.parse)
  // Executa apenas uma vez na montagem do App porque o Array de dependências é []
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Declaramos uma função async interna pois o callback direto do useEffect não pode ser async
    async function restaurarDadosSalvos() {
      try {
        // Lê da memória interna a string JSON salva para as matrículas dos cursos
        const jsonMatriculas = await AsyncStorage.getItem(CHAVE_MATRICULAS);
        // Se existir valor salvo (diferente de null), converte texto -> Array com JSON.parse
        if (jsonMatriculas !== null) {
          const matriculasRecuperadas = JSON.parse(jsonMatriculas);
          if (Array.isArray(matriculasRecuperadas)) {
            setIdsMatriculados(matriculasRecuperadas);
          }
        }

        // Lê da memória interna a string JSON salva para o carrinho da Vitrine Tech
        const jsonCarrinho = await AsyncStorage.getItem(CHAVE_CARRINHO);
        // Se existir valor salvo (diferente de null), converte texto -> Array com JSON.parse
        if (jsonCarrinho !== null) {
          const carrinhoRecuperado = JSON.parse(jsonCarrinho);
          if (Array.isArray(carrinhoRecuperado)) {
            setCarrinho(carrinhoRecuperado);
          }
        }
      } catch (erro) {
        // Bloco catch captura falhas de leitura ou JSON corrompido sem travar o aplicativo
        console.log('Erro ao ler dados do AsyncStorage:', erro);
      } finally {
        // Bloco finally sempre executa ao final: libera a tela principal e a gravação automática
        setDadosCarregados(true);
      }
    }

    // Dispara a função assíncrona de restauração
    restaurarDadosSalvos();
  }, []);

  // --------------------------------------------------------------------------
  // 2. SINCRONIZAÇÃO AUTOMÁTICA DAS MATRÍCULAS (setItem / removeItem)
  // Executa toda vez que 'idsMatriculados' mudar, mas somente após 'dadosCarregados' ser true
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Proteção contra sobrescrita: se a leitura inicial ainda não acabou, interrompe imediatamente
    if (!dadosCarregados) return;

    async function sincronizarMatriculas() {
      try {
        if (idsMatriculados.length === 0) {
          // Quando a lista fica vazia, remove a chave do dispositivo (boa prática de limpeza)
          await AsyncStorage.removeItem(CHAVE_MATRICULAS);
        } else {
          // Converte o Array JavaScript em texto JSON e grava sob a chave única
          await AsyncStorage.setItem(
            CHAVE_MATRICULAS,
            JSON.stringify(idsMatriculados)
          );
        }
      } catch (erro) {
        console.log('Erro ao sincronizar matrículas no AsyncStorage:', erro);
      }
    }

    sincronizarMatriculas();
  }, [idsMatriculados, dadosCarregados]);

  // --------------------------------------------------------------------------
  // 3. SINCRONIZAÇÃO AUTOMÁTICA DO CARRINHO (Requisito 3 do Exercício Prático)
  // Executa toda vez que 'carrinho' mudar, mas somente após 'dadosCarregados' ser true
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Proteção contra sobrescrita inicial
    if (!dadosCarregados) return;

    async function sincronizarCarrinho() {
      try {
        if (carrinho.length === 0) {
          // Remove a chave quando o carrinho esvazia (último item removido, Esvaziar ou Finalizar)
          await AsyncStorage.removeItem(CHAVE_CARRINHO);
        } else {
          // Serializa o Array de objetos de produto em texto JSON e salva no aparelho
          await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        }
      } catch (erro) {
        console.log('Erro ao sincronizar carrinho no AsyncStorage:', erro);
      }
    }

    sincronizarCarrinho();
  }, [carrinho, dadosCarregados]);

  // --------------------------------------------------------------------------
  // FUNÇÕES DE MANIPULAÇÃO DO ESTADO (Prática Guiada: Cursos)
  // --------------------------------------------------------------------------

  // Alterna (toggle) a matrícula de um curso preservando a imutabilidade do estado
  function alternarMatricula(cursoId) {
    setIdsMatriculados((listaAtual) => {
      const jaMatriculado = listaAtual.includes(cursoId);
      if (jaMatriculado) {
        // Retorna um novo Array removendo o cursoId selecionado
        return listaAtual.filter((id) => id !== cursoId);
      } else {
        // Retorna um novo Array copiando os IDs existentes e adicionando o novo cursoId
        return [...listaAtual, cursoId];
      }
    });
  }

  // Zera todas as matrículas (o useEffect acima chamará AsyncStorage.removeItem)
  function limparTodasMatriculas() {
    setIdsMatriculados([]);
  }

  // --------------------------------------------------------------------------
  // FUNÇÕES DE MANIPULAÇÃO DO ESTADO (Exercício Prático: Vitrine Tech)
  // --------------------------------------------------------------------------

  // Adiciona um produto ao carrinho evitando duplicatas pelo ID
  function adicionarAoCarrinho(produto) {
    setCarrinho((listaAtual) => {
      const jaExiste = listaAtual.some((item) => item.id === produto.id);
      if (jaExiste) {
        return listaAtual; // Não duplica o mesmo produto
      }
      return [...listaAtual, produto]; // Cria novo Array com o produto ao final
    });
  }

  // Remove um item específico do carrinho filtrando pelo seu ID
  function removerDoCarrinho(produtoId) {
    setCarrinho((listaAtual) =>
      listaAtual.filter((item) => item.id !== produtoId)
    );
  }

  // Esvazia completamente o carrinho (usado em "Esvaziar" e "Finalizar Pedido")
  // O useEffect de sincronização detecta carrinho.length === 0 e chama AsyncStorage.removeItem
  function limparCarrinho() {
    setCarrinho([]);
  }

  // --------------------------------------------------------------------------
  // TELA DE CARREGAMENTO INICIAL (Enquanto AsyncStorage.getItem lê o aparelho)
  // --------------------------------------------------------------------------
  if (!dadosCarregados) {
    return (
      <View style={styles.telaCarregando}>
        {/* Indicador giratório nativo indicando leitura assíncrona do armazenamento */}
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.textoCarregando}>
          Restaurando dados salvos...
        </Text>
      </View>
    );
  }

  // Estilo visual compartilhado pela barra inferior (Bottom Tabs) nos dois modos
  const estiloBarraAbas = {
    tabBarActiveTintColor: '#2563EB',   // Azul para aba selecionada
    tabBarInactiveTintColor: '#64748B', // Cinza para abas inativas
    tabBarStyle: {
      height: 62,                   // Altura confortável para toque
      paddingBottom: 8,             // Espaço interno inferior
      paddingTop: 6,                // Espaço interno superior
      backgroundColor: '#FFFFFF',   // Fundo branco
      borderTopColor: '#E2E8F0',    // Borda superior sutil
    },
    tabBarLabelStyle: {
      fontSize: 12,      // Tamanho do rótulo da aba
      fontWeight: '600', // Semi-negrito
    },
  };

  // Renderização principal após restaurar os dados locais
  return (
    <View style={styles.container}>
      {/* Mantém ícones claros na barra de status sobre o fundo escuro superior */}
      <StatusBar style="light" />

      {/* Barra didática superior para alternar entre a Prática Guiada e o Exercício Prático */}
      <View style={styles.barraDidatica}>
        <TouchableOpacity
          style={[styles.botaoModo, modoAula === 'cursos' && styles.botaoModoAtivo]}
          onPress={() => setModoAula('cursos')}
          activeOpacity={0.85}
        >
          <Text style={[styles.textoModo, modoAula === 'cursos' && styles.textoModoAtivo]}>
            1. Prática (Cursos)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoModo, modoAula === 'vitrine' && styles.botaoModoAtivo]}
          onPress={() => setModoAula('vitrine')}
          activeOpacity={0.85}
        >
          <Text style={[styles.textoModo, modoAula === 'vitrine' && styles.textoModoAtivo]}>
            2. Exercício (Vitrine)
          </Text>
        </TouchableOpacity>
      </View>

      {/* NavigationContainer raiz: key={modoAula} garante árvore de navegação limpa ao alternar */}
      <NavigationContainer key={modoAula}>
        {modoAula === 'cursos' ? (
          /* ==================================================================
             PRÁTICA GUIADA (Passo 4): Catálogo de Cursos + AsyncStorage
             ================================================================== */
          <TabCursos.Navigator
            // screenOptions como função recebe { route } para escolher o ícone de cada aba
            screenOptions={({ route }) => ({
              ...estiloBarraAbas,
              tabBarIcon: ({ focused, color, size }) => {
                let nomeIcone = 'compass-outline';
                if (route.name === 'ExplorarTab') {
                  nomeIcone = focused ? 'compass' : 'compass-outline';
                } else if (route.name === 'MinhasMatriculasTab') {
                  nomeIcone = focused ? 'school' : 'school-outline';
                }
                return <Ionicons name={nomeIcone} size={size} color={color} />;
              },
            })}
          >
            {/* Aba 1: Hospeda a pilha ExplorarStack sem cabeçalho duplicado (headerShown: false) */}
            <TabCursos.Screen
              name="ExplorarTab"
              options={{
                title: 'Explorar',
                headerShown: false,
              }}
            >
              {() => (
                <ExplorarStack
                  idsMatriculados={idsMatriculados}
                  onToggleMatricula={alternarMatricula}
                />
              )}
            </TabCursos.Screen>

            {/* Aba 2: Minhas Matrículas com tabBarBadge dinâmico e limpeza total */}
            <TabCursos.Screen
              name="MinhasMatriculasTab"
              options={{
                title: 'Minhas Matrículas',
                headerStyle: { backgroundColor: '#0F172A' },
                headerTintColor: '#F8FAFC',
                headerTitleStyle: { fontWeight: 'bold' },
                // Mostra o contador vermelho apenas se houver 1 ou mais matrículas; undefined oculta
                tabBarBadge:
                  idsMatriculados.length > 0 ? idsMatriculados.length : undefined,
              }}
            >
              {(props) => (
                <MinhasMatriculasScreen
                  {...props}
                  idsMatriculados={idsMatriculados}
                  onToggleMatricula={alternarMatricula}
                  onLimparMatriculas={limparTodasMatriculas}
                />
              )}
            </TabCursos.Screen>
          </TabCursos.Navigator>
        ) : (
          /* ==================================================================
             EXERCÍCIO PRÁTICO (Seção 4): Vitrine Tech com Carrinho Persistente
             ================================================================== */
          <TabVitrine.Navigator
            screenOptions={({ route }) => ({
              ...estiloBarraAbas,
              // Ícones da loja: storefront (VitrineTab) e cart (CarrinhoTab)
              tabBarIcon: ({ focused, color, size }) => {
                let nomeIcone = 'storefront-outline';
                if (route.name === 'VitrineTab') {
                  nomeIcone = focused ? 'storefront' : 'storefront-outline';
                } else if (route.name === 'CarrinhoTab') {
                  nomeIcone = focused ? 'cart' : 'cart-outline';
                }
                return <Ionicons name={nomeIcone} size={size} color={color} />;
              },
            })}
          >
            {/* Aba 1: VitrineTab hospedando VitrineStack (headerShown: false evita header duplo) */}
            <TabVitrine.Screen
              name="VitrineTab"
              options={{
                title: 'Vitrine',
                headerShown: false,
              }}
            >
              {() => (
                <VitrineStack
                  carrinho={carrinho}
                  onAdicionarAoCarrinho={adicionarAoCarrinho}
                  onRemoverDoCarrinho={removerDoCarrinho}
                />
              )}
            </TabVitrine.Screen>

            {/* Aba 2: CarrinhoTab com tabBarBadge sincronizado com carrinho.length */}
            <TabVitrine.Screen
              name="CarrinhoTab"
              options={{
                title: 'Carrinho',
                headerStyle: { backgroundColor: '#0F172A' },
                headerTintColor: '#F8FAFC',
                headerTitleStyle: { fontWeight: 'bold' },
                // Exibe o badge numérico somente quando há produtos no carrinho
                tabBarBadge: carrinho.length > 0 ? carrinho.length : undefined,
              }}
            >
              {(props) => (
                <CarrinhoScreen
                  {...props}
                  carrinho={carrinho}
                  onRemoverDoCarrinho={removerDoCarrinho}
                  onLimparCarrinho={limparCarrinho}
                />
              )}
            </TabVitrine.Screen>
          </TabVitrine.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

// Folha de estilos do componente raiz App
const styles = StyleSheet.create({
  // Contêiner principal ocupando 100% da tela
  container: {
    flex: 1,                    // Altura total
    backgroundColor: '#0F172A', // Integra visualmente com a barra de status escura
  },
  // Tela centralizada exibida durante a leitura assíncrona do AsyncStorage
  telaCarregando: {
    flex: 1,                    // Ocupa toda a tela
    justifyContent: 'center',   // Centraliza verticalmente
    alignItems: 'center',       // Centraliza horizontalmente
    backgroundColor: '#F8FAFC', // Fundo claro suave
  },
  // Texto abaixo do ActivityIndicator durante a restauração inicial
  textoCarregando: {
    marginTop: 12,    // Espaço após o spinner
    fontSize: 15,     // Fonte legível
    color: '#475569', // Cinza escuro
  },
  // Barra didática superior para alternar entre Prática Guiada e Exercício Prático
  barraDidatica: {
    flexDirection: 'row',       // Dois botões lado a lado
    backgroundColor: '#1E293B', // Fundo escuro discreto
    paddingTop: 38,             // Espaço seguro abaixo da barra de status do celular
    paddingBottom: 8,           // Espaçamento interno inferior
    paddingHorizontal: 12,      // Margens laterais
    gap: 8,                     // Espaço entre os dois botões
  },
  // Estilo padrão do botão de seleção de modo
  botaoModo: {
    flex: 1,                    // Divide igualmente a largura (50% cada)
    paddingVertical: 8,         // Altura interna
    borderRadius: 8,            // Cantos arredondados
    alignItems: 'center',       // Centraliza o texto
    backgroundColor: '#334155', // Fundo cinza azulado quando inativo
  },
  // Destaque azul para o modo atualmente aberto
  botaoModoAtivo: {
    backgroundColor: '#2563EB', // Azul vibrante
  },
  // Texto do botão inativo
  textoModo: {
    fontSize: 12,      // Fonte compacta
    fontWeight: '600', // Semi-negrito
    color: '#CBD5E1',  // Cinza claro
  },
  // Texto do botão ativo
  textoModoAtivo: {
    color: '#FFFFFF',   // Branco puro
    fontWeight: 'bold', // Negrito
  },
});
