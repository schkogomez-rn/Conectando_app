// Arquivo: src/components/HeaderCatalogo.js
// ============================================================================
// AULA 9 — PRÁTICA GUIADA (Passo 2): Componente Reutilizável HeaderCatalogo
// Exibe o banner superior da tela de Catálogo de Cursos com:
// - Título e subtítulo informativo sobre a persistência automática
// - Contador em tempo real de cursos matriculados (sincronizado via Props)
// ============================================================================

// Importa o React para habilitar a escrita de elementos JSX
import React from 'react';
// Importa View (contêiner), Text (texto) e StyleSheet (folha de estilos otimizada)
import { View, Text, StyleSheet } from 'react-native';

// Exporta o componente funcional recebendo 3 Props desestruturadas:
// - titulo: texto principal do cabeçalho
// - subtitulo: descrição auxiliar exibida abaixo do título
// - totalInscritos: número inteiro com a quantidade de matrículas ativas
export default function HeaderCatalogo({ titulo, subtitulo, totalInscritos }) {
  // Retorna a árvore visual (JSX) do cabeçalho
  return (
    <View style={styles.header}>
      {/* Linha horizontal que separa os textos à esquerda e o contador à direita */}
      <View style={styles.topo}>
        {/* Bloco flexível à esquerda para o título e o subtítulo */}
        <View style={styles.textos}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.subtitulo}>{subtitulo}</Text>
        </View>

        {/* Caixa azul de destaque à direita exibindo o contador de matrículas */}
        <View style={styles.contadorBox}>
          {/* Número total vindo do estado global persistido no AsyncStorage */}
          <Text style={styles.contadorNumero}>{totalInscritos}</Text>
          {/* Operador ternário para ajustar o singular/plural corretamente */}
          <Text style={styles.contadorLabel}>
            {totalInscritos === 1 ? 'Inscrito' : 'Inscritos'}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Cria a folha de estilos encapsulada deste componente usando StyleSheet.create
const styles = StyleSheet.create({
  // Fundo escuro principal do banner com cantos inferiores arredondados
  header: {
    backgroundColor: '#0F172A', // Azul marinho bem escuro (Slate 900)
    paddingTop: 18,             // Espaçamento interno superior
    paddingBottom: 18,          // Espaçamento interno inferior
    paddingHorizontal: 20,      // Espaçamento interno nas laterais
    borderBottomLeftRadius: 20, // Arredondamento do canto inferior esquerdo
    borderBottomRightRadius: 20,// Arredondamento do canto inferior direito
  },
  // Alinha o bloco de textos e o contador lado a lado (eixo horizontal)
  topo: {
    flexDirection: 'row',            // Distribuição em linha
    justifyContent: 'space-between', // Empurra os itens para as extremidades
    alignItems: 'center',            // Centraliza verticalmente os dois blocos
  },
  // Contêiner dos textos que ocupa todo o espaço livre à esquerda
  textos: {
    flex: 1,          // Cresce para preencher a largura restante sem empurrar o contador
    paddingRight: 12, // Folga à direita para não encostar no contador azul
  },
  // Estilo do título principal
  titulo: {
    fontSize: 20,        // Tamanho de fonte destacado
    fontWeight: 'bold',  // Negrito
    color: '#F8FAFC',    // Branco suave para alto contraste
  },
  // Estilo do subtítulo informativo
  subtitulo: {
    fontSize: 13,     // Tamanho compacto de apoio
    color: '#94A3B8', // Cinza azulado claro
    marginTop: 4,     // Pequeno espaço entre título e subtítulo
  },
  // Cartão azul que destaca numericamente o total de matrículas
  contadorBox: {
    backgroundColor: '#2563EB', // Azul vibrante (Blue 600)
    paddingVertical: 8,         // Altura interna
    paddingHorizontal: 14,      // Largura interna
    borderRadius: 12,           // Cantos arredondados
    alignItems: 'center',       // Centraliza número e legenda horizontalmente
    minWidth: 74,               // Largura mínima para evitar variação ao mudar dígitos
  },
  // Estilo do número dentro do contador
  contadorNumero: {
    fontSize: 20,       // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#FFFFFF',   // Branco puro
  },
  // Estilo da palavra "Inscrito" / "Inscritos"
  contadorLabel: {
    fontSize: 11,      // Fonte pequena
    color: '#DBEAFE',  // Azul bem claro
    fontWeight: '600', // Semi-negrito
  },
});
