// script.js
function ajustarLogo() {
    var largura = window.innerWidth;
    var logoQuadrado = document.getElementById('logoQuadrado');
    var logoRetangular = document.getElementById('logoRetangular');

    if (largura < 960) { // Ponto de corte
        logoQuadrado.style.display = 'none';
        logoRetangular.style.display = 'block';
    } else {
        logoQuadrado.style.display = 'block';
        logoRetangular.style.display = 'none';
    }
}

// Executa ao carregar e ao redimensionar a página
window.onload = ajustarLogo;
window.onresize = ajustarLogo;



document.addEventListener("DOMContentLoaded", function() {
    const bars = document.querySelectorAll('.bar-graph-horizontal .bar');
    const texts = document.querySelectorAll('.bar-graph-horizontal .year');
  
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
    }
  
    function checkVisibility() {
      texts.forEach((text, index) => {
        if (isElementInViewport(text)) {
          text.classList.add('animate-text');
        }
      });
  
      bars.forEach((bar, index) => {
        if (isElementInViewport(bar)) {
          bar.classList.add(`animate-bar-${index + 1}`);
        }
      });
    }
  
    // Verifica a visibilidade dos elementos quando a página é carregada
    checkVisibility();
  
    // Verifica a visibilidade dos elementos quando o usuário faz scroll
    window.addEventListener('scroll', checkVisibility);
  });
  