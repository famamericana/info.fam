document.addEventListener('DOMContentLoaded', function () {
    const cursos = [
        { nome: "Administração",  semestres: 8, presencialead: ["Presencial | EaD -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Descrição do curso de Administração.", link: "link-administracao.html" },
        { nome: "Biomedicina",  semestres: 8, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Biomedicina.", link: "link-biomedicina.html" },
        { nome: "Ciência da Computação",   semestres: 8, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Ciência da Computação.", link: "link-ciencia-computacao.html" },
        { nome: "Ciências Contábeis",   semestres: 8, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Ciências Contábeis.", link: "link-ciencias-contabeis.html" },
        { nome: "Comunicação Social - Publicidade e Propaganda",  semestres: 8, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Descrição do curso de Comunicação Social.", link: "link-comunicacao-social.html" },
        { nome: "Direito",  semestres: 10, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "leitura"], descricao: "Descrição do curso de Direito.", link: "link-direito.html" },
        { nome: "Design Gráfico",  semestres: 4, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Descrição do curso de Design.", link: "link-direito.html" },
        { nome: "Educação Física",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Educação Física.", link: "link-educacao-fisica.html" },
        { nome: "Educação Física",  presencialead: ["Presencial -"], tipodegraduacao: ["Licenciatura"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Educação Física.", link: "link-educacao-fisica.html" },
        { nome: "Enfermagem",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Enfermagem.", link: "link-enfermagem.html" },
        { nome: "Engenharia Civil",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "contas"], descricao: "Descrição do curso de Engenharia Civil.", link: "link-engenharia-civil.html" },
        { nome: "Engenharia de Produção",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia de Produção.", link: "link-engenharia-producao.html" },
        { nome: "Engenharia Elétrica",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Elétrica.", link: "link-engenharia-eletrica.html" },
        { nome: "Engenharia Mecânica",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Mecânica.", link: "link-engenharia-mecanica.html" },
        { nome: "Engenharia Química",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Química.", link: "link-engenharia-quimica.html" },
        { nome: "Farmácia",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Farmácia.", link: "link-farmacia.html" },
        { nome: "Fisioterapia",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Fisioterapia.", link: "link-fisioterapia.html" },
        { nome: "Letras",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas", "leitura"], descricao: "Descrição do curso de Letras.", link: "link-letras.html" },
        { nome: "Medicina Veterinária (matutino)",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Medicina Veterinária (matutino).", link: "link-medicina-veterinaria.html" },
        { nome: "Medicina Veterinária (noturno)",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Medicina Veterinária (noturno).", link: "link-medicina-veterinaria.html" },
        { nome: "Nutrição",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Nutrição.", link: "link-nutricao.html" },
        { nome: "Pedagogia",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Pedagogia.", link: "link-pedagogia.html" },
        { nome: "Pedagogia EAD",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["ead", "educação"], descricao: "Descrição do curso de Pedagogia EAD.", link: "link-pedagogia-ead.html" },
        { nome: "Psicologia",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Psicologia.", link: "link-psicologia.html" },
        { nome: "Sistemas de Informação",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Sistemas de Informação.", link: "link-sistemas-informacao.html" },
        { nome: "Recursos Humanos",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Recursos Humanos.", link: "link-recursos-humanos.html" },
        { nome: "Recursos Humanos EAD",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["ead", "educação"], descricao: "Descrição do curso de Recursos Humanos EAD.", link: "link-recursos-humanos-ead.html" },
        { nome: "Pós Marketing",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "educação"], descricao: "Descrição do curso de Pós Marketing.", link: "link-pos-marketing.html" },
        { nome: "Pós Equina",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "saúde"], descricao: "Descrição do curso de Pós Equina.", link: "link-pos-equina.html" },
        { nome: "Pós Neuro",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "saúde"], descricao: "Descrição do curso de Pós Neuro.", link: "link-pos-neuro.html" },
        { nome: "Pós PsicoEscolar",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "educação"], descricao: "Descrição do curso de Pós PsicoEscolar.", link: "link-pos-psicoescolar.html" },
        { nome: "Pós MBAFinanças",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "exatas"], descricao: "Descrição do curso de Pós MBAFinanças.", link: "link-pos-mbafinancas.html" },
        { nome: "Pós EstraFiscal",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "exatas"], descricao: "Descrição do curso de Pós EstraFiscal.", link: "link-pos-estrafiscal.html" }
    ];
    
    function generateTagHTML(tags) {
        return tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
    }
    

    const cardsContainer = document.getElementById('cards');
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', function() {
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
    cursos.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-tags', curso.tags.join(',')); // Adiciona as tags ao card
        card.setAttribute('data-valor', curso.valor); // Adicione o valor do curso aqui
        card.setAttribute('data-semestres', curso.semestres); // Adiciona o número de semestres ao card


        card.innerHTML = `
            <h3>${curso.nome}</h3>
            <div style="display: flex;">
                <span class="presencialead">${curso.presencialead}‎ </span>
                <span class="presencialead">‎ ${curso.tipodegraduacao}</span>
            </div>  
            <span class="semestres">${curso.semestres} Semestres</span> 
            <p>${curso.descricao}</p>
            <a href="${curso.link}" target="_blank">Saiba mais</a>
            <div class="tagscursosdesign">${generateTagHTML(curso.tags)}</div>

            `;

        cardsContainer.appendChild(card);
    });


    function getCheckedValues(selector) {
        return Array.from(document.querySelectorAll(selector + ' input:checked')).map(cb => cb.value);
    }
    

    function filterCards() {
        const cursoFilter = getCheckedValues('#filter-curso');
        const areaFilter = getCheckedValues('#filter-tipograduacao');
        const semestreFilter = getCheckedValues('#filter-semestres').map(Number);
    
        // Combine todas as tags selecionadas
        const allSelectedFilters = [...cursoFilter, ...areaFilter, ...semestreFilter];
    
        document.querySelectorAll('#cards .card').forEach(card => {
            const tags = card.getAttribute('data-tags').split(',');
            const tagElements = card.querySelectorAll('.tag');
            const semestres = Number(card.getAttribute('data-semestres'));

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
        tagElement.addEventListener('click', function() {
            this.classList.toggle('active');
            filterCards();
        });
    });
});

