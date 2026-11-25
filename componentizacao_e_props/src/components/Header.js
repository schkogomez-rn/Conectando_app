// Arquivo: src/components/Header.js
// ============================================================================
// PASSO 1 (Prática Guiada): Cabeçalho Reutilizável com Props
// ============================================================================

// Importa a biblioteca principal do React para habilitar o uso de JSX
import React from 'react';
// Importa os componentes visuais nativos do React Native:
// - View: contêiner de layout para agrupar o cabeçalho
// - Text: componente para exibir o título e o subtítulo
// - StyleSheet: utilitário para criar a folha de estilos otimizada
import { View, Text, StyleSheet } from 'react-native';

// Exporta o componente funcional 'Header'
// Desestruturamos ({ titulo, subtitulo }) diretamente nos parâmetros da função
// para receber os valores enviados pelo componente Pai (App.js) via Props
export default function Header({ titulo, subtitulo }) {
  // Retorna a estrutura visual (JSX) do cabeçalho
  return (
    // View principal que aplica a cor de fundo escura e bordas arredondadas
    <View style={styles.container}>
      {/* Exibe o texto recebido na prop 'titulo' */}
      <Text style={styles.titulo}>{titulo}</Text>

      {/* Renderização Condicional (Operador Ternário):
          Só desenha o componente <Text> do subtítulo se a prop 'subtitulo' existir */}
      {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
    </View>
  );
}

// Cria a folha de estilos exclusiva do componente Header
const styles = StyleSheet.create({
  // Estilo da caixa externa do cabeçalho
  container: {
    backgroundColor: '#1E293B', // Cor de fundo azul-escuro (ardósia)
    paddingTop: 48, // Espaçamento superior para afastar da barra de status do celular
    paddingBottom: 20, // Espaçamento interno inferior
    paddingHorizontal: 20, // Espaçamento interno nas laterais (esquerda e direita)
    borderBottomLeftRadius: 16, // Arredonda o canto inferior esquerdo
    borderBottomRightRadius: 16, // Arredonda o canto inferior direito
    marginBottom: 16, // Espaço externo abaixo do cabeçalho
  },
  // Estilo do texto principal (título)
  titulo: {
    fontSize: 22, // Tamanho da fonte em destaque
    fontWeight: 'bold', // Peso da fonte em negrito
    color: '#F8FAFC', // Cor branca suave para alto contraste
  },
  // Estilo do texto secundário (subtítulo)
  subtitulo: {
    fontSize: 14, // Fonte menor que a do título
    color: '#94A3B8', // Cinza-azulado claro
    marginTop: 4, // Pequeno espaçamento acima para separar do título
  },
});

