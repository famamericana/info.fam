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
let slides;
let autoSlideInterval;

function initializeSlideshow() {
    // only target slides inside the personalidades slider to avoid touching other elements
    const container = document.querySelector('.pers-slider');
    slides = container ? container.querySelectorAll('.pers-slide') : document.querySelectorAll('.pers-slide');
    
    if (slides.length > 0) {
        // Sanitize slides: add placeholder image/title if missing, add image onerror handler
        slides.forEach((slide, i) => {
            // ensure slide-image wrapper
            let wrapper = slide.querySelector('.pers-slide-image');
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.className = 'pers-slide-image';
                slide.querySelector('.pers-slide-content')?.prepend(wrapper);
            }

            let img = wrapper.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                img.src = 'https://via.placeholder.com/250x320/cccccc/333?text=Sem+imagem';
                img.alt = 'Imagem não disponível';
                wrapper.appendChild(img);
            }

            // fallback when image fails to load
            img.onerror = function () {
                this.onerror = null;
                this.src = 'https://via.placeholder.com/250x320/cccccc/333?text=Sem+imagem';
                this.alt = 'Imagem não disponível';
            };

            // ensure there is a title
            let text = slide.querySelector('.pers-slide-text');
            if (!text) {
                text = document.createElement('div');
                text.className = 'pers-slide-text';
                slide.appendChild(text);
            }
            if (!text.querySelector('h3')) {
                const h = document.createElement('h3');
                h.textContent = 'Informação indisponível';
                text.prepend(h);
            }
        });

    // Força o primeiro slide a ser visível
    slides[0].style.opacity = '1';
    slides[0].style.visibility = 'visible';
    slides[0].classList.add('active');

    // update counter
    const counter = document.getElementById('slide-counter');
    if (counter) counter.textContent = `1/${slides.length}`;

    startAutoSlide();
    }
}

function showSlide(index) {
    if (!slides) return;

    // normalize index
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    // Remove a classe active de todos os slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.display = 'none';
        slide.style.zIndex = '1';
    });

    // Adiciona a classe active ao slide atual
    const s = slides[index];
    if (s) {
        s.classList.add('active');
        s.style.display = 'block';
        s.style.opacity = '1';
        s.style.visibility = 'visible';
        s.style.zIndex = '2';
    }
    // update counter
    const counterEl = document.getElementById('slide-counter');
    if (counterEl) counterEl.textContent = `${index + 1}/${slides.length}`;
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

// indicators removed — navigation via prev/next only

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