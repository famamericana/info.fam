// Elementos DOM
const container = document.getElementById('vagas-container');
const loading = document.getElementById('loading');
const infoResultado = document.getElementById('info-resultado');
const infoResultadoTopo = document.getElementById('info-resultado-topo');
const paginacaoDiv = document.getElementById('paginacao');
const paginacaoDivTopo = document.getElementById('paginacao-topo');

// Filtros
const filtroNivel = document.getElementById('filtro-nivel');
const filtroArea = document.getElementById('filtro-area');
const filtroCidade = document.getElementById('filtro-cidade');
// filtroCodigo removed - not used anymore
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

// Evita que o navegador restaure automaticamente a posição de scroll ao recarregar (F5)
if ('scrollRestoration' in history) {
  try { history.scrollRestoration = 'manual'; } catch (e) { /* ignorar se não suportado */ }
}

// URL de redirecionamento (produção)
const URL_INSCRICAO = 'https://ciee.app/login';
const CODIGO_ACESSO = 'FAM_13732';
const NIVEIS_PERMITIDOS = ['SU', 'TE'];
const NIVEIS_PERMITIDOS_SET = new Set(NIVEIS_PERMITIDOS);

// ========== INICIALIZAÇÃO ==========
async function inicializar() {
  await carregarAreasProfissionais();
  // Ao carregar a página (F5), não forçar scroll para o container
  await carregarVagas(0, false);
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
  carregarVagas(0, false);
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

function aplicarFiltroNivelParams(params) {
  if (filtroNivel.value) {
    params.append('nivelEnsino', filtroNivel.value);
  }
}

function extrairCodigoNivel(valor) {
  if (valor === null || valor === undefined) {
    return null;
  }

  if (Array.isArray(valor)) {
    for (const item of valor) {
      const codigo = extrairCodigoNivel(item);
      if (codigo) return codigo;
    }
    return null;
  }

  if (typeof valor === 'string') {
    const textoOriginal = valor.trim();
    if (!textoOriginal) return null;

    const textoNormalizado = normalizarTexto(textoOriginal);
    if (textoNormalizado === 'superior' || textoNormalizado.startsWith('superior')) return 'SU';
    if (textoNormalizado === 'su') return 'SU';
    if (textoNormalizado === 'tecnico' || textoNormalizado.startsWith('tecnico')) return 'TE';
    if (textoNormalizado === 'te') return 'TE';
    if (textoNormalizado === 'ensino medio' || textoNormalizado === 'medio') return 'EM';
    if (textoNormalizado === 'ensino fundamental' || textoNormalizado === 'fundamental') return 'EF';

    return textoOriginal.toUpperCase();
  }

  if (typeof valor === 'number') {
    return String(valor).trim().toUpperCase();
  }

  if (typeof valor === 'object') {
    const camposPossiveis = [
      valor.codigo,
      valor.sigla,
      valor.id,
      valor.idNivelEnsino,
      valor.nivel,
      valor.nome,
      valor.descricao
    ];

    for (const campo of camposPossiveis) {
      const codigo = extrairCodigoNivel(campo);
      if (codigo) return codigo;
    }
  }

  return null;
}

function obterCodigoNivelDaVaga(vaga) {
  if (!vaga) return null;

  const campos = [
    vaga.nivelEscolar,
    vaga.nivelEnsino,
    vaga.codigoNivelEnsino,
    vaga.nivel,
    vaga.nivelEnsinoCodigo
  ];

  for (const campo of campos) {
    const codigo = extrairCodigoNivel(campo);
    if (codigo) return codigo;
  }

  return null;
}

function vagaNivelPermitida(vaga) {
  const codigo = obterCodigoNivelDaVaga(vaga);
  if (!codigo) return true;
  return NIVEIS_PERMITIDOS_SET.has(codigo);
}

function filtrarVagasPermitidas(vagas = []) {
  return vagas.filter(vagaNivelPermitida);
}

function paginarVagas(vagas, pagina, size = 12) {
  const totalElements = vagas.length;
  const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / size);
  const inicio = pagina * size;
  const fim = inicio + size;
  const content = vagas.slice(inicio, fim);

  return {
    content,
    totalElements,
    totalPages,
    number: pagina,
    size,
    first: pagina === 0,
    last: totalPages === 0 ? true : pagina >= totalPages - 1
  };
}

// ========== CARREGAR VAGAS ==========
async function carregarVagas(pagina = 0, shouldScroll = true) {
  mostrarLoading(true);
  garantirCidadeSelecionada();
  
  try {
    let data;
    
    if (!cidadeSelecionada) {
      console.log('🌍 Modo: TODAS AS CIDADES DA RMC');
      // Buscar vagas de todas as cidades da RMC
      data = await buscarVagasTodasCidadesRMC(pagina);
    } else {
      data = await buscarVagasCidadeEspecifica(cidadeSelecionada, pagina);
    }

    mostrarVagas(data.content, shouldScroll);
    mostrarInformacaoResultado(data);
    criarPaginacao(data);
    paginaAtual = pagina;
  } catch (error) {
    console.error('❌ Erro ao carregar vagas:', error);
    container.innerHTML = `
      <div class="erro">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Erro ao carregar vagas: ${error.message}</p>
        <button onclick="carregarVagas(0, true)" class="btn btn-primary">
          Tentar novamente
        </button>
      </div>
    `;
  } finally {
    mostrarLoading(false);
  }
}

async function buscarVagasTodasCidadesRMC(pagina) {
  console.log('🔍 Buscando vagas em TODAS as cidades da RMC...');
  console.log('═══════════════════════════════════════════════════');
  
  const params = new URLSearchParams({
    page: 0, // Sempre página 0 para cada cidade
    size: 600, // Aumentar para pegar TODAS as vagas (limite máximo razoável)
    sort: 'codigoVaga,desc'
  });
  
  // Forçar apenas ESTÁGIO
  params.append('tipoVaga', 'ESTAGIO');
  aplicarFiltroNivelParams(params);
  if (filtroArea.value) params.append('idAreaProfissional', filtroArea.value);
  // codigoVaga filter removed
  
  // Fazer requisições em paralelo para TODAS as cidades da RMC
  const promises = CIDADES_RMC.map(async (cidade) => {
    const cidadeParams = new URLSearchParams(params);
    cidadeParams.set('codigoMunicipio', cidade.cityCode);
    
    try {
      const response = await fetch(`${ENDPOINTS.vagas}?${cidadeParams}`, {
        headers: { 'Accept-Encoding': 'gzip, deflate, br' }
      });
      
      if (!response.ok) {
        console.log(`❌ ${cidade.cityName}: Erro na requisição`);
        return { cidade: cidade.cityName, content: [], total: 0 };
      }
      
      const data = await response.json();
      const vagasCidade = filtrarVagasPermitidas(data.content || []);
      const totalPermitidas = vagasCidade.length;
      const totalReal = data.totalElements || vagasCidade.length;
      
      if (totalPermitidas > 0) {
        if (totalReal > vagasCidade.length) {
          console.log(`⚠️  ${cidade.cityName}: ${totalPermitidas} vaga(s) dentro dos níveis permitidos (total bruto ${totalReal})`);
        } else {
          console.log(`✅ ${cidade.cityName}: ${totalPermitidas} vaga(s) dentro dos níveis permitidos`);
        }
      } else {
        console.log(`⚪ ${cidade.cityName}: Nenhuma vaga encontrada`);
      }
      
      return { cidade: cidade.cityName, content: vagasCidade, total: totalPermitidas, totalReal };
    } catch (error) {
      console.error(`❌ ${cidade.cityName}: Erro -`, error.message);
      return { cidade: cidade.cityName, content: [], total: 0, totalReal: 0 };
    }
  });
  
  const resultados = await Promise.all(promises);
  
  // Combinar TODAS as vagas de todas as cidades
  const todasVagas = resultados.flatMap(r => r.content || []);
  
  console.log('═══════════════════════════════════════════════════');
  console.log(`📊 RESUMO:`);
  console.log(`   Total de cidades consultadas: ${CIDADES_RMC.length}`);
  console.log(`   Total de vagas encontradas (com duplicatas): ${todasVagas.length}`);
  
  // Remover duplicatas por código de vaga
  const vagasUnicas = Array.from(
    new Map(todasVagas.map(vaga => [vaga.codigoVaga, vaga])).values()
  );
  
  console.log(`   Total de vagas únicas dentro dos níveis permitidos: ${vagasUnicas.length}`);
  
  // Ordenar por código decrescente
  vagasUnicas.sort((a, b) => b.codigoVaga - a.codigoVaga);
  
  const paginado = paginarVagas(vagasUnicas, pagina);
  
  if (paginado.totalElements > 0) {
    const inicio = pagina * paginado.size;
    const fim = inicio + paginado.content.length;
    console.log(`   Página atual: ${pagina + 1} de ${paginado.totalPages || 1}`);
    console.log(`   Mostrando vagas: ${inicio + 1} a ${fim}`);
  }
  console.log('═══════════════════════════════════════════════════');
  
  return paginado;
}

async function buscarVagasCidadeEspecifica(cidade, pagina) {
  console.log(`📍 Modo: Cidade específica - ${cidade.cityName}`);

  const params = new URLSearchParams({
    page: 0, // captura completa para paginação manual
    size: 600,
    sort: 'codigoVaga,desc',
    codigoMunicipio: cidade.cityCode
  });

  params.append('tipoVaga', 'ESTAGIO');
  aplicarFiltroNivelParams(params);
  if (filtroArea.value) params.append('idAreaProfissional', filtroArea.value);

  const url = `${ENDPOINTS.vagas}?${params}`;
  console.log(`🔗 URL: ${url}`);

  const response = await fetch(url, {
    headers: { 'Accept-Encoding': 'gzip, deflate, br' }
  });

  if (!response.ok) throw new Error('Erro ao buscar vagas');

  const data = await response.json();
  const vagasRecebidas = Array.isArray(data.content) ? data.content : [];
  const vagasPermitidas = filtrarVagasPermitidas(vagasRecebidas);

  console.log(`✅ ${cidade.cityName}: ${vagasPermitidas.length} vaga(s) dentro dos níveis permitidos`);

  const paginado = paginarVagas(vagasPermitidas, pagina);

  if (paginado.totalElements > 0) {
    const inicio = pagina * paginado.size;
    const fim = inicio + paginado.content.length;
    console.log(`   Página atual: ${pagina + 1} de ${paginado.totalPages || 1}`);
    console.log(`   Mostrando vagas: ${inicio + 1} a ${fim}`);
  }

  return paginado;
}

// ========== MOSTRAR VAGAS ==========
function mostrarVagas(vagas, shouldScroll = true) {
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

  // Scroll suave para o topo dos filtros, quando permitido
  if (shouldScroll) {
    requestAnimationFrame(() => {
      const filtrosContainer = document.querySelector('.filtros-container');
      if (filtrosContainer) {
        filtrosContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

function criarCardVaga(vaga) {
  const div = document.createElement('div');
  div.classList.add('vaga');
  
  const valorBolsa = formatarBolsa(vaga);
  const tipoVaga = vaga.tipoVaga === 'ESTAGIO' ? 'Estágio' : 'Aprendiz';
  const atividades = vaga.atividades && vaga.atividades.length > 0 
    ? vaga.atividades.slice(0, 3).map(a => `<li>${a}</li>`).join('')
    : '<li>Não informado</li>';
  const horario = formatarHorario(vaga);
  const imagemVaga = obterImagemVaga(vaga);

  div.innerHTML = `
   

    <div class="vaga-header">
      <span class="vaga-codigo">#${vaga.codigoVaga}</span>
      <span class="vaga-tipo ${vaga.tipoVaga.toLowerCase()}">${tipoVaga}</span>
    </div>

     ${imagemVaga ? `
      <div class="vaga-banner">
        <img src="${imagemVaga}" alt="Logo da empresa ${vaga.nomeEmpresa || ''}" loading="lazy" />
      </div>
    ` : ''}

    <h2>${vaga.areaProfissional || 'Área não informada'}</h2>

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
      
      ${horario ? `
        <p class="horario">
          <i class="fas fa-clock"></i>
          ${horario}
        </p>
      ` : ''}

      <p class="bolsa">
        <i class="fas fa-money-bill-wave"></i>
        <strong>${valorBolsa}</strong>
      </p>
    </div>

    ${vaga.descricao ? `<p class="descricao">${vaga.descricao}</p>` : ''}
    
    ${vaga.atividades && vaga.atividades.length > 0 ? `
      <div class="atividades">
        <strong> Atividades:</strong>
        <ul>${atividades}</ul>
      </div>
    ` : ''}
    
    ${vaga.quantidadeBeneficios > 0 ? `
      <p class="beneficios">
       
        ${vaga.quantidadeBeneficios} benefício(s) disponível(is)
      </p>
    ` : ''}
    
    <button 
      onclick="candidatarVaga(${vaga.codigoVaga})" 
      class="btn btn-candidatar"
    >
     
      Candidatar-se
    </button>
  `;
  
  return div;
}

function normalizarValorMonetario(valor) {
  if (valor === null || valor === undefined) {
    return null;
  }

  if (typeof valor === 'number') {
    return Number.isFinite(valor) && valor > 0 ? valor : null;
  }

  if (typeof valor === 'string') {
    let texto = valor
      .replace(/[^0-9.,-]/g, '')
      .replace(/\u0000/g, '')
      .trim();

    if (!texto) return null;

    const qtdPontos = (texto.match(/\./g) || []).length;
    const qtdVirgulas = (texto.match(/,/g) || []).length;

    if (qtdVirgulas > 0) {
      texto = texto.replace(/\./g, '').replace(',', '.');
    } else if (qtdPontos > 1) {
      texto = texto.replace(/\./g, '');
    } else if (qtdPontos === 1) {
      const [inteira, decimal] = texto.split('.');
      if (decimal && decimal.length === 3) {
        texto = `${inteira}${decimal}`;
      }
    }

    const numero = Number(texto);
    return Number.isFinite(numero) && numero > 0 ? numero : null;
  }

  return null;
}

function formatarValorBR(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatarBolsa(vaga) {
  const minimo = normalizarValorMonetario(
    vaga.bolsaAuxilioDe ?? vaga.valorBolsaDe ?? vaga.bolsaDe ?? vaga.bolsaInicio
  );
  const maximo = normalizarValorMonetario(
    vaga.bolsaAuxilioAte ?? vaga.valorBolsaAte ?? vaga.bolsaAte ?? vaga.bolsaFim
  );
  const unico = normalizarValorMonetario(
    vaga.bolsaAuxilio ?? vaga.valorBolsa ?? vaga.bolsa
  );

  if (minimo && maximo) {
    if (Math.abs(minimo - maximo) < 0.01) {
      return formatarValorBR(minimo);
    }
    return `${formatarValorBR(minimo)} - ${formatarValorBR(maximo)}`;
  }

  if (minimo) {
    return `A partir de ${formatarValorBR(minimo)}`;
  }

  if (maximo) {
    return `Até ${formatarValorBR(maximo)}`;
  }

  if (unico) {
    return formatarValorBR(unico);
  }

  if (vaga.tipoValorBolsa && vaga.tipoValorBolsa.toUpperCase().includes('COMBINAR')) {
    return 'A combinar';
  }

  return 'Não informado';
}

function formatarHora(raw) {
  if (!raw) return null;

  let texto = String(raw).trim();

  if (/^\d{1,2}:\d{2}$/.test(texto)) {
    return texto;
  }

  if (/^\d{1,2}h\d{0,2}$/i.test(texto)) {
    texto = texto.toLowerCase().replace('h', ':');
    if (/^\d{1,2}:\d{1,2}$/.test(texto)) {
      const [h, m] = texto.split(':');
      return `${h.padStart(2, '0')}:${m.padEnd(2, '0').slice(0, 2)}`;
    }
  }

  if (/^\d{3,4}$/.test(texto)) {
    const padded = texto.padStart(4, '0');
    return `${padded.slice(0, 2)}:${padded.slice(2)}`;
  }

  const match = texto.match(/(\d{1,2})[:hH]?(\d{2})?/);
  if (match) {
    const horas = match[1].padStart(2, '0');
    const minutos = (match[2] || '00').padEnd(2, '0').slice(0, 2);
    return `${horas}:${minutos}`;
  }

  return texto;
}

function formatarHorario(vaga) {
  const inicio = formatarHora(
    vaga.horarioInicio ?? vaga.horaInicio ?? vaga.horaEntrada ?? vaga.horarioEntrada
  );
  const fim = formatarHora(
    vaga.horarioFim ?? vaga.horaFim ?? vaga.horaSaida ?? vaga.horarioSaida
  );
  const turno = vaga.turno ?? vaga.turnoTrabalho ?? vaga.periodo ?? vaga.turnoAtuacao;
  const cargaHorariaRaw = vaga.cargaHoraria ?? vaga.cargaHorariaSemanal ?? vaga.cargaHorariaDiaria ?? vaga.horasSemanais ?? vaga.horasDiarias ?? vaga.jornada ?? vaga.jornadaSemanal ?? vaga.jornadaDiaria;
  const diasSemana = Array.isArray(vaga.diasSemana)
    ? vaga.diasSemana.join(', ')
    : vaga.diaSemana || vaga.dias;

  const partes = [];

  if (inicio || fim) {
    if (inicio && fim) {
      partes.push(`${inicio} - ${fim}`);
    } else if (inicio) {
      partes.push(`Início: ${inicio}`);
    } else {
      partes.push(`Término: ${fim}`);
    }
  }

  if (turno) {
    partes.push(turno);
  }

  if (cargaHorariaRaw) {
    const cargaTexto = typeof cargaHorariaRaw === 'number'
      ? `${cargaHorariaRaw}h`
      : String(cargaHorariaRaw);
    partes.push(cargaTexto);
  }

  if (diasSemana) {
    partes.push(diasSemana);
  }

  const campoLivre = vaga.horario ?? vaga.horarioTrabalho ?? vaga.descricaoHorario ?? vaga.descricaoJornada;
  if (!partes.length && campoLivre) {
    partes.push(campoLivre);
  }

  return partes.length ? partes.join(' | ') : null;
}

function obterImagemVaga(vaga) {
  const possiveis = [
    vaga.urlImagemEmpresa,
    vaga.urlLogoEmpresa,
    vaga.logoEmpresa,
    vaga.logoUrl,
    vaga.logo,
    vaga.imagemEmpresa,
    vaga.imagem,
    vaga.urlImagem,
    vaga.bannerUrl,
    vaga.banner
  ];

  const encontrada = possiveis.find(url => typeof url === 'string' && url.trim());
  return encontrada || null;
}

function formatarNivelEscolar(nivel) {
  const codigo = extrairCodigoNivel(nivel);
  const niveis = {
    'SU': 'Superior',
    'TE': 'Técnico'
  };

  if (codigo && niveis[codigo]) {
    return niveis[codigo];
  }

  if (typeof nivel === 'string' && nivel.trim()) {
    return nivel;
  }

  if (nivel && typeof nivel === 'object' && typeof nivel.descricao === 'string') {
    return nivel.descricao;
  }

  return 'Nível não informado';
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
    paginacaoDivTopo.innerHTML = '';
    return;
  }

  const montarPaginacao = (shouldScroll) => {
    const scrollParam = shouldScroll ? 'true' : 'false';
    let html = '<div class="paginas">';

    if (!data.first) {
      html += `<button onclick="carregarVagas(${data.number - 1}, ${scrollParam})" class="btn-pagina">
        <i class="fas fa-chevron-left"></i>
      </button>`;
    }

    const inicio = Math.max(0, data.number - 2);
    const fim = Math.min(data.totalPages, data.number + 3);

    if (inicio > 0) {
      html += `<button onclick="carregarVagas(0, ${scrollParam})" class="btn-pagina">1</button>`;
      if (inicio > 1) html += '<span class="pagina-ellipsis">...</span>';
    }

    for (let i = inicio; i < fim; i++) {
      const ativo = i === data.number ? 'ativo' : '';
      html += `<button onclick="carregarVagas(${i}, ${scrollParam})" class="btn-pagina ${ativo}">
        ${i + 1}
      </button>`;
    }

    if (fim < data.totalPages) {
      if (fim < data.totalPages - 1) html += '<span class="pagina-ellipsis">...</span>';
      html += `<button onclick="carregarVagas(${data.totalPages - 1}, ${scrollParam})" class="btn-pagina">
        ${data.totalPages}
      </button>`;
    }

    if (!data.last) {
      html += `<button onclick="carregarVagas(${data.number + 1}, ${scrollParam})" class="btn-pagina">
        <i class="fas fa-chevron-right"></i>
      </button>`;
    }

    html += '</div>';
    return html;
  };

  paginacaoDivTopo.innerHTML = montarPaginacao(false);
  paginacaoDiv.innerHTML = montarPaginacao(true);
}

// ========== INFORMAÇÃO DE RESULTADO ==========
function mostrarInformacaoResultado(data) {
  let inicio = data.number * data.size + 1;
  let fim = Math.min((data.number + 1) * data.size, data.totalElements);

  if (!data.totalElements) {
    inicio = 0;
    fim = 0;
  }

  const html = `
    <p>
      <i class="fas fa-info-circle"></i>
      Mostrando <strong>${inicio}${fim ? `-${fim}` : ''}</strong> de <strong>${data.totalElements || 0}</strong> vagas
    </p>
  `;
  
  // Aplicar HTML em ambos (topo e rodapé)
  infoResultado.innerHTML = html;
  infoResultadoTopo.innerHTML = html;
}

// ========== LOADING ==========
function mostrarLoading(mostrar) {
  loading.style.display = mostrar ? 'block' : 'none';
  container.style.opacity = mostrar ? '0.5' : '1';
}

// ========== EVENTOS ==========
function configurarEventos() {
  // Limpar filtros
  btnLimpar.addEventListener('click', () => {
    filtroNivel.value = '';
    filtroArea.value = '';
  // filtroCodigo removed
    filtroCidade.value = '';
    cidadeSelecionada = null;
    sugestoesCidade.innerHTML = '';
    sugestoesCidade.style.display = 'none';
    carregarVagas(0, true);
  });

  // Busca de cidades com debounce
  filtroCidade.addEventListener('input', (e) => {
    clearTimeout(timeoutBusca);
    timeoutBusca = setTimeout(() => {
      buscarCidades(e.target.value);
      if (!e.target.value.trim()) {
        carregarVagas(0, false);
      }
    }, 300);
  });

  filtroCidade.addEventListener('change', () => {
    carregarVagas(0, false);
  });

  filtroNivel.addEventListener('change', () => carregarVagas(0, false));
  filtroArea.addEventListener('change', () => carregarVagas(0, false));

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
  [filtroNivel, filtroArea, filtroCidade].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        carregarVagas(0);
      }
    });
  });
}

// Inicializar aplicação
inicializar();





//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

//-------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});