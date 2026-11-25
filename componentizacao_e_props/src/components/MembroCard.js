// Arquivo: src/components/MembroCard.js
// ============================================================================
// PASSO 3 (Prática Guiada): Card de Membro (Composição de Componentes + Props)
// ============================================================================

// Importa o React para utilizar JSX
import React from 'react';
// Importa View, Text e StyleSheet do React Native
import { View, Text, StyleSheet } from 'react-native';
// Importa o nosso próprio componente BotaoAcao (um componente dentro de outro!)
import BotaoAcao from './BotaoAcao';

// Exporta o componente Filho 'MembroCard'
// Recebe via Props:
// - nome: nome do profissional
// - cargo: função exercida na equipe
// - tecnologia: stack principal
// - disponivel: booleano (true = Disponível, false = Em Projeto)
// - onSelecionar: função enviada pelo Pai (App.js) para comunicação Filho -> Pai
export default function MembroCard({ nome, cargo, tecnologia, disponivel, onSelecionar }) {
  // Retorna o cartão visual do membro da equipe
  return (
    // Aplica o estilo base 'card' e, se NÃO estiver disponível (!disponivel), adiciona 'cardIndisponivel'
    <View style={[styles.card, !disponivel && styles.cardIndisponivel]}>
      {/* Linha superior do card contendo o Nome à esquerda e o Badge de status à direita */}
      <View style={styles.linhaTopo}>
        {/* Exibe o nome do membro recebido via Prop */}
        <Text style={styles.nome}>{nome}</Text>

        {/* Badge de status que muda a cor de fundo conforme o booleano 'disponivel' */}
        <View style={[styles.badge, disponivel ? styles.badgeAtivo : styles.badgeOcupado]}>
          {/* Texto interno do badge alternando entre 'Disponível' e 'Em Projeto' */}
          <Text style={styles.badgeTexto}>
            {disponivel ? 'Disponível' : 'Em Projeto'}
          </Text>
        </View>
      </View>

      {/* Exibe o cargo do profissional */}
      <Text style={styles.cargo}>{cargo}</Text>
      {/* Exibe a stack principal concatenada com a prop 'tecnologia' */}
      <Text style={styles.tech}>Stack principal: {tecnologia}</Text>

      {/* Reutiliza o componente BotaoAcao passando texto, cor dinâmica e a função onSelecionar */}
      <BotaoAcao
        texto="Selecionar para Tarefa" // Prop 'texto' enviada para BotaoAcao
        corFundo={disponivel ? '#059669' : '#64748B'} // Verde se disponível, cinza se ocupado
        onPress={onSelecionar} // Repassa o evento de clique para avisar o componente Pai (App.js)
      />
    </View>
  );
}

// Folha de estilos exclusiva do MembroCard
const styles = StyleSheet.create({
  // Estilo padrão do cartão quando o membro está disponível
  card: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 12, // Cantos arredondados
    padding: 16, // Espaçamento interno
    marginBottom: 12, // Espaço entre um card e o próximo
    borderLeftWidth: 5, // Faixa lateral esquerda destacada (5px)
    borderLeftColor: '#059669', // Cor verde na faixa lateral para membros disponíveis
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Cor da sombra no iOS/Web
    shadowOffset: { width: 0, height: 1 }, // Deslocamento vertical da sombra
    shadowOpacity: 0.1, // Opacidade suave da sombra
    shadowRadius: 3, // Raio de espalhamento da sombra
  },
  // Estilo complementar aplicado quando 'disponivel' é false
  cardIndisponivel: {
    borderLeftColor: '#94A3B8', // Troca a faixa lateral esquerda para cinza
    opacity: 0.85, // Deixa o card levemente translúcido
  },
  // Contêiner que alinha o nome e o badge na mesma linha
  linhaTopo: {
    flexDirection: 'row', // Organiza os elementos lado a lado (horizontal)
    justifyContent: 'space-between', // Empurra o nome para a esquerda e o badge para a direita
    alignItems: 'center', // Alinha verticalmente ao centro
    marginBottom: 4, // Pequeno espaço abaixo da linha do topo
  },
  // Estilo do nome do membro
  nome: {
    fontSize: 18, // Fonte grande
    fontWeight: 'bold', // Negrito
    color: '#0F172A', // Azul-marinho quase preto
  },
  // Estilo base da etiqueta (badge) de status
  badge: {
    paddingHorizontal: 10, // Espaçamento horizontal interno
    paddingVertical: 4, // Espaçamento vertical interno
    borderRadius: 12, // Arredondamento em formato de pílula
  },
  // Cor de fundo do badge quando o membro está disponível
  badgeAtivo: {
    backgroundColor: '#D1FAE5', // Verde pastel claro
  },
  // Cor de fundo do badge quando o membro está em projeto (ocupado)
  badgeOcupado: {
    backgroundColor: '#E2E8F0', // Cinza claro
  },
  // Estilo do texto dentro do badge
  badgeTexto: {
    fontSize: 12, // Fonte pequena
    fontWeight: 'bold', // Negrito
    color: '#1E293B', // Cor escura para leitura clara
  },
  // Estilo do texto de cargo
  cargo: {
    fontSize: 14, // Tamanho médio
    color: '#475569', // Cinza médio
    marginBottom: 4, // Espaço antes da linha de tecnologia
  },
  // Estilo do texto de tecnologia (Stack principal)
  tech: {
    fontSize: 13, // Tamanho médio-pequeno
    color: '#2563EB', // Azul vibrante para destacar a stack
    fontWeight: '600', // Semi-negrito
  },
});

