// Arquivo: App.js
// ============================================================================
// AULA 5: Listas de Alta Performance com FlatList
// Prática Guiada (Lista de Usuários) + Exercício Prático (Busca em Tempo Real)
// ============================================================================
// POR QUE USAR A FlatList EM VEZ DO ScrollView?
// - O ScrollView renderiza TODOS os itens do Array na memória RAM de uma só vez.
// - A FlatList usa Lazy Loading (Renderização Sob Demanda) e Reciclagem:
//   desenha apenas os itens visíveis na tela e recicla os que saem pelo topo!
//
// AS 3 PROPRIEDADES OBRIGATÓRIAS DA FlatList:
// 1. data={...}         -> A matéria-prima (Array de dados que será exibido).
// 2. keyExtractor={...} -> Etiqueta única de cada item (SEMPRE retorna String).
// 3. renderItem={...}   -> Instrução de montagem que desenha 1 item por vez.
// ============================================================================

// Importa o React e os Hooks:
// - useState: para armazenar os estados da tela (usuários, carregamento, busca)
// - useEffect: para disparar a busca na API automaticamente ao abrir o app
import React, { useState, useEffect } from 'react';

// Importa os componentes visuais nativos do React Native:
// - StyleSheet: cria a folha de estilos
// - Text: exibe textos na tela
// - View: contêiner de layout (bloco visual)
// - FlatList: componente de lista de alta performance com Lazy Loading
// - ActivityIndicator: ícone giratório de carregamento (spinner)
// - TextInput: campo de digitação para o filtro de pesquisa em tempo real
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';

// Exporta o componente principal App
export default function App() {
  // 1. Estado para armazenar o Array completo de usuários vindo da API
  const [usuarios, setUsuarios] = useState([]);

  // 2. Estado booleano para controlar a exibição do spinner de carregamento inicial
  const [carregando, setCarregando] = useState(true);

  // 3. (Exercício Prático - Requisito 3) Estado para armazenar o texto digitado na barra de pesquisa
  const [busca, setBusca] = useState('');

  // 4. Estado opcional para o recurso "Puxar para Atualizar" (Pull to Refresh da seção 3)
  const [atualizando, setAtualizando] = useState(false);

  // 5. Função assíncrona para buscar a lista de usuários na API pública JSONPlaceholder
  const buscarUsuarios = async () => {
    // Ativa o indicador de carregamento antes de iniciar a requisição
    setCarregando(true);
    try {
      // Faz a requisição HTTP GET para a API de usuários
      const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
      // Converte o corpo da resposta de JSON (texto) para um Array de objetos JS
      const dados = await resposta.json();
      // Salva o Array de usuários recebido dentro do estado 'usuarios'
      setUsuarios(dados);
    } catch (erro) {
      // Caso ocorra falha de rede, exibe um alerta amigável ao usuário
      alert('Erro ao carregar os usuários.');
    } finally {
      // O bloco finally executa SEMPRE (com sucesso ou erro), desligando os spinners
      setCarregando(false);
      setAtualizando(false);
    }
  };

  // 6. (Prática Guiada & Exercício Requisito 1) useEffect com Array vazio []
  // Executa a função buscarUsuarios() UMA ÚNICA VEZ assim que a tela é montada
  useEffect(() => {
    buscarUsuarios();
  }, []);

  // 7. Função acionada quando o usuário puxa a lista para baixo (Pull to Refresh)
  const atualizarLista = () => {
    // Marca que a atualização por gesto começou
    setAtualizando(true);
    // Chama novamente a API para recarregar os dados
    buscarUsuarios();
  };

  // 8. (Exercício Prático - Requisito 4) Cria a lista filtrada em tempo real usando .filter()
  // - Passamos tanto o nome do usuário (item.name) quanto o texto da busca (busca) para minúsculas (.toLowerCase())
  // - Usamos .includes() para verificar se o nome contém as letras digitadas
  const usuariosFiltrados = usuarios.filter((item) =>
    item.name.toLowerCase().includes(busca.toLowerCase())
  );

  // 9. Função de renderização individual passada para a prop 'renderItem' da FlatList
  // Usamos a desestruturação ({ item }) porque a FlatList envia um objeto { item, index, separators }
  const renderizarUsuario = ({ item }) => (
    // Card principal do contato (organizado em linha com flexDirection: 'row')
    <View style={styles.card}>
      {/* Avatar circular estilizado exibindo a 1ª letra do nome do usuário com charAt(0) */}
      <View style={styles.avatar}>
        <Text style={styles.textoAvatar}>{item.name.charAt(0)}</Text>
      </View>

      {/* Contêiner com os textos de Nome, E-mail e Empresa do contato */}
      <View style={styles.infoContainer}>
        {/* Exibe o nome completo do usuário em destaque */}
        <Text style={styles.nome}>{item.name}</Text>
        {/* Exibe o e-mail do usuário */}
        <Text style={styles.email}>✉️ {item.email}</Text>
        {/* Exibe o nome da empresa (acessando o objeto aninhado item.company.name) */}
        <Text style={styles.empresa}>🏢 {item.company.name}</Text>
      </View>
    </View>
  );

  // 10. Retorno do JSX (Interface Visual do Aplicativo)
  return (
    // Contêiner principal que ocupa 100% da tela (flex: 1)
    <View style={styles.container}>
      {/* Título principal da aula no topo da tela */}
      <Text style={styles.header}>👥 Lista de Usuários (FlatList)</Text>

      {/* (Exercício Prático - Requisito 2) Campo de texto (TextInput) no topo para barra de pesquisa */}
      <TextInput
        style={styles.inputBusca} // Aplica o estilo visual da barra de busca
        placeholder="🔍 Pesquisar contato pelo nome..." // Texto de dica quando o campo está vazio
        placeholderTextColor="#95a5a6" // Cor suave para o texto de dica
        value={busca} // Conecta o valor do campo ao estado 'busca'
        onChangeText={(textoDigitado) => setBusca(textoDigitado)} // Atualiza o estado 'busca' a cada tecla digitada
        autoCapitalize="none" // Evita capitalizar automaticamente a primeira letra
        autoCorrect={false} // Desativa correção ortográfica para facilitar busca de nomes
      />

      {/* Renderização Condicional (Operador Ternário):
          Se 'carregando' for true, mostra o spinner ActivityIndicator;
          Caso contrário (:), renderiza a FlatList de alta performance */}
      {carregando ? (
        // Exibe o ícone de carregamento enquanto aguarda a resposta da API
        <ActivityIndicator size="large" color="#0984e3" style={{ marginTop: 50 }} />
      ) : (
        /* Componente FlatList configurado com as 3 props obrigatórias + props utilitárias */
        <FlatList
          // PROP OBRIGATÓRIA 1 (data): Passamos o Array filtrado pela busca em tempo real
          data={usuariosFiltrados}
          // PROP OBRIGATÓRIA 2 (keyExtractor): Extrai o ID único de cada item e converte para String
          keyExtractor={(item) => item.id.toString()}
          // PROP OBRIGATÓRIA 3 (renderItem): Passa a função que desenha cada card individualmente
          renderItem={renderizarUsuario}
          // PROP UTILITÁRIA: Oculta a barra de rolagem vertical lateral para um visual mais limpo
          showsVerticalScrollIndicator={false}
          // PROP UTILITÁRIA (Pull to Refresh): Indica se a lista está recarregando ao puxar para baixo
          refreshing={atualizando}
          // PROP UTILITÁRIA (Pull to Refresh): Função disparada quando o usuário puxa a lista para baixo
          onRefresh={atualizarLista}
          // PROP UTILITÁRIA (Exercício Prático - Requisito 5):
          // Componente exibido automaticamente quando o Array 'usuariosFiltrados' está vazio
          ListEmptyComponent={
            <Text style={styles.listaVazia}>
              Nenhum contato encontrado para "{busca}".
            </Text>
          }
        />
      )}
    </View>
  );
}

// ============================================================================
// FOLHA DE ESTILOS (StyleSheet) - Cada propriedade comentada
// ============================================================================
const styles = StyleSheet.create({
  // Estilo do contêiner principal da tela
  container: {
    flex: 1, // Ocupa todo o espaço disponível da tela
    backgroundColor: '#f5f6fa', // Cor de fundo cinza bem claro
    padding: 20, // Espaçamento interno nas laterais e base
    paddingTop: 50, // Espaçamento extra no topo para não encostar na barra de status
  },
  // Estilo do título principal no topo
  header: {
    fontSize: 24, // Tamanho da fonte grande para destaque
    fontWeight: 'bold', // Texto em negrito
    color: '#2f3640', // Cor grafite escuro
    textAlign: 'center', // Centraliza o título horizontalmente
    marginBottom: 15, // Espaço abaixo do título antes da barra de pesquisa
  },
  // Estilo do campo de busca (TextInput) do Exercício Prático
  inputBusca: {
    backgroundColor: '#ffffff', // Fundo branco para destacar do fundo cinza
    borderRadius: 10, // Bordas arredondadas
    paddingHorizontal: 15, // Espaçamento interno nas laterais do texto digitado
    paddingVertical: 12, // Altura interna confortável para o toque
    fontSize: 16, // Tamanho da letra digitada
    color: '#2f3640', // Cor do texto digitado
    marginBottom: 16, // Espaço entre a barra de busca e o início da FlatList
    borderWidth: 1, // Espessura da borda sutil
    borderColor: '#dcdde1', // Cor cinza clara na borda
    elevation: 1, // Sombra leve no Android
  },
  // Estilo de cada cartão (card) de usuário renderizado pela FlatList
  card: {
    backgroundColor: '#ffffff', // Fundo branco do cartão
    padding: 15, // Espaçamento interno entre a borda do card e o conteúdo
    borderRadius: 10, // Cantos arredondados
    marginBottom: 12, // Espaço vertical entre um card e o próximo
    flexDirection: 'row', // Posiciona o Avatar e os Textos lado a lado (em linha)
    alignItems: 'center', // Alinha verticalmente o Avatar e os Textos ao centro
    elevation: 2, // Sombra nativa no Android
    shadowColor: '#000', // Cor da sombra no iOS/Web
    shadowOpacity: 0.05, // Transparência suave da sombra no iOS/Web
    shadowRadius: 5, // Difusão da sombra no iOS/Web
  },
  // Estilo do círculo azul do Avatar à esquerda do card
  avatar: {
    width: 50, // Largura fixa de 50px
    height: 50, // Altura fixa de 50px
    borderRadius: 25, // Metade da largura/altura (25) para formar um círculo perfeito
    backgroundColor: '#0984e3', // Azul vibrante de fundo
    justifyContent: 'center', // Centraliza a letra inicial na vertical
    alignItems: 'center', // Centraliza a letra inicial na horizontal
    marginRight: 15, // Espaço à direita para separar o avatar dos textos
  },
  // Estilo da letra inicial dentro do Avatar
  textoAvatar: {
    color: '#ffffff', // Cor branca para contrastar com o círculo azul
    fontSize: 22, // Letra grande
    fontWeight: 'bold', // Letra em negrito
  },
  // Contêiner que agrupa o nome, e-mail e empresa à direita do avatar
  infoContainer: {
    flex: 1, // Ocupa todo o espaço restante à direita do avatar (evita que textos longos vazem)
  },
  // Estilo do nome do usuário
  nome: {
    fontSize: 16, // Tamanho médio/grande
    fontWeight: 'bold', // Negrito para destacar o nome
    color: '#2f3640', // Cinza escuro
  },
  // Estilo do e-mail do usuário
  email: {
    fontSize: 14, // Tamanho intermediário
    color: '#636e72', // Cinza médio
    marginTop: 2, // Pequeno espaço abaixo do nome
  },
  // Estilo do nome da empresa
  empresa: {
    fontSize: 12, // Fonte menor para informação secundária
    color: '#b2bec3', // Cinza claro
    marginTop: 4, // Pequeno espaço abaixo do e-mail
  },
  // Estilo do texto exibido pelo ListEmptyComponent quando nenhum usuário é encontrado
  listaVazia: {
    textAlign: 'center', // Centraliza a mensagem na tela
    color: '#7f8c8d', // Cor cinza neutra
    marginTop: 40, // Afasta do topo da lista
    fontSize: 16, // Tamanho legível
  },
});
