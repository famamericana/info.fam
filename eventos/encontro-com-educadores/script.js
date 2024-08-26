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


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


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
    if (n > slides.length) { slideIndex = 1 } // Volta ao primeiro slide se passar do último
    if (n < 1) { slideIndex = slides.length } // Vai para o último slide se for menor que 1
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Esconde todos os slides
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activetimeline-dot", "");
    }
    slides[slideIndex - 1].style.display = "block"; // Mostra o slide atual
    dots[slideIndex - 1].className += " activetimeline-dot"; // Ativa o dot correspondente
}

let timeoutId = setTimeout(function autoSlide() {
    plusSlides(1); // Muda para o próximo slide
    timeoutId = setTimeout(autoSlide, 3000); // Define o intervalo para mudar slides automaticamente
}, 3000);

const slider = document.querySelector(".slider");
slider.addEventListener("mouseover", () => {
    clearTimeout(timeoutId); // Pausa a mudança automática ao passar o mouse
});

slider.addEventListener("mouseout", () => {
    timeoutId = setTimeout(function autoSlide() {
        plusSlides(1); // Continua a mudança automática após tirar o mouse
        timeoutId = setTimeout(autoSlide, 3000);
    }, 3000);
});

function moveSlide(n) {
    currentSlide(n); // Move para o slide escolhido
    resetAndStartSlideShow(); // Reseta e reinicia o slideshow
}
