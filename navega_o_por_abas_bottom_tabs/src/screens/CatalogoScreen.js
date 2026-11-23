// Arquivo: src/screens/CatalogoScreen.js
// ============================================================================
// PASSO 3 (Prática Guiada - Aula 8): Tela Principal do Catálogo de Cursos
// Fica na base da pilha (Stack) dentro da primeira aba (ExplorarTab).
// - Gerencia localmente o filtro por categoria (useState('Todos'))
// - Recebe o estado global 'idsMatriculados' vindo do App.js para atualizar o
//   contador do cabeçalho e destacar visualmente os cursos já matriculados
// - Navega para 'DetalhesCurso' enviando o objeto { curso: item } via params
// ============================================================================

// Importa o React e o Hook useState para controlar a categoria selecionada
import React, { useState } from 'react';
// Importa View, Text, FlatList e StyleSheet do React Native
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Importa as constantes de categorias e a lista de cursos do Passo 1
import { CATEGORIAS, LISTA_CURSOS } from '../data/cursos';
// Importa os 3 componentes reutilizáveis criados no Passo 2
import HeaderCatalogo from '../components/HeaderCatalogo';
import FiltroCategoria from '../components/FiltroCategoria';
import CursoCard from '../components/CursoCard';

// Exporta a tela 'CatalogoScreen' recebendo:
// - navigation: objeto injetado pelo React Navigation para trocar de tela
// - idsMatriculados: Array global de IDs dos cursos em que o aluno se inscreveu
export default function CatalogoScreen({ navigation, idsMatriculados }) {
  // Estado local que guarda o nome da categoria atualmente selecionada no filtro
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // Deriva a lista filtrada: se for 'Todos', exibe a lista completa; senão, filtra pela categoria
  const cursosFiltrados =
    categoriaAtiva === 'Todos'
      ? LISTA_CURSOS
      : LISTA_CURSOS.filter((curso) => curso.categoria === categoriaAtiva);

  // Retorna a estrutura visual completa da tela do catálogo
  return (
    // Contêiner principal ocupando toda a área disponível
    <View style={styles.tela}>
      {/* Cabeçalho do catálogo exibindo o total de matrículas sincronizado com o App.js */}
      <HeaderCatalogo
        titulo="Formação Técnica"
        subtitulo="Explore os cursos ou veja suas inscrições na aba ao lado"
        totalInscritos={idsMatriculados.length}
      />

      {/* Barra horizontal de chips para filtrar os cursos por categoria */}
      <FiltroCategoria
        categorias={CATEGORIAS}
        ativa={categoriaAtiva}
        aoSelecionar={setCategoriaAtiva}
      />

      {/* Lista performática que renderiza apenas os cards visíveis na tela */}
      <FlatList
        data={cursosFiltrados} // Fonte de dados já filtrada pela categoria ativa
        keyExtractor={(item) => item.id} // Identificador único de cada curso na lista
        contentContainerStyle={styles.lista} // Espaçamento interno das laterais e do rodapé da lista
        // Componente exibido automaticamente se o Array filtrado estiver vazio
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Text style={styles.vazioTexto}>
              Nenhum curso encontrado nesta categoria.
            </Text>
          </View>
        }
        // Função que desenha cada item da lista usando o componente reutilizável CursoCard
        renderItem={({ item }) => (
          <CursoCard
            curso={item} // Passa o objeto completo do curso atual
            matriculado={idsMatriculados.includes(item.id)} // Verifica se o ID está na lista global de matrículas
            // Ao tocar no card, empilha a rota 'DetalhesCurso' enviando o objeto 'curso' em route.params
            onAbrirDetalhes={() =>
              navigation.navigate('DetalhesCurso', { curso: item })
            }
          />
        )}
      />
    </View>
  );
}

// Folha de estilos exclusiva da tela CatalogoScreen
const styles = StyleSheet.create({
  // Fundo claro ocupando toda a tela
  tela: {
    flex: 1, // Expande para 100% da altura disponível
    backgroundColor: '#F8FAFC', // Cinza muito claro (Slate 50)
  },
  // Espaçamento interno do conteúdo da FlatList
  lista: {
    paddingHorizontal: 16, // Margem interna esquerda e direita
    paddingBottom: 24, // Respiro no final da rolagem para o último card não ficar colado nas abas
  },
  // Contêiner da mensagem de lista vazia
  vazioBox: {
    padding: 32, // Espaçamento interno generoso
    alignItems: 'center', // Centraliza o texto horizontalmente
  },
  // Estilo do texto de lista vazia
  vazioTexto: {
    color: '#64748B', // Cinza médio
    fontSize: 15, // Tamanho confortável para leitura
  },
});
