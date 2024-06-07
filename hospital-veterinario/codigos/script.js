// Função para verificar e aplicar o modo escuro automaticamente com base nas configurações do sistema
function checkDarkModePreference() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        updateDarkModeIcon(true);
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        updateDarkModeIcon(false);
    }
}

// Função para alternar manualmente entre os modos claro e escuro
function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    // Salvar a escolha da pessoa no armazenamento local
    const darkModeEnabled = element.classList.contains("dark-mode");
    if (darkModeEnabled) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
    updateDarkModeIcon(darkModeEnabled);
}

// Função para atualizar o ícone do botão
function updateDarkModeIcon(isDarkMode) {
    const icon = document.getElementById("darkModeIcon");
    if (isDarkMode) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
}

// Event listener para o botão de alternar modo
document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);

// Verificar a preferência do usuário ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    const savedPreference = localStorage.getItem("darkMode");
    if (savedPreference === "enabled") {
        document.body.classList.add("dark-mode");
        updateDarkModeIcon(true);
    } else if (savedPreference === "disabled") {
        document.body.classList.remove("dark-mode");
        updateDarkModeIcon(false);
    } else {
        checkDarkModePreference(); // Verificar se o sistema está em modo escuro
    }
});


// SVG ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const svgContainer = document.getElementById('svg-container');
    const svgFilePaths = [
        'images/bg/patinha_gatocachorro1.svg',
        'images/bg/patinha_gatocachorro2.svg',
        'images/bg/patinha_gatocachorro3.svg',
        'images/bg/patinha_gatocachorro4.svg',
        "images/bg/patinha_touro1.svg",
        "images/bg/patinha_touro2.svg",
        "images/bg/patinha_galinha1.svg",
        "images/bg/patinha_galinha2.svg"
    ];
    const numSVGs = 30;
    const margin = 50;

    function setSVGContainerDimensions() {
        let pageWidth = document.body.clientWidth;
        let pageHeight = document.body.clientHeight;

        svgContainer.style.width = `${pageWidth}px`;
        svgContainer.style.height = `calc(${pageHeight}px - 100px)`;
    }

    function createSVGs() {
        const placedSVGs = [];

        while (svgContainer.firstChild) {
            svgContainer.removeChild(svgContainer.firstChild);
        }

        setSVGContainerDimensions();

        const pageWidth = svgContainer.offsetWidth;
        const pageHeight = svgContainer.offsetHeight;

        for (let i = 0; i < numSVGs; i++) {
            const img = document.createElement('img');
            const randomIndex = Math.floor(Math.random() * svgFilePaths.length);
            img.src = svgFilePaths[randomIndex];
            img.className = 'svg-pattern';

            let size, posX, posY, overlap;
            do {
                overlap = false;
                size = Math.random() * 100 + 50; // Tamanho entre 50 e 150px
                img.style.width = `${size}px`;
                img.style.height = `${size}px`;

                posX = Math.random() * (pageWidth - size - margin * 2) + margin;
                posY = Math.random() * (pageHeight - size - margin * 2) + margin;

                for (let j = 0; j < placedSVGs.length; j++) {
                    const placedSVG = placedSVGs[j];
                    if (
                        posX < placedSVG.x + placedSVG.size + margin &&
                        posX + size > placedSVG.x - margin &&
                        posY < placedSVG.y + placedSVG.size + margin &&
                        posY + size > placedSVG.y - margin
                    ) {
                        overlap = true;
                        break;
                    }
                }
            } while (overlap);

            img.style.position = 'absolute';
            img.style.left = `${posX}px`;
            img.style.top = `${posY}px`;

            placedSVGs.push({ x: posX, y: posY, size: size });

            svgContainer.appendChild(img);
        }
    }

    createSVGs();

    window.addEventListener('resize', function () {
        createSVGs();
    });
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
    $("#Navbar").load("codigos/navbar/navbar.html");
});

$(document).ready(function () {
    $("#Footer").load("codigos/footer/footer.html");
});
