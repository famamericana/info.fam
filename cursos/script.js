document.addEventListener('DOMContentLoaded', function () {
    const cursos = [
        { nome: "Administração", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Administração.", imagem: "imagem-administracao.jpg", link: "link-administracao.html" },
        { nome: "Administração EAD", tipodegraduacao: ["Bacharelado"], tags: ["ead", "exatas"], descricao: "Descrição do curso de Administração EAD.", imagem: "imagem-admin-ead.jpg", link: "link-admin-ead.html" },
        { nome: "Biomedicina", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Biomedicina.", imagem: "imagem-biomedicina.jpg", link: "link-biomedicina.html" },
        { nome: "Ciência da Computação", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Ciência da Computação.", imagem: "imagem-ciencia-computacao.jpg", link: "link-ciencia-computacao.html" },
        { nome: "Ciências Contábeis", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Ciências Contábeis.", imagem: "imagem-ciencias-contabeis.jpg", link: "link-ciencias-contabeis.html" },
        { nome: "Comunicação Social - Publicidade e Propaganda", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Comunicação Social.", imagem: "imagem-comunicacao-social.jpg", link: "link-comunicacao-social.html" },
        { nome: "Direito", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Direito.", imagem: "imagem-direito.jpg", link: "link-direito.html" },
        { nome: "Educação Física", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Educação Física.", imagem: "imagem-educacao-fisica.jpg", link: "link-educacao-fisica.html" },
        { nome: "Enfermagem", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Enfermagem.", imagem: "imagem-enfermagem.jpg", link: "link-enfermagem.html" },
        { nome: "Engenharia Civil", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Civil.", imagem: "imagem-engenharia-civil.jpg", link: "link-engenharia-civil.html" },
        { nome: "Engenharia de Produção", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia de Produção.", imagem: "imagem-engenharia-producao.jpg", link: "link-engenharia-producao.html" },
        { nome: "Engenharia Elétrica", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Elétrica.", imagem: "imagem-engenharia-eletrica.jpg", link: "link-engenharia-eletrica.html" },
        { nome: "Engenharia Mecânica", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Mecânica.", imagem: "imagem-engenharia-mecanica.jpg", link: "link-engenharia-mecanica.html" },
        { nome: "Engenharia Química", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Química.", imagem: "imagem-engenharia-quimica.jpg", link: "link-engenharia-quimica.html" },
        { nome: "Farmácia", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Farmácia.", imagem: "imagem-farmacia.jpg", link: "link-farmacia.html" },
        { nome: "Fisioterapia", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Fisioterapia.", imagem: "imagem-fisioterapia.jpg", link: "link-fisioterapia.html" },
        { nome: "Letras", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Letras.", imagem: "imagem-letras.jpg", link: "link-letras.html" },
        { nome: "Medicina Veterinária (matutino)", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Medicina Veterinária (matutino).", imagem: "imagem-medicina-veterinaria.jpg", link: "link-medicina-veterinaria.html" },
        { nome: "Medicina Veterinária (noturno)", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Medicina Veterinária (noturno).", imagem: "imagem-medicina-veterinaria.jpg", link: "link-medicina-veterinaria.html" },
        { nome: "Nutrição", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Nutrição.", imagem: "imagem-nutricao.jpg", link: "link-nutricao.html" },
        { nome: "Pedagogia", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Pedagogia.", imagem: "imagem-pedagogia.jpg", link: "link-pedagogia.html" },
        { nome: "Pedagogia EAD", tipodegraduacao: ["Bacharelado"], tags: ["ead", "educação"], descricao: "Descrição do curso de Pedagogia EAD.", imagem: "imagem-pedagogia-ead.jpg", link: "link-pedagogia-ead.html" },
        { nome: "Psicologia", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Psicologia.", imagem: "imagem-psicologia.jpg", link: "link-psicologia.html" },
        { nome: "Sistemas de Informação", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Sistemas de Informação.", imagem: "imagem-sistemas-informacao.jpg", link: "link-sistemas-informacao.html" },
        { nome: "Recursos Humanos", tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Recursos Humanos.", imagem: "imagem-recursos-humanos.jpg", link: "link-recursos-humanos.html" },
        { nome: "Recursos Humanos EAD", tipodegraduacao: ["Bacharelado"], tags: ["ead", "educação"], descricao: "Descrição do curso de Recursos Humanos EAD.", imagem: "imagem-recursos-humanos-ead.jpg", link: "link-recursos-humanos-ead.html" },
        { nome: "Pós Marketing", tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "educação"], descricao: "Descrição do curso de Pós Marketing.", imagem: "imagem-pos-marketing.jpg", link: "link-pos-marketing.html" },
        { nome: "Pós Equina", tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "saúde"], descricao: "Descrição do curso de Pós Equina.", imagem: "imagem-pos-equina.jpg", link: "link-pos-equina.html" },
        { nome: "Pós Neuro", tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "saúde"], descricao: "Descrição do curso de Pós Neuro.", imagem: "imagem-pos-neuro.jpg", link: "link-pos-neuro.html" },
        { nome: "Pós PsicoEscolar", tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "educação"], descricao: "Descrição do curso de Pós PsicoEscolar.", imagem: "imagem-pos-psicoescolar.jpg", link: "link-pos-psicoescolar.html" },
        { nome: "Pós MBAFinanças", tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "exatas"], descricao: "Descrição do curso de Pós MBAFinanças.", imagem: "imagem-pos-mbafinancas.jpg", link: "link-pos-mbafinancas.html" },
        { nome: "Pós EstraFiscal", tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "exatas"], descricao: "Descrição do curso de Pós EstraFiscal.", imagem: "imagem-pos-estrafiscal.jpg", link: "link-pos-estrafiscal.html" }
    ];
    
    function generateTagHTML(tags) {
        return tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
    }
    

    const cardsContainer = document.getElementById('cards');

    cursos.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-tags', curso.tags.join(',')); // Adiciona as tags ao card
        card.setAttribute('data-valor', curso.valor); // Adicione o valor do curso aqui


        card.innerHTML = `
            <h3>${curso.nome}</h3>
            <h5>${curso.tipodegraduacao}</h5>
            <img src="${curso.imagem}" alt="Imagem do curso ${curso.nome}" />
            <p>${curso.descricao}</p>
            <a href="${curso.link}" target="_blank">Saiba mais</a>
            <div class="tagscursosdesign">Tags: ${generateTagHTML(curso.tags)}</div>

            `;

        cardsContainer.appendChild(card);
    });


    function getCheckedValues(selector) {
        return Array.from(document.querySelectorAll(selector + ' input:checked')).map(cb => cb.value);
    }
    

    function filterCards() {
        const cursoFilter = getCheckedValues('#filter-curso');
        const areaFilter = getCheckedValues('#filter-tipograduacao');
        const semestreFilter = getCheckedValues('#filter-semestres');
    
        // Combine todas as tags selecionadas
        const allSelectedFilters = [...cursoFilter, ...areaFilter, ...semestreFilter];
    
        document.querySelectorAll('#cards .card').forEach(card => {
            const tags = card.getAttribute('data-tags').split(',');
            const tagElements = card.querySelectorAll('.tag');
    
            tagElements.forEach(tagEl => {
                if (allSelectedFilters.includes(tagEl.textContent)) {
                    tagEl.classList.add('selected-tag');
                } else {
                    tagEl.classList.remove('selected-tag');
                }
            });
    
            const isCursoMatched = !cursoFilter.length || cursoFilter.some(f => tags.includes(f));
            const isAreaMatched = !areaFilter.length || areaFilter.some(f => tags.includes(f));
            const isSemestreMatched = !semestreFilter.length || semestreFilter.some(f => tags.includes(f));
    
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

