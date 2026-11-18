// Arquivo: src/screens/CatalogoScreen.js
// ============================================================================
// PASSO 3 (Prática Guiada): Tela Principal do Catálogo de Cursos
// Toda tela registrada no Stack.Navigator recebe automaticamente a prop { navigation }
// ============================================================================

// Importa o React e o Hook useState para controlar o filtro de categoria
import React, { useState } from 'react';
// Importa View, FlatList e StyleSheet do React Native
import { View, FlatList, StyleSheet } from 'react-native';

// Importa os dados estáticos de categorias e cursos (Passo 1)
import { CATEGORIAS, LISTA_CURSOS } from '../data/cursos';
// Importa os componentes visuais reutilizáveis (Passo 2)
import FiltroCategoria from '../components/FiltroCategoria';
import CursoCard from '../components/CursoCard';

// Exporta a tela 'CatalogoScreen' recebendo automaticamente a prop { navigation } do React Navigation
export default function CatalogoScreen({ navigation }) {
  // Estado que armazena a categoria selecionada na barra superior (inicia em 'Todos')
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // Filtra a lista de cursos de acordo com a categoria selecionada
  const cursosFiltrados =
    categoriaAtiva === 'Todos'
      ? LISTA_CURSOS // Se for 'Todos', exibe todos os cursos
      : LISTA_CURSOS.filter((curso) => curso.categoria === categoriaAtiva); // Caso contrário, filtra pela categoria

  // Retorna a interface da tela de Catálogo
  return (
    <View style={styles.tela}>
      {/* Barra horizontal de filtros de categoria */}
      <FiltroCategoria
        categorias={CATEGORIAS} // Envia o Array de categorias
        ativa={categoriaAtiva} // Envia a categoria atualmente ativa
        aoSelecionar={setCategoriaAtiva} // Atualiza o estado quando o usuário toca em um chip
      />

      {/* Lista de alta performance renderizando os cards de cursos filtrados */}
      <FlatList
        data={cursosFiltrados} // Array de cursos filtrados
        keyExtractor={(item) => item.id} // Chave única em formato String
        contentContainerStyle={styles.lista} // Espaçamento interno da lista
        renderItem={({ item }) => (
          // Renderiza o componente CursoCard para cada curso
          <CursoCard
            curso={item} // Envia o objeto completo do curso
            // Ao clicar no card, empilha a tela 'Detalhes' enviando o objeto { curso: item } via parâmetros da rota!
            onVerDetalhes={() => navigation.navigate('Detalhes', { curso: item })}
          />
        )}
      />
    </View>
  );
}

// Folha de estilos da tela CatalogoScreen
const styles = StyleSheet.create({
  // Contêiner principal da tela
  tela: {
    flex: 1, // Ocupa 100% da área útil da tela
    backgroundColor: '#F8FAFC', // Fundo cinza muito claro
  },
  // Espaçamento interno da FlatList
  lista: {
    paddingHorizontal: 16, // Margens laterais de 16px
    paddingBottom: 24, // Espaço extra no final da rolagem
  },
});
