// Arquivo: App.js
// ============================================================================
// AULA 8: Navegação por Abas Inferiores (Bottom Tabs + Stack Navigator)
// Contém as duas atividades completas do tutorial, alternáveis pela barra
// didática no topo:
// 1. Prática Guiada (Passos 1 a 4): Catálogo de Cursos com Abas e Matrículas
//    - Aba 1 ('ExplorarTab'): Stack Navigator (Catalogo -> DetalhesCurso)
//    - Aba 2 ('MinhasMatriculasTab'): MinhasMatriculasScreen com tabBarBadge
// 2. Exercício Prático (Seção 4): Vitrine Tech com Aba de Carrinho
//    - Aba 1 ('VitrineTab'): Stack Navigator (Vitrine -> DetalhesProduto)
//    - Aba 2 ('CarrinhoTab'): CarrinhoScreen com soma .reduce() e tabBarBadge
// ============================================================================
// CONCEITO-CHAVE (EVITANDO CABEÇALHO DUPLO):
// Quando uma <Tab.Screen> carrega um <Stack.Navigator> dentro dela, usamos
// headerShown: false na aba para que apenas o cabeçalho do Stack apareça.
// ============================================================================

// Importa o React e o Hook useState para controlar estados globais e o seletor da aula
import React, { useState } from 'react';
// Importa View, Text, TouchableOpacity e StyleSheet para a barra didática superior
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Importa o StatusBar do Expo para deixar os ícones da barra de status legíveis no topo escuro
import { StatusBar } from 'expo-status-bar';
// Importa o contêiner raiz obrigatório do React Navigation
import { NavigationContainer } from '@react-navigation/native';
// Importa o construtor de navegação em Pilha (Stack Navigator)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importa o construtor de navegação por Abas Inferiores (Bottom Tabs Navigator)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importa a biblioteca de ícones nativos Ionicons inclusa no Expo
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
// PARTE 1 (PASSO 4): Pilha de navegação exclusiva da primeira aba ('ExplorarTab')
// Empilha: Catalogo -> DetalhesCurso, repassando o estado global de matrículas
// ============================================================================
function ExplorarStack({ idsMatriculados, onToggleMatricula }) {
  return (
    <StackCursos.Navigator
      // Estilo padrão aplicado ao cabeçalho superior de todas as telas desta pilha
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' }, // Fundo escuro no cabeçalho
        headerTintColor: '#F8FAFC', // Cor branca para o título e seta de voltar
        headerTitleStyle: { fontWeight: 'bold' }, // Título em negrito
      }}
    >
      {/* Tela 1 da pilha: Catálogo de Cursos */}
      <StackCursos.Screen
        name="Catalogo" // Nome interno da rota
        options={{ title: 'Catálogo de Cursos' }} // Texto exibido na barra superior
      >
        {/* Usa render function (children) para injetar 'idsMatriculados' junto com {...props} */}
        {(props) => (
          <CatalogoScreen
            {...props} // Repassa automaticamente navigation e route
            idsMatriculados={idsMatriculados} // Estado global de IDs matriculados
          />
        )}
      </StackCursos.Screen>

      {/* Tela 2 da pilha: Detalhes e Ementa do Curso */}
      <StackCursos.Screen
        name="DetalhesCurso" // Nome chamado em navigation.navigate('DetalhesCurso', { curso })
        // Options dinâmico: exibe a categoria do curso no cabeçalho superior
        options={({ route }) => ({
          title: route.params?.curso?.categoria || 'Detalhes do Curso',
        })}
      >
        {(props) => (
          <DetalhesCursoScreen
            {...props} // Repassa navigation e route (incluindo route.params.curso)
            idsMatriculados={idsMatriculados} // Para saber se já está matriculado
            onToggleMatricula={onToggleMatricula} // Função que altera a matrícula no App.js
          />
        )}
      </StackCursos.Screen>
    </StackCursos.Navigator>
  );
}

// ============================================================================
// PARTE 2 (EXERCÍCIO PRÁTICO): Pilha exclusiva da primeira aba ('VitrineTab')
// Empilha: Vitrine -> DetalhesProduto, repassando o estado global do carrinho
// ============================================================================
function VitrineStack({ carrinho, onAdicionarAoCarrinho, onRemoverDoCarrinho }) {
  return (
    <StackVitrine.Navigator
      // Estilo escuro padronizado no cabeçalho nativo da pilha da loja
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* Tela 1 da pilha: Vitrine de Produtos consumindo a FakeStoreAPI */}
      <StackVitrine.Screen
        name="Vitrine"
        options={{ title: 'Vitrine Tech' }}
      >
        {(props) => (
          <VitrineScreen
            {...props}
            carrinho={carrinho} // Permite marcar nos cards quais itens já estão no carrinho
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
            carrinho={carrinho} // Verifica se o produto já está adicionado
            onAdicionarAoCarrinho={onAdicionarAoCarrinho} // Adiciona ao estado global
            onRemoverDoCarrinho={onRemoverDoCarrinho} // Remove do estado global
          />
        )}
      </StackVitrine.Screen>
    </StackVitrine.Navigator>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL DO APLICATIVO (App)
// Centraliza os estados globais compartilhados entre abas e hospeda o Tab.Navigator
// ============================================================================
export default function App() {
  // Estado didático para alternar facilmente em aula entre a Prática Guiada e o Exercício
  const [modoAula, setModoAula] = useState('cursos');

  // --------------------------------------------------------------------------
  // ESTADO GLOBAL 1 (Prática Guiada): Array de IDs dos cursos matriculados
  // Mantido no App.js para que 'ExplorarTab' e 'MinhasMatriculasTab' compartilhem
  // sempre a mesma verdade única (Single Source of Truth)
  // --------------------------------------------------------------------------
  const [idsMatriculados, setIdsMatriculados] = useState([]);

  // Função que alterna (toggle) a matrícula de um curso: adiciona se não existe, remove se já existe
  function alternarMatricula(cursoId) {
    setIdsMatriculados((listaAtual) => {
      // Verifica se o ID já está presente no Array de matrículas
      const jaMatriculado = listaAtual.includes(cursoId);
      if (jaMatriculado) {
        // Retorna um novo Array sem o ID (imutabilidade do React)
        return listaAtual.filter((id) => id !== cursoId);
      } else {
        // Retorna um novo Array copiando os itens anteriores e acrescentando o novo ID
        return [...listaAtual, cursoId];
      }
    });
  }

  // --------------------------------------------------------------------------
  // ESTADO GLOBAL 2 (Exercício Prático): Array de objetos completos de produto no carrinho
  // --------------------------------------------------------------------------
  const [carrinho, setCarrinho] = useState([]);

  // Adiciona um produto completo ao carrinho evitando duplicatas pelo ID
  function adicionarAoCarrinho(produto) {
    setCarrinho((listaAtual) => {
      const jaExiste = listaAtual.some((item) => item.id === produto.id);
      if (jaExiste) {
        return listaAtual; // Mantém intacto se o item já estiver no carrinho
      }
      return [...listaAtual, produto]; // Acrescenta o objeto completo no final do Array
    });
  }

  // Remove um item específico do carrinho filtrando pelo seu ID
  function removerDoCarrinho(produtoId) {
    setCarrinho((listaAtual) =>
      listaAtual.filter((item) => item.id !== produtoId)
    );
  }

  // Limpa completamente o carrinho (usado pelo botão "Finalizar Pedido")
  function limparCarrinho() {
    setCarrinho([]);
  }

  // Configuração visual reutilizada em ambos os Tab.Navigators (altura, cores e tipografia das abas)
  const estiloBarraAbas = {
    tabBarActiveTintColor: '#2563EB', // Cor azul para o ícone e texto da aba ativa
    tabBarInactiveTintColor: '#64748B', // Cor cinza para abas inativas
    tabBarStyle: {
      height: 62, // Altura confortável da barra inferior
      paddingBottom: 8, // Espaçamento interno inferior
      paddingTop: 6, // Espaçamento interno superior
      backgroundColor: '#FFFFFF', // Fundo branco limpo
      borderTopColor: '#E2E8F0', // Linha divisória cinza clara no topo da barra
    },
    tabBarLabelStyle: {
      fontSize: 12, // Tamanho da legenda abaixo do ícone
      fontWeight: '600', // Peso semi-negrito
    },
  };

  return (
    <View style={styles.container}>
      {/* Ícones claros na barra de status do celular para contrastar com o topo escuro */}
      <StatusBar style="light" />

      {/* Barra didática superior para alternar entre a Prática Guiada e o Exercício Prático */}
      <View style={styles.barraDidatica}>
        <TouchableOpacity
          style={[styles.botaoModo, modoAula === 'cursos' && styles.botaoModoAtivo]}
          onPress={() => setModoAula('cursos')}
        >
          <Text style={[styles.textoModo, modoAula === 'cursos' && styles.textoModoAtivo]}>
            1. Prática (Cursos)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoModo, modoAula === 'vitrine' && styles.botaoModoAtivo]}
          onPress={() => setModoAula('vitrine')}
        >
          <Text style={[styles.textoModo, modoAula === 'vitrine' && styles.textoModoAtivo]}>
            2. Exercício (Vitrine)
          </Text>
        </TouchableOpacity>
      </View>

      {/* NavigationContainer raiz: key={modoAula} reinicia o histórico limpo ao alternar os modos */}
      <NavigationContainer key={modoAula}>
        {modoAula === 'cursos' ? (
          /* ==================================================================
             PRÁTICA GUIADA (Passo 4): Bottom Tabs + Stack Navigator (Cursos)
             ================================================================== */
          <TabCursos.Navigator
            // screenOptions em formato de função recebe { route } para escolher o ícone de cada aba
            screenOptions={({ route }) => ({
              ...estiloBarraAbas,
              // Função que retorna o componente de ícone dinâmico (preenchido se focused, contorno se inativo)
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
            {/* Aba 1: Hospeda toda a pilha ExplorarStack (Catálogo -> DetalhesCurso) */}
            <TabCursos.Screen
              name="ExplorarTab" // Nome da aba usado em navigation.navigate('ExplorarTab')
              options={{
                title: 'Explorar', // Rótulo exibido abaixo do ícone na barra inferior
                headerShown: false, // Oculta o cabeçalho da Aba para evitar cabeçalho duplo com o Stack
              }}
            >
              {() => (
                <ExplorarStack
                  idsMatriculados={idsMatriculados}
                  onToggleMatricula={alternarMatricula}
                />
              )}
            </TabCursos.Screen>

            {/* Aba 2: Exibe diretamente a tela MinhasMatriculasScreen com badge dinâmico */}
            <TabCursos.Screen
              name="MinhasMatriculasTab"
              options={{
                title: 'Minhas Matrículas', // Título na aba e no cabeçalho superior
                headerStyle: { backgroundColor: '#0F172A' }, // Cabeçalho escuro igual ao Stack
                headerTintColor: '#F8FAFC', // Título branco
                headerTitleStyle: { fontWeight: 'bold' }, // Título em negrito
                // Exibe contador vermelho (badge) somente quando há pelo menos 1 matrícula; undefined oculta o badge
                tabBarBadge:
                  idsMatriculados.length > 0 ? idsMatriculados.length : undefined,
              }}
            >
              {(props) => (
                <MinhasMatriculasScreen
                  {...props}
                  idsMatriculados={idsMatriculados}
                  onToggleMatricula={alternarMatricula}
                />
              )}
            </TabCursos.Screen>
          </TabCursos.Navigator>
        ) : (
          /* ==================================================================
             EXERCÍCIO PRÁTICO (Seção 4): Vitrine Tech com Aba de Carrinho
             ================================================================== */
          <TabVitrine.Navigator
            screenOptions={({ route }) => ({
              ...estiloBarraAbas,
              // Ícones exigidos pelo desafio: storefront (VitrineTab) e cart (CarrinhoTab)
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
            {/* Aba 1: VitrineTab hospedando o Stack (Vitrine -> DetalhesProduto) sem cabeçalho duplo */}
            <TabVitrine.Screen
              name="VitrineTab"
              options={{
                title: 'Vitrine',
                headerShown: false, // Evita cabeçalho duplicado sobre o StackVitrine
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

            {/* Aba 2: CarrinhoTab com badge dinâmico refletindo carrinho.length */}
            <TabVitrine.Screen
              name="CarrinhoTab"
              options={{
                title: 'Carrinho',
                headerStyle: { backgroundColor: '#0F172A' },
                headerTintColor: '#F8FAFC',
                headerTitleStyle: { fontWeight: 'bold' },
                // Exibe badge numérico apenas quando carrinho.length > 0
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

// Folha de estilos para o contêiner raiz e a barra didática de alternância
const styles = StyleSheet.create({
  // Contêiner principal ocupando 100% da tela
  container: {
    flex: 1, // Ocupa toda a altura
    backgroundColor: '#0F172A', // Integra visualmente com a barra de status escura
  },
  // Barra superior que permite alternar entre Prática Guiada e Exercício Prático
  barraDidatica: {
    flexDirection: 'row', // Botões lado a lado
    backgroundColor: '#1E293B', // Fundo escuro discreto
    paddingTop: 38, // Espaço seguro para não sobrepor a barra de status do celular
    paddingBottom: 8, // Margem inferior interna
    paddingHorizontal: 12, // Margens laterais internas
    gap: 8, // Distância entre os dois botões
  },
  // Aparência padrão do botão seletor de modo
  botaoModo: {
    flex: 1, // Divide igualmente a largura (50% cada)
    paddingVertical: 8, // Altura interna
    borderRadius: 8, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    backgroundColor: '#334155', // Fundo cinza azulado quando inativo
  },
  // Destaque azul quando o modo está ativo
  botaoModoAtivo: {
    backgroundColor: '#2563EB', // Azul vibrante
  },
  // Texto do botão inativo
  textoModo: {
    fontSize: 12, // Fonte compacta
    fontWeight: '600', // Semi-negrito
    color: '#CBD5E1', // Cinza claro
  },
  // Texto do botão ativo
  textoModoAtivo: {
    color: '#FFFFFF', // Branco puro
    fontWeight: 'bold', // Negrito
  },
});
