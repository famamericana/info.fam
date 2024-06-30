// LOGO MUDAR TAMANHO PC/MOBILE --------------------------------------------------------------------------------------------------------------------------------------------
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

// Executa assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', ajustarLogo);

// Continua a executar ao redimensionar a página
window.onresize = ajustarLogo;



// GRÁFICO BOLSAS QUANTIDADE -------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
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



//SLIDESHOW ---------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
  $(".arrow").click(function () {
    let direction = $(this).data('direction');

    // Pegando o slide atual visível
    let currentSlide = $(this).closest('.slideshow-item');

    // Pegando todos os slides
    let slides = $('.slideshow-item');

    // Encontrando o índice do slide atual
    let currentIndex = slides.index(currentSlide);

    // Calculando o próximo índice
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % slides.length;
    } else {
      nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    // Removendo a classe 'visible' do slide atual
    currentSlide.removeClass('visible');

    // Adicionando a classe 'visible' ao próximo slide
    slides.eq(nextIndex).addClass('visible');
  });
});


//MININAVBAR ------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  var bg = document.getElementById("buttonBackground");

  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight) {
      bg.style.display = "flex";
    } else {
      bg.style.display = "none";
    }
  });
});




//FOOTER -----------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
  $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

// Data alvo
const targetDate = new Date('2024-06-30T14:00:00'); // Dia 30 de junho às 14:00 (2 da tarde)

function updateCountdown() {
  const currentDate = new Date();

  // Verifica se já passou do horário alvo (após as 14:00 do dia 30 de junho)
  if (currentDate >= targetDate) {
    document.getElementById("countdown").textContent = "A prova já acabou, acompanhe nossas redes sociais para não perder as novidades ;)";
    return;
  }

  // Calcula o tempo restante apenas se ainda não passou do horário alvo
  const timeLeft = targetDate - currentDate;
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24)); // Usamos Math.ceil para arredondar para cima

  // Aqui você pode manter as outras condições para exibir mensagens de contagem regressiva, se desejar
  if (daysLeft === 0 && currentDate.getHours() < 14) {
    document.getElementById("countdown").textContent = "Hoje é o grande dia! O portão abre às 13h30 e a prova começa às 14:00.";
  } else if (daysLeft === 1) {
    document.getElementById("countdown").textContent = `Amanhã é o grande dia!`;
  } else if (daysLeft === 29 && currentDate.getHours() < 14) {
    document.getElementById("countdown").textContent = `Prepare-se, nos vemos em menos de um dia!`;
  } else {
    document.getElementById("countdown").textContent = `Prepare-se, nos vemos em ${daysLeft} dias!`;
  }
}

window.addEventListener('load', updateCountdown); // Chama a função quando a página é carregada



//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

