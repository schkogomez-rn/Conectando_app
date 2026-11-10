// Arquivo: App.js
// ============================================================================
// EXERCÍCIO PRÁTICO DIDÁTICO: Feed de Publicações com ScrollView
// ============================================================================
// Objetivo da Aula:
// 1. Buscar dados de uma API externa (JSONPlaceholder) ao abrir a tela (useEffect).
// 2. Controlar estados de dados (posts), carregamento (carregando) e interação (curtidas).
// 3. Exibir a lista rolável usando <ScrollView> combinado com a função .map().
// 4. Criar cards interativos com Título (item.title), Corpo (item.body) e botão "Curtir".
//
// Dica de Desempenho (ScrollView):
// Usamos ?_limit=8 na URL da API porque o ScrollView renderiza todos os itens
// de uma só vez na memória. Para listas pequenas/médias funciona muito bem!
// ============================================================================

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  // Requisito 1: Estado 'posts' para armazenar o array de publicações vindo da API
  const [posts, setPosts] = useState([]);
  // Requisito 1: Estado 'carregando' para controlar o indicador visual (spinner)
  const [carregando, setCarregando] = useState(true);
  // Requisito 5: Estado para guardar quais postagens foram curtidas (ex: { 1: true, 3: true })
  const [curtidas, setCurtidas] = useState({});

  // Função assíncrona que busca as 8 postagens na API do JSONPlaceholder
  const buscarPosts = async () => {
    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
      const dados = await resposta.json();
      // Salva o array de postagens no estado 'posts'
      setPosts(dados);
    } catch (erro) {
      alert('Erro ao carregar o feed de publicações.');
    } finally {
      // Finaliza o carregamento (esconde o spinner)
      setCarregando(false);
    }
  };

  // Requisito 2: useEffect com array vazio [] executa a busca UMA VEZ assim que o app abre
  useEffect(() => {
    buscarPosts();
  }, []);

  // Função que alterna (liga/desliga) a curtida de um post específico pelo seu ID
  const alternarCurtida = (idPost) => {
    setCurtidas((estadoAnterior) => ({
      ...estadoAnterior,
      [idPost]: !estadoAnterior[idPost],
    }));
  };

  return (
    <View style={styles.containerPrincipal}>
      <Text style={styles.header}>📰 Feed de Publicações</Text>

      {/* Enquanto 'carregando' for true, exibe o ActivityIndicator; depois exibe o ScrollView */}
      {carregando ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />
      ) : (
        // Requisito 3: <ScrollView> para permitir a rolagem vertical dos cards
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
        >
          {/* Requisito 3: Percorremos o array 'posts' com .map() para desenhar cada card */}
          {posts.map((item) => {
            const foiCurtido = !!curtidas[item.id];

            return (
              <View key={item.id} style={styles.card}>
                {/* Cabeçalho discreto do card indicando o número da publicação */}
                <Text style={styles.badgePost}>Publicação #{item.id}</Text>

                {/* Requisito 4: Título (item.title) em destaque */}
                <Text style={styles.tituloPost}>{item.title}</Text>

                {/* Requisito 4: Corpo do texto (item.body) logo abaixo */}
                <Text style={styles.corpoPost}>{item.body}</Text>

                {/* Requisito 5: Botão "Curtir" interativo com TouchableOpacity */}
                <TouchableOpacity
                  style={[styles.botaoCurtir, foiCurtido && styles.botaoCurtido]}
                  onPress={() => alternarCurtida(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.textoBotaoCurtir, foiCurtido && styles.textoBotaoCurtido]}>
                    {foiCurtido ? '❤️ Curtido' : '🤍 Curtir'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

// ============================================================================
// ESTILOS DA APLICAÇÃO
// ============================================================================
const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e272e',
    textAlign: 'center',
    marginBottom: 15,
  },
  containerScroll: {
    paddingBottom: 25,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  badgePost: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#007bff',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  tituloPost: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  corpoPost: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
    marginBottom: 14,
  },
  botaoCurtir: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f2f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dfe4ea',
  },
  botaoCurtido: {
    backgroundColor: '#ffeaa7',
    borderColor: '#fdcb6e',
  },
  textoBotaoCurtir: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#57606f',
  },
  textoBotaoCurtido: {
    color: '#d63031',
  },
});
