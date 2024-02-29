$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer-invertido/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});

//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

//slideshow----------------------------------------------------------------------------


$(document).ready(function () {
    $(".arrow").click(function () {
        let direction = $(this).data('direction');

        // Pegando o slide atual visível
        let currentSlide = $(this).closest('.slideshow-item');

        // Pegando todos os slides
        let slides = $('.slideshow-item');

        // Encontrando o índice do slide atual
        let currentIndex = slides.index(currentSlide);

        // Calculando o próximo índice
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % slides.length;
        } else {
            nextIndex = (currentIndex - 1 + slides.length) % slides.length;
        }

        // Removendo a classe 'visible' do slide atual
        currentSlide.removeClass('visible');

        // Adicionando a classe 'visible' ao próximo slide
        slides.eq(nextIndex).addClass('visible');
    });
});


// -----------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', (event) => {
    const logoItems = document.querySelectorAll('.logo-item');

    function showDescription(e) {
        // Esconde todas as descrições abertas
        document.querySelectorAll('.logo-description').forEach(desc => {
            desc.style.display = 'none';
        });

        // Seleciona a descrição do item clicado
        const description = e.currentTarget.querySelector('.logo-description');
        description.style.display = 'block';

        // Calcula a posição do logo e ajusta a descrição se necessário
        const logoRect = e.currentTarget.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const descriptionWidth = 300; // Largura fixa da descrição

        if (screenWidth < 550){
            if (logoRect.right + descriptionWidth > screenWidth) {
                // Centraliza a descrição na tela para telas menores que 400px
                description.style.position = 'fixed'; // Usa posicionamento fixo para centralizar na tela
                description.style.left = '50%';
                description.style.transform = 'translateX(-50%)'; // Ajusta precisamente ao centro no eixo X
                description.style.right = 'initial';
                description.style.top = `calc(${logoRect.top}px + 105px)`; // Define o topo da descrição para ser o mesmo que o topo do logo
            }
        } else if (screenWidth < 1080) {
            if (logoRect.right + descriptionWidth > screenWidth) {
                description.style.right = '0px';
                description.style.left = `calc(-100% + 18px)`; 
            } 
        } else {
            // Posição padrão
            description.style.position = 'absolute'; // Retorna ao posicionamento absoluto ou original
            description.style.left = 'initial';
            description.style.transform = 'initial';
            description.style.right = 'initial';
        }

        // Impede que o evento se propague
        e.stopPropagation();

    }

    logoItems.forEach(item => {
        item.addEventListener('click', showDescription);
    });

    document.addEventListener('click', (e) => {
        document.querySelectorAll('.logo-description').forEach(desc => {
            desc.style.display = 'none';
        });
    });

    window.addEventListener('scroll', (e) => {
        document.querySelectorAll('.logo-description').forEach(desc => {
            desc.style.display = 'none';
        });
    }, { passive: true });
});
