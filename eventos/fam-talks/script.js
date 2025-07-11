$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar-fam/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});

// Animações de scroll
$(document).ready(function() {
    // Função para verificar se um elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Função alternativa para detectar quando elemento está parcialmente visível
    function isElementPartiallyVisible(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (
            rect.top < windowHeight * 0.8 && rect.bottom > 0
        );
    }

    // Função para adicionar animação aos elementos
    function animateElements() {
        $('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in').each(function() {
            if (isElementPartiallyVisible(this) && !$(this).hasClass('animate')) {
                $(this).addClass('animate');
            }
        });
    }

    // Executar animação quando a página carrega
    animateElements();

    // Executar animação durante o scroll
    $(window).on('scroll', function() {
        animateElements();
    });

    // Executar animação quando a janela é redimensionada
    $(window).on('resize', function() {
        animateElements();
    });
});

//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

