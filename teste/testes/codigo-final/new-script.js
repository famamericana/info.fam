/* NAVBAR /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
document.addEventListener('DOMContentLoaded', function () {


  window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar_main .navbar-custom');
    if (window.pageYOffset > 90) {
      navbar.classList.add('navbar-custom_fixed-navbar');
    } else {
      navbar.classList.remove('navbar-custom_fixed-navbar');
    }
  });

  const menuToggle = document.getElementById('mobile-menu-custom');
  const mobileLinks = document.getElementById('mobile-links-custom');
  const checkbox = document.getElementById('check-custom');


  menuToggle.addEventListener('click', () => {
    if (checkbox.checked) {
      mobileLinks.classList.add('open');
      document.body.classList.add('no-scroll'); // Adiciona a classe para desabilitar o scroll
    } else {
      mobileLinks.classList.remove('open');
      document.body.classList.remove('no-scroll'); // Remove a classe para habilitar o scroll

      // Desmarca o checkbox ativo
      document.querySelectorAll('.accordion input[type="checkbox"]:checked').forEach(checkedInput => {
        checkedInput.checked = false;
        checkedInput.nextElementSibling.nextElementSibling.style.maxHeight = '0';
      });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileLinks.classList.remove('open');
      checkbox.checked = false;
      document.body.classList.remove('no-scroll'); // Garante que o scroll seja habilitado ao redimensionar
    }
  });

  document.addEventListener('click', (event) => {
    const isClickInside = menuToggle.contains(event.target) || mobileLinks.contains(event.target);
    if (!isClickInside) {
      mobileLinks.classList.remove('open');
      checkbox.checked = false;
      document.body.classList.remove('no-scroll'); // Garante que o scroll seja habilitado ao clicar fora
    }
  });

  window.addEventListener('scroll', () => {
    if (checkbox.checked) {
      mobileLinks.classList.remove('open');
      checkbox.checked = false;
      document.body.classList.remove('no-scroll'); // Garante que o scroll seja habilitado ao rolar
    }
  });


  document.querySelectorAll('.accordion input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', function () {
      const content = this.nextElementSibling.nextElementSibling;

      if (this.checked) {
        // Fecha todos os conteúdos
        document.querySelectorAll('.tab__content').forEach(content => {
          content.style.maxHeight = '0';
        });

        // Abre o conteúdo específico
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        // Fecha o conteúdo se o checkbox foi desmarcado
        content.style.maxHeight = '0';
      }
    });
  });
});


/* CURSOS GERAL - FILTROS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var valoresCursos = {}; // Objeto para armazenar os valores dos cursos

document.addEventListener('DOMContentLoaded', function () {
  // Exibe o ícone de carregamento
  document.getElementById('loadingIcon').style.display = 'flex';

  const cursos = [
    { codigogoogle: ["Administração", "Administração EAD"], nome: "Administração", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Formação abrangente em gestão empresarial e liderança.", link: "https://www.fam.br/curso/administracao/" },
    { codigogoogle: ["Biomedicina"], nome: "Biomedicina", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Estudos avançados em análises clínicas e biologia molecular.", link: "https://www.fam.br/curso/biomedicina/" },
    { codigogoogle: ["Ciência da Computação"], nome: "Ciência da Computação", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "informática"], descricao: "Aprofundamento em sistemas computacionais e programação.", link: "https://www.fam.br/curso/ciencia-da-computacao/" },
    { codigogoogle: ["Ciências Contábeis"], nome: "Ciências Contábeis", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Especialização em contabilidade e finanças corporativas.", link: "https://www.fam.br/curso/ciencias-contabeis/" },
    { codigogoogle: ["Comunicação Social"], nome: "Comunicação Social - Publicidade e Propaganda", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas", "criatividade"], descricao: "Criatividade e estratégia em marketing e mídia.", link: "https://www.fam.br/curso/comunicacao-social-publicidade-e-propaganda/" },
    { codigogoogle: ["Direito"], nome: "Direito", semestres: "10 semestres", horariodianoite: ["Matutino | Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "leitura"], descricao: "Formação jurídica com foco em leis e argumentação.", link: "https://www.fam.br/curso/direito/" },
    { codigogoogle: ["Design Gráfico"], nome: "Design Gráfico", semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas", "criatividade"], descricao: "Desenvolvimento de habilidades visuais e criativas em design.", link: "https://www.fam.br/curso/tecnologo-em-design-grafico/" },
    { codigogoogle: ["Educação Física"], nome: "Educação Física", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Estudo do movimento humano e práticas esportivas.", link: "https://www.fam.br/curso/educacao-fisica-bacharelado/" },
    { codigogoogle: ["Educação Física"], nome: "Educação Física", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Licenciatura"], tags: ["graduação", "saúde", "cuidados"], descricao: "Estudo do movimento humano e práticas esportivas.", link: "https://www.fam.br/curso/educacao-fisica-licenciatura/" },
    { codigogoogle: ["Enfermagem"], nome: "Enfermagem", semestres: "10 semestres", horariodianoite: ["Matutino | Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Formação integral em cuidados de saúde e assistência.", link: "https://www.fam.br/curso/enfermagem/" },
    { codigogoogle: ["Engenharia Civil"], nome: "Engenharia Civil", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "contabilidade"], descricao: "Conhecimento em construção e infraestrutura urbana.", link: "https://www.fam.br/curso/engenharia-civil/" },
    { codigogoogle: ["Engenharia de Produção"], nome: "Engenharia de Produção", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Foco em otimização de processos e sistemas de produção.", link: "https://www.fam.br/curso/engenharia-de-producao/" },
    { codigogoogle: ["Engenharia Elétrica"], nome: "Engenharia Elétrica", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "informática"], descricao: "Estudos em eletricidade, eletrônica e energia.", link: "https://www.fam.br/curso/engenharia-eletrica/" },
    { codigogoogle: ["Engenharia Mecânica"], nome: "Engenharia Mecânica", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Conhecimento técnico em mecânica e automação.", link: "https://www.fam.br/curso/engenharia-mecanica/" },
    { codigogoogle: ["Engenharia Química"], nome: "Engenharia Química", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Formação em processos químicos e bioquímicos.", link: "https://www.fam.br/curso/engenharia-quimica/" },
    { codigogoogle: ["Estética"], nome: "Estética e Cosmética", semestres: "5 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Capacitação em beleza, cuidados pessoais e bem-estar.", link: "https://www.fam.br/curso/tecnologo-em-estetica-e-cosmetica/" },
    { codigogoogle: ["Pós EstraFiscal"], nome: "Estratégia Fiscal e Tributária", semestres: "Aulas semanais - 18 Meses", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "exatas"], descricao: "Especialização em finanças e legislação fiscal.", link: "https://info.fam.br/cursos/estrategia-fiscal/" },
    { codigogoogle: ["Farmácia"], nome: "Farmácia", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Estudos em medicamentos, formulações e farmacologia.", link: "https://www.fam.br/curso/farmacia/" },
    { codigogoogle: ["Fisioterapia"], nome: "Fisioterapia", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Formação em reabilitação e terapias corporais.", link: "https://www.fam.br/curso/fisioterapia/" },
    { codigogoogle: ["Recursos Humanos", "Recursos Humanos EAD"], nome: "Gestão de Recursos Humanos", semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Gestão de talentos e desenvolvimento organizacional.", link: "https://www.fam.br/curso/tecnologo-em-gestao-de-recursos-humanos/" },
    { codigogoogle: ["Gestão Financeira"], nome: "Gestão Financeira", semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Gestão estratégica de finanças corporativas e investimentos.", link: "https://www.fam.br/curso/tecnologo-em-gestao-financeira/" },
    { codigogoogle: ["Letras"], nome: "Letras", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas", "leitura"], descricao: "Aprofundamento em Português e Inglês, literatura e cultura.", link: "https://www.fam.br/curso/letras-portugues-e-ingles/" },
    { codigogoogle: ["Logística", "Logística EAD"], nome: "Logística", semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Gestão de cadeias de suprimento e distribuição.", link: "https://www.fam.br/curso/tecnologo-em-logistica/" },
    { codigogoogle: ["Pós MBAFinanças"], nome: "MBA em Finanças, Investiment e Banking", semestres: "Aulas quizenais - 18 meses", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "exatas"], descricao: "Especialização em finanças corporativas e investimentos.", link: "https://info.fam.br/cursos/mba-financas/" },
    { codigogoogle: ["Marketing", "Marketing EAD"], nome: "Marketing", semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas", "criatividade"], descricao: "Formação em estratégias de mercado e comunicação.", link: "https://www.fam.br/curso/tecnologo-em-marketing/" },
    { codigogoogle: ["Pós Marketing"], nome: "Marketing e Negócios", semestres: "Aulas quinzenais ou semanais - 18 meses", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "humanas", "criatividade"], descricao: "Foco em gestão de marketing e desenvolvimento de negócios.", link: "https://info.fam.br/cursos/marketing-e-negocios/" },
    { codigogoogle: ["Pós Equina"], nome: "Medicina Equina", semestres: "20 horas de aula /mês - 20 meses", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "saúde", "animais"], descricao: "Especialização no cuidado e tratamento de equinos.", link: "https://info.fam.br/cursos/medicina-equina/" },
    { codigogoogle: ["Medicina Veterinária (noturno)"], nome: "Medicina Veterinária", semestres: "10 semestres", horariodianoite: ["Matutino | Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "animais"], descricao: "Formação abrangente em saúde animal e veterinária.", link: "https://www.fam.br/curso/medicina-veterinaria/" },
    { codigogoogle: ["Medicina Silvestres"], nome: "Medicina de Animais Silvestres e Exóticos", semestres: "", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "saúde", "animais"], descricao: "Cuidado e estudo de espécies nacionais e exóticas.", link: "https://www.fam.br/curso/medicina-de-animais-silvestres-e-exoticos/" },
    { codigogoogle: ["Pós Neuro"], nome: "Neuropsicopedagogia Clínica e Psicomotricidade", semestres: "Aulas quinzenais - 24 Meses", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "saúde"], descricao: "Foco em aprendizagem e desenvolvimento cognitivo.", link: "https://info.fam.br/cursos/neuropsicopedagogia/" },
    { codigogoogle: ["Nutrição"], nome: "Nutrição", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Estudos em alimentação, dietética e saúde.", link: "https://www.fam.br/curso/nutricao/" },
    { codigogoogle: ["Pedagogia", "Pedagogia EAD"], nome: "Pedagogia com ênfase em educação infantil", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Especialização em ensino e cuidado infantil.", link: "https://www.fam.br/curso/pedagogia/" },
    { codigogoogle: ["Pedagogia", "Pedagogia EAD"], nome: "Pedagogia com ênfase em docentes das séries iniciais do ensino fundamental", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Formação para ensino fundamental e desenvolvimento infantil.", link: "https://www.fam.br/curso/pedagogia-com-enfase-em-docentes-das-series-iniciais-do-ensino-fundamental/" },
    { codigogoogle: ["Psicologia"], nome: "Psicologia", semestres: "10 semestres", horariodianoite: ["Matutino | Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Estudos aprofundados em comportamento e mente humana.", link: "https://www.fam.br/curso/psicologia/" },
    { codigogoogle: ["Pós PsicoEscolar"], nome: "Psicologia Escolar e Educacional", semestres: "Aulas semanais - 18 meses", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "humanas"], descricao: "Foco em desenvolvimento educacional e psicológico.", link: "https://info.fam.br/cursos/psicologia-escolar/" },
    { codigogoogle: ["Sistemas de Informação"], nome: "Sistemas de Informação", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "informática"], descricao: "Formação em tecnologia da informação e sistemas.", link: "https://www.fam.br/curso/sistemas-de-informacao/" },
  ];

  function generateTagHTML(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
  }


  const cardsContainer = document.getElementById('cards');
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', function () {
    const searchText = this.value.toLowerCase();

    document.querySelectorAll('#cards .card').forEach(card => {
      const nomeCurso = card.querySelector('h3').textContent.toLowerCase();
      if (nomeCurso.includes(searchText)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  function createCards() {
    cursos.forEach(curso => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-tags', curso.tags.join(','));
      card.setAttribute('data-semestres', curso.semestres);

      let valoresHTML = '<div class="valores-curso-container">'; // Container para os valores
      if (curso.codigogoogle) {
        curso.codigogoogle.forEach((codigo, index) => {
          if (valoresCursos[codigo]) {
            valoresCursos[codigo].forEach(valor => {
              let tipoCurso = index > 0 ? "EaD" : "Presencial"; // Adiciona "EAD" se for o segundo valor
              valoresHTML += `
                            <span class="valor-curso"> 
                                <div style="margin-bottom:-18px"> ${tipoCurso} </div>
                                    </br>
                                    R$ 
                                <span class="valorinteressante">
                                    ${valor}
                                    <span class="tooltipTrigger">*</span>
                                    <span style="font-size:small; color: #a9b0cc;font-weight: normal;">/mensais </span> 
                                </span>
                           
                            </span>
                            
                            `;
            });
          }
        });
      }
      valoresHTML += '</div>'; // Fecha o container

      card.innerHTML = `
                <div>
                    <h3>${curso.nome}</h3>
                    <div style="display: flex;">
                        <span class="horariodianoite">${curso.horariodianoite}‎ </span>
                        <span class="horariodianoite">‎ ${curso.tipodegraduacao}</span>
                    </div>  
                    <span class="semestres"><i class="fa-regular fa-clock"></i> ${curso.semestres}</span> 

                </div>
                <p>${curso.descricao}</p>
                ${valoresHTML}
                <div>
                <div style="display: flex;">
                    <a class="linkdocurso" href="${curso.link}" target="_blank">Saiba mais</a>
                    <a class="vestibularlinkdaora" href="https://vestibularfam.com.br" target="_blank">Inscreva-se</a>
                </div>
                <div class="tagscursosdesign">${generateTagHTML(curso.tags)}</div>
                </div>
            `;

      cardsContainer.appendChild(card);
    });

    setupTooltipTriggers();
  }



  function getCheckedValues(selector) {
    return Array.from(document.querySelectorAll(selector + ' input:checked')).map(cb => cb.value);
  }


  function filterCards() {
    const cursoFilter = getCheckedValues('#filter-curso');
    const areaFilter = getCheckedValues('#filter-tipograduacao');
    const semestreFilter = getCheckedValues('#filter-semestres'); // Já são strings

    // Combine todas as tags selecionadas
    const allSelectedFilters = [...cursoFilter, ...areaFilter, ...semestreFilter];

    document.querySelectorAll('#cards .card').forEach(card => {
      const tags = card.getAttribute('data-tags').split(',');
      const tagElements = card.querySelectorAll('.tag');
      const semestres = card.getAttribute('data-semestres'); // Já é uma string

      tagElements.forEach(tagEl => {
        if (allSelectedFilters.includes(tagEl.textContent)) {
          tagEl.classList.add('selected-tag');
        } else {
          tagEl.classList.remove('selected-tag');
        }
      });

      const isCursoMatched = !cursoFilter.length || cursoFilter.some(f => tags.includes(f));
      const isAreaMatched = !areaFilter.length || areaFilter.some(f => tags.includes(f));
      const isSemestreMatched = !semestreFilter.length || semestreFilter.includes(semestres);

      if (isCursoMatched && isAreaMatched && isSemestreMatched) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }


  document.querySelectorAll('#filter-curso input, #filter-tipograduacao input, #filter-semestres input').forEach(input => {
    input.addEventListener('change', filterCards);
  });


  document.querySelectorAll('.tag').forEach(tagElement => {
    tagElement.addEventListener('click', function () {
      this.classList.toggle('active');
      filterCards();
    });
  });


  document.getElementById('clear-filters').addEventListener('click', function () {
    // Resetar todos os inputs de filtros
    document.querySelectorAll('#filter-curso input, #filter-tipograduacao input, #filter-semestres input').forEach(input => {
      input.checked = false;
    });

    // Remover as classes 'active' e 'selected-tag' de todas as tags
    document.querySelectorAll('.tag').forEach(tagElement => {
      tagElement.classList.remove('active', 'selected-tag');
    });

    // Mostrar todos os cards
    document.querySelectorAll('#cards .card').forEach(card => {
      card.style.display = '';
    });

    // Limpar o campo de pesquisa
    document.getElementById('search-input').value = '';
  });




  // mdsss ----------------------------------------------------------------------------------------------------------------------------------------- valores 

  // Carrega os dados do CSV
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vREDH7BTr9H2Um4BgNp45XYW1ybvS1qBIWACK2eElc7pmra17fwwcVBp3Um-GD6_wOF_N_FquXS1Rx9/pub?output=csv';

  Papa.parse(url, {
    download: true,
    header: true,
    complete: function (results) {
      var data = results.data;

      data.forEach(row => {
        if (!valoresCursos[row['Cursos']]) {
          valoresCursos[row['Cursos']] = [];
        }
        valoresCursos[row['Cursos']].push(row['Valor']);
      });

      createCards(); // Chama a função para criar os cards

      // Ativa os checkboxes com base nos parâmetros da URL
      activateCheckboxesFromURL();

      // Esconde o ícone de carregamento após os cards serem criados
      document.getElementById('loadingIcon').style.display = 'none';

    }
  });

  // Função para ativar o checkbox se o valor estiver na URL
  function activateCheckboxesFromURL() {
    // Obtém os parâmetros da URL
    const params = new URLSearchParams(window.location.search);

    // Itera sobre todos os checkboxes
    document.querySelectorAll('#filter-curso input, #filter-tipograduacao input, #filter-semestres input').forEach(input => {
      // Normaliza o valor do checkbox e verifica se ele está nos parâmetros da URL
      if (params.has(removeAccentsAndSpecialChars(input.value))) {
        input.checked = true; // Ativa o checkbox
      }
    });

    // Atualiza os cards com base nos filtros
    filterCards();
  }

  // Adiciona o evento de mudança para os checkboxes
  document.querySelectorAll('#filter-curso input, #filter-tipograduacao input, #filter-semestres input').forEach(input => {
    input.addEventListener('change', filterCards);
  });
});

function removeAccentsAndSpecialChars(str) {
  return str
    .normalize("NFD") // Normaliza o texto para separar os caracteres especiais
    .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove caracteres especiais, mas mantém espaços e hífens
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .toLowerCase(); // Converte para minúsculas
}


$(document).ready(function () {
  $("#BotaoTopo").load("/codigos-gerais/voltartopo/voltartopo.html");
});

//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}



// ****** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Após a criação dos cards no DOM, você pode adicionar os manipuladores de eventos
function setupTooltipTriggers() {
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('tooltipTrigger')) {
      var tooltip = document.getElementById('myTooltip');
      var iconRect = event.target.getBoundingClientRect();

      // Verifica a visibilidade atual do tooltip e alterna entre mostrar e esconder
      if (tooltip.style.display === 'block') {
        tooltip.style.display = 'none';
      } else {
        // Mostra o tooltip
        tooltip.style.display = 'block';

        // Calcula e aplica a posição
        var tooltipRect = tooltip.getBoundingClientRect();
        var leftPosition = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2) + window.scrollX;
        var topPosition = iconRect.bottom + window.scrollY;
        tooltip.style.left = leftPosition + 'px';
        tooltip.style.top = topPosition + 'px';
      }

      event.stopPropagation();
    }
  });

  document.addEventListener('click', function (event) {
    var tooltip = document.getElementById('myTooltip');
    // Verifica se o clique foi fora do tooltip e não é um tooltipTrigger
    if (tooltip.style.display === 'block' && !event.target.classList.contains('tooltipTrigger') && !tooltip.contains(event.target)) {
      tooltip.style.display = 'none';
    }
  });

  // Adiciona manipulador de eventos de scroll ao window para esconder o tooltip
  window.addEventListener('scroll', function () {
    var tooltip = document.getElementById('myTooltip');
    if (tooltip.style.display === 'block') {
      tooltip.style.display = 'none';
    }
  });

  window.addEventListener('resize', () => {
    var tooltip = document.getElementById('myTooltip');
    if (tooltip.style.display === 'block') {
      tooltip.style.display = 'none';
    }
  });

}

// Certifique-se de chamar setupTooltipTriggers() após os cartões serem criados
// Por exemplo, você pode chamar setupTooltipTriggers() no final de createCards() ou após createCards() ser chamada



/* CURSOS Individual /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


/* Referencias
https://codepen.io/a7rarpress/pen/MWPgaMq
https://jsfiddle.net/4vm1sht5/3/
*/

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});


window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  var header = document.getElementById("sticky-header");
  var topHeader = document.getElementById("top-header");

  // Definir limite para quando o cabeçalho deve encolher
  var shrinkBoundary = topHeader.offsetHeight + 50;

  if (window.scrollY > topHeader.offsetHeight) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
    header.classList.remove("shrink");
  }

  if (window.scrollY > shrinkBoundary) {
    header.classList.add("shrink");
  }
}


$(window).on("scroll", function () {
  highlight();
});

function highlight() {
  var scroll = $(window).scrollTop();
  var height = $(window).height();

  $(".highlight").each(function () {
    var pos = $(this).offset().top;
    if (scroll + height >= pos) {
      $(this).addClass("active");
    }
    //console.log(pos);
    //console.log(scroll);
  });
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Abre a primeira aba por padrão
document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("tablinks")[0].click();
});


// LOGO MUDAR TAMANHO PC/MOBILE --------------------------------------------------------------------------------------------------------------------------------------------
function ajustarLogo() {
  var largura = window.innerWidth;
  var logoQuadrado = document.getElementById('logoQuadrado');
  var logoRetangular = document.getElementById('logoRetangular');

  if (largura < 960) { // Ponto de corte
    logoQuadrado.style.display = 'none';
    logoRetangular.style.display = 'block';
  } else {
    logoQuadrado.style.display = 'block';
    logoRetangular.style.display = 'none';
  }
}

// Executa assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', ajustarLogo);

// Continua a executar ao redimensionar a página
window.onresize = ajustarLogo;



//MININAVBAR ------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  var bg = document.getElementById("buttonBackground");

  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight) {
      bg.style.display = "flex";
    } else {
      bg.style.display = "none";
    }
  });
});
//BOTÃO SETA ---------------------------------------------------------------------------------

document.querySelectorAll('.containerseta').forEach(item => {
  item.addEventListener('click', () => {
    const section = document.querySelector('#target-section');
    if (section) {
      const offsetTop = section.offsetTop;
      const offsetToScroll = offsetTop - 100; // Ajuste 100px para o valor desejado
      window.scrollTo({
        top: offsetToScroll,
        behavior: 'smooth'
      });
    }
  });
});

// faq ------------------------------------------------------------------------------------------------ 

const accordionBtns = document.querySelectorAll(".item-header");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("active");

    let content = this.nextElementSibling;
    //console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      //console.log(content.style.maxHeight);
    }
  };
});

// Resize event listener to adjust accordion content height on window resize
window.addEventListener('resize', () => {
  accordionBtns.forEach((accordion) => {
    let content = accordion.nextElementSibling;
    if (accordion.classList.contains('active')) {
      // Recalculate and update maxHeight for active accordion
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// descrição matriz -----------------------------------------------------------------------

function mostrarDescricao(elemento) {
  let descricao = elemento.nextElementSibling;

  if (descricao.style.display === 'block') {
    descricao.style.display = 'none';
    return;
  }

  let todasDescricoes = document.querySelectorAll('.descricao');
  for (let i = 0; i < todasDescricoes.length; i++) {
    todasDescricoes[i].style.display = 'none';
  }

  descricao.style.display = 'block';
}

// não deixar sozinho matriz -----------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector('#lista');
  const items = grid.querySelectorAll('.item');
  if (items.length % 2 !== 0) {
    items[items.length - 1].classList.add('item-last-alone');
  }
});


// degradê imagens conheça mais cursos -----------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  var images = [
    "url('/teste/testes/codigo-por-curso/imagescursos/piscina.png')",
    "url('/teste/testes/codigo-por-curso/imagescursos/vet.png')",
    "url('/teste/testes/codigo-por-curso/imagescursos/praca.png')",
    "url('/teste/testes/codigo-por-curso/imagescursos/estacionamento.png')",
    "url('/teste/testes/codigo-por-curso/imagescursos/bloco2.png')",
  ];
  var currentIndex = 0;
  var overlayDiv = document.querySelector('.image-overlay');
  var nextOverlayDiv = document.querySelector('.overlay-next');

  function changeImage() {
    nextOverlayDiv.style.backgroundImage = images[currentIndex];
    nextOverlayDiv.style.opacity = '1'; // Torna a próxima imagem visível

    // Espera pela transição para completar antes de trocar as imagens e resetar a opacidade
    setTimeout(function () {
      overlayDiv.style.backgroundImage = images[currentIndex];
      nextOverlayDiv.style.opacity = '0'; // Esconde a próxima imagem após a transição
      currentIndex = (currentIndex + 1) % images.length; // Avança para a próxima imagem
    }, 1000); // Deve coincidir com a duração da transição CSS
  }

  // Inicia com a primeira imagem
  changeImage();

  // Muda a imagem a cada 4 segundos + 1 segundo de transição
  setInterval(changeImage, 5000);
});

/* colocar subtitulo no subtitulo1 ------------------------------------------------------------------------------------------------------------------------------*/

// Seleciona as duas divs
const subtitulo = document.querySelector('.subtitulo');
const subtitulo1 = document.querySelector('.subtitulo1');

// Copia o conteúdo da subtitulo para subtitulo1
subtitulo1.innerHTML = subtitulo.innerHTML;


/*codigo individual da pagina individual de cursos (vai ser obsoleto) --------------------------------------------------------------------------------------------------------------------*/

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vREDH7BTr9H2Um4BgNp45XYW1ybvS1qBIWACK2eElc7pmra17fwwcVBp3Um-GD6_wOF_N_FquXS1Rx9/pub?output=csv';

Papa.parse(url, {
  download: true,
  header: true,
  complete: function (results) {
    var data = results.data;

    // Para "Administração"
    var contentDivAdmin = document.createElement('div');
    contentDivAdmin.className = 'containercursos';

    data.filter(row => row['Cursos'] === 'Administração').forEach(row => {
      var cardDiv = document.createElement('div');
      cardDiv.className = 'cursos';

      cardDiv.innerHTML = `<p>${row['Valor']}</p>`;
      contentDivAdmin.appendChild(cardDiv);
    });

    var meuLocalAdmin = document.getElementById('produtofinalcursos');
    meuLocalAdmin.appendChild(contentDivAdmin);

    // Para "EaD"
    var contentDivEng = document.createElement('div');
    contentDivEng.className = 'containerengenharia';

    data.filter(row => row['Cursos'] === 'Administração EAD').forEach(row => {
      var cardDiv = document.createElement('div');
      cardDiv.className = 'cursos';

      cardDiv.innerHTML = `<p>${row['Valor']}</p>`;
      contentDivEng.appendChild(cardDiv);
    });

    var meuLocalEng = document.getElementById('produtofinalead');
    meuLocalEng.appendChild(contentDivEng);
  }
});


const url3 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQFQpAPuz3qeeeaVPGRhbC76PJCmu__UDYg99qUuZMnYw6PrdOkZ3jtLCOf9SlcMh3ft7liKV5b0tk4/pub?output=csv';

Papa.parse(url3, {
  download: true,
  header: true,
  complete: function (results) {
    var data = results.data;
    var cardHolder = document.querySelector('.cardHolder');

    data.forEach(row => {
      if (row['Nome PsicoEscolar'] && row['Foto PsicoEscolar'] && row['Cargo PsicoEscolar']) {
        var cardBox = document.createElement('div');
        cardBox.className = 'cardBox swiper-slide';

        var cardDetails = document.createElement('div');
        cardDetails.className = 'cardDetails';

        var cardDiv = document.createElement('div');
        cardDiv.className = 'teacherSection';
        cardDiv.innerHTML = `
                  <img class="teacherImg" src="${row['Foto PsicoEscolar']}" alt="${row['Nome PsicoEscolar']}">
                  <h3>${row['Nome PsicoEscolar']}</h3>
                  <p>${row['Cargo PsicoEscolar']}</p>
                  <div class="teacherCurriculum">
                      <a class="teacherCurriculumLinks" href="${row['Contato PsicoEscolar']}" target="_blank" title="Contato"><i class="fa-solid fa-message"></i></a>
                      <a class="teacherCurriculumLinks" href="${row['Currículo PsicoEscolar']}" target="_blank" title="Currículo"><i class="ai ai-lattes"></i>Currículo</a>
                  </div>
              `;
        cardDetails.appendChild(cardDiv);
        cardBox.appendChild(cardDetails);
        cardHolder.appendChild(cardBox);
      }
    });

    var swiper = new Swiper(".slideContent", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      centerSlide: 'true',
      fade: 'true',
      grabCursor: 'true',
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });
  }
});
