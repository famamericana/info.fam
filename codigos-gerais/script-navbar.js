$(document).ready(function () {
    var navbarHtml = `
        <div class="famosanavbar">
            <nav class="barrafundo">
                <div class="barra-navegacao">
                    <a href="https://info.fam.br">
                        <div class="imagem-logo"></div>
                    </a>
                    <ul class="lista-links">
                        <li><a href="/">Início</a></li>
                        <li class="item-dropdown" id="itemnavbarDropdown">
                            <a href="">Diversos</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="agoravai conteudo-dropdown">
                <div class="flex">
                    <div class="lado-esquerdo-dropdown">
                        <!-- Links adicionais -->
                        <h2>Informações</h2>
                        <a href="https://www.fam.br/blog/">Blog FAM</a>
                        <a href="https://info.fam.br/calendario-academico">Calendário Acadêmico</a>
                        <a href="https://info.fam.br/calendario-de-eventos">Calendário de Eventos</a>
                        <a href="https://info.fam.br/eventos/semana-de-areas/">Semana de Áreas</a>
                    </div>
                    <div class="lado-direito-dropdown">
                        <div class="novidades-container">
                            <!-- Os itens 'new' serão inseridos aqui automaticamente -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    // Inserindo o HTML do navbar na página
    $("#Navbar").html(navbarHtml).show();

    // Chama a função setupDropdown após o conteúdo ser carregado
    setupDropdown();

    // Adiciona o código para pegar automaticamente as informações
    updateNewItems();
});

function setupDropdown() {
    var dropdown = document.getElementById('itemnavbarDropdown');
    var dropdownContent = document.querySelector('.agoravai');
    var timeoutId;

    // Mostra o conteúdo quando passar o mouse ou clicar
    dropdown.addEventListener('mouseover', function () {
        clearTimeout(timeoutId);
        dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('click', function () {
        dropdownContent.style.display = (dropdownContent.style.display === 'none' ? 'block' : 'none');
    });

    // Função para esconder o dropdown com atraso
    function hideDropdown() {
        timeoutId = setTimeout(function () {
            dropdownContent.style.display = 'none';
        }, 300);
    }

    // Esconde o conteúdo quando o mouse sair da área
    dropdown.addEventListener('mouseleave', hideDropdown);
    dropdownContent.addEventListener('mouseleave', hideDropdown);

    // Cancela o esconder se o mouse entrar novamente
    dropdownContent.addEventListener('mouseenter', function () {
        clearTimeout(timeoutId);
    });
}


function updateNewItems() {
    const newItemsContainer = document.querySelector('.novidades-container');
    const newItems = JSON.parse(localStorage.getItem('newItems')) || [];

    // Verifica se há itens no localStorage
    if (newItems.length === 0) {
        newItemsContainer.innerHTML = "<a class='fofo' href='https://info.fam.br'><i class='fa-regular fa-star'></i></a>";
    }

    // Ordenar os itens pelo número de likes em ordem decrescente
    newItems.sort((a, b) => b.likes - a.likes);

    // Limitar o número de itens a 3
    const maxItems = 3;
    let itemCount = 0;

    // Limpar o container antes de adicionar novos itens
    newItemsContainer.innerHTML = '';

    // Gera os elementos com base nos dados armazenados
    newItems.forEach(item => {
        if (itemCount < maxItems) { // Adiciona o item até o limite de 3
            const newItemElement = document.createElement('div');
            newItemElement.classList.add('grid-item');

            newItemElement.innerHTML = `
        <div class="imagem-com-texto">
            <a target="_blank" href="${item.href}">
                <img src="${item.imageSrc}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </a>
        </div>
        `;
            newItemsContainer.appendChild(newItemElement);
            itemCount++; // Incrementa o contador de itens
        }
    });
}

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.famosanavbar');
    if (window.pageYOffset > 140) {
        navbar.classList.add('famosanavbar_fixed-navbar');
    } else {
        navbar.classList.remove('famosanavbar_fixed-navbar');
    }
});