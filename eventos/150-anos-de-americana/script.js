// header ----------------------------------------------------------------------------------------------------------------------------------------------

function toggleAccordion(index) {
    const tabs = document.querySelectorAll('.accordion .tab .content');
    const currentTab = tabs[index];

    if (currentTab.style.display === 'block') {
        currentTab.style.display = 'none';
    } else {
        for (let tab of tabs) {
            tab.style.display = 'none';
        }
        currentTab.style.display = 'block';
    }
}

// classico fam -----------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

$(document).ready(function () {
    $("#BotaoTopo").load("/codigos-gerais/voltartopo/voltartopo.html");
});


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}



// galeria -------------------------------------------------------------------------------------------------------------------------------

document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', function () {
        var src = this.src;
        var alt = this.alt;
        document.getElementById('popup-img').src = src;
        document.getElementById('popup-overlay').style.display = 'flex';
    });
});

function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
}

// Adiciona o evento de clique ao popup-overlay
document.getElementById('popup-overlay').addEventListener('click', function (event) {
    // Verifica se o clique foi no popup-overlay e não em seus filhos
    if (event.target === this) {
        closePopup();
    }
});

// menu mobile ---------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os links dentro do <nav>
    var links = document.querySelectorAll('nav ul li a');

    // Adiciona um event listener para cada link
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            // Desmarca o checkbox
            document.getElementById('check').checked = false;
        });
    });
});

//---------------------------------------------------------------
var navbar = document.querySelector('nav');
var navhumburguer = document.querySelector('.checkbtn');

function updateNavbar() {
   

    if (window.innerWidth > 858) {
        if (window.scrollY > window.innerHeight - 100) {
            navbar.classList.add('famosanavbar_color');
        } else {
            navbar.classList.remove('famosanavbar_color');
        }
    } else {
        if (window.scrollY > window.innerHeight - 100) {
            navhumburguer.classList.add('checkbtn_color');
            navbar.classList.remove('famosanavbar_color');
        } else {
            navhumburguer.classList.remove('checkbtn_color');
            navbar.classList.remove('famosanavbar_color');
        }
    }
}

// Listener para rolagem da página
window.addEventListener('scroll', updateNavbar);

// Listener para redimensionamento da janela
window.addEventListener('resize', updateNavbar);

// Executar ao carregar a página
document.addEventListener("DOMContentLoaded", updateNavbar);

// Slideshow de Personalidades -------------------------------------------------------------------------------------------------------------------------------

let currentSlideIndex = 0;
let slides, indicators;
let autoSlideInterval;

function initializeSlideshow() {
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
    
    if (slides.length > 0) {
        // Força o primeiro slide a ser visível
        slides[0].style.opacity = '1';
        slides[0].style.visibility = 'visible';
        slides[0].classList.add('active');
        
        if (indicators[0]) {
            indicators[0].classList.add('active');
        }
        
        startAutoSlide();
    }
}

function showSlide(index) {
    if (!slides || !indicators) return;
    
    // Remove a classe active de todos os slides e indicadores
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        
        if (indicators[i]) {
            indicators[i].classList.remove('active');
        }
    });
    
    // Adiciona a classe active ao slide e indicador atuais
    if (slides[index]) {
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.visibility = 'visible';
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
    restartAutoSlide();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    restartAutoSlide();
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 8000);
}

function restartAutoSlide() {
    startAutoSlide();
}

// Inicializar o slideshow quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    // Aguardar um pouco para garantir que o DOM está completamente carregado
    setTimeout(initializeSlideshow, 100);
});