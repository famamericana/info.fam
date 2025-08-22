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
let sliderInitialized = false;
let imagePreloadQueue = [];

function preloadCriticalImages() {
    // Preload first 3 personality images immediately
    const criticalImages = [
        'images/personalidades/0010---Basílio-Bueno-Rangel-gigapixel-low resolution v2-4x.png',
        'images/personalidades/0011-O-Exmo.-Snr.-Comendador-Franz-Muller---Inesquecivel-fundador-de-Carioba-gigapixel-low resolution v2-2x.png',
        'images/personalidades/0012-Snr.-Hermann-Theo.-Muller-Prestigioso-Presidente-do-Directorio-e-Importante-industrial-gigapixel-low resolution v2-2x-faceai v2.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function preloadNextImages(currentIndex, count = 2) {
    // Preload next 2 images in sequence
    for (let i = 1; i <= count; i++) {
        const nextIndex = (currentIndex + i) % slides.length;
        const img = slides[nextIndex]?.querySelector('img');
        if (img && !img.complete) {
            const preloadImg = new Image();
            preloadImg.src = img.getAttribute('src') || img.getAttribute('data-src');
        }
    }
}

function initializeSlideshow() {
    if (sliderInitialized) return;
    sliderInitialized = true;

    const container = document.querySelector('.pers-slider');
    slides = container ? container.querySelectorAll('.pers-slide') : document.querySelectorAll('.pers-slide');
    
    if (slides.length > 0) {
        // Setup slides with fallback handling
        slides.forEach((slide, i) => {
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

            // Improved error handling
            img.onerror = function () {
                this.onerror = null;
                this.src = 'https://via.placeholder.com/250x320/cccccc/333?text=Sem+imagem';
                this.alt = 'Imagem não disponível';
            };

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

        // Show first slide immediately
        showSlide(0);
        
        // Preload next images
        preloadNextImages(0, 3);
        
        startAutoSlide();
    }
}

function showSlide(index) {
    if (!slides || slides.length === 0) return;

    // Normalize index
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    // Hide all slides efficiently
    slides.forEach((slide) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.zIndex = '1';
    });

    // Show current slide
    const currentSlide = slides[index];
    if (currentSlide) {
        currentSlide.classList.add('active');
        currentSlide.style.opacity = '1';
        currentSlide.style.visibility = 'visible';
        currentSlide.style.zIndex = '2';
    }

    // Update counter
    const counterEl = document.getElementById('slide-counter');
    if (counterEl) {
        counterEl.textContent = `${index + 1}/${slides.length}`;
    }

    // Preload next images
    preloadNextImages(index, 2);
}

function changeSlide(direction) {
    if (!sliderInitialized) initializeSlideshow();

    let nextIndex = currentSlideIndex + direction;
    if (nextIndex >= slides.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = slides.length - 1;

    currentSlideIndex = nextIndex;
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
    // Preload critical images first
    preloadCriticalImages();
    
    const sliderEl = document.querySelector('.pers-slider');
    if (!sliderEl) return;

    // Use IntersectionObserver for better performance
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    setTimeout(initializeSlideshow, 100); // Small delay for smoother loading
                    obs.disconnect();
                }
            });
        }, { threshold: [0, 0.1, 0.3] });
        io.observe(sliderEl);
    } else {
        // Fallback for older browsers
        setTimeout(initializeSlideshow, 500);
    }
});