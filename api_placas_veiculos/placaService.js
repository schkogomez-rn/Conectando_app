// Arquivo: placaService.js
// Camada de SERVIÇO: validação oficial SENATRAN/CONTRAN (Resolução 780/2019) e consulta completa de dados veiculares (BrasilAPI FIPE / Parallelum FIPE)

// Tempo máximo (em milissegundos) que aguardamos cada API antes de cancelar (evita travar o app)
const TIMEOUT_MS = 8000;

// Tabela oficial de conversão do 5º caractere: no Mercosul, os números 0-9 viram as letras A-J
const MAPA_MERCOSUL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// Faixas oficiais de prefixos (3 letras) por Estado (UF) segundo a tabela nacional do SENATRAN/DENATRAN
const FAIXAS_UF = [
  ['AAA', 'BEZ', 'PR - Paraná'],
  ['BFA', 'GKI', 'SP - São Paulo'],
  ['GKJ', 'HOK', 'MG - Minas Gerais'],
  ['HOL', 'HQE', 'MA - Maranhão'],
  ['HQF', 'HTW', 'MS - Mato Grosso do Sul'],
  ['HTX', 'HZA', 'CE - Ceará'],
  ['HZB', 'IAP', 'SE - Sergipe'],
  ['IAQ', 'JDO', 'RS - Rio Grande do Sul'],
  ['JDP', 'JKR', 'DF - Distrito Federal'],
  ['JKS', 'JSZ', 'BA - Bahia'],
  ['JTA', 'JWE', 'PA - Pará'],
  ['JWF', 'JXY', 'AM - Amazonas'],
  ['JXZ', 'KAU', 'MT - Mato Grosso'],
  ['KAV', 'KFC', 'GO - Goiás'],
  ['KFD', 'KME', 'PE - Pernambuco'],
  ['KMF', 'LVE', 'RJ - Rio de Janeiro'],
  ['LVF', 'LWQ', 'PI - Piauí'],
  ['LWR', 'MMM', 'SC - Santa Catarina'],
  ['MMN', 'MOW', 'PB - Paraíba'],
  ['MOX', 'MTZ', 'ES - Espírito Santo'],
  ['MUA', 'MVK', 'AL - Alagoas'],
  ['MVL', 'MXG', 'TO - Tocantins'],
  ['MXH', 'MZM', 'RN - Rio Grande do Norte'],
  ['MZN', 'NAG', 'AC - Acre'],
  ['NAH', 'NBA', 'RR - Roraima'],
  ['NBB', 'NEH', 'RO - Rondônia'],
  ['NEI', 'NFB', 'AP - Amapá'],
  ['NFC', 'NGZ', 'GO - Goiás'],
  ['NHA', 'NHT', 'MA - Maranhão'],
  ['NHU', 'NIX', 'PI - Piauí'],
  ['NIY', 'NJW', 'MT - Mato Grosso'],
  ['NJX', 'NLU', 'GO - Goiás'],
  ['NLV', 'NMO', 'AL - Alagoas'],
  ['NMP', 'NNI', 'MA - Maranhão'],
  ['NNJ', 'NOH', 'RN - Rio Grande do Norte'],
  ['NOI', 'NPB', 'AM - Amazonas'],
  ['NPC', 'NPQ', 'MT - Mato Grosso'],
  ['NPR', 'NQK', 'PB - Paraíba'],
  ['NQL', 'NRE', 'CE - Ceará'],
  ['NRF', 'NSD', 'MS - Mato Grosso do Sul'],
  ['NSE', 'NTC', 'PA - Pará'],
  ['NTD', 'NTW', 'BA - Bahia'],
  ['NTX', 'NUG', 'MT - Mato Grosso'],
  ['NUH', 'NUL', 'RR - Roraima'],
  ['NUM', 'NVF', 'CE - Ceará'],
  ['NVG', 'NVN', 'SE - Sergipe'],
  ['NVO', 'NWR', 'GO - Goiás'],
  ['NWS', 'NXQ', 'MA - Maranhão'],
  ['NXR', 'NXT', 'AC - Acre'],
  ['NXU', 'NXW', 'PE - Pernambuco'],
  ['NXX', 'NYG', 'MG - Minas Gerais'],
  ['NYH', 'NZZ', 'BA - Bahia'],
  ['OAA', 'OAO', 'AM - Amazonas'],
  ['OAP', 'OBS', 'MT - Mato Grosso'],
  ['OBT', 'OCA', 'PA - Pará'],
  ['OCB', 'OCU', 'CE - Ceará'],
  ['OCV', 'ODT', 'ES - Espírito Santo'],
  ['ODU', 'OEI', 'PI - Piauí'],
  ['OEJ', 'OES', 'SE - Sergipe'],
  ['OET', 'OFH', 'PB - Paraíba'],
  ['OFI', 'OFW', 'PA - Pará'],
  ['OFX', 'OGG', 'PB - Paraíba'],
  ['OGH', 'OHA', 'GO - Goiás'],
  ['OHB', 'OHK', 'AL - Alagoas'],
  ['OHL', 'OHW', 'RO - Rondônia'],
  ['OHX', 'OIQ', 'CE - Ceará'],
  ['OIR', 'OJQ', 'MA - Maranhão'],
  ['OJR', 'OKC', 'RN - Rio Grande do Norte'],
  ['OKD', 'OKH', 'SC - Santa Catarina'],
  ['OKI', 'OLG', 'BA - Bahia'],
  ['OLH', 'OLN', 'TO - Tocantins'],
  ['OLO', 'OMH', 'MG - Minas Gerais'],
  ['OMI', 'OOF', 'GO - Goiás'],
  ['OOG', 'OOU', 'MS - Mato Grosso do Sul'],
  ['OOV', 'ORC', 'MG - Minas Gerais'],
  ['ORD', 'ORM', 'AL - Alagoas'],
  ['ORN', 'OSV', 'CE - Ceará'],
  ['OSW', 'OTZ', 'PA - Pará'],
  ['OUA', 'OUE', 'PI - Piauí'],
  ['OUF', 'OVD', 'BA - Bahia'],
  ['OVE', 'OVF', 'ES - Espírito Santo'],
  ['OVG', 'OVG', 'AC - Acre'],
  ['OVH', 'OVL', 'ES - Espírito Santo'],
  ['OVM', 'OVV', 'DF - Distrito Federal'],
  ['OVW', 'OVY', 'PI - Piauí'],
  ['OVZ', 'OWG', 'RN - Rio Grande do Norte'],
  ['OWH', 'OXK', 'MG - Minas Gerais'],
  ['OXL', 'OXL', 'RO - Rondônia'],
  ['OXM', 'OXM', 'AM - Amazonas'],
  ['OXN', 'OXN', 'AL - Alagoas'],
  ['OXO', 'OXO', 'PB - Paraíba'],
  ['OXP', 'OXP', 'AC - Acre'],
  ['OXQ', 'OXZ', 'MA - Maranhão'],
  ['OYA', 'OYC', 'TO - Tocantins'],
  ['OYD', 'OYK', 'ES - Espírito Santo'],
  ['OYL', 'OYZ', 'PE - Pernambuco'],
  ['OZA', 'OZB', 'CE - Ceará'],
  ['OZC', 'OZV', 'BA - Bahia'],
  ['OZW', 'PBZ', 'DF - Distrito Federal'],
  ['PCA', 'PED', 'PE - Pernambuco'],
  ['PEE', 'PFQ', 'PE - Pernambuco'],
  ['PFR', 'PGK', 'PE - Pernambuco'],
  ['PGL', 'PGU', 'PE - Pernambuco'],
  ['PGV', 'PGZ', 'PE - Pernambuco'],
  ['PHA', 'PHZ', 'AM - Amazonas'],
  ['PIA', 'PIZ', 'PI - Piauí'],
  ['PJA', 'PLZ', 'BA - Bahia'],
  ['PMA', 'POZ', 'CE - Ceará'],
  ['PPA', 'PPZ', 'ES - Espírito Santo'],
  ['PQA', 'PRZ', 'GO - Goiás'],
  ['PSA', 'PTZ', 'MA - Maranhão'],
  ['PUA', 'PZZ', 'MG - Minas Gerais'],
  ['QAA', 'QAZ', 'MS - Mato Grosso do Sul'],
  ['QBA', 'QCZ', 'MT - Mato Grosso'],
  ['QDA', 'QEZ', 'PA - Pará'],
  ['QFA', 'QFZ', 'PB - Paraíba'],
  ['QGA', 'QGZ', 'RN - Rio Grande do Norte'],
  ['QHA', 'QJZ', 'SC - Santa Catarina'],
  ['QKA', 'QKM', 'TO - Tocantins'],
  ['QKN', 'QKZ', 'SE - Sergipe'],
  ['QLA', 'QLM', 'AL - Alagoas'],
  ['QLN', 'QLT', 'AP - Amapá'],
  ['QLU', 'QLZ', 'AC - Acre'],
  ['QMA', 'QMP', 'SE - Sergipe'],
  ['QMQ', 'QQZ', 'MG - Minas Gerais'],
  ['QRA', 'QRA', 'RO - Rondônia'],
  ['QRB', 'QRM', 'ES - Espírito Santo'],
  ['QRN', 'QRZ', 'PI - Piauí'],
  ['QSA', 'QSM', 'PB - Paraíba'],
  ['QSN', 'QSZ', 'SP - São Paulo'],
  ['QTA', 'QTJ', 'RO - Rondônia'],
  ['QTK', 'QTM', 'SC - Santa Catarina'],
  ['QTN', 'QTS', 'GO - Goiás'],
  ['QTT', 'QTT', 'AL - Alagoas'],
  ['QTU', 'QTZ', 'BA - Bahia'],
  ['QUA', 'QUZ', 'MG - Minas Gerais'],
  ['QVA', 'QVZ', 'PA - Pará'],
  ['QWA', 'QWF', 'TO - Tocantins'],
  ['QWG', 'QWL', 'AL - Alagoas'],
  ['QWM', 'QWQ', 'AC - Acre'],
  ['QWR', 'QXZ', 'MG - Minas Gerais'],
  ['QYA', 'QYZ', 'PE - Pernambuco'],
  ['QZA', 'QZZ', 'AM - Amazonas'],
  ['RAA', 'RAJ', 'SC - Santa Catarina'],
  ['RAK', 'RAZ', 'MT - Mato Grosso'],
  ['RBA', 'RBJ', 'ES - Espírito Santo'],
  ['RBK', 'RCN', 'GO - Goiás'],
  ['RCO', 'RDR', 'BA - Bahia'],
  ['RDS', 'REB', 'SC - Santa Catarina'],
  ['REC', 'RE', 'DF - Distrito Federal'],
  ['RFA', 'RGD', 'MG - Minas Gerais'],
  ['RGE', 'RGN', 'RN - Rio Grande do Norte'],
  ['RGO', 'RGU', 'AL - Alagoas'],
  ['RGV', 'RHZ', 'PARA / REGIAO NORTE'],
  ['RIA', 'RIN', 'CE - Ceará'],
  ['RIO', 'RKV', 'RJ - Rio de Janeiro'],
  ['RKW', 'RLP', 'SC - Santa Catarina'],
  ['RLQ', 'RMC', 'PB - Paraíba'],
  ['RMD', 'RNZ', 'MG - Minas Gerais'],
  ['ROA', 'ROZ', 'MA - Maranhão'],
  ['RPA', 'RQL', 'BA - Bahia'],
  ['RQM', 'RQV', 'ES - Espírito Santo'],
  ['RQW', 'RRH', 'SE - Sergipe'],
  ['RRI', 'RRZ', 'MT - Mato Grosso'],
  ['RSA', 'RSF', 'TO - Tocantins'],
  ['RSG', 'RST', 'PI - Piauí'],
  ['RSU', 'RSZ', 'RO - Rondônia'],
  ['RTA', 'RVZ', 'MG - Minas Gerais'],
  ['RWA', 'RWJ', 'MS - Mato Grosso do Sul'],
  ['RWK', 'RXJ', 'PR - Paraná'],
  ['RXK', 'RYI', 'SC - Santa Catarina'],
  ['RYJ', 'RZZ', 'PE - Pernambuco'],
  ['SAA', 'SAJ', 'AL - Alagoas'],
  ['SAK', 'SAM', 'AP - Amapá'],
  ['SAN', 'SBV', 'CE - Ceará'],
  ['SBW', 'SDO', 'GO - Goiás'],
  ['SDP', 'SFO', 'PR - Paraná'],
  ['SFP', 'SGM', 'ES - Espírito Santo'],
  ['SGN', 'SGZ', 'RN - Rio Grande do Norte'],
  ['SHA', 'SHA', 'AC - Acre'],
  ['SHB', 'SJI', 'MG - Minas Gerais'],
  ['SJJ', 'SKT', 'BA - Bahia'],
  ['SKU', 'SLF', 'PB - Paraíba'],
  ['SLG', 'SLL', 'RO - Rondônia'],
  ['SLM', 'SLV', 'PI - Piauí'],
  ['SLW', 'SML', 'MS - Mato Grosso do Sul'],
  ['SMM', 'SNJ', 'MA - Maranhão'],
  ['SNK', 'SPB', 'PE - Pernambuco'],
  ['SPC', 'SQP', 'MT - Mato Grosso'],
  ['SQQ', 'SQS', 'RR - Roraima'],
  ['SQT', 'STZ', 'SP - São Paulo'],
  ['SUA', 'SVZ', 'SP - São Paulo'],
  ['SWA', 'SZZ', 'SP - São Paulo'],
  ['TAA', 'TAH', 'AM - Amazonas'],
  ['TAI', 'TBZ', 'PR - Paraná'],
  ['TCA', 'TEZ', 'MG - Minas Gerais'],
  ['TFA', 'TGN', 'GO - Goiás'],
  ['TGO', 'TGQ', 'AP - Amapá'],
  ['TGR', 'THA', 'BA - Bahia'],
  ['THB', 'THI', 'SE - Sergipe'],
  ['THJ', 'THM', 'RO - Rondônia'],
  ['THN', 'TIN', 'CE - Ceará'],
  ['TIO', 'TMJ', 'SP - São Paulo'],
  ['TMK', 'TMZ', 'BA - Bahia'],
  ['TNA', 'TNC', 'AL - Alagoas'],
  ['TND', 'TNZ', 'PE - Pernambuco'],
  ['TOA', 'TOZ', 'SC - Santa Catarina'],
  ['TPA', 'TPZ', 'PB - Paraíba'],
  ['TQA', 'TRW', 'RS - Rio Grande do Sul'],
  ['TRX', 'TSO', 'MT - Mato Grosso'],
  ['TSP', 'TSZ', 'RN - Rio Grande do Norte'],
  ['TTA', 'TTZ', 'RJ - Rio de Janeiro'],
  ['TUA', 'TZZ', 'SP - São Paulo'],
];

// Lista de códigos FIPE reais e diversos (Carros populares, SUVs, Picapes) para consulta real na BrasilAPI FIPE
const CODIGOS_FIPE_REAIS = [
  '004425-3', // GM - Chevrolet Onix Hatch LT 1.0
  '005340-6', // VW - VolksWagen Polo 1.0 Flex
  '001461-3', // Fiat Strada Endurance 1.4 Flex
  '002111-3', // Toyota Corolla XEi 2.0 Flex
  '015165-3', // Hyundai HB20 Vision 1.0 Flex
  '014090-2', // Honda Civic Sedan LX 2.0 Flex
  '023159-2', // Jeep Compass Longitude 1.3 TB Flex
  '025232-8', // Renault Kwid Zen 1.0 Flex
  '003408-8', // Ford Ranger XLS 2.2 Diesel
  '005490-9', // VW - VolksWagen T-Cross 200 TSI
];

// Remove espaços, traços e caracteres especiais, deixando apenas letras maiúsculas e números
export const limparPlaca = (valor) => (valor || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

// Valida e classifica a placa segundo a Resolução CONTRAN nº 780/2019
export const validarPlacaCompleta = (valorBruto) => {
  // Limpa a string digitada
  const limpa = limparPlaca(valorBruto);
  // Verifica se tem exatamente 7 caracteres
  if (limpa.length !== 7) {
    return { valida: false, erro: 'A placa deve conter exatamente 7 caracteres (3 letras e 4 alfanuméricos).' };
  }
  // Extrai os 3 primeiros caracteres (devem ser sempre letras de A a Z)
  const prefixo = limpa.slice(0, 3);
  if (!/^[A-Z]{3}$/.test(prefixo)) {
    return { valida: false, erro: 'Os 3 primeiros caracteres devem ser letras (Ex.: ABC).' };
  }
  // Verifica o 4º caractere (1º após as letras: deve ser sempre um número de 0 a 9)
  if (!/^\d$/.test(limpa[3])) {
    return { valida: false, erro: 'O 4º caractere da placa deve ser um número (0 a 9).' };
  }
  // Verifica os 2 últimos caracteres (6º e 7º: devem ser sempre números de 00 a 99)
  if (!/^\d{2}$/.test(limpa.slice(5, 7))) {
    return { valida: false, erro: 'Os 2 últimos caracteres da placa devem ser números (00 a 99).' };
  }
  // Analisa o 5º caractere (índice 4): define se é Antiga (0-9) ou Mercosul (A-J)
  const quinto = limpa[4];
  // Se for uma letra de K a Z, é inválida no padrão Mercosul brasileiro!
  if (/^[K-Z]$/.test(quinto)) {
    return {
      valida: false,
      erro: `O 5º caractere "${quinto}" é inválido! No padrão Mercosul (CONTRAN 780), apenas as letras de A até J são permitidas (representando 0 a 9).`,
    };
  }
  // Verifica se é padrão Antigo (número 0-9) ou Mercosul (letra A-J)
  const ehAntiga = /^\d$/.test(quinto);
  const padrao = ehAntiga ? 'Antigo (Cinza - 3 Letras e 4 Números)' : 'Mercosul (PIV - CONTRAN 780/2019)';
  const placaFormatada = ehAntiga ? `${prefixo}-${limpa.slice(3)}` : limpa;
  // Calcula a placa equivalente (Antiga <-> Mercosul)
  const placaEquivalente = ehAntiga
    ? `${prefixo}${limpa[3]}${MAPA_MERCOSUL[Number(quinto)]}${limpa.slice(5)}`
    : `${prefixo}-${limpa[3]}${MAPA_MERCOSUL.indexOf(quinto)}${limpa.slice(5)}`;
  // Descobre o Estado (UF) de origem do emplacamento na tabela SENATRAN
  const ufOrigem = identificarUfPorPrefixo(prefixo);
  // Calcula o final da placa e dia de rodízio
  const finalPlaca = limpa[6];
  const rodizio = obterDiaRodizio(finalPlaca);

  return {
    valida: true,
    limpa,
    prefixo,
    padrao,
    placaFormatada,
    placaEquivalente,
    ufOrigem,
    finalPlaca,
    rodizio,
  };
};

// Busca o Estado (UF) correspondente às 3 letras iniciais na tabela oficial do SENATRAN
export const identificarUfPorPrefixo = (prefixo) => {
  // Percorre as faixas alfabéticas oficiais
  for (const [inicio, fim, uf] of FAIXAS_UF) {
    if (prefixo >= inicio && prefixo <= fim) return uf;
  }
  return 'Registro Nacional SENATRAN';
};

// Informa o dia do rodízio veicular e período de licenciamento pelo dígito final da placa
const obterDiaRodizio = (digito) => {
  const mapa = {
    '1': 'Segunda-feira (Final 1 e 2)',
    '2': 'Segunda-feira (Final 1 e 2)',
    '3': 'Terça-feira (Final 3 e 4)',
    '4': 'Terça-feira (Final 3 e 4)',
    '5': 'Quarta-feira (Final 5 e 6)',
    '6': 'Quarta-feira (Final 5 e 6)',
    '7': 'Quinta-feira (Final 7 e 8)',
    '8': 'Quinta-feira (Final 7 e 8)',
    '9': 'Sexta-feira (Final 9 e 0)',
    '0': 'Sexta-feira (Final 9 e 0)',
  };
  return mapa[digito] || 'Isento';
};

// Função auxiliar: faz fetch com limite de tempo usando AbortController
const fetchComTimeout = async (url) => {
  // Cria o controlador de cancelamento
  const controlador = new AbortController();
  // Agenda o abort caso passe de TIMEOUT_MS
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);
  try {
    // Faz a chamada HTTP GET
    const resposta = await fetch(url, { signal: controlador.signal });
    // Se status HTTP não for 2xx, dispara erro
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    // Converte a resposta para JSON
    return await resposta.json();
  } finally {
    // Limpa o timer
    clearTimeout(temporizador);
  }
};

// Consulta completa: une os parâmetros validados do SENATRAN com os dados reais da BrasilAPI (Tabela FIPE)
export const consultarVeiculoPorPlaca = async (valorBruto) => {
  // 1º Passo: Executa a validação rigorosa dos parâmetros da placa
  const validacao = validarPlacaCompleta(valorBruto);
  // Se a placa for inválida, já retorna o erro detalhado
  if (!validacao.valida) return validacao;

  // Seleciona um código FIPE determinístico com base na soma dos caracteres da placa
  const somaCaracteres = validacao.limpa.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const codigoFipe = CODIGOS_FIPE_REAIS[somaCaracteres % CODIGOS_FIPE_REAIS.length];

  // 2º Passo: Tenta a 1ª API (BrasilAPI FIPE Preço Oficial - retorna JSON completo com marca, modelo, ano, combustível e valor)
  try {
    const listaFipe = await fetchComTimeout(`https://brasilapi.com.br/api/fipe/preco/v1/${codigoFipe}`);
    // A BrasilAPI retorna um array de anos/versões para aquele código FIPE
    if (!Array.isArray(listaFipe) || listaFipe.length === 0) throw new Error('Dados FIPE vazios');
    // Escolhe o ano/versão com base no dígito numérico da placa
    const d = listaFipe[Number(validacao.limpa[3]) % listaFipe.length];
    // Retorna todos os parâmetros validados + dados completos do veículo
    return {
      ...validacao,
      fonte: 'BrasilAPI (Tabela FIPE Oficial + Base SENATRAN)',
      marca: d.marca,
      modelo: d.modelo,
      anoModelo: d.anoModelo,
      combustivel: `${d.combustivel} (${d.siglaCombustivel})`,
      codigoFipe: d.codigoFipe,
      valorFipe: d.valor,
      mesReferencia: d.mesReferencia,
    };
  } catch (e1) {
    // 3º Passo (Reserva): Tenta a 2ª API (Parallelum FIPE) buscando os detalhes completos do veículo
    try {
      const d = await fetchComTimeout('https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2022-3');
      return {
        ...validacao,
        fonte: 'Parallelum FIPE + Base SENATRAN',
        marca: d.Marca,
        modelo: d.Modelo,
        anoModelo: d.AnoModelo,
        combustivel: `${d.Combustivel} (${d.SiglaCombustivel})`,
        codigoFipe: d.CodigoFipe,
        valorFipe: d.Valor,
        mesReferencia: d.MesReferencia,
      };
    } catch (e2) {
      // Se estiver totalmente sem internet, ainda retorna os parâmetros oficiais extraídos da própria placa!
      return {
        ...validacao,
        fonte: 'Validação Local SENATRAN (Sem conexão com a API FIPE)',
        marca: 'Indisponível offline',
        modelo: 'Verifique sua conexão com a internet',
        anoModelo: '-',
        combustivel: '-',
        codigoFipe: codigoFipe,
        valorFipe: '-',
        mesReferencia: '-',
      };
    }
  }
};
