// Elementos DOM
const container = document.getElementById('vagas-container');
const loading = document.getElementById('loading');
const infoResultado = document.getElementById('info-resultado');
const paginacaoDiv = document.getElementById('paginacao');

// Filtros
const filtroTipo = document.getElementById('filtro-tipo');
const filtroNivel = document.getElementById('filtro-nivel');
const filtroArea = document.getElementById('filtro-area');
const filtroCidade = document.getElementById('filtro-cidade');
const filtroCodigo = document.getElementById('filtro-codigo');
const btnBuscar = document.getElementById('btn-buscar');
const btnLimpar = document.getElementById('btn-limpar');
const sugestoesCidade = document.getElementById('sugestoes-cidade');

// Estado da aplicação
let paginaAtual = 0;
let cidadeSelecionada = null;
let timeoutBusca = null;

const CIDADES_RMC = [
  { cityName: 'Campinas', cityCode: 3509502, state: { initials: 'SP' } },
  { cityName: 'Americana', cityCode: 3501608, state: { initials: 'SP' } },
  { cityName: 'Artur Nogueira', cityCode: 3503604, state: { initials: 'SP' } },
  { cityName: 'Cosmópolis', cityCode: 3512803, state: { initials: 'SP' } },
  { cityName: 'Engenheiro Coelho', cityCode: 3515152, state: { initials: 'SP' } },
  { cityName: 'Holambra', cityCode: 3519055, state: { initials: 'SP' } },
  { cityName: 'Hortolândia', cityCode: 3519071, state: { initials: 'SP' } },
  { cityName: 'Indaiatuba', cityCode: 3520509, state: { initials: 'SP' } },
  { cityName: 'Itatiba', cityCode: 3523404, state: { initials: 'SP' } },
  { cityName: 'Jaguariúna', cityCode: 3524709, state: { initials: 'SP' } },
  { cityName: 'Monte Mor', cityCode: 3531802, state: { initials: 'SP' } },
  { cityName: 'Morungaba', cityCode: 3532008, state: { initials: 'SP' } },
  { cityName: 'Nova Odessa', cityCode: 3533402, state: { initials: 'SP' } },
  { cityName: 'Paulínia', cityCode: 3536504, state: { initials: 'SP' } },
  { cityName: 'Pedreira', cityCode: 3537106, state: { initials: 'SP' } },
  { cityName: 'Santa Bárbara d\'Oeste', cityCode: 3545803, state: { initials: 'SP' } },
  { cityName: 'Santo Antônio de Posse', cityCode: 3548005, state: { initials: 'SP' } },
  { cityName: 'Sumaré', cityCode: 3552403, state: { initials: 'SP' } },
  { cityName: 'Valinhos', cityCode: 3556206, state: { initials: 'SP' } },
  { cityName: 'Vinhedo', cityCode: 3556701, state: { initials: 'SP' } },
  { cityName: 'Elias Fausto', cityCode: 3514809, state: { initials: 'SP' } }
];

// URLs da API
const API_BASE = 'https://api.ciee.org.br';
const ENDPOINTS = {
  vagas: `${API_BASE}/vagas/vitrine-vaga/publicadas`,
  areas: `${API_BASE}/core/professional-area`
};

// URL de redirecionamento (produção)
const URL_INSCRICAO = 'https://ciee.app/login';
const CODIGO_ACESSO = 'FAM_13732';

// ========== INICIALIZAÇÃO ==========
async function inicializar() {
  await carregarAreasProfissionais();
  await carregarVagas();
  configurarEventos();
}

// ========== CARREGAR ÁREAS PROFISSIONAIS ==========
async function carregarAreasProfissionais() {
  try {
    const response = await fetch(`${ENDPOINTS.areas}?ativo=true&nivelEnsino=SU`);
    if (!response.ok) throw new Error('Erro ao buscar áreas');
    
    const areas = await response.json();
    
    filtroArea.innerHTML = '<option value="">Todas as áreas</option>';
    areas.forEach(area => {
      const option = document.createElement('option');
      option.value = area.id;
      option.textContent = area.description;
      filtroArea.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar áreas:', error);
  }
}

// ========== BUSCAR CIDADES ==========
function normalizarTexto(texto = '') {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function buscarCidades(termo = '') {
  const termoNormalizado = normalizarTexto(termo);
  const resultado = termoNormalizado
    ? CIDADES_RMC.filter(cidade => normalizarTexto(cidade.cityName).includes(termoNormalizado))
    : CIDADES_RMC;

  mostrarSugestoesCidades(resultado);
}

function mostrarSugestoesCidades(cidades) {
  if (!cidades || cidades.length === 0) {
    sugestoesCidade.style.display = 'none';
    return;
  }

  sugestoesCidade.innerHTML = '';
  cidades.forEach(cidade => {
    const item = document.createElement('div');
    item.className = 'sugestao-item';
    item.textContent = `${cidade.cityName} - ${cidade.state.initials}`;
    item.onclick = () => selecionarCidade(cidade);
    sugestoesCidade.appendChild(item);
  });
  
  sugestoesCidade.style.display = 'block';
}

function selecionarCidade(cidade) {
  cidadeSelecionada = cidade;
  filtroCidade.value = `${cidade.cityName} - ${cidade.state.initials}`;
  sugestoesCidade.innerHTML = '';
  sugestoesCidade.style.display = 'none';
}

function encontrarCidadePorTexto(texto) {
  const textoNormalizado = normalizarTexto(texto);
  
  // Procurar pelo nome completo "Cidade - UF"
  const cidadeComUF = CIDADES_RMC.find(cidade => {
    const nomeCompleto = `${cidade.cityName} - ${cidade.state.initials}`;
    return normalizarTexto(nomeCompleto) === textoNormalizado;
  });
  
  if (cidadeComUF) return cidadeComUF;
  
  // Se não encontrar, procurar só pelo nome da cidade
  return CIDADES_RMC.find(cidade => normalizarTexto(cidade.cityName) === textoNormalizado);
}

function garantirCidadeSelecionada() {
  const textoDigitado = filtroCidade.value.trim();
  
  if (textoDigitado) {
    const cidadeEncontrada = encontrarCidadePorTexto(textoDigitado);
    if (cidadeEncontrada) {
      cidadeSelecionada = cidadeEncontrada;
    } else {
      // Se digitou algo inválido, limpa
      cidadeSelecionada = null;
      filtroCidade.value = '';
    }
  } else {
    // Campo vazio = sem filtro de cidade (todas as cidades da RMC)
    cidadeSelecionada = null;
  }
}

// ========== CARREGAR VAGAS ==========
async function carregarVagas(pagina = 0) {
  mostrarLoading(true);
  garantirCidadeSelecionada();
  
  try {
    let data;
    
    if (!cidadeSelecionada) {
      // Buscar vagas de todas as cidades da RMC
      data = await buscarVagasTodasCidadesRMC(pagina);
    } else {
      // Buscar vagas de uma cidade específica
      const params = construirParametros(pagina);
      const url = `${ENDPOINTS.vagas}?${params}`;
      
      const response = await fetch(url, {
        headers: { 'Accept-Encoding': 'gzip, deflate, br' }
      });
      
      if (!response.ok) throw new Error('Erro ao buscar vagas');
      data = await response.json();
    }

    mostrarVagas(data.content);
    mostrarInformacaoResultado(data);
    criarPaginacao(data);
    paginaAtual = pagina;
  } catch (error) {
    container.innerHTML = `
      <div class="erro">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Erro ao carregar vagas: ${error.message}</p>
        <button onclick="carregarVagas()" class="btn btn-primary">
          Tentar novamente
        </button>
      </div>
    `;
  } finally {
    mostrarLoading(false);
  }
}

async function buscarVagasTodasCidadesRMC(pagina) {
  // Buscar vagas de TODAS as cidades da RMC
  const codigosCidades = CIDADES_RMC.map(c => c.cityCode);
  
  const params = new URLSearchParams({
    page: 0, // Sempre página 0 para cada cidade
    size: 100, // Pegar até 100 vagas por cidade
    sort: 'codigoVaga,desc'
  });
  
  if (filtroTipo.value) params.append('tipoVaga', filtroTipo.value);
  if (filtroNivel.value) params.append('nivelEnsino', filtroNivel.value);
  if (filtroArea.value) params.append('idAreaProfissional', filtroArea.value);
  if (filtroCodigo.value) params.append('codigoVaga', filtroCodigo.value);
  
  // Fazer requisições em paralelo para TODAS as cidades da RMC
  const promises = codigosCidades.map(async (codigoCidade) => {
    const cidadeParams = new URLSearchParams(params);
    cidadeParams.set('codigoMunicipio', codigoCidade);
    
    try {
      const response = await fetch(`${ENDPOINTS.vagas}?${cidadeParams}`, {
        headers: { 'Accept-Encoding': 'gzip, deflate, br' }
      });
      
      if (!response.ok) return { content: [] };
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erro ao buscar vagas da cidade ${codigoCidade}:`, error);
      return { content: [] };
    }
  });
  
  const resultados = await Promise.all(promises);
  
  // Combinar TODAS as vagas de todas as cidades
  const todasVagas = resultados.flatMap(r => r.content || []);
  
  // Remover duplicatas por código de vaga
  const vagasUnicas = Array.from(
    new Map(todasVagas.map(vaga => [vaga.codigoVaga, vaga])).values()
  );
  
  // Ordenar por código decrescente
  vagasUnicas.sort((a, b) => b.codigoVaga - a.codigoVaga);
  
  // Implementar paginação manual
  const size = 12;
  const inicio = pagina * size;
  const fim = inicio + size;
  const vagasPaginadas = vagasUnicas.slice(inicio, fim);
  const totalPages = Math.ceil(vagasUnicas.length / size);
  
  return {
    content: vagasPaginadas,
    totalElements: vagasUnicas.length,
    totalPages: totalPages,
    number: pagina,
    size: size,
    first: pagina === 0,
    last: pagina >= totalPages - 1
  };
}

function construirParametros(pagina) {
  const params = new URLSearchParams({
    page: pagina,
    size: 12,
    sort: 'codigoVaga,desc'
  });

  if (filtroTipo.value) params.append('tipoVaga', filtroTipo.value);
  if (filtroNivel.value) params.append('nivelEnsino', filtroNivel.value);
  if (filtroArea.value) params.append('idAreaProfissional', filtroArea.value);
  if (cidadeSelecionada) params.append('codigoMunicipio', cidadeSelecionada.cityCode);
  if (filtroCodigo.value) params.append('codigoVaga', filtroCodigo.value);

  return params.toString();
}

// ========== MOSTRAR VAGAS ==========
function mostrarVagas(vagas) {
  if (!vagas || vagas.length === 0) {
    container.innerHTML = `
      <div class="sem-resultados">
        <i class="fas fa-search"></i>
        <h3>Nenhuma vaga encontrada</h3>
        <p>Tente ajustar os filtros de busca</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  vagas.forEach(vaga => {
    const card = criarCardVaga(vaga);
    container.appendChild(card);
  });

  // Scroll suave para o topo dos resultados
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function criarCardVaga(vaga) {
  const div = document.createElement('div');
  div.classList.add('vaga');
  
  const valorBolsa = formatarBolsa(vaga);
  const tipoVaga = vaga.tipoVaga === 'ESTAGIO' ? 'Estágio' : 'Aprendiz';
  const atividades = vaga.atividades && vaga.atividades.length > 0 
    ? vaga.atividades.slice(0, 3).map(a => `<li>${a}</li>`).join('')
    : '<li>Não informado</li>';

  div.innerHTML = `
    <div class="vaga-header">
      <span class="vaga-codigo">#${vaga.codigoVaga}</span>
      <span class="vaga-tipo ${vaga.tipoVaga.toLowerCase()}">${tipoVaga}</span>
    </div>
    
    <h3>${vaga.areaProfissional || 'Área não informada'}</h3>
    
    <div class="vaga-info">
      <p class="empresa">
        <i class="fas fa-building"></i>
        <strong>${vaga.nomeEmpresa || 'Empresa Confidencial'}</strong>
      </p>
      
      <p>
        <i class="fas fa-map-marker-alt"></i>
        ${vaga.local?.cidade || 'Não informado'} - ${vaga.local?.uf || ''}
      </p>
      
      <p>
        <i class="fas fa-graduation-cap"></i>
        ${formatarNivelEscolar(vaga.nivelEscolar)}
      </p>
      
      <p class="bolsa">
        <i class="fas fa-money-bill-wave"></i>
        <strong>${valorBolsa}</strong>
      </p>
    </div>

    ${vaga.descricao ? `<p class="descricao">${vaga.descricao}</p>` : ''}
    
    ${vaga.atividades && vaga.atividades.length > 0 ? `
      <div class="atividades">
        <strong><i class="fas fa-tasks"></i> Atividades:</strong>
        <ul>${atividades}</ul>
      </div>
    ` : ''}
    
    ${vaga.quantidadeBeneficios > 0 ? `
      <p class="beneficios">
        <i class="fas fa-gift"></i>
        ${vaga.quantidadeBeneficios} benefício(s) disponível(is)
      </p>
    ` : ''}
    
    <button 
      onclick="candidatarVaga(${vaga.codigoVaga})" 
      class="btn-candidatar"
    >
      <i class="fas fa-paper-plane"></i>
      Candidatar-se
    </button>
  `;
  
  return div;
}

function formatarBolsa(vaga) {
  if (vaga.tipoValorBolsa === 'A_COMBINAR') {
    return 'A combinar';
  }
  
  if (vaga.bolsaAuxilioDe && vaga.bolsaAuxilioAte) {
    if (vaga.bolsaAuxilioDe === vaga.bolsaAuxilioAte) {
      return `R$ ${vaga.bolsaAuxilioDe.toFixed(2)}`;
    }
    return `R$ ${vaga.bolsaAuxilioDe.toFixed(2)} - R$ ${vaga.bolsaAuxilioAte.toFixed(2)}`;
  }
  
  if (vaga.bolsaAuxilioDe) {
    return `A partir de R$ ${vaga.bolsaAuxilioDe.toFixed(2)}`;
  }
  
  return 'A combinar';
}

function formatarNivelEscolar(nivel) {
  const niveis = {
    'SU': 'Superior',
    'TE': 'Técnico',
    'EM': 'Ensino Médio',
    'EF': 'Ensino Fundamental'
  };
  return niveis[nivel] || nivel;
}

// ========== CANDIDATAR VAGA ==========
function candidatarVaga(codigoVaga) {
  const url = `${URL_INSCRICAO}?codigoVagaPortal=${codigoVaga}&acesso=${CODIGO_ACESSO}`;
  window.open(url, '_blank');
}

// ========== PAGINAÇÃO ==========
function criarPaginacao(data) {
  if (data.totalPages <= 1) {
    paginacaoDiv.innerHTML = '';
    return;
  }

  let html = '<div class="paginas">';
  
  // Botão anterior
  if (!data.first) {
    html += `<button onclick="carregarVagas(${data.number - 1})" class="btn-pagina">
      <i class="fas fa-chevron-left"></i>
    </button>`;
  }

  // Páginas
  const inicio = Math.max(0, data.number - 2);
  const fim = Math.min(data.totalPages, data.number + 3);

  if (inicio > 0) {
    html += `<button onclick="carregarVagas(0)" class="btn-pagina">1</button>`;
    if (inicio > 1) html += '<span class="pagina-ellipsis">...</span>';
  }

  for (let i = inicio; i < fim; i++) {
    const ativo = i === data.number ? 'ativo' : '';
    html += `<button onclick="carregarVagas(${i})" class="btn-pagina ${ativo}">
      ${i + 1}
    </button>`;
  }

  if (fim < data.totalPages) {
    if (fim < data.totalPages - 1) html += '<span class="pagina-ellipsis">...</span>';
    html += `<button onclick="carregarVagas(${data.totalPages - 1})" class="btn-pagina">
      ${data.totalPages}
    </button>`;
  }

  // Botão próximo
  if (!data.last) {
    html += `<button onclick="carregarVagas(${data.number + 1})" class="btn-pagina">
      <i class="fas fa-chevron-right"></i>
    </button>`;
  }

  html += '</div>';
  paginacaoDiv.innerHTML = html;
}

// ========== INFORMAÇÃO DE RESULTADO ==========
function mostrarInformacaoResultado(data) {
  const inicio = data.number * data.size + 1;
  const fim = Math.min((data.number + 1) * data.size, data.totalElements);
  
  infoResultado.innerHTML = `
    <p>
      <i class="fas fa-info-circle"></i>
      Mostrando <strong>${inicio}-${fim}</strong> de <strong>${data.totalElements}</strong> vagas
    </p>
  `;
}

// ========== LOADING ==========
function mostrarLoading(mostrar) {
  loading.style.display = mostrar ? 'block' : 'none';
  container.style.opacity = mostrar ? '0.5' : '1';
}

// ========== EVENTOS ==========
function configurarEventos() {
  // Buscar vagas
  btnBuscar.addEventListener('click', () => carregarVagas(0));

  // Limpar filtros
  btnLimpar.addEventListener('click', () => {
    filtroTipo.value = '';
    filtroNivel.value = '';
    filtroArea.value = '';
    filtroCodigo.value = '';
    filtroCidade.value = '';
    cidadeSelecionada = null;
    sugestoesCidade.innerHTML = '';
    sugestoesCidade.style.display = 'none';
    carregarVagas(0);
  });

  // Busca de cidades com debounce
  filtroCidade.addEventListener('input', (e) => {
    clearTimeout(timeoutBusca);
    timeoutBusca = setTimeout(() => {
      buscarCidades(e.target.value);
    }, 300);
  });

  filtroCidade.addEventListener('focus', () => {
    buscarCidades(filtroCidade.value);
  });

  // Fechar sugestões ao clicar fora
  document.addEventListener('click', (e) => {
    if (!filtroCidade.contains(e.target) && !sugestoesCidade.contains(e.target)) {
      sugestoesCidade.style.display = 'none';
    }
  });

  // Enter nos campos de filtro
  [filtroTipo, filtroNivel, filtroArea, filtroCidade, filtroCodigo].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        carregarVagas(0);
      }
    });
  });
}

// Inicializar aplicação
inicializar();
