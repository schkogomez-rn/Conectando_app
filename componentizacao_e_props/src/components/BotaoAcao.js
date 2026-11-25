// Arquivo: src/components/BotaoAcao.js
// ============================================================================
// PASSO 2 (Prática Guiada): Botão Customizável via Props
// ============================================================================

// Importa o React para criação do componente JSX
import React from 'react';
// Importa os elementos do React Native:
// - TouchableOpacity: área clicável que reduz a opacidade ao toque
// - Text: exibe o rótulo interno do botão
// - StyleSheet: cria os estilos visuais do botão
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Exporta o componente 'BotaoAcao' recebendo 3 Props desestruturadas:
// - texto: o rótulo que aparecerá escrito no botão
// - corFundo = '#2563EB': cor de fundo com valor padrão azul caso o Pai não informe outra cor
// - onPress: função callback que será executada quando o usuário tocar no botão
export default function BotaoAcao({ texto, corFundo = '#2563EB', onPress }) {
  // Retorna o botão interativo
  return (
    // TouchableOpacity combina o estilo fixo (styles.botao) com a cor dinâmica ({ backgroundColor: corFundo })
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: corFundo }]} // Array de estilos: base + cor recebida via Prop
      activeOpacity={0.8} // Define a transparência (80%) no momento do clique
      onPress={onPress} // Dispara a função recebida via Prop ao clicar
    >
      {/* Exibe o texto recebido via Prop dentro do botão */}
      <Text style={styles.textoBotao}>{texto}</Text>
    </TouchableOpacity>
  );
}

// Folha de estilos isolada do componente BotaoAcao
const styles = StyleSheet.create({
  // Estilo base do corpo do botão
  botao: {
    paddingVertical: 10, // Altura interna (espaçamento em cima e embaixo)
    paddingHorizontal: 16, // Largura interna (espaçamento nas laterais)
    borderRadius: 8, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto horizontalmente
    justifyContent: 'center', // Centraliza o texto verticalmente
    marginTop: 10, // Espaço externo acima do botão
  },
  // Estilo do rótulo de texto do botão
  textoBotao: {
    color: '#FFFFFF', // Texto branco
    fontWeight: 'bold', // Texto em negrito
    fontSize: 14, // Tamanho da fonte
  },
});

