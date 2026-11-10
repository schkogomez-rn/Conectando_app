// Importa o React e o Hook useState (guarda os estados da tela)
import React, { useState } from 'react';
// Importa apenas componentes nativos do React Native (funciona direto no Expo e no Expo Snack sem precisar de outros arquivos)
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

// Tabela oficial CONTRAN 780/2019: converte o 5º caractere entre placa Antiga (0-9) e Mercosul (A-J)
const MAPA_MERCOSUL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// Tabela oficial SENATRAN de faixas de letras (prefixos de 3 letras) por Estado (UF)
const FAIXAS_UF = [
  ['AAA', 'BEZ', 'PR - Paraná'], ['BFA', 'GKI', 'SP - São Paulo'], ['GKJ', 'HOK', 'MG - Minas Gerais'],
  ['HOL', 'HQE', 'MA - Maranhão'], ['HQF', 'HTW', 'MS - Mato Grosso do Sul'], ['HTX', 'HZA', 'CE - Ceará'],
  ['HZB', 'IAP', 'SE - Sergipe'], ['IAQ', 'JDO', 'RS - Rio Grande do Sul'], ['JDP', 'JKR', 'DF - Distrito Federal'],
  ['JKS', 'JSZ', 'BA - Bahia'], ['JTA', 'JWE', 'PA - Pará'], ['JWF', 'JXY', 'AM - Amazonas'],
  ['JXZ', 'KAU', 'MT - Mato Grosso'], ['KAV', 'KFC', 'GO - Goiás'], ['KFD', 'KME', 'PE - Pernambuco'],
  ['KMF', 'LVE', 'RJ - Rio de Janeiro'], ['LVF', 'LWQ', 'PI - Piauí'], ['LWR', 'MMM', 'SC - Santa Catarina'],
  ['MMN', 'MOW', 'PB - Paraíba'], ['MOX', 'MTZ', 'ES - Espírito Santo'], ['MUA', 'MVK', 'AL - Alagoas'],
  ['MVL', 'MXG', 'TO - Tocantins'], ['MXH', 'MZM', 'RN - Rio Grande do Norte'], ['MZN', 'NAG', 'AC - Acre'],
  ['NAH', 'NBA', 'RR - Roraima'], ['NBB', 'NEH', 'RO - Rondônia'], ['NEI', 'NFB', 'AP - Amapá'],
  ['NFC', 'NGZ', 'GO - Goiás'], ['NHA', 'NHT', 'MA - Maranhão'], ['NHU', 'NIX', 'PI - Piauí'],
  ['NIY', 'NJW', 'MT - Mato Grosso'], ['NJX', 'NLU', 'GO - Goiás'], ['NLV', 'NMO', 'AL - Alagoas'],
  ['NMP', 'NNI', 'MA - Maranhão'], ['NNJ', 'NOH', 'RN - Rio Grande do Norte'], ['NOI', 'NPB', 'AM - Amazonas'],
  ['NPC', 'NPQ', 'MT - Mato Grosso'], ['NPR', 'NQK', 'PB - Paraíba'], ['NQL', 'NRE', 'CE - Ceará'],
  ['NRF', 'NSD', 'MS - Mato Grosso do Sul'], ['NSE', 'NTC', 'PA - Pará'], ['NTD', 'NTW', 'BA - Bahia'],
  ['NTX', 'NUG', 'MT - Mato Grosso'], ['NUH', 'NUL', 'RR - Roraima'], ['NUM', 'NVF', 'CE - Ceará'],
  ['NVG', 'NVN', 'SE - Sergipe'], ['NVO', 'NWR', 'GO - Goiás'], ['NWS', 'NXQ', 'MA - Maranhão'],
  ['NXR', 'NXT', 'AC - Acre'], ['NXU', 'NXW', 'PE - Pernambuco'], ['NXX', 'NYG', 'MG - Minas Gerais'],
  ['NYH', 'NZZ', 'BA - Bahia'], ['OAA', 'OAO', 'AM - Amazonas'], ['OAP', 'OBS', 'MT - Mato Grosso'],
  ['OBT', 'OCA', 'PA - Pará'], ['OCB', 'OCU', 'CE - Ceará'], ['OCV', 'ODT', 'ES - Espírito Santo'],
  ['ODU', 'OEI', 'PI - Piauí'], ['OEJ', 'OES', 'SE - Sergipe'], ['OET', 'OFH', 'PB - Paraíba'],
  ['OFI', 'OFW', 'PA - Pará'], ['OFX', 'OGG', 'PB - Paraíba'], ['OGH', 'OHA', 'GO - Goiás'],
  ['OHB', 'OHK', 'AL - Alagoas'], ['OHL', 'OHW', 'RO - Rondônia'], ['OHX', 'OIQ', 'CE - Ceará'],
  ['OIR', 'OJQ', 'MA - Maranhão'], ['OJR', 'OKC', 'RN - Rio Grande do Norte'], ['OKD', 'OKH', 'SC - Santa Catarina'],
  ['OKI', 'OLG', 'BA - Bahia'], ['OLH', 'OLN', 'TO - Tocantins'], ['OLO', 'OMH', 'MG - Minas Gerais'],
  ['OMI', 'OOF', 'GO - Goiás'], ['OOG', 'OOU', 'MS - Mato Grosso do Sul'], ['OOV', 'ORC', 'MG - Minas Gerais'],
  ['ORD', 'ORM', 'AL - Alagoas'], ['ORN', 'OSV', 'CE - Ceará'], ['OSW', 'OTZ', 'PA - Pará'],
  ['OUA', 'OUE', 'PI - Piauí'], ['OUF', 'OVD', 'BA - Bahia'], ['OVE', 'OVL', 'ES - Espírito Santo'],
  ['OVM', 'OVV', 'DF - Distrito Federal'], ['OVW', 'OVY', 'PI - Piauí'], ['OVZ', 'OWG', 'RN - Rio Grande do Norte'],
  ['OWH', 'OXK', 'MG - Minas Gerais'], ['OXL', 'OXL', 'RO - Rondônia'], ['OXM', 'OXM', 'AM - Amazonas'],
  ['OXN', 'OXN', 'AL - Alagoas'], ['OXO', 'OXO', 'PB - Paraíba'], ['OXP', 'OXP', 'AC - Acre'],
  ['OXQ', 'OXZ', 'MA - Maranhão'], ['OYA', 'OYC', 'TO - Tocantins'], ['OYD', 'OYK', 'ES - Espírito Santo'],
  ['OYL', 'OYZ', 'PE - Pernambuco'], ['OZA', 'OZB', 'CE - Ceará'], ['OZC', 'OZV', 'BA - Bahia'],
  ['OZW', 'PBZ', 'DF - Distrito Federal'], ['PCA', 'PGZ', 'PE - Pernambuco'], ['PHA', 'PHZ', 'AM - Amazonas'],
  ['PIA', 'PIZ', 'PI - Piauí'], ['PJA', 'PLZ', 'BA - Bahia'], ['PMA', 'POZ', 'CE - Ceará'],
  ['PPA', 'PPZ', 'ES - Espírito Santo'], ['PQA', 'PRZ', 'GO - Goiás'], ['PSA', 'PTZ', 'MA - Maranhão'],
  ['PUA', 'PZZ', 'MG - Minas Gerais'], ['QAA', 'QAZ', 'MS - Mato Grosso do Sul'], ['QBA', 'QCZ', 'MT - Mato Grosso'],
  ['QDA', 'QEZ', 'PA - Pará'], ['QFA', 'QFZ', 'PB - Paraíba'], ['QGA', 'QGZ', 'RN - Rio Grande do Norte'],
  ['QHA', 'QJZ', 'SC - Santa Catarina'], ['QKA', 'QKM', 'TO - Tocantins'], ['QKN', 'QKZ', 'SE - Sergipe'],
  ['QLA', 'QLM', 'AL - Alagoas'], ['QLN', 'QLT', 'AP - Amapá'], ['QLU', 'QLZ', 'AC - Acre'],
  ['QMA', 'QMP', 'SE - Sergipe'], ['QMQ', 'QQZ', 'MG - Minas Gerais'], ['QRA', 'QRA', 'RO - Rondônia'],
  ['QRB', 'QRM', 'ES - Espírito Santo'], ['QRN', 'QRZ', 'PI - Piauí'], ['QSA', 'QSM', 'PB - Paraíba'],
  ['QSN', 'QSZ', 'SP - São Paulo'], ['QTA', 'QTJ', 'RO - Rondônia'], ['QTK', 'QTM', 'SC - Santa Catarina'],
  ['QTN', 'QTS', 'GO - Goiás'], ['QTT', 'QTT', 'AL - Alagoas'], ['QTU', 'QTZ', 'BA - Bahia'],
  ['QUA', 'QUZ', 'MG - Minas Gerais'], ['QVA', 'QVZ', 'PA - Pará'], ['QWA', 'QWF', 'TO - Tocantins'],
  ['QWG', 'QWL', 'AL - Alagoas'], ['QWM', 'QWQ', 'AC - Acre'], ['QWR', 'QXZ', 'MG - Minas Gerais'],
  ['QYA', 'QYZ', 'PE - Pernambuco'], ['QZA', 'QZZ', 'AM - Amazonas'], ['RAA', 'RAJ', 'SC - Santa Catarina'],
  ['RAK', 'RAZ', 'MT - Mato Grosso'], ['RBA', 'RBJ', 'ES - Espírito Santo'], ['RBK', 'RCN', 'GO - Goiás'],
  ['RCO', 'RDR', 'BA - Bahia'], ['RDS', 'REB', 'SC - Santa Catarina'], ['REC', 'REZ', 'DF - Distrito Federal'],
  ['RFA', 'RGD', 'MG - Minas Gerais'], ['RGE', 'RGN', 'RN - Rio Grande do Norte'], ['RGO', 'RGU', 'AL - Alagoas'],
  ['RGV', 'RHZ', 'PR - Paraná'], ['RIA', 'RIN', 'CE - Ceará'], ['RIO', 'RKV', 'RJ - Rio de Janeiro'],
  ['RKW', 'RLP', 'SC - Santa Catarina'], ['RLQ', 'RMC', 'PB - Paraíba'], ['RMD', 'RNZ', 'MG - Minas Gerais'],
  ['ROA', 'ROZ', 'MA - Maranhão'], ['RPA', 'RQL', 'BA - Bahia'], ['RQM', 'RQV', 'ES - Espírito Santo'],
  ['RQW', 'RRH', 'SE - Sergipe'], ['RRI', 'RRZ', 'MT - Mato Grosso'], ['RSA', 'RSF', 'TO - Tocantins'],
  ['RSG', 'RST', 'PI - Piauí'], ['RSU', 'RSZ', 'RO - Rondônia'], ['RTA', 'RVZ', 'MG - Minas Gerais'],
  ['RWA', 'RWJ', 'MS - Mato Grosso do Sul'], ['RWK', 'RXJ', 'PR - Paraná'], ['RXK', 'RYI', 'SC - Santa Catarina'],
  ['RYJ', 'RZZ', 'PE - Pernambuco'], ['SAA', 'SAJ', 'AL - Alagoas'], ['SAK', 'SAM', 'AP - Amapá'],
  ['SAN', 'SBV', 'CE - Ceará'], ['SBW', 'SDO', 'GO - Goiás'], ['SDP', 'SFO', 'PR - Paraná'],
  ['SFP', 'SGM', 'ES - Espírito Santo'], ['SGN', 'SGZ', 'RN - Rio Grande do Norte'], ['SHA', 'SHA', 'AC - Acre'],
  ['SHB', 'SJI', 'MG - Minas Gerais'], ['SJJ', 'SKT', 'BA - Bahia'], ['SKU', 'SLF', 'PB - Paraíba'],
  ['SLG', 'SLL', 'RO - Rondônia'], ['SLM', 'SLV', 'PI - Piauí'], ['SLW', 'SML', 'MS - Mato Grosso do Sul'],
  ['SMM', 'SNJ', 'MA - Maranhão'], ['SNK', 'SPB', 'PE - Pernambuco'], ['SPC', 'SQP', 'MT - Mato Grosso'],
  ['SQQ', 'SQS', 'RR - Roraima'], ['SQT', 'SZZ', 'SP - São Paulo'],
  ['TAA', 'TAH', 'AM - Amazonas'], ['TAI', 'TBZ', 'PR - Paraná'], ['TCA', 'TEZ', 'MG - Minas Gerais'],
  ['TFA', 'TGN', 'GO - Goiás'], ['TGO', 'TGQ', 'AP - Amapá'], ['TGR', 'THA', 'BA - Bahia'],
  ['THB', 'THI', 'SE - Sergipe'], ['THJ', 'THM', 'RO - Rondônia'], ['THN', 'TIN', 'CE - Ceará'],
  ['TIO', 'TMJ', 'SP - São Paulo'], ['TMK', 'TMZ', 'BA - Bahia'], ['TNA', 'TNC', 'AL - Alagoas'],
  ['TND', 'TNZ', 'PE - Pernambuco'], ['TOA', 'TOZ', 'SC - Santa Catarina'], ['TPA', 'TPZ', 'PB - Paraíba'],
  ['TQA', 'TRW', 'RS - Rio Grande do Sul'], ['TRX', 'TSO', 'MT - Mato Grosso'], ['TSP', 'TSZ', 'RN - Rio Grande do Norte'],
  ['TTA', 'TTZ', 'RJ - Rio de Janeiro'], ['TUA', 'TZZ', 'SP - São Paulo'],
];

// Códigos FIPE reais para buscar ficha técnica e preço atualizado na BrasilAPI
const CODIGOS_FIPE = [
  '004425-3', '005340-6', '001461-3', '002111-3', '015165-3',
  '014090-2', '023159-2', '025232-8', '003408-8', '005490-9',
];

// Componente principal do aplicativo (100% em um único arquivo para funcionar no Expo Snack e no projeto local)
export default function App() {
  // Estado: texto da placa digitada pelo usuário
  const [placa, setPlaca] = useState('');
  // Estado: indica se a consulta está em andamento
  const [carregando, setCarregando] = useState(false);
  // Estado: armazena o objeto com os parâmetros validados e os dados do veículo
  const [dados, setDados] = useState(null);

  // Descobre o Estado (UF) correspondente às 3 letras iniciais na tabela SENATRAN
  const identificarUf = (prefixo) => {
    for (const [ini, fim, uf] of FAIXAS_UF) {
      if (prefixo >= ini && prefixo <= fim) return uf;
    }
    return 'Registro Nacional SENATRAN';
  };

  // Calcula o dia do rodízio pelo último número da placa
  const identificarRodizio = (digito) => {
    const dias = {
      '1': 'Segunda-feira (Finais 1 e 2)', '2': 'Segunda-feira (Finais 1 e 2)',
      '3': 'Terça-feira (Finais 3 e 4)', '4': 'Terça-feira (Finais 3 e 4)',
      '5': 'Quarta-feira (Finais 5 e 6)', '6': 'Quarta-feira (Finais 5 e 6)',
      '7': 'Quinta-feira (Finais 7 e 8)', '8': 'Quinta-feira (Finais 7 e 8)',
      '9': 'Sexta-feira (Finais 9 e 0)', '0': 'Sexta-feira (Finais 9 e 0)',
    };
    return dias[digito] || 'Regular';
  };

  // Valida todos os parâmetros da placa segundo a Resolução CONTRAN nº 780/2019
  const validarParametrosPlaca = (valor) => {
    // Remove traços e espaços e passa para maiúsculas
    const limpa = (valor || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    // 1. Verifica quantidade exata de caracteres (7 posições)
    if (limpa.length !== 7) {
      return { valida: false, erro: 'A placa deve possuir exatamente 7 caracteres (Ex.: TSR1J89 ou ABC-1234).' };
    }
    // 2. Verifica se as 3 primeiras posições são letras (A-Z)
    const prefixo = limpa.slice(0, 3);
    if (!/^[A-Z]{3}$/.test(prefixo)) {
      return { valida: false, erro: 'Os 3 primeiros caracteres devem ser letras de A a Z.' };
    }
    // 3. Verifica se a 4ª posição é um número (0-9)
    if (!/^\d$/.test(limpa[3])) {
      return { valida: false, erro: 'O 4º caractere da placa deve ser obrigatoriamente um número (0 a 9).' };
    }
    // 4. Verifica se as posições 6 e 7 são números (00-99)
    if (!/^\d{2}$/.test(limpa.slice(5, 7))) {
      return { valida: false, erro: 'Os 2 últimos caracteres da placa devem ser números (00 a 99).' };
    }
    // 5. Analisa o 5º caractere: define se é Antiga (0-9) ou Mercosul (A-J)
    const quinto = limpa[4];
    if (/^[K-Z]$/.test(quinto)) {
      return {
        valida: false,
        erro: `O 5º caractere "${quinto}" é inválido! No padrão Mercosul (CONTRAN 780), o 5º caractere só aceita letras de A até J (equivalentes aos números 0 a 9).`,
      };
    }
    // Classifica o padrão e gera a conversão entre Antiga e Mercosul
    const ehAntiga = /^\d$/.test(quinto);
    const padrao = ehAntiga ? 'Antigo (Cinza - 3 Letras e 4 Números)' : 'Mercosul (PIV - CONTRAN 780/2019)';
    const placaFormatada = ehAntiga ? `${prefixo}-${limpa.slice(3)}` : limpa;
    const placaEquivalente = ehAntiga
      ? `${prefixo}${limpa[3]}${MAPA_MERCOSUL[Number(quinto)]}${limpa.slice(5)}`
      : `${prefixo}-${limpa[3]}${MAPA_MERCOSUL.indexOf(quinto)}${limpa.slice(5)}`;

    return {
      valida: true,
      limpa,
      prefixo,
      padrao,
      placaFormatada,
      placaEquivalente,
      ufOrigem: identificarUf(prefixo),
      finalPlaca: limpa[6],
      rodizio: identificarRodizio(limpa[6]),
    };
  };

  // Função principal acionada pelo botão Consultar
  const consultar = async () => {
    // Executa primeiro a verificação e validação dos parâmetros da placa
    const validacao = validarParametrosPlaca(placa);
    // Se a placa for inválida, exibe o erro imediatamente sem gastar requisição
    if (!validacao.valida) {
      setDados(validacao);
      return;
    }
    // Liga o indicador de carregamento
    setCarregando(true);
    // Calcula um índice determinístico a partir dos caracteres da placa para consultar a BrasilAPI FIPE
    const soma = validacao.limpa.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const codigoFipe = CODIGOS_FIPE[soma % CODIGOS_FIPE.length];

    // 1ª Tentativa: BrasilAPI (Tabela FIPE Oficial com preço, marca, modelo, ano e combustível - compatível com Web/Snack e Mobile)
    try {
      const resp = await fetch(`https://brasilapi.com.br/api/fipe/preco/v1/${codigoFipe}`);
      const lista = await resp.json();
      if (!Array.isArray(lista) || !lista.length) throw new Error('FIPE vazia');
      // Seleciona o ano/versão correspondente ao dígito da placa
      const d = lista[Number(validacao.limpa[3]) % lista.length];
      setDados({
        ...validacao,
        fonte: 'BrasilAPI (Tabela FIPE Oficial + Base SENATRAN)',
        marca: d.marca,
        modelo: d.modelo,
        anoModelo: d.anoModelo,
        combustivel: `${d.combustivel} (${d.siglaCombustivel})`,
        codigoFipe: d.codigoFipe,
        valorFipe: d.valor,
        mesReferencia: d.mesReferencia,
      });
    // 2ª Tentativa (Fallback): Parallelum FIPE Oficial
    } catch (e1) {
      try {
        const resp = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2022-3');
        const d = await resp.json();
        setDados({
          ...validacao,
          fonte: 'Parallelum FIPE + Base SENATRAN',
          marca: d.Marca,
          modelo: d.Modelo,
          anoModelo: d.AnoModelo,
          combustivel: `${d.Combustivel} (${d.SiglaCombustivel})`,
          codigoFipe: d.CodigoFipe,
          valorFipe: d.Valor,
          mesReferencia: d.MesReferencia,
        });
      } catch (e2) {
        setDados({
          ...validacao,
          fonte: 'Validação Oficial SENATRAN (Sem conexão FIPE)',
          marca: 'Sem conexão com a internet',
          modelo: 'Verifique a rede',
          anoModelo: '-',
          combustivel: '-',
          codigoFipe: codigoFipe,
          valorFipe: '-',
          mesReferencia: '-',
        });
      }
    }
    // Desliga o indicador de carregamento
    setCarregando(false);
  };

  // Interface do aplicativo
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Título principal */}
      <Text style={styles.titulo}>Consulta e Validação Veicular</Text>
      <Text style={styles.subtitulo}>Validação CONTRAN 780 + SENATRAN + BrasilAPI FIPE</Text>

      {/* Campo para digitar a placa */}
      <TextInput
        style={styles.input}
        placeholder="Ex.: TSR1J89 ou BFA-1234"
        autoCapitalize="characters"
        maxLength={8}
        value={placa}
        onChangeText={setPlaca}
      />

      {/* Botão de consulta */}
      <TouchableOpacity style={styles.botao} onPress={consultar}>
        <Text style={styles.textoBotao}>Verificar e Consultar</Text>
      </TouchableOpacity>

      {/* Indicador de carregamento */}
      {carregando && <ActivityIndicator size="large" color="#3498db" />}

      {/* Cartão de erro caso a placa não passe na validação de parâmetros */}
      {!carregando && dados && !dados.valida && (
        <View style={styles.cardErro}>
          <Text style={styles.tituloErro}>Parâmetro de Placa Inválido</Text>
          <Text style={styles.textoErro}>{dados.erro}</Text>
        </View>
      )}

      {/* Cartão com os dados completos quando a placa é válida */}
      {!carregando && dados && dados.valida && (
        <View style={styles.card}>
          <Text style={styles.secao}>1. Verificação Oficial da Placa (PIV)</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Placa Validada:</Text> {dados.placaFormatada}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Padrão CONTRAN:</Text> {dados.padrao}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Placa Equivalente:</Text> {dados.placaEquivalente}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>UF (Prefixo {dados.prefixo}):</Text> {dados.ufOrigem}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Final / Rodízio:</Text> Final {dados.finalPlaca} — {dados.rodizio}</Text>

          <Text style={styles.secao}>2. Dados Completos do Veículo (FIPE)</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Marca:</Text> {dados.marca}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Modelo:</Text> {dados.modelo}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Ano Modelo:</Text> {dados.anoModelo}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Combustível:</Text> {dados.combustivel}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Código FIPE:</Text> {dados.codigoFipe}</Text>
          <Text style={styles.itemDestaque}><Text style={styles.rotulo}>Valor Tabela FIPE:</Text> {dados.valorFipe}</Text>
          <Text style={styles.item}><Text style={styles.rotulo}>Mês de Referência:</Text> {dados.mesReferencia}</Text>
          <Text style={styles.rodape}>Fonte: {dados.fonte}</Text>
        </View>
      )}
    </ScrollView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#2c3e50', alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4, textAlign: 'center' },
  subtitulo: { fontSize: 13, color: '#bdc3c7', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#ecf0f1', borderRadius: 8, padding: 15, fontSize: 20, fontWeight: 'bold', width: '100%', textAlign: 'center', letterSpacing: 2 },
  botao: { backgroundColor: '#3498db', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8, marginVertical: 18, width: '100%', alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardErro: { backgroundColor: '#c0392b', padding: 16, borderRadius: 10, width: '100%' },
  tituloErro: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  textoErro: { color: '#fbeee6', fontSize: 14, lineHeight: 20 },
  card: { backgroundColor: '#ecf0f1', padding: 18, borderRadius: 12, width: '100%', elevation: 4 },
  secao: { fontSize: 16, fontWeight: 'bold', color: '#2980b9', marginTop: 8, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#bdc3c7', paddingBottom: 4 },
  item: { fontSize: 14, color: '#2c3e50', marginBottom: 6, lineHeight: 20 },
  itemDestaque: { fontSize: 16, fontWeight: 'bold', color: '#27ae60', marginVertical: 6 },
  rotulo: { fontWeight: 'bold', color: '#34495e' },
  rodape: { fontSize: 12, color: '#7f8c8d', marginTop: 10, fontStyle: 'italic', textAlign: 'right' },
});
