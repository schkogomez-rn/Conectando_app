// Arquivo: App.js
// ============================================================================
// APLICAÇÃO DIDÁTICA: O Componente ScrollView no React Native
// ============================================================================
// 1. O COMPONENTE ScrollView:
// No React Native, a <View> padrão não possui barra de rolagem. Se colocarmos
// vários elementos na tela que ultrapassem a altura do visor, o conteúdo
// excedente simplesmente sumirá pelo rodapé. Para permitir a rolagem com o dedo,
// envolvemos os elementos no componente <ScrollView>.
//
// 2. DICA DE DESEMPENHO (ScrollView vs FlatList):
// O ScrollView é ótimo para telas curtas e estáticas (formulários, perfil).
// Porém, ele renderiza TODOS os itens de uma vez só na memória do celular,
// mesmo os que ainda não estão visíveis na tela. Se a API retornar 1.000 itens,
// o ScrollView tentará desenhar os 1.000 instantaneamente (deixando o app lento).
// Por isso limitamos a busca a 6 itens (?limit=6) para aprender a lógica de
// rolagem com .map() antes de avançar para o FlatList!
// ============================================================================

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';

export default function App() {
  // Estado para armazenar o Array de produtos vindo da API
  const [produtos, setProdutos] = useState([]);
  // Estado para controlar o carregamento na tela
  const [carregando, setCarregando] = useState(true);

  // Função para buscar os produtos na API FakeStore
  const buscarProdutos = async () => {
    try {
      const resposta = await fetch('https://fakestoreapi.com/products?limit=20');
      const dados = await resposta.json();
      // Guardamos a lista de produtos no nosso estado
      setProdutos(dados);
    } catch (erro) {
      alert('Erro ao carregar os produtos.');
    } finally {
      setCarregando(false);
    }
  };

  // useEffect com array vazio [] executa a busca UMA VEZ ao abrir a tela
  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <View style={styles.containerPrincipal}>
      <Text style={styles.header}>🛍️ Catálogo de Produtos</Text>

      {/* Se estiver carregando, mostra o spinner. Se não, mostra o ScrollView */}
      {carregando ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />
      ) : (
        // Usamos o ScrollView para permitir a rolagem vertical
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
        >
          {/* Percorremos o Array de produtos usando o .map() do JS */}
          {produtos.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.imagem} />

              <View style={styles.infoContainer}>
                <Text style={styles.tituloProduto} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.categoria}>{item.category.toUpperCase()}</Text>
                <Text style={styles.preco}>R$ {item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// Arquivo: App.js (Continuação - Estilos)
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
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagem: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  tituloProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  categoria: {
    fontSize: 11,
    color: '#636e72',
    marginTop: 4,
  },
  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ed573',
    marginTop: 6,
  },
});
