// Importa o React e o Hook useState (guarda dados que mudam na tela)
import React, { useState } from 'react';
// Importa os componentes visuais do React Native
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

// Componente principal do aplicativo
export default function App() {
  // Estado: CEP digitado pelo usuário
  const [cep, setCep] = useState('');
  // Estado: indica se a consulta está em andamento
  const [carregando, setCarregando] = useState(false);
  // Estado: texto do resultado (ou da mensagem de erro) mostrado na tela
  const [resultado, setResultado] = useState('');

  // Função que consulta o CEP em duas APIs (a segunda serve de reserva)
  const consultar = async () => {
    // Mantém só os números do que foi digitado (remove o hífen, por exemplo)
    const numeros = cep.replace(/\D/g, '');
    // Se não tiver 8 dígitos, avisa o usuário e para aqui
    if (numeros.length !== 8) return setResultado('Digite um CEP com 8 números.');
    // Liga o indicador de carregamento
    setCarregando(true);
    // Tenta a 1ª API: ViaCEP
    try {
      // Faz a requisição e converte a resposta para objeto JavaScript
      const d = await (await fetch(`https://viacep.com.br/ws/${numeros}/json/`)).json();
      // O ViaCEP devolve { erro: true } quando o CEP não existe; isso vai para o catch
      if (d.erro) throw new Error('não encontrado');
      // Mostra o endereço vindo do ViaCEP
      setResultado(`ViaCEP\n${d.logradouro}\n${d.bairro}\n${d.localidade} - ${d.uf}`);
    // Se a 1ª API falhar, tenta a 2ª
    } catch (e1) {
      // Tenta a 2ª API: BrasilAPI
      try {
        // Faz a requisição e converte a resposta para objeto JavaScript
        const d = await (await fetch(`https://brasilapi.com.br/api/cep/v1/${numeros}`)).json();
        // Se a API devolver um erro (sem o campo 'city'), força a falha
        if (!d.city) throw new Error('não encontrado');
        // Mostra o endereço vindo da BrasilAPI
        setResultado(`BrasilAPI\n${d.street}\n${d.neighborhood}\n${d.city} - ${d.state}`);
      // Se as duas falharem, mostra mensagem de erro
      } catch (e2) {
        // Mensagem final de erro
        setResultado('CEP não encontrado ou sem internet.');
      }
    }
    // Desliga o indicador de carregamento
    setCarregando(false);
  };

  // Interface do aplicativo
  return (
    // Tela principal
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.titulo}>Consulta de CEP</Text>
      {/* Campo para digitar o CEP */}
      <TextInput style={styles.input} placeholder="Ex.: 01001000" keyboardType="numeric" maxLength={9} value={cep} onChangeText={setCep} />
      {/* Botão que chama a consulta */}
      <TouchableOpacity style={styles.botao} onPress={consultar}>
        {/* Texto do botão */}
        <Text style={styles.textoBotao}>Consultar</Text>
      </TouchableOpacity>
      {/* Se estiver carregando mostra a bolinha; senão mostra o resultado */}
      {carregando ? <ActivityIndicator size="large" color="#3498db" /> : <Text style={styles.resultado}>{resultado}</Text>}
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  // Fundo escuro, conteúdo centralizado
  container: { flex: 1, backgroundColor: '#2c3e50', alignItems: 'center', justifyContent: 'center', padding: 20 },
  // Título branco em negrito
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  // Campo de texto claro e arredondado
  input: { backgroundColor: '#ecf0f1', borderRadius: 8, padding: 15, fontSize: 18, width: '100%', textAlign: 'center' },
  // Botão azul
  botao: { backgroundColor: '#3498db', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8, marginVertical: 20 },
  // Texto do botão
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  // Texto do resultado
  resultado: { color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 28 },
});
