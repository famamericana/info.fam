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
let sliderInitialized = false; // guard to avoid re-init

function initializeSlideshow() {
    if (sliderInitialized) return;
    sliderInitialized = true;

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
    // preload next couple images
    if (slides.length > 1) {
        const nextImg = slides[1].querySelector('img');
        if (nextImg && !(nextImg.complete && nextImg.naturalWidth>0)) {
            const p = new Image(); p.src = nextImg.getAttribute('src') || nextImg.getAttribute('data-src');
        }
    }
    if (slides.length > 2) {
        const next2Img = slides[2].querySelector('img');
        if (next2Img && !(next2Img.complete && next2Img.naturalWidth>0)) {
            const p2 = new Image(); p2.src = next2Img.getAttribute('src') || next2Img.getAttribute('data-src');
        }
    }
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
    // if not initialized yet (user clicked before we observed), initialize now
    if (!sliderInitialized) initializeSlideshow();

    // compute next index but preload its image before showing to avoid blank wait
    let nextIndex = currentSlideIndex + direction;
    if (nextIndex >= slides.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = slides.length - 1;

    const targetImg = slides[nextIndex]?.querySelector('img');
    const src = targetImg ? (targetImg.getAttribute('src') || targetImg.getAttribute('data-src')) : null;

    // helper to actually switch
    const doSwitch = () => {
        currentSlideIndex = nextIndex;
        showSlide(currentSlideIndex);
        restartAutoSlide();
    };

    if (!src) {
        // nothing to preload
        doSwitch();
        return;
    }

    // if already loaded, switch immediately
    if (targetImg.complete && targetImg.naturalWidth > 0) {
        doSwitch();
        return;
    }

    // preload with a short timeout fallback so navigation isn't blocked too long
    let done = false;
    const to = setTimeout(() => {
        if (!done) { done = true; doSwitch(); }
    }, 1200);

    const p = new Image();
    p.onload = p.onerror = function () {
        if (done) return;
        clearTimeout(to);
        // ensure the slide's img element uses this src (in case of data-src patterns)
        if (targetImg && targetImg.getAttribute('src') !== p.src) {
            try { targetImg.src = p.src; } catch (e) { /* ignore */ }
        }
        done = true;
        doSwitch();
    };
    p.src = src;
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
    const sliderEl = document.querySelector('.pers-slider');
    if (!sliderEl) return;

    // Use IntersectionObserver to start the slideshow only when the slider enters the viewport
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    initializeSlideshow();
                    obs.disconnect();
                }
            });
        }, { threshold: [0, 0.2, 0.5] });
        io.observe(sliderEl);
    } else {
        // fallback for very old browsers
        setTimeout(initializeSlideshow, 300);
    }
});