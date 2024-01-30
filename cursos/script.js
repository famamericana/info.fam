var valoresCursos = {}; // Objeto para armazenar os valores dos cursos

document.addEventListener('DOMContentLoaded', function () {
    const cursos = [
        { codigogoogle: ["Administração", "Administração EAD"], nome: "Administração", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Descrição do curso de Administração.", link: "link-administracao.html" },
        { codigogoogle: ["Biomedicina"], nome: "Biomedicina", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Biomedicina.", link: "link-biomedicina.html" },
        { codigogoogle: ["Ciência da Computação"], nome: "Ciência da Computação", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "informática"], descricao: "Descrição do curso de Ciência da Computação.", link: "link-ciencia-computacao.html" },
        { codigogoogle: ["Ciências Contábeis"], nome: "Ciências Contábeis", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Descrição do curso de Ciências Contábeis.", link: "link-ciencias-contabeis.html" },
        { codigogoogle: ["Comunicação Social"], nome: "Comunicação Social - Publicidade e Propaganda", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas", "criatividade"], descricao: "Descrição do curso de Comunicação Social.", link: "link-comunicacao-social.html" },
        { codigogoogle: ["Direito"], nome: "Direito", semestres: "10 semestres", horariodianoite: ["Matutino | Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "leitura"], descricao: "Descrição do curso de Direito.", link: "link-direito.html" },
        { codigogoogle: ["Design Gráfico"], nome: "Design Gráfico", semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas", "criatividade"], descricao: "Descrição do curso de Design.", link: "link-direito.html" },
        { codigogoogle: ["Educação Física"], nome: "Educação Física", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Descrição do curso de Educação Física.", link: "link-educacao-fisica.html" },
        { codigogoogle: ["Educação Física"], nome: "Educação Física", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Licenciatura"], tags: ["graduação", "saúde", "cuidados"], descricao: "Descrição do curso de Educação Física.", link: "link-educacao-fisica.html" },
        { codigogoogle: ["Enfermagem"], nome: "Enfermagem", semestres: "10 semestres", horariodianoite: ["Matutino | Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Enfermagem.", link: "link-enfermagem.html" },
        { codigogoogle: ["Engenharia Civil"], nome: "Engenharia Civil", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "contabilidade"], descricao: "Descrição do curso de Engenharia Civil.", link: "link-engenharia-civil.html" },
        { codigogoogle: ["Engenharia de Produção"], nome: "Engenharia de Produção", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia de Produção.", link: "link-engenharia-producao.html" },
        { codigogoogle: ["Engenharia Elétrica"], nome: "Engenharia Elétrica", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "contabilidade", "informática"], descricao: "Descrição do curso de Engenharia Elétrica.", link: "link-engenharia-eletrica.html" },
        { codigogoogle: ["Engenharia Mecânica"], nome: "Engenharia Mecânica", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Mecânica.", link: "link-engenharia-mecanica.html" },
        { codigogoogle: ["Engenharia Química"], nome: "Engenharia Química", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Química.", link: "link-engenharia-quimica.html" },
        { codigogoogle: ["Estética"], nome: "Estética e Cosmética", semestres: "5 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Descrição do curso de.", link: "" },
        { codigogoogle: ["Pós EstraFiscal"], nome: "Estratégia Fiscal e Tributária", semestres: "", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "exatas"], descricao: "Descrição do curso de Pós EstraFiscal.", link: "https://info.fam.br/cursos/estrategia-fiscal/" },
        { codigogoogle: ["Farmácia"], nome: "Farmácia", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Descrição do curso de Farmácia.", link: "link-farmacia.html" },
        { codigogoogle: ["Fisioterapia"], nome: "Fisioterapia", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "cuidados"], descricao: "Descrição do curso de Fisioterapia.", link: "link-fisioterapia.html" },
        { codigogoogle: ["Letras"], nome: "Letras", semestres: "10 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas", "leitura"], descricao: "Descrição do curso de Letras.", link: "link-letras.html" },
        { codigogoogle: ["Logística", "Logística EAD"], nome: "Logística", semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Descrição do curso de Letras.", link: "link-letras.html" },
        { codigogoogle: ["Pós MBAFinanças"], nome: "MBA em Finanças, Investiment e Banking", semestres: "", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "exatas"], descricao: "Descrição do curso de Pós MBAFinanças.", link: "https://info.fam.br/cursos/mba-financas/" },
        { codigogoogle: ["Marketing", "Marketing EAD"], nome: "Marketing", semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas","criatividade"], descricao: "Descrição do curso de Letras.", link: "link-letras.html" },
        { codigogoogle: ["Pós Marketing"], nome: "Marketing e Negócios",  semestres: "", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "humanas", "criatividade"], descricao: "Descrição do curso de Pós Marketing.", link: "https://info.fam.br/cursos/marketing-e-negocios/" },
        { codigogoogle: ["Pós Equina"], nome: "Medicina Equina", semestres: "", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "saúde", "animais"], descricao: "Descrição do curso de Pós Equina.", link: "link-pos-equina.html" },
        { codigogoogle: ["Medicina Veterinária (noturno)"], nome: "Medicina Veterinária", semestres: "10 semestres", horariodianoite: ["Matutino | Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde", "animais"], descricao: "Descrição do curso de Medicina Veterinária (matutino).", link: "link-medicina-veterinaria.html" },
        { codigogoogle: ["Medicina Silvestres"], nome: "Medicina de Animais Silvestres e Exóticos", semestres: "", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "saúde", "animais"], descricao: "Descrição do curso de Pós Neuro.", link: "" },
        { codigogoogle: ["Pós Neuro"], nome: "Neuropsicopedagogia Clínica e Psicomotricidade", semestres: "", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "saúde"], descricao: "Descrição do curso de Pós Neuro.", link: "https://info.fam.br/cursos/neuropsicopedagogia/" },
        { codigogoogle: ["Nutrição"], nome: "Nutrição", semestres: "8 semestres" ,horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Nutrição.", link: "link-nutricao.html" },
        { codigogoogle: ["Pedagogia", "Pedagogia EAD"], nome: "Pedagogia com ênfase em educação infantil", semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação",  "ead","humanas"], descricao: "Descrição do curso de Pedagogia.", link: "link-pedagogia.html" },
        { codigogoogle: ["Pedagogia", "Pedagogia EAD"], nome: "Pedagogia com ênfase em docentes das séries iniciais do ensino fundamental",  semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Descrição do curso de Pedagogia EAD.", link: "link-pedagogia-ead.html" },
        { codigogoogle: ["Psicologia"], nome: "Psicologia",  semestres: "10 semestres", horariodianoite: ["Matutino | Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Descrição do curso de Psicologia.", link: "link-psicologia.html" },
        { codigogoogle: ["Pós PsicoEscolar"], nome: "Psicologia Escolar e Educacional", semestres: "", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["pós-graduação", "humanas"], descricao: "Descrição do curso de Pós PsicoEscolar.", link: "https://info.fam.br/cursos/psicologia-escolar/" },
        { codigogoogle: ["Sistemas de Informação"], nome: "Sistemas de Informação",  semestres: "8 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "informática"], descricao: "Descrição do curso de Sistemas de Informação.", link: "link-sistemas-informacao.html" },
        { codigogoogle: ["Recursos Humanos, Recursos Humanos EAD"], nome: "Recursos Humanos",  semestres: "4 semestres", horariodianoite: ["Noturno -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "ead", "humanas"], descricao: "Descrição do curso de Recursos Humanos.", link: "link-recursos-humanos.html" },
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
                            <span class="valor-curso"> <div style="margin-bottom:-28px"> ${tipoCurso} </div>
                            </br>
                            R$ <span class="valorinteressante">${valor}</span> <span style="font-size:small; color: #a9b0cc;"> /mensais </span></span>
                            
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
                    <a class="vestibularlinkdaora" href="vestibularfam.com.br" target="_blank">Inscreva-se</a>
                </div>
                <div class="tagscursosdesign">${generateTagHTML(curso.tags)}</div>
                </div>
            `;
    
            cardsContainer.appendChild(card);
        });
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


    document.getElementById('clear-filters').addEventListener('click', function() {
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
        complete: function(results) {
            var data = results.data;
    
            data.forEach(row => {
                if (!valoresCursos[row['Cursos']]) {
                    valoresCursos[row['Cursos']] = [];
                }
                valoresCursos[row['Cursos']].push(row['Valor']);
            });
    
            createCards(); // Chama a função para criar os cards
        }
    });
    

});




