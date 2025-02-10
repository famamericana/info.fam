
$(document).ready(function () {
    $("#meuFooter").load("footer/footer.html");
});

/// tabs ---------------------------------------------------------------------------------------------------------------------------------------------------------------

function openTab(evt, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt) evt.currentTarget.className += " active";

    // Esconder o texto inicial
    document.getElementById("initialText").style.display = "none";
}

// Verifica se há um hash na URL ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    var hash = window.location.hash.substring(1); // Remove o '#' da string
    if (hash) {
        var element = document.getElementById(hash);
        if (element) {
            openTab(null, hash); // Chama openTab sem um evento se o hash corresponder a uma aba
            var link = document.querySelector(".tablinks[onclick*='" + hash + "']");
            if (link) {
                link.className += " active";
            }
        }
    }
});


// slider text -----------------------------------------------------------------------------------------------------------------------------------------------------
let slideIndex = 1;
showSlides(slideIndex);

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
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
    startProgress();
}

let timeoutId;
let progressTimer;

function resetProgress() {
    clearTimeout(progressTimer);
    const progressBar = document.querySelector(".progress-bar");
    progressBar.innerHTML = "";
}

function startProgress() {
    const progressBar = document.querySelector(".progress-bar");
    progressBar.innerHTML = "<div class='progress'></div>";
    setTimeout(() => {
        const progress = document.querySelector(".progress");
        progress.style.animation = "progressBar 10s linear forwards";
    }, 100);
}

function autoSlide() {
    if (!slideClicked) {
        plusSlides(1); // Avança para o próximo slide se o usuário não tiver clicado em um ponto
    }
    startProgress();
    slideClicked = false; // Reinicia slideClicked para permitir o avanço automático após 10 segundos
    clearTimeout(timeoutId); // Limpa o timeout anterior para garantir que não haja múltiplos timeouts ativos
    timeoutId = setTimeout(autoSlide, 10000);
}


timeoutId = setTimeout(autoSlide, 10000);

const slider = document.querySelector(".slider");
slider.addEventListener("mouseover", () => {
    clearTimeout(timeoutId);
    resetProgress();
});

slider.addEventListener("mouseout", () => {
    resetProgress(); // Resetar a barra de progresso
    startProgress(); // Iniciar a animação novamente
    timeoutId = setTimeout(autoSlide, 10000);
});

let slideClicked = false;

function moveSlide(n) {
    currentSlide(n);
    clearTimeout(timeoutId);
    resetProgress();
    startProgress(); // Reinicia o progresso ao mover o slide manualmente
    if (n !== slideIndex) {
        slideClicked = true; // Define slideClicked como true apenas se o slide for alterado
    }
    timeoutId = setTimeout(autoSlide, 10000);
}

// trocar img media menor --------///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkScreenSize() {
    const slide1 = document.getElementById("slide1");
    const slide2 = document.getElementById("slide2");

    if (window.innerWidth < 600) {
        slide1.src = "images/Vestibular_2025.1_1080x800.png"; // Altere para a imagem desejada
        slide2.src = "images/Pós_Graduação_2024_1080x800.png";
    } else {
        slide1.src = "images/2025960x300.png";
        slide2.src = "images/Pós_Graduação_2024_960x300.png";
    }
}

// Chama a função ao carregar a página e ao redimensionar a tela
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);
