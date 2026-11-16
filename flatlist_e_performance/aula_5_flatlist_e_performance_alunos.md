# Aula 5: Listas de Alta Performance com FlatList

Na aula anterior, vimos como usar o `<ScrollView>` para rolar conteúdos na tela. Porém, deixamos um aviso importante: o `ScrollView` desenha **todos** os elementos na memória de uma só vez, o que pode travar o aplicativo se a lista vinda da internet for grande.

Nesta aula, vamos dominar a **`<FlatList>`**, o componente padrão do React Native para renderizar listas dinâmicas e infinitas com máxima performance.

## Como Executar esta Aula

Escolha o ambiente de sua preferência:

* **No Expo Snack (Navegador):** Acesse [snack.expo.dev](https://snack.expo.dev), limpe o `App.js` e cole os códigos da aula.

* **No VS Code (Local):** No terminal, crie o projeto com `npx create-expo-app app-flatlist --template blank`, acesse a pasta com `cd app-flatlist` e rode `npx expo start` (pressione **a** para abrir no emulador Android).

## 1. Por que a FlatList é tão rápida? (Lazy Loading & Reciclagem)

Enquanto o `ScrollView` cria todos os itens do Array na memória RAM instantaneamente, a `FlatList` trabalha com **Renderização Sob Demanda (Lazy Loading)**.

Imagine uma lista com 1.000 usuários:

1. Se cabem apenas 6 usuários na tela do celular, a `FlatList` desenha apenas esses 6.

2. Conforme você rola a tela para baixo, os itens que somem pelo topo são **destruídos/reciclados**, e os novos itens que entram pelo rodapé são desenhados em tempo real.

## 2. Anatomia e Estrutura Detalhada da FlatList

Para usar a `FlatList` sem dúvidas, é fundamental entender a sua engrenagem interna. A `FlatList` funciona como uma **linha de montagem de fábrica**: você entrega a matéria-prima (um Array de Dados) e a instrução de montagem (uma Função de Renderização), e ela se encarrega de fabricar a lista na tela.

### O Fluxo dos Dados

```
  [ Array de Dados ]   --->   ( renderItem )   --->   [ Componente Visual na Tela ]
[{ id: '1', nome: 'Ana' }]  --->  transforma em  --->   <View><Text>Ana</Text></View>

```

### As 3 Propriedades Obrigatórias Explicadas em Detalhes

Sempre que instanciamos uma `FlatList`, precisamos declarar no mínimo estas três *props*:

```
<FlatList
  data={meuArrayDeDados}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item, index }) => (
    <View>
      <Text>{item.nome}</Text>
    </View>
  )}
/>

```

#### A. `data` (A Matéria-Prima)

* **O que é:** O Array contendo as informações que você quer exibir (objetos vindos de uma API ou do `useState`).

* **Exemplo:** `data={usuarios}`.

* **Regra:** Precisa ser obrigatoriamente um Array de JavaScript (`[...]`).

#### B. `keyExtractor` (A Etiqueta de Identificação)

* **O que é:** Uma função que retorna um **identificador único** para cada item da lista.

* **Por que é vital?** O React usa essa chave para saber exatamente qual item foi alterado, adicionado ou removido. Sem ela, o React precisa redesenhar a lista inteira quando algo muda, estragando a performance.

* **Regra de Ouro:** A `keyExtractor` deve **SEMPRE retornar uma String**. Se o seu ID for um número (ex: `1`), você deve convertê-lo usando `.toString()`:

  ```
  keyExtractor={(item) => item.id.toString()}
  
  ```

#### C. `renderItem` (A Instrução de Montagem)

* **O que é:** Uma função que ensina a `FlatList` a desenhar **UM único item** da lista de cada vez.

* **Por que usamos a sintaxe `{ item }` com chaves?**
  A `FlatList` não passa apenas o seu dado direto para a função; ela envia um objeto com vários metadados. Por exemplo:

  ```
  // O objeto que a FlatList entrega internamente:
  {
    item: { id: 1, nome: 'Maria' }, // O seu objeto original do Array
    index: 0,                      // A posição dele no Array (0, 1, 2...)
    separators: { ... }            // Utilitários de borda
  }
  
  ```

  Ao escrever `renderItem={({ item }) => ...}`, estamos usando a **desestruturação do JavaScript** para pegar diretamente a propriedade `item` desse objeto. Se precisar do índice numérico da posição do item, basta pedir `({ item, index })`.

## 3. Props Utilitárias e Recursos Avançados

Além das 3 props obrigatórias, a `FlatList` possui diversos recursos visuais nativos prontos para uso:

| Propriedade | O que faz? | Exemplo de Uso | 
| ----- | ----- | ----- | 
| `ListEmptyComponent` | O que mostrar se o Array estiver vazio | `<Text>Nenhum item encontrado</Text>` | 
| `ItemSeparatorComponent` | Um divisor automático entre cada card | `<View style={{ height: 1, backgroundColor: '#ccc' }} />` | 
| `ListHeaderComponent` | Um componente fixado no topo da rolagem | Um `<TextInput>` de busca no topo da lista | 
| `ListFooterComponent` | Um componente fixado no rodapé | Um botão "Carregar Mais" no final | 
| `refreshing` + `onRefresh` | Habilita o gesto de **"Puxar para Atualizar"** | Atualizar dados ao puxar a tela para baixo | 
| `numColumns` | Transforma a lista vertical em uma **Grade (Grid)** | `numColumns={2}` (Exibe em 2 colunas) | 

## 4. Prática Guiada: Lista de Usuários da API 👥

Vamos aplicar a teoria criando uma lista de usuários consumindo uma API púsblica (`https://jsonplaceholder.typicode.com/users`).

Cole o código abaixo no seu arquivo `App.js`:

```
// Arquivo: App.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  // 1. Estado para armazenar o Array de usuários vindo da API
  const [usuarios, setUsuarios] = useState([]);
  // 2. Estado para controlar o carregamento inicial
  const [carregando, setCarregando] = useState(true);

  // 3. Função assíncrona para buscar os dados na internet
  const buscarUsuarios = async () => {
    setCarregando(true);
    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
      const dados = await resposta.json();
      setUsuarios(dados); // Salva o array de objetos no Estado
    } catch (erro) {
      alert('Erro ao carregar os usuários.');
    } finally {
      setCarregando(false);
    }
  };

  // 4. Busca os dados assim que a tela é montada
  useEffect(() => {
    buscarUsuarios();
  }, []);

  // 5. Função de renderização individual (passada para a prop renderItem)
  // Desestruturamos { item } para ter acesso aos dados do usuário atual
  const renderizarUsuario = ({ item }) => (
    <View style={styles.card}>
      {/* Avatar circular estilizado com a primeira letra do nome */}
      <View style={styles.avatar}>
        <Text style={styles.textoAvatar}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.name}</Text>
        <Text style={styles.email}>✉️ {item.email}</Text>
        <Text style={styles.empresa}>🏢 {item.company.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👥 Lista de Usuários (FlatList)</Text>

      {/* Renderização Condicional: enquanto busca na API, exibe a animação */}
      {carregando ? (
        <ActivityIndicator size="large" color="#0984e3" style={{ marginTop: 50 }} />
      ) : (
        /* A FlatList com suas 3 props principais + utilitários */
        <FlatList
          data={usuarios} // 1. O Array de dados
          keyExtractor={(item) => item.id.toString()} // 2. O ID único (como String)
          renderItem={renderizarUsuario} // 3. A função de montagem
          showsVerticalScrollIndicator={false} // Esconde a barra de rolagem lateral
          ListEmptyComponent={
            <Text style={styles.listaVazia}>Nenhum usuário encontrado.</Text>
          }
        />
      )}
    </View>
  );
}

// Arquivo: App.js (Continuação - Estilos)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f3640',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0984e3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textoAvatar: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f3640',
  },
  email: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 2,
  },
  empresa: {
    fontSize: 12,
    color: '#b2bec3',
    marginTop: 4,
  },
  listaVazia: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 40,
    fontSize: 16,
  },
});

```

## 5. Exercício Prático: Lista com Busca em Tempo Real 🔍

Chegou a hora de praticar! Vamos unir `useState`, `useEffect`, `TextInput`, `FlatList` e filtros em Arrays.

**O Desafio:**
Crie um aplicativo de **Contatos com Filtro de Pesquisa**.

**Requisitos:**

1. Use o `useEffect` para carregar a lista de usuários da API `https://jsonplaceholder.typicode.com/users`.

2. Adicione um campo de texto (`TextInput`) no topo da tela para funcionar como barra de pesquisa.

3. Crie um estado `busca` para armazenar o texto digitado pelo usuário.

4. Crie uma variável filtrada usando `.filter()` para exibir na `FlatList` **apenas os contatos cujo nome contenha as letras digitadas na busca** (dica: use `.toLowerCase()` e `.includes()`).

5. Se a pesquisa não encontrar nenhum contato, exiba uma mensagem informativa usando a propriedade `ListEmptyComponent` da `FlatList`.

