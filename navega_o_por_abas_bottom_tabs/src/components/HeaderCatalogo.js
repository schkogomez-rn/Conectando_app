// Arquivo: src/components/HeaderCatalogo.js
// ============================================================================
// PASSO 2 (Prática Guiada - Aula 8): Cabeçalho Reutilizável do Catálogo
// Exibe o título, um subtítulo explicativo e um painel azul com o contador
// em tempo real de cursos em que o aluno está inscrito (totalInscritos).
// ============================================================================

// Importa o React para interpretar a sintaxe JSX
import React from 'react';
// Importa View (contêiner), Text (texto) e StyleSheet (folha de estilos) do React Native
import { View, Text, StyleSheet } from 'react-native';

// Exporta o componente funcional 'HeaderCatalogo' recebendo 3 Props desestruturadas:
// - titulo: texto principal do cabeçalho
// - subtitulo: orientação complementar abaixo do título
// - totalInscritos: número inteiro com a quantidade de matrículas ativas
export default function HeaderCatalogo({ titulo, subtitulo, totalInscritos }) {
  // Retorna a estrutura visual do cabeçalho escuro com bordas inferiores arredondadas
  return (
    // Contêiner externo do cabeçalho
    <View style={styles.header}>
      {/* Linha interna que organiza os textos à esquerda e o contador à direita */}
      <View style={styles.topo}>
        {/* Bloco flexível de textos (título e subtítulo) */}
        <View style={styles.textos}>
          {/* Exibe o título recebido via Prop */}
          <Text style={styles.titulo}>{titulo}</Text>
          {/* Exibe o subtítulo recebido via Prop */}
          <Text style={styles.subtitulo}>{subtitulo}</Text>
        </View>

        {/* Caixa azul em destaque exibindo a contagem de cursos matriculados */}
        <View style={styles.contadorBox}>
          {/* Número total de matrículas atualizadas pelo estado global no App.js */}
          <Text style={styles.contadorNumero}>{totalInscritos}</Text>
          {/* Operador ternário para concordância correta entre singular ('Inscrito') e plural ('Inscritos') */}
          <Text style={styles.contadorLabel}>
            {totalInscritos === 1 ? 'Inscrito' : 'Inscritos'}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Folha de estilos encapsulada do componente HeaderCatalogo
const styles = StyleSheet.create({
  // Fundo escuro com espaçamentos internos e cantos inferiores arredondados
  header: {
    backgroundColor: '#0F172A', // Azul petróleo bem escuro (Slate 900)
    paddingTop: 18, // Espaçamento interno superior
    paddingBottom: 18, // Espaçamento interno inferior
    paddingHorizontal: 20, // Espaçamento interno nas laterais
    borderBottomLeftRadius: 20, // Arredonda o canto inferior esquerdo
    borderBottomRightRadius: 20, // Arredonda o canto inferior direito
  },
  // Alinha o bloco de textos e o contador lado a lado na horizontal
  topo: {
    flexDirection: 'row', // Organiza filhos em linha (horizontal)
    justifyContent: 'space-between', // Empurra os elementos para as extremidades
    alignItems: 'center', // Centraliza verticalmente os itens da linha
  },
  // Faz a coluna de textos ocupar todo o espaço restante sem colidir com o contador
  textos: {
    flex: 1, // Ocupa a largura disponível
    paddingRight: 12, // Respiro à direita antes da caixa do contador
  },
  // Estilo do título principal
  titulo: {
    fontSize: 20, // Tamanho grande e legível
    fontWeight: 'bold', // Negrito para hierarquia visual
    color: '#F8FAFC', // Branco suave para contraste no fundo escuro
  },
  // Estilo do subtítulo explicativo
  subtitulo: {
    fontSize: 13, // Fonte menor para texto secundário
    color: '#94A3B8', // Cinza azulado claro
    marginTop: 4, // Pequeno espaçamento abaixo do título
  },
  // Cartão azul do contador de matrículas
  contadorBox: {
    backgroundColor: '#2563EB', // Azul vibrante de destaque
    paddingVertical: 8, // Altura interna
    paddingHorizontal: 14, // Largura interna
    borderRadius: 12, // Cantos arredondados
    alignItems: 'center', // Centraliza número e legenda horizontalmente
    minWidth: 74, // Largura mínima para manter proporção equilibrada
  },
  // Número em destaque dentro da caixa azul
  contadorNumero: {
    fontSize: 20, // Número grande
    fontWeight: 'bold', // Negrito
    color: '#FFFFFF', // Branco puro
  },
  // Rótulo "Inscrito" / "Inscritos" abaixo do número
  contadorLabel: {
    fontSize: 11, // Fonte compacta
    color: '#DBEAFE', // Azul bem claro
    fontWeight: '600', // Semi-negrito
  },
});
