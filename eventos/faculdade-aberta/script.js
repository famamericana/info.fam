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


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// card começar com um virado ----------------------------------------------------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os cards, exceto o da div5
    const cards = document.querySelectorAll('.myCard:not(.flipped)');
    const flippedCard = document.querySelector('.div4 .myCard');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Remove a classe 'flipped' da div5 quando o mouse passar sobre outro card
            flippedCard.classList.remove('flipped');
        });
    });
});



// slider text -----------------------------------------------------------------------------------------------------------------------------------------------------
let slideIndex = 1; // Inicializa o índice do slide como 1
showSlides(slideIndex); // Mostra o primeiro slide

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { 
        slideIndex = 1; // Volta ao primeiro slide se passar do último
    }
    if (n < 1) { 
        slideIndex = slides.length; // Vai para o último slide se for menor que 1
    }

    // Remove a classe "active" de todos os slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active"); // Remove a classe active
    }

    // Remove a classe "activetimeline-dot" de todos os dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("activetimeline-dot"); // Remove a classe active do dot
    }

    // Adiciona a classe "active" ao slide atual
    slides[slideIndex - 1].classList.add("active");

    // Adiciona a classe "activetimeline-dot" ao dot correspondente
    dots[slideIndex - 1].classList.add("activetimeline-dot");
}

let timeoutId = setTimeout(function autoSlide() {
    plusSlides(1); // Muda para o próximo slide
    timeoutId = setTimeout(autoSlide, 5000); // Define o intervalo para mudar slides automaticamente
}, 5000);

const slider = document.querySelector(".slider");
slider.addEventListener("mouseover", () => {
    clearTimeout(timeoutId); // Pausa a mudança automática ao passar o mouse
});

slider.addEventListener("mouseout", () => {
    timeoutId = setTimeout(function autoSlide() {
        plusSlides(1); // Continua a mudança automática após tirar o mouse
        timeoutId = setTimeout(autoSlide, 5000);
    }, 5000);
});

function moveSlide(n) {
    currentSlide(n); // Move para o slide escolhido
    resetAndStartSlideShow(); // Reseta e reinicia o slideshow
}
