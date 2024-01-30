document.addEventListener('DOMContentLoaded', function () {
    const cursos = [
        { codigogoogle: ["Administração", "Administração EAD"] , nome: "Administração",  semestres: 8, presencialead: ["Presencial | EaD -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Descrição do curso de Administração.", link: "link-administracao.html" },
        { codigogoogle: ["Biomedicina"], nome: "Biomedicina",  semestres: 8, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Biomedicina.", link: "link-biomedicina.html" },
        { codigogoogle: ["Ciência da Computação"], nome: "Ciência da Computação",   semestres: 8, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Ciência da Computação.", link: "link-ciencia-computacao.html" },
        { codigogoogle: ["Ciências Contábeis"], nome: "Ciências Contábeis",   semestres: 8, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Ciências Contábeis.", link: "link-ciencias-contabeis.html" },
        { codigogoogle: ["Comunicação Social"], nome: "Comunicação Social - Publicidade e Propaganda",  semestres: 8, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Descrição do curso de Comunicação Social.", link: "link-comunicacao-social.html" },
        { codigogoogle: ["Direito"], nome: "Direito",  semestres: 10, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "leitura"], descricao: "Descrição do curso de Direito.", link: "link-direito.html" },
        { codigogoogle: ["Design Gráfico"], nome: "Design Gráfico",  semestres: 4, presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas"], descricao: "Descrição do curso de Design.", link: "link-direito.html" },
        { codigogoogle: ["Educação Física"], nome: "Educação Física",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Educação Física.", link: "link-educacao-fisica.html" },
        { codigogoogle: ["Educação Física"], nome: "Educação Física",  presencialead: ["Presencial -"], tipodegraduacao: ["Licenciatura"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Educação Física.", link: "link-educacao-fisica.html" },
        { codigogoogle: [""], nome: "Enfermagem",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Enfermagem.", link: "link-enfermagem.html" },
        { codigogoogle: [""], nome: "Engenharia Civil",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas", "contas"], descricao: "Descrição do curso de Engenharia Civil.", link: "link-engenharia-civil.html" },
        { codigogoogle: [""], nome: "Engenharia de Produção",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia de Produção.", link: "link-engenharia-producao.html" },
        { codigogoogle: [""], nome: "Engenharia Elétrica",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Elétrica.", link: "link-engenharia-eletrica.html" },
        { codigogoogle: [""], nome: "Engenharia Mecânica",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Mecânica.", link: "link-engenharia-mecanica.html" },
        { codigogoogle: [""], nome: "Engenharia Química",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Engenharia Química.", link: "link-engenharia-quimica.html" },
        { codigogoogle: [""], nome: "Farmácia",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Farmácia.", link: "link-farmacia.html" },
        { codigogoogle: [""], nome: "Fisioterapia",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Fisioterapia.", link: "link-fisioterapia.html" },
        { codigogoogle: [""], nome: "Letras",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "humanas", "leitura"], descricao: "Descrição do curso de Letras.", link: "link-letras.html" },
        { codigogoogle: [""], nome: "Medicina Veterinária (matutino)",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Medicina Veterinária (matutino).", link: "link-medicina-veterinaria.html" },
        { codigogoogle: [""], nome: "Medicina Veterinária (noturno)",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Medicina Veterinária (noturno).", link: "link-medicina-veterinaria.html" },
        { codigogoogle: [""], nome: "Nutrição",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Nutrição.", link: "link-nutricao.html" },
        { codigogoogle: [""], nome: "Pedagogia",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Pedagogia.", link: "link-pedagogia.html" },
        { codigogoogle: [""], nome: "Pedagogia EAD",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["ead", "educação"], descricao: "Descrição do curso de Pedagogia EAD.", link: "link-pedagogia-ead.html" },
        { codigogoogle: [""], nome: "Psicologia",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "saúde"], descricao: "Descrição do curso de Psicologia.", link: "link-psicologia.html" },
        { codigogoogle: [""], nome: "Sistemas de Informação",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "exatas"], descricao: "Descrição do curso de Sistemas de Informação.", link: "link-sistemas-informacao.html" },
        { codigogoogle: [""], nome: "Recursos Humanos",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["graduação", "educação"], descricao: "Descrição do curso de Recursos Humanos.", link: "link-recursos-humanos.html" },
        { codigogoogle: [""], nome: "Recursos Humanos EAD",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["ead", "educação"], descricao: "Descrição do curso de Recursos Humanos EAD.", link: "link-recursos-humanos-ead.html" },
        { codigogoogle: [""], nome: "Pós Marketing",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "educação"], descricao: "Descrição do curso de Pós Marketing.", link: "link-pos-marketing.html" },
        { codigogoogle: [""], nome: "Pós Equina",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "saúde"], descricao: "Descrição do curso de Pós Equina.", link: "link-pos-equina.html" },
        { codigogoogle: [""], nome: "Pós Neuro",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "saúde"], descricao: "Descrição do curso de Pós Neuro.", link: "link-pos-neuro.html" },
        { codigogoogle: [""], nome: "Pós PsicoEscolar",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "educação"], descricao: "Descrição do curso de Pós PsicoEscolar.", link: "link-pos-psicoescolar.html" },
        { codigogoogle: [""], nome: "Pós MBAFinanças",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "exatas"], descricao: "Descrição do curso de Pós MBAFinanças.", link: "link-pos-mbafinancas.html" },
        { codigogoogle: [""], nome: "Pós EstraFiscal",  presencialead: ["Presencial -"], tipodegraduacao: ["Bacharelado"], tags: ["pos-graduação", "exatas"], descricao: "Descrição do curso de Pós EstraFiscal.", link: "link-pos-estrafiscal.html" }
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
        card.setAttribute('data-codigogoogle', curso.codigogoogle.join(',')); // Transforma o array em string


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




// mdsss ----------------------------------------------------------------------------------------------------------------------------------------- valores 

     // Carrega os dados do CSV
     const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vREDH7BTr9H2Um4BgNp45XYW1ybvS1qBIWACK2eElc7pmra17fwwcVBp3Um-GD6_wOF_N_FquXS1Rx9/pub?output=csv';

     Papa.parse(url, {
        download: true,
        header: true,
        complete: function(results) {
            var data = results.data;
    
            data.forEach(row => {
                document.querySelectorAll('.card').forEach(card => {
                    const codigos = card.getAttribute('data-codigogoogle').split(',');
                    if (codigos.includes(row['Cursos'])) {
                        // Cria um elemento para o valor do curso
                        let valorParagrafo = document.createElement('p');
                        valorParagrafo.className = 'valor-curso';
                        valorParagrafo.textContent = `${row['Cursos']}: ${row['Valor']}`;
    
                        // Adiciona o valor ao card
                        card.appendChild(valorParagrafo);
                    }
                });
            });
        }
    });
    
    
 });




