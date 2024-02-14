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
        { codigogoogle: ["Sistemas de Informação"], nome: "Sistemas de Informação", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "informática"], descricao: "Formação em tecnologia da informação e sistemas.", link: "https://www.fam.br/curso/sistemas-de-informacao/"},
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
                                <div style="margin-bottom:-28px"> ${tipoCurso} </div>
                                    </br>
                                    R$ 
                                <span class="valorinteressante">${valor}<span style="color: #f9e20f;" class="tooltipTrigger">*</span>
                                </span>
                                <span style="font-size:small; color: #a9b0cc;">/mensais </span> 
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

            // Esconde o ícone de carregamento após os cards serem criados
            document.getElementById('loadingIcon').style.display = 'none';

        }
    });


});



// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar-invertido/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});

$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer-invertido/footer.html");
});


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
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('tooltipTrigger')) {
            console.log('Tooltip trigger clicked!'); // Este log agora deve funcionar
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

    document.addEventListener('click', function(event) {
        var tooltip = document.getElementById('myTooltip');
        // Verifica se o clique foi fora do tooltip e não é um tooltipTrigger
        if (tooltip.style.display === 'block' && !event.target.classList.contains('tooltipTrigger') && !tooltip.contains(event.target)) {
            tooltip.style.display = 'none';
        }
    });
    

    window.addEventListener('scroll', function() {
        var tooltip = document.getElementById('myTooltip');
        // Se o tooltip não está visível, não faça nada
        if (tooltip.style.display !== 'block') return;
    
        // Implementação simplificada que assume um único tooltip e trigger visível
        // Aqui você precisaria ajustar a lógica para determinar o trigger correto baseado em sua aplicação específica
        var trigger = document.querySelector('.tooltipTrigger'); // Isto é simplificado
        if (!trigger) return; // Se nenhum gatilho ativo, não faça nada
    
        var iconRect = trigger.getBoundingClientRect();
        var tooltipRect = tooltip.getBoundingClientRect();
    
        var leftPosition = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2) + window.scrollX;
        var topPosition = iconRect.bottom + window.scrollY;
    
        tooltip.style.left = leftPosition + 'px';
        tooltip.style.top = topPosition + 'px';
    });
    
}

// Certifique-se de chamar setupTooltipTriggers() após os cartões serem criados
// Por exemplo, você pode chamar setupTooltipTriggers() no final de createCards() ou após createCards() ser chamada
