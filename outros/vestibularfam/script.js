$(document).ready(function () {
    $("#meuFooter").load("footer/footer.html");
    
    // Verificar a data para controlar os botões de inscrição
    checkInscriptionButtons();
});

// Função para verificar a data e ativar os botões de inscrição quando apropriado
function checkInscriptionButtons() {
    const targetDate = new Date("2025-05-05T07:00:00-03:00"); // 5 de maio de 2025, 7h da manhã horário de Brasília
    const currentDate = new Date();
    
    // Se a data atual for igual ou posterior à data alvo
    if (currentDate >= targetDate) {
        ativarBotoesInscricao();
    }
}

// Função para ativar os botões de inscrição
function ativarBotoesInscricao() {
    // Vestibular
    $("#vestibular .btn2").replaceWith('<a href="http://fam.inscricao.crmeducacional.com/login/50"><button class="btn2">Vestibular | Inscreva-se</button></a>');
    
    // ENEM
    $("#enem .btn2").replaceWith('<a href="http://fam.inscricao.crmeducacional.com/login/51"><button class="btn2">Enem | Inscreva-se</button></a>');
    
    // 2° Graduação
    $("#segunda-graduacao .btn2").replaceWith('<a href="http://fam.inscricao.crmeducacional.com/login/52"><button class="btn2">2° Graduação | Inscreva-se</button></a>');
    
    // Transferência
    $("#transferencia .btn2").replaceWith('<a href="http://fam.inscricao.crmeducacional.com/login/53"><button class="btn2">Transferência | Inscreva-se</button></a>');
    
    // Extensão
    $("#extensao .btn2").replaceWith('<a href="http://fam.inscricao.crmeducacional.com/login/40"><button class="btn2">Extensão | Inscreva-se</button></a>');
    
    // Nota: Não modificamos o botão de pós-graduação pois ele já está sempre ativo
}

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
    
    // Check if slides and dots exist before proceeding
    if (!slides || slides.length === 0 || !dots || dots.length === 0) {
        return; // Exit the function if elements don't exist
    }
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    // Check if the current slide exists before accessing
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active-dot";
        }
        startProgress();
    }
}

let timeoutId;
let progressTimer;

function resetProgress() {
    clearTimeout(progressTimer);
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        progressBar.innerHTML = "";
    }
}

function startProgress() {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        progressBar.innerHTML = "<div class='progress'></div>";
        setTimeout(() => {
            const progress = document.querySelector(".progress");
            if (progress) {
                progress.style.animation = "progressBar 10s linear forwards";
            }
        }, 100);
    }
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
if (slider) {
    slider.addEventListener("mouseover", () => {
        clearTimeout(timeoutId);
        resetProgress();
    });

    slider.addEventListener("mouseout", () => {
        resetProgress(); // Resetar a barra de progresso
        startProgress(); // Iniciar a animação novamente
        timeoutId = setTimeout(autoSlide, 10000);
    });
}

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

    // Check if both slides exist before changing their sources
    if (slide1 && slide2) {
        if (window.innerWidth < 600) {
            slide1.src = "images/KV_Vestibular 2025.1_Inverno_feed.png"; // Altere para a imagem desejada
            slide2.src = "images/Transferencia_patrocinado.png";
        } else {
            slide1.src = "images/Vestibular2025_Inverno_Banner_VestibularFam_960x300.png";
            slide2.src = "images/Transferencia_banner_960x300.png";
        }
    }
}

// Chama a função ao carregar a página e ao redimensionar a tela
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);
