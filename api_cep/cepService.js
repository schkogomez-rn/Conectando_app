// Arquivo: cepService.js
// Camada de SERVIÇO: concentra o acesso às APIs de CEP, separado da interface (boa prática acadêmica: separação de responsabilidades)

// Tempo máximo (em milissegundos) que aguardamos cada API antes de desistir (evita travar o app)
const TIMEOUT_MS = 6000;

// Remove tudo que não for número do CEP digitado (ex.: "01001-000" vira "01001000")
export const limparCep = (valor) => valor.replace(/\D/g, '');

// Valida o CEP: o formato brasileiro possui exatamente 8 dígitos numéricos
export const cepValido = (cep) => /^\d{8}$/.test(cep);

// Aplica a máscara visual 00000-000 ao CEP para exibição amigável
export const formatarCep = (cep) => cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');

// Função auxiliar: faz fetch com limite de tempo usando AbortController
const fetchComTimeout = async (url) => {
  // Cria o controlador que permite cancelar a requisição
  const controlador = new AbortController();
  // Agenda o cancelamento automático caso a API demore mais que TIMEOUT_MS
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);
  // Inicia o bloco try para garantir a limpeza do temporizador
  try {
    // Executa a requisição HTTP GET vinculada ao sinal de cancelamento
    const resposta = await fetch(url, { signal: controlador.signal });
    // Se o status HTTP não for 2xx (ex.: 404 CEP inexistente), lança um erro
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    // Retorna o corpo da resposta já convertido de JSON para objeto JavaScript
    return await resposta.json();
  // O finally sempre executa, com sucesso ou erro
  } finally {
    // Cancela o temporizador pendente para não vazar recursos
    clearTimeout(temporizador);
  }
};

// Lista de PROVEDORES: cada API tem uma URL e um "normalizar" que converte a resposta para um formato único
export const PROVEDORES = [
  {
    // Nome exibido na tela
    nome: 'ViaCEP',
    // Monta a URL de consulta (API mais popular do Brasil, gratuita e sem chave)
    url: (cep) => `https://viacep.com.br/ws/${cep}/json/`,
    // Converte o JSON do ViaCEP para o formato padrão do app
    normalizar: (d) => {
      // O ViaCEP responde 200 com { erro: true } quando o CEP não existe; tratamos como falha
      if (d.erro) throw new Error('CEP não encontrado');
      // Retorna o objeto padronizado
      return { cep: d.cep, logradouro: d.logradouro, bairro: d.bairro, cidade: d.localidade, uf: d.uf };
    },
  },
  {
    // Nome exibido na tela
    nome: 'BrasilAPI',
    // URL da BrasilAPI v2 (agrega várias fontes e oferece fallback interno)
    url: (cep) => `https://brasilapi.com.br/api/cep/v2/${cep}`,
    // Converte o JSON da BrasilAPI para o formato padrão
    normalizar: (d) => ({ cep: d.cep, logradouro: d.street, bairro: d.neighborhood, cidade: d.city, uf: d.state }),
  },
  {
    // Nome exibido na tela
    nome: 'AwesomeAPI',
    // URL da AwesomeAPI (rápida e retorna também latitude/longitude)
    url: (cep) => `https://cep.awesomeapi.com.br/json/${cep}`,
    // Converte o JSON da AwesomeAPI para o formato padrão
    normalizar: (d) => ({ cep: d.cep, logradouro: d.address, bairro: d.district, cidade: d.city, uf: d.state }),
  },
  {
    // Nome exibido na tela
    nome: 'OpenCEP',
    // URL da OpenCEP (alternativa gratuita e de código aberto)
    url: (cep) => `https://opencep.com/v1/${cep}`,
    // Converte o JSON da OpenCEP para o formato padrão
    normalizar: (d) => ({ cep: d.cep, logradouro: d.logradouro, bairro: d.bairro, cidade: d.localidade, uf: d.uf }),
  },
];

// Consulta UM provedor e mede o tempo de resposta (retorna sempre um objeto, nunca lança erro)
export const consultarProvedor = async (provedor, cep) => {
  // Marca o instante inicial para calcular a latência
  const inicio = Date.now();
  // Tenta executar a consulta
  try {
    // Busca o JSON bruto da API
    const bruto = await fetchComTimeout(provedor.url(cep));
    // Normaliza os campos para o formato padrão
    const endereco = provedor.normalizar(bruto);
    // Retorna sucesso com o endereço e o tempo gasto
    return { nome: provedor.nome, ok: true, endereco, ms: Date.now() - inicio };
  // Captura timeout, falta de internet, CEP inexistente etc.
  } catch (erro) {
    // Retorna falha com a mensagem (AbortError significa estouro de tempo)
    return { nome: provedor.nome, ok: false, erro: erro.name === 'AbortError' ? 'Tempo esgotado' : erro.message, ms: Date.now() - inicio };
  }
};

// Consulta TODOS os provedores em paralelo (Promise.all) e ordena por velocidade
export const consultarTodos = async (cep) => {
  // Dispara todas as requisições ao mesmo tempo e aguarda o término de todas
  const resultados = await Promise.all(PROVEDORES.map((p) => consultarProvedor(p, cep)));
  // Ordena: sucessos primeiro, e entre eles o mais rápido primeiro
  return resultados.sort((a, b) => (a.ok === b.ok ? a.ms - b.ms : a.ok ? -1 : 1));
};

