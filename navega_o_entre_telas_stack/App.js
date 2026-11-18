// Arquivo: App.js
// ============================================================================
// AULA 7: Navegação entre Telas (React Navigation - Stack Navigator)
// Contém:
// 1. Prática Guiada (Passos 1 a 5): Catálogo de Cursos Multi-Telas (Catalogo -> Detalhes)
// 2. Exercício Prático (Seção 4): Vitrine de Loja com API + Navegação (Vitrine -> DetalhesProduto)
// ============================================================================
// OS 3 PILARES DO STACK NAVIGATOR:
// 1. createNativeStackNavigator() -> Cria a instância da pilha de navegação.
// 2. <NavigationContainer>        -> Envolve o app e gerencia o histórico de rotas.
// 3. <Stack.Navigator> / <Stack.Screen> -> Registra as telas e configura o cabeçalho nativo.
// ============================================================================

// Importa o React e o Hook useState para alternar entre a Prática Guiada e o Exercício Prático
import React, { useState } from 'react';
// Importa View, Text, TouchableOpacity e StyleSheet do React Native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Importa o StatusBar do Expo para deixar os ícones da barra de status claros sobre o fundo escuro
import { StatusBar } from 'expo-status-bar';
// Importa o NavigationContainer que gerencia a árvore e o histórico de navegação
import { NavigationContainer } from '@react-navigation/native';
// Importa a função que cria a navegação em Pilha nativa (Stack Navigator)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas da Parte 1 (Prática Guiada: Catálogo de Cursos Multi-Telas)
import CatalogoScreen from './src/screens/CatalogoScreen';
import DetalhesCursoScreen from './src/screens/DetalhesCursoScreen';

// Importa as telas da Parte 2 (Exercício Prático: Vitrine de Loja com FakeStoreAPI)
import VitrineScreen from './src/screens/VitrineScreen';
import DetalhesProdutoScreen from './src/screens/DetalhesProdutoScreen';

// 1º Pilar: Criamos as instâncias da Pilha de Navegação (Stack)
const StackCursos = createNativeStackNavigator();
const StackVitrine = createNativeStackNavigator();

// Exporta o componente principal App (Roteador Principal do Aplicativo)
export default function App() {
  // Estado didático para alternar em aula entre:
  // - 'cursos': Prática Guiada (Catálogo de Cursos Multi-Telas)
  // - 'vitrine': Exercício Prático (Vitrine de Loja com API + Navegação)
  const [modoAula, setModoAula] = useState('cursos');

  return (
    <View style={styles.container}>
      {/* Garante ícones brancos na barra de status do celular para contraste com o topo escuro */}
      <StatusBar style="light" />

      {/* Barra didática no topo para alternar entre a Prática Guiada e o Exercício Prático */}
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
            2. Exercício (Vitrine API)
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2º Pilar: NavigationContainer envolve o navegador ativo.
          CORREÇÃO APLICADA: key={modoAula} força a reinicialização limpa do histórico de rotas
          ao alternar entre a Pilha de Cursos e a Pilha da Vitrine, evitando conflito de rotas. */}
      <NavigationContainer key={modoAula}>
        {modoAula === 'cursos' ? (
          /* ==================================================================
             PILHA 1 (Passo 5 da Prática Guiada): Catálogo de Cursos Multi-Telas
             ================================================================== */
          <StackCursos.Navigator
            initialRouteName="Catalogo" // Define a rota inicial que abre na base da pilha
            screenOptions={{
              headerStyle: { backgroundColor: '#0F172A' }, // Cor de fundo do cabeçalho nativo
              headerTintColor: '#FFFFFF', // Cor branca para o título e para a seta de voltar
              headerTitleStyle: { fontWeight: 'bold' }, // Título do cabeçalho em negrito
            }}
          >
            {/* Rota 1: Tela Principal do Catálogo */}
            <StackCursos.Screen
              name="Catalogo" // Nome da rota usado em navigation.navigate('Catalogo')
              component={CatalogoScreen} // Componente de tela renderizado
              options={{ title: 'Catálogo de Cursos' }} // Título exibido na barra superior
            />

            {/* Rota 2: Tela de Detalhes do Curso (empilhada ao tocar em um card) */}
            <StackCursos.Screen
              name="Detalhes" // Nome da rota usado em navigation.navigate('Detalhes', { curso: item })
              component={DetalhesCursoScreen} // Componente de tela renderizado
              options={{ title: 'Detalhes do Curso' }} // Título exibido na barra superior
            />
          </StackCursos.Navigator>
        ) : (
          /* ==================================================================
             PILHA 2 (Exercício Prático - Seção 4): Vitrine de Loja com API
             ================================================================== */
          <StackVitrine.Navigator
            initialRouteName="Vitrine" // Define a Vitrine como tela inicial da pilha
            screenOptions={{
              headerStyle: { backgroundColor: '#0F172A' }, // Cor de fundo escura no cabeçalho
              headerTintColor: '#FFFFFF', // Seta de retorno e título em branco
              headerTitleStyle: { fontWeight: 'bold' }, // Negrito no título
            }}
          >
            {/* Rota 1: Vitrine de Produtos consumindo a FakeStoreAPI */}
            <StackVitrine.Screen
              name="Vitrine" // Nome interno da rota inicial
              component={VitrineScreen} // Tela que busca os 10 produtos na API
              options={{ title: '🛍️ Vitrine da Loja' }} // Título no cabeçalho nativo
            />

            {/* Rota 2: Detalhes do Produto selecionado */}
            <StackVitrine.Screen
              name="DetalhesProduto" // Nome chamado em navigation.navigate('DetalhesProduto', { produto: item })
              component={DetalhesProdutoScreen} // Tela que lê route.params.produto
              options={{ title: 'Detalhes do Produto' }} // Título no cabeçalho nativo
            />
          </StackVitrine.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

// Folha de estilos para o contêiner raiz e o seletor didático de atividades
const styles = StyleSheet.create({
  // Contêiner que ocupa toda a tela do dispositivo
  container: {
    flex: 1, // Ocupa 100% da altura
    backgroundColor: '#0F172A', // Mesma cor do cabeçalho para integração visual no topo
  },
  // Barra superior que permite alternar entre Prática Guiada e Exercício Prático
  barraDidatica: {
    flexDirection: 'row', // Botões lado a lado
    backgroundColor: '#1E293B', // Fundo escuro discreto
    paddingTop: 38, // Espaço para não sobrepor a barra de status do celular
    paddingBottom: 8, // Espaçamento inferior
    paddingHorizontal: 12, // Espaçamento lateral
    gap: 8, // Espaço entre os 2 botões
  },
  // Estilo de cada botão de modo
  botaoModo: {
    flex: 1, // Divide a largura igualmente (50% para cada)
    paddingVertical: 8, // Altura interna do botão
    borderRadius: 8, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
    backgroundColor: '#334155', // Cor padrão quando inativo
  },
  // Estilo adicional quando o modo está selecionado
  botaoModoAtivo: {
    backgroundColor: '#2563EB', // Azul vibrante indicando a atividade ativa
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
