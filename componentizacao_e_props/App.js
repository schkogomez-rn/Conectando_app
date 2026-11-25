// Arquivo: App.js
// ============================================================================
// AULA 6: Componentização, Props e Organização de Projetos
// Contém:
// 1. Prática Guiada (Passo 4): App Equipe de Desenvolvimento (Header + MembroCard + BotaoAcao)
// 2. Exercício Prático (Requisito 5): Catálogo de Cursos Interativos (HeaderCatalogo + FiltroCategoria + CursoCard)
// ============================================================================

// Importa o React e o Hook useState para gerenciar os estados da tela principal
import React, { useState } from 'react';
// Importa View, Text, FlatList, TouchableOpacity e StyleSheet do React Native
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Importa os componentes da Parte 1 (Prática Guiada: Equipe de Desenvolvimento)
import Header from './src/components/Header';
import MembroCard from './src/components/MembroCard';

// Importa a base de dados e os componentes da Parte 2 (Exercício Prático: Catálogo de Cursos)
import { CATEGORIAS, LISTA_CURSOS } from './src/data/cursos';
import HeaderCatalogo from './src/components/HeaderCatalogo';
import FiltroCategoria from './src/components/FiltroCategoria';
import CursoCard from './src/components/CursoCard';

// ============================================================================
// DADOS DA PRÁTICA GUIADA (Equipe Inicial de Desenvolvimento)
// ============================================================================
const EQUIPE_INICIAL = [
  {
    id: '1', // Identificador único do membro (String)
    nome: 'Ana Beatriz', // Nome enviado via prop 'nome'
    cargo: 'Desenvolvedora Mobile', // Cargo enviado via prop 'cargo'
    tecnologia: 'React Native & Expo', // Stack enviada via prop 'tecnologia'
    disponivel: true, // Booleano enviado via prop 'disponivel'
  },
  {
    id: '2',
    nome: 'Carlos Eduardo',
    cargo: 'Desenvolvedor Back-end',
    tecnologia: 'Node.js, Express & PostgreSQL',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Mariana Costa',
    cargo: 'UI/UX Designer',
    tecnologia: 'Figma & Design Systems',
    disponivel: false,
  },
  {
    id: '4',
    nome: 'Lucas Fernandes',
    cargo: 'Engenheiro de QA',
    tecnologia: 'Testes Automatizados',
    disponivel: true,
  },
];

// Exporta o componente principal App (Componente Pai que orquestra estados e listas)
export default function App() {
  // Estado didático para alternar na tela entre a "Prática Guiada" ('equipe') e o "Exercício Prático" ('cursos')
  const [abaAtiva, setAbaAtiva] = useState('equipe');

  // --------------------------------------------------------------------------
  // ESTADO DA PRÁTICA GUIADA (Passo 4):
  // Guarda o último membro da equipe selecionado pelo usuário ao clicar em MembroCard
  // --------------------------------------------------------------------------
  const [selecionado, setSelecionado] = useState(null);

  // --------------------------------------------------------------------------
  // ESTADOS DO EXERCÍCIO PRÁTICO (Requisito 5):
  // 1. categoriaAtiva: armazena a categoria escolhida na barra horizontal (inicia em 'Todos')
  // 2. idsMatriculados: Array com os IDs dos cursos em que o aluno garantiu vaga
  // --------------------------------------------------------------------------
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [idsMatriculados, setIdsMatriculados] = useState([]);

  // Função que adiciona ou remove o ID de um curso na lista de matriculados (Toggle)
  const alternarMatricula = (idCurso) => {
    // Atualiza o estado verificando se o ID já está presente no Array
    setIdsMatriculados((listaAtual) =>
      listaAtual.includes(idCurso)
        ? listaAtual.filter((id) => id !== idCurso) // Se já estava matriculado, remove o ID (cancela)
        : [...listaAtual, idCurso] // Se não estava matriculado, adiciona o ID ao final do Array
    );
  };

  // Requisito 5: Filtra os cursos conforme a categoria escolhida no estado 'categoriaAtiva'
  const cursosFiltrados =
    categoriaAtiva === 'Todos'
      ? LISTA_CURSOS // Se a categoria for 'Todos', retorna todos os cursos sem filtrar
      : LISTA_CURSOS.filter((curso) => curso.categoria === categoriaAtiva); // Caso contrário, filtra pela categoria exata

  // Retorna a interface principal do aplicativo
  return (
    // Contêiner principal ocupando toda a tela
    <View style={styles.tela}>
      {/* ====================================================================
          TELA 1: PRÁTICA GUIADA (Equipe de Desenvolvimento - Passos 1 a 4)
         ==================================================================== */}
      {abaAtiva === 'equipe' ? (
        <View style={styles.conteudo}>
          {/* Componente Header recebendo 'titulo' e 'subtitulo' via Props */}
          <Header
            titulo="Equipe de Desenvolvimento"
            subtitulo="Prática Guiada: Componentização e Props"
          />

          {/* Barra didática para alternar entre a Prática Guiada e o Exercício Prático */}
          <View style={styles.seletorAbas}>
            <TouchableOpacity
              style={[styles.botaoAba, abaAtiva === 'equipe' && styles.botaoAbaAtiva]}
              onPress={() => setAbaAtiva('equipe')}
            >
              <Text style={[styles.textoAba, abaAtiva === 'equipe' && styles.textoAbaAtiva]}>
                1. Prática (Equipe)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botaoAba, abaAtiva === 'cursos' && styles.botaoAbaAtiva]}
              onPress={() => setAbaAtiva('cursos')}
            >
              <Text style={[styles.textoAba, abaAtiva === 'cursos' && styles.textoAbaAtiva]}>
                2. Exercício (Cursos)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Painel de Feedback visual da comunicação Filho (MembroCard) -> Pai (App) */}
          <View style={styles.painelStatus}>
            <Text style={styles.statusTexto}>
              {selecionado
                ? `Selecionado: ${selecionado.nome} (${selecionado.tecnologia})`
                : 'Toque em um card abaixo para escalar um membro'}
            </Text>
          </View>

          {/* FlatList renderizando o componente reutilizável MembroCard para cada item */}
          <FlatList
            data={EQUIPE_INICIAL} // Array de membros da equipe
            keyExtractor={(item) => item.id} // Chave única em formato String
            contentContainerStyle={styles.lista} // Espaçamento interno da lista
            renderItem={({ item }) => (
              // Instancia o componente MembroCard passando os dados e a função callback via Props
              <MembroCard
                nome={item.nome} // Envia o nome do membro
                cargo={item.cargo} // Envia o cargo
                tecnologia={item.tecnologia} // Envia a stack principal
                disponivel={item.disponivel} // Envia o booleano de disponibilidade
                onSelecionar={() => setSelecionado(item)} // Atualiza o estado 'selecionado' no Pai ao clicar
              />
            )}
          />
        </View>
      ) : (
        /* ====================================================================
           TELA 2: EXERCÍCIO PRÁTICO (Catálogo de Cursos Interativos - Requisitos 1 a 5)
           ==================================================================== */
        <View style={styles.conteudo}>
          {/* espacoTopo para respeitar a barra de status antes do HeaderCatalogo */}
          <View style={styles.topoCatalogo}>
            {/* Requisito 2: Cabeçalho recebendo titulo, subtitulo e totalInscritos via Props */}
            <HeaderCatalogo
              titulo="Catálogo de Cursos"
              subtitulo="Exercício Prático: Arquitetura em Componentes"
              totalInscritos={idsMatriculados.length} // Quantidade de IDs no array de matrículas
            />
          </View>

          {/* Barra didática para alternar entre a Prática Guiada e o Exercício Prático */}
          <View style={[styles.seletorAbas, { marginTop: 12 }]}>
            <TouchableOpacity
              style={[styles.botaoAba, abaAtiva === 'equipe' && styles.botaoAbaAtiva]}
              onPress={() => setAbaAtiva('equipe')}
            >
              <Text style={[styles.textoAba, abaAtiva === 'equipe' && styles.textoAbaAtiva]}>
                1. Prática (Equipe)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botaoAba, abaAtiva === 'cursos' && styles.botaoAbaAtiva]}
              onPress={() => setAbaAtiva('cursos')}
            >
              <Text style={[styles.textoAba, abaAtiva === 'cursos' && styles.textoAbaAtiva]}>
                2. Exercício (Cursos)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Requisito 3: Barra horizontal de filtros recebendo categorias, ativa e aoSelecionar */}
          <FiltroCategoria
            categorias={CATEGORIAS} // Array ['Todos', 'Mobile', 'Back-end', 'Dados', 'Infraestrutura']
            ativa={categoriaAtiva} // Categoria atualmente selecionada
            aoSelecionar={(novaCategoria) => setCategoriaAtiva(novaCategoria)} // Troca a categoria ativa
          />

          {/* Requisito 5: FlatList exibindo os cursos filtrados usando o componente CursoCard */}
          <FlatList
            data={cursosFiltrados} // Array de cursos já filtrado pela categoria ativa
            keyExtractor={(item) => item.id} // Chave única do curso (String)
            contentContainerStyle={styles.lista} // Espaçamento interno
            renderItem={({ item }) => (
              // Requisito 4: Componente CursoCard recebendo curso, matriculado e onToggleMatricula
              <CursoCard
                curso={item} // Objeto completo com os dados do curso
                matriculado={idsMatriculados.includes(item.id)} // true se o ID do curso estiver no estado idsMatriculados
                onToggleMatricula={() => alternarMatricula(item.id)} // Matricula ou cancela matrícula ao clicar
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

// ============================================================================
// ESTILOS DO COMPONENTE PRINCIPAL (App.js)
// ============================================================================
const styles = StyleSheet.create({
  // Estilo do contêiner raiz da aplicação
  tela: {
    flex: 1, // Ocupa 100% da altura da tela
    backgroundColor: '#F1F5F9', // Cor de fundo cinza-azulado claro
  },
  // Contêiner flexível para cada aba
  conteudo: {
    flex: 1, // Expande para permitir que a FlatList role corretamente
  },
  // Ajuste de topo para o cabeçalho do catálogo de cursos
  topoCatalogo: {
    paddingTop: 30, // Respeita a área da barra de status superior
    backgroundColor: '#0F172A', // Mesma cor do HeaderCatalogo para continuidade visual
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  // Barra seletora para alternar entre Prática Guiada e Exercício Prático
  seletorAbas: {
    flexDirection: 'row', // Botões lado a lado
    marginHorizontal: 16, // Alinhado com as margens laterais da lista
    marginBottom: 12, // Espaço inferior
    backgroundColor: '#E2E8F0', // Fundo cinza claro da barra de abas
    borderRadius: 10, // Bordas arredondadas
    padding: 4, // Espaçamento interno para destacar a aba ativa
  },
  // Estilo de cada botão da barra de abas
  botaoAba: {
    flex: 1, // Cada aba ocupa 50% da largura
    paddingVertical: 8, // Altura confortável para toque
    borderRadius: 8, // Cantos arredondados
    alignItems: 'center', // Centraliza o texto
  },
  // Estilo aplicado na aba selecionada
  botaoAbaAtiva: {
    backgroundColor: '#FFFFFF', // Fundo branco destacado
    elevation: 1, // Sombra leve no Android
  },
  // Texto padrão das abas
  textoAba: {
    fontSize: 13, // Tamanho compacto
    fontWeight: '600', // Semi-negrito
    color: '#64748B', // Cinza médio
  },
  // Texto da aba ativa
  textoAbaAtiva: {
    color: '#0F172A', // Azul escuro em destaque
    fontWeight: 'bold', // Negrito
  },
  // Caixa azul clara que exibe o membro selecionado na Prática Guiada
  painelStatus: {
    backgroundColor: '#DBEAFE', // Azul claro suave
    marginHorizontal: 16, // Margem lateral esquerda e direita
    marginBottom: 12, // Espaço antes do início da FlatList
    padding: 12, // Espaçamento interno
    borderRadius: 8, // Bordas arredondadas
    borderWidth: 1, // Borda fina de 1px
    borderColor: '#93C5FD', // Azul médio na borda
  },
  // Texto dentro do painel de status
  statusTexto: {
    color: '#1E40AF', // Azul escuro para boa leitura
    fontWeight: '600', // Semi-negrito
    textAlign: 'center', // Centraliza o texto horizontalmente
    fontSize: 14, // Tamanho da fonte
  },
  // Espaçamento interno da FlatList
  lista: {
    paddingHorizontal: 16, // Margem interna esquerda e direita dos cards
    paddingBottom: 24, // Espaço extra no final da rolagem
  },
});
