document.addEventListener('DOMContentLoaded', function() {
    // Inicializa as funções da navbar primeiro para garantir que o menu esteja pronto
    handleNavbarScroll();
    setupMobileMenu();
    
    const bolas = document.querySelectorAll('.bola');
    // Posição original/padrão de cada bola
    const posOriginal = [];
    bolas.forEach((bola) => {
        const computedStyle = window.getComputedStyle(bola);
        posOriginal.push({
            transform: computedStyle.transform === 'none' ? '' : computedStyle.transform
        });
    });
    
    // Efeito de paralaxe para as bolas quando o mouse se move
    document.addEventListener('mousemove', function(e) {
        // Posição relativa do mouse na tela (valores entre 0 e 1)
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        bolas.forEach((bola, index) => {
            // Fator de movimento diferente para cada bola (quanto maior o índice, mais lento o movimento)
            const fatorMovimento = 15 / (index + 1);
            
            // Mover a bola com base na posição do mouse
            const moveX = (mouseX - 0.5) * fatorMovimento * 20;
            const moveY = (mouseY - 0.5) * fatorMovimento * 20;
            
            // Aplicar transformação adicional, preservando a animação CSS
            bola.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + mouseX * 0.05})`;
        });
    });
    
    // Paralaxe no scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        bolas.forEach((bola, index) => {
            // Velocidade de paralaxe diferente para cada bola
            const scrollSpeed = 0.05 * (index % 4 + 1);
            const yOffset = scrollTop * scrollSpeed;
            
            // Aplicar transformação de scroll
            bola.style.transform = `translateY(${yOffset}px)`;
        });
    });
    
    // Log para diagnóstico
    console.log('Script inicializado');
});

// Navbar scroll effect function
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Mobile menu toggle function
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Log para diagnóstico
    console.log('Menu toggle element:', menuToggle);
    console.log('Nav menu element:', navMenu);
    
    if (menuToggle && navMenu) {
        // Garantir que o evento de clique é adicionado corretamente
        menuToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Evita que o evento se propague para o documento
            console.log('Menu toggle clicked');
            
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Menu active state:', navMenu.classList.contains('active'));
            
            // Adiciona/remove o bloqueio de rolagem quando o menu está aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Keyboard accessibility - allow activation with Enter and Space
        menuToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                menuToggle.click();
            }
        });
    } else {
        console.error('Menu elements not found');
    }
    
    // Não fechar o menu quando clicar dentro do menu
    if (navMenu) {
        navMenu.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
    
    // Fechar o menu quando clicar fora
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('#menu-toggle') && 
            !event.target.closest('#nav-menu')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fechar o menu quando clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar o menu quando redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

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
            slide1.src = "images/Vestibular-2025.2_Inverno_Banner_VestibularFam_1080x800_mobile.png"; // Altere para a imagem desejada
            slide2.src = "images/Pós_Graduação_2024_1080x800.png";
        } else {
            slide1.src = "images/Vestibular2025_Inverno_Banner_VestibularFam_960x300.png";
            slide2.src = "images/Pós_Graduação_2024_960x300.png";
        }
    }
}

// Chama a função ao carregar a página e ao redimensionar a tela
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);
