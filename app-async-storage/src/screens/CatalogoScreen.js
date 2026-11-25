// Arquivo: src/screens/CatalogoScreen.js
// ============================================================================
// AULA 9 — PRÁTICA GUIADA (Passo 3): Tela CatalogoScreen
// Tela inicial da aba 'ExplorarTab' (base do ExplorarStack).
// Responsabilidades:
// - Controlar o filtro local de categoria ativa com useState
// - Exibir o cabeçalho com o contador de matrículas persistidas
// - Renderizar a lista performática de cursos usando FlatList e CursoCard
// - Navegar para 'DetalhesCurso' enviando o objeto completo do curso via params
// ============================================================================

// Importa o React e o Hook useState para controlar o filtro local de categorias
import React, { useState } from 'react';
// Importa View (contêiner), Text (texto), FlatList (lista otimizada) e StyleSheet (estilos)
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Importa as listas estáticas de categorias e cursos da camada de dados
import { CATEGORIAS, LISTA_CURSOS } from '../data/cursos';
// Importa os três componentes visuais reutilizáveis da pasta src/components
import HeaderCatalogo from '../components/HeaderCatalogo';
import FiltroCategoria from '../components/FiltroCategoria';
import CursoCard from '../components/CursoCard';

// Exporta a tela 'CatalogoScreen' recebendo via Props:
// - navigation: objeto injetado pelo Stack Navigator para abrir outras telas
// - idsMatriculados: Array global (persistido no AsyncStorage pelo App.js)
export default function CatalogoScreen({ navigation, idsMatriculados }) {
  // Estado local que guarda qual chip de categoria está selecionado ('Todos' por padrão)
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // Estado derivado (calculado a partir de categoriaAtiva):
  // Se 'Todos' estiver ativo, exibe a lista completa; caso contrário, filtra por categoria
  const cursosFiltrados =
    categoriaAtiva === 'Todos'
      ? LISTA_CURSOS
      : LISTA_CURSOS.filter((curso) => curso.categoria === categoriaAtiva);

  // Retorna a estrutura visual da tela de catálogo
  return (
    <View style={styles.tela}>
      {/* Banner superior com título, aviso de salvamento automático e contador */}
      <HeaderCatalogo
        titulo="Formação Técnica"
        subtitulo="Suas matrículas ficam salvas automaticamente no aparelho"
        totalInscritos={idsMatriculados.length} // Quantidade de IDs salvos no estado global
      />

      {/* Barra horizontal de chips para escolher a categoria */}
      <FiltroCategoria
        categorias={CATEGORIAS}        // Lista fixa de categorias
        ativa={categoriaAtiva}         // Categoria atualmente selecionada
        aoSelecionar={setCategoriaAtiva} // Atualiza o estado local ao tocar em um chip
      />

      {/* FlatList: renderiza apenas os cards visíveis na tela (alta performance) */}
      <FlatList
        data={cursosFiltrados}             // Array filtrado que alimenta a lista
        keyExtractor={(item) => item.id}   // Identificador único de cada item (String)
        contentContainerStyle={styles.lista} // Margens internas da área rolável
        // Componente exibido automaticamente se cursosFiltrados ficar vazio
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Text style={styles.vazioTexto}>
              Nenhum curso encontrado nesta categoria.
            </Text>
          </View>
        }
        // Função chamada para renderizar cada elemento da lista
        renderItem={({ item }) => (
          <CursoCard
            curso={item} // Envia o objeto completo do curso atual
            // Verifica se o ID do curso está salvo no Array de matrículas persistidas
            matriculado={idsMatriculados.includes(item.id)}
            // Empilha a tela 'DetalhesCurso' passando o objeto 'curso' como parâmetro de rota
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
  // Contêiner principal ocupando 100% da altura disponível
  tela: {
    flex: 1,                    // Expande para preencher toda a tela
    backgroundColor: '#F8FAFC', // Fundo cinza muito claro (Slate 50)
  },
  // Espaçamento interno da lista de cursos
  lista: {
    paddingHorizontal: 16, // Margem lateral esquerda e direita
    paddingBottom: 24,     // Folga inferior para o último card não colar nas abas
  },
  // Caixa centralizada para a mensagem de lista vazia
  vazioBox: {
    padding: 32,          // Espaçamento interno amplo
    alignItems: 'center', // Centraliza horizontalmente o texto
  },
  // Estilo do texto de lista vazia
  vazioTexto: {
    color: '#64748B', // Cinza médio
    fontSize: 15,     // Fonte legível
  },
});
