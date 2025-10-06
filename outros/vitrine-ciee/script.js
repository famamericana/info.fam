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

// URLs da API
const API_BASE = 'https://api.ciee.org.br';
const ENDPOINTS = {
  vagas: `${API_BASE}/vagas/vitrine-vaga/publicadas`,
  areas: `${API_BASE}/core/professional-area`,
  cidades: `${API_BASE}/core/city/search`
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
async function buscarCidades(termo) {
  if (termo.length < 3) {
    sugestoesCidade.innerHTML = '';
    sugestoesCidade.style.display = 'none';
    return;
  }

  try {
    const response = await fetch(`${ENDPOINTS.cidades}?filter=${encodeURIComponent(termo)}`);
    if (!response.ok) throw new Error('Erro ao buscar cidades');
    
    const data = await response.json();
    mostrarSugestoesCidades(data.content);
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
  }
}

function mostrarSugestoesCidades(cidades) {
  if (!cidades || cidades.length === 0) {
    sugestoesCidade.style.display = 'none';
    return;
  }

  sugestoesCidade.innerHTML = '';
  cidades.slice(0, 10).forEach(cidade => {
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

// ========== CARREGAR VAGAS ==========
async function carregarVagas(pagina = 0) {
  mostrarLoading(true);
  
  try {
    const params = construirParametros(pagina);
    const url = `${ENDPOINTS.vagas}?${params}`;
    
    const response = await fetch(url, {
      headers: { 'Accept-Encoding': 'gzip, deflate, br' }
    });
    
    if (!response.ok) throw new Error('Erro ao buscar vagas');

    const data = await response.json();
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
