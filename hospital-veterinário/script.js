// Função para verificar e aplicar o modo escuro automaticamente com base nas configurações do sistema
function checkDarkModePreference() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }
}

// Função para alternar manualmente entre os modos claro e escuro
function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    // Salvar a escolha da pessoa no armazenamento local
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// Event listener para o botão de alternar modo
document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);

// Verificar a preferência do usuário ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    const savedPreference = localStorage.getItem("darkMode");
    if (savedPreference === "enabled") {
        document.body.classList.add("dark-mode");
    } else if (savedPreference === "disabled") {
        document.body.classList.remove("dark-mode");
    } else {
        checkDarkModePreference(); // Verificar se o sistema está em modo escuro
    }
});


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const svgContainer = document.getElementById('svg-container');
    const svgFilePaths = ['images/bg/patinha_gatocachorro1.svg', 'images/bg/patinha_gatocachorro2.svg', 'images/bg/patinha_gatocachorro3.svg', 'images/bg/patinha_gatocachorro4.svg', "images/bg/patinha_touro1.svg", "images/bg/patinha_touro2.svg" , "images/bg/patinha_galinha1.svg", "images/bg/patinha_galinha2.svg"]; // Array com os caminhos dos SVGs
    const numSVGs = 20; // Número de SVGs a serem distribuídos aleatoriamente
    const margin = 50; // Margem mínima entre os SVGs

    function createSVGs() {
        const placedSVGs = []; // Array para armazenar as posições e tamanhos dos SVGs já colocados

        // Limpar SVGs existentes
        while (svgContainer.firstChild) {
            svgContainer.removeChild(svgContainer.firstChild);
        }

        const pageWidth = Math.max(document.documentElement.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth);
        const pageHeight = Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
       
        svgContainer.style.width = `${pageWidth}px`;
        svgContainer.style.height = `${pageHeight}px`;

        for (let i = 0; i < numSVGs; i++) {
            const img = document.createElement('img');
            const randomIndex = Math.floor(Math.random() * svgFilePaths.length);
            img.src = svgFilePaths[randomIndex];
            img.className = 'svg-pattern';

            let size, posX, posY, overlap;
            do {
                overlap = false;
                // Tamanho aleatório
                size = Math.random() * 200 + 100; // Tamanho entre 50 e 150px
                img.style.width = `${size}px`;
                img.style.height = `${size}px`;

                // Posição aleatória baseada no tamanho da página
                posX = Math.random() * (pageWidth - size - margin * 2) + margin;
                posY = Math.random() * (pageHeight - size - margin * 2) + margin;

               // Verificação de colisão com margem
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

            img.style.left = `${posX}px`;
            img.style.top = `${posY}px`;

            // Adicionar a posição e tamanho do SVG atual ao array
            placedSVGs.push({ x: posX, y: posY, size: size });

            svgContainer.appendChild(img);
        }
    }

    createSVGs();

    // Adicionar listener para redimensionamento
    window.addEventListener('resize', function () {
        createSVGs();
    });
});



// NAVBAR ----------------------------------------------------------------------------------------------------------------------------------------------------

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.famosanavbar');
    if (window.pageYOffset > 90) {
        navbar.classList.add('famosanavbar_fixed-navbar');
    } else {
        navbar.classList.remove('famosanavbar_fixed-navbar');
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
        progress.style.animation = "progressBar 3s linear forwards";
    }, 100);
}

function autoSlide() {
    plusSlides(1);
    startProgress();
    progressTimer = setTimeout(autoSlide, 3000);
}

timeoutId = setTimeout(autoSlide, 3000);

const slider = document.querySelector(".slider");
slider.addEventListener("mouseover", () => {
    clearTimeout(timeoutId);
    resetProgress();
});

slider.addEventListener("mouseout", () => {
    resetProgress(); // Resetar a barra de progresso
    startProgress(); // Iniciar a animação novamente
    timeoutId = setTimeout(autoSlide, 3000);
});

function moveSlide(n) {
    currentSlide(n);
    clearTimeout(timeoutId);
    resetProgress();
    timeoutId = setTimeout(autoSlide, 3000);
}
