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

// cookies ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const cookieBox = document.querySelector(".wrapper"),
    buttons = document.querySelectorAll(".button");

const executeCodes = () => {
    //if cookie contains codinglab it will be returned and below of this code will not run
    if (document.cookie.includes("codinglab")) return;
    cookieBox.classList.add("show");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            cookieBox.classList.remove("show");

            // Se o botão tiver o id "acceptBtn"
            if (button.id == "acceptBtn") {
                // Cria uma data de expiração para 2 anos a partir da data atual
                var date = new Date();
                date.setTime(date.getTime() + (2 * 365 * 24 * 60 * 60 * 1000)); // 2 anos em milissegundos
                var expires = "; expires=" + date.toUTCString();
                // Define o cookie com a data de expiração
                document.cookie = "cookieBy=codinglab" + expires + "; path=/";
            }

        });
    });
};

//executeCodes function will be called on webpage load
window.addEventListener("load", executeCodes);


/// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    $("#Navbar").load("/hospital-veterinario/codigos/navbar/navbar.html");
});

$(document).ready(function () {
    $("#Footer").load("/hospital-veterinario/codigos/footer/footer.html");
});


// blog ---------------------------------------------------------------------------------------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
    const comecodotextoElements = document.querySelectorAll('.comecodotexto');

    comecodotextoElements.forEach(comecodotexto => {
        const infosblog = comecodotexto.closest('.infosblog');

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const paddingRight = 20; // Ajuste esse valor conforme necessário
                comecodotexto.style.width = `${entry.contentRect.width - paddingRight}px`;
            }
        });

        resizeObserver.observe(infosblog);
    });
});
