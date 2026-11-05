// Importa o React e os Hooks useState (gerenciar estado) e useEffect (controlar efeitos colaterais)
import React, { useState, useEffect } from 'react';
// Importa os componentes visuais e de estilização nativos do React Native
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

// Declara e exporta o componente principal App como padrão do aplicativo
export default function App() {
  // 1. Cria o estado 'conselho' (iniciado vazio '') e a função 'setConselho' para guardar a frase vinda da API
  const [conselho, setConselho] = useState('');

  // 2. Cria o estado 'carregando' (iniciado como true) para controlar a exibição do indicador de carregamento
  const [carregando, setCarregando] = useState(true);

  // 3. Declara uma função assíncrona responsável por buscar o conselho na internet e traduzi-lo para Português (pt-BR)
  const buscarConselho = async () => {
    // Ativa o estado de carregamento (mostra o ícone girando na tela) antes de iniciar a busca
    setCarregando(true);
    // Inicia o bloco try para tentar executar a conexão com a internet
    try {
      // Faz a requisição HTTP GET para a API pública de conselhos (adicionando timestamp para evitar cache repetido)
      const resposta = await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`);
      // Converte o corpo da resposta recebida para o formato JSON (objeto JavaScript)
      const dados = await resposta.json();
      // Extrai o texto original do conselho (em inglês) vindo da API
      const conselhoIngles = dados.slip.advice;

      // Faz uma requisição para a API pública gratuita MyMemory para traduzir o conselho de Inglês (en) para Português do Brasil (pt-BR)
      const respostaTraducao = await fetch(
        // Monta a URL codificando o texto em inglês para evitar erros com espaços e caracteres especiais
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(conselhoIngles)}&langpair=en|pt-BR`
      // Fecha a chamada do fetch de tradução
      );
      // Converte a resposta da API de tradução para o formato JSON
      const dadosTraducao = await respostaTraducao.json();

      // Atualiza o estado 'conselho' com o texto traduzido em Português (ou mantém em inglês caso a tradução venha vazia)
      setConselho(dadosTraducao.responseData?.translatedText || conselhoIngles);
    // Captura qualquer erro caso a requisição falhe (ex.: celular sem internet ou servidor fora do ar)
    } catch (erro) {
      // Define uma mensagem amigável de erro no estado 'conselho' para informar o usuário
      setConselho('Ops! Não foi possível conectar à internet.');
    // O bloco finally é executado sempre ao final (tendo dado sucesso no try ou erro no catch)
    } finally {
      // Desativa o estado de carregamento (esconde o ícone girando e exibe o card com o texto)
      setCarregando(false);
    // Fecha o bloco try/catch/finally
    }
  // Finaliza a declaração da função assíncrona buscarConselho
  };

  // 4. Usa o Hook useEffect para controlar quando o efeito colateral (requisição à API) deve rodar
  useEffect(() => {
    // Chama a função que busca o conselho na API assim que o aplicativo abre
    buscarConselho();
  // O array de dependências vazio [] garante que o código rode apenas UMA VEZ (na montagem da tela), evitando loop infinito
  }, []);

  // Retorna a estrutura visual (JSX) que será desenhada na tela do dispositivo
  return (
    // View principal que ocupa toda a tela e centraliza os elementos filhos
    <View style={styles.container}>
      {/* Exibe o título fixo do aplicativo no topo com a estilização definida em styles.titulo */}
      <Text style={styles.titulo}>Conselho do Dia</Text>

      {/* Renderização Condicional (operador ternário): verifica se 'carregando' é verdadeiro */}
      {carregando ? (
        // Se 'carregando' for true, exibe a bolinha de carregamento (ActivityIndicator) grande e azul
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        // Caso contrário (se 'carregando' for false), exibe a View em formato de cartão (card)
        <View style={styles.card}>
          {/* Exibe o texto do conselho traduzido armazenado no estado entre aspas */}
          <Text style={styles.textoConselho}>"{conselho}"</Text>
        {/* Fecha a View do cartão */}
        </View>
      )}

      {/* Botão tocável que chama a função buscarConselho toda vez que o usuário clicar nele (onPress) */}
      <TouchableOpacity style={styles.botao} onPress={buscarConselho}>
        {/* Texto interno exibido dentro do botão */}
        <Text style={styles.textoBotao}>Quero outro conselho</Text>
      {/* Fecha o componente do botão TouchableOpacity */}
      </TouchableOpacity>
    {/* Fecha a View principal (container) */}
    </View>
  // Fecha o retorno do JSX
  );
// Fecha a função do componente App
}

// Cria o objeto de estilos utilizando o StyleSheet.create para otimizar a renderização visual
const styles = StyleSheet.create({
  // Estilo do container principal: ocupa toda a tela (flex: 1), fundo azul escuro, alinhado ao centro e espaçamento interno de 20px
  container: { flex: 1, backgroundColor: '#2c3e50', alignItems: 'center', justifyContent: 'center', padding: 20 },
  // Estilo do título: fonte tamanho 24, em negrito (bold), cor branca (#fff) e margem inferior de 30px
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 30 },
  // Estilo do cartão (card): fundo cinza claro, espaçamento interno 30, bordas arredondadas (15), largura total (100%), centralizado e sombra no Android (elevation: 5)
  card: { backgroundColor: '#ecf0f1', padding: 30, borderRadius: 15, marginBottom: 30, width: '100%', alignItems: 'center', elevation: 5 },
  // Estilo do texto do conselho: fonte 20, cor azul escuro, em itálico, centralizado e altura de linha de 30px
  textoConselho: { fontSize: 20, color: '#2c3e50', fontStyle: 'italic', textAlign: 'center', lineHeight: 30 },
  // Estilo do botão: fundo azul claro (#3498db), preenchimento vertical 15, horizontal 30 e cantos arredondados (8)
  botao: { backgroundColor: '#3498db', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8 },
  // Estilo do texto do botão: cor branca (#fff), tamanho de fonte 16 e texto em negrito (bold)
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
// Fecha a criação do StyleSheet
});
