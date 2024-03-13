$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar-invertido/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});

$(document).ready(function () {
    $("#BotaoTopo").load("/codigos-gerais/voltartopo/voltartopo.html");
});


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


// logos looping --------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const sliderWrapper = document.getElementById('logoSliderWrapper');
    const logos = sliderWrapper.getElementsByClassName('logo');
    const moveAmount = 1; // Velocidade de deslocamento dos logos em pixels
    let positions = [];
  
    // Inicializa os logos e suas posições
    function setupLogos() {
      Array.from(logos).forEach((logo, index) => {
        logo.style.backgroundImage = `url('${logo.dataset.logo}')`;
        // Posiciona cada logo imediatamente após o anterior
        positions[index] = index * (150 + 50); // Largura do logo + margem
      });
    }
  
    function slideLogos() {
      positions = positions.map(position => position - moveAmount); // Move cada logo para a esquerda
  
      positions.forEach((position, index) => {
        // Se o logo saiu completamente da tela pela esquerda
        if (position < -150) {
          const maxPosition = Math.max(...positions);
          const wrapperWidth = sliderWrapper.offsetWidth;
          // Calcula a nova posição do logo para que ele reapareça do lado direito
          positions[index] = maxPosition + 150 + 50 > wrapperWidth ? maxPosition + 100 + 50 : wrapperWidth;
        }
        // Aplica a nova posição ao logo
        logos[index].style.transform = `translateX(${positions[index]}px)`;
      });
  
      requestAnimationFrame(slideLogos);
    }
  
    setupLogos();
    requestAnimationFrame(slideLogos);
  });
  
  
// faq ------------------------------------------------------------------------------------------------ 

const accordionBtns = document.querySelectorAll(".item-header");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("active");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});




// degradê imagens conheça mais cursos -----------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
  var images = [
    "url('images/imagescursos/piscina.png')",
    "url('images/imagescursos/vet.png')",
    "url('images/imagescursos/praca.png')",
    "url('images/imagescursos/estacionamento.png')",
    "url('images/imagescursos/bloco2.png')",
  ];
  var currentIndex = 0;
  var overlayDiv = document.querySelector('.image-overlay');
  var nextOverlayDiv = document.querySelector('.overlay-next');

  function changeImage() {
    nextOverlayDiv.style.backgroundImage = images[currentIndex];
    nextOverlayDiv.style.opacity = '1'; // Torna a próxima imagem visível

    // Espera pela transição para completar antes de trocar as imagens e resetar a opacidade
    setTimeout(function() {
      overlayDiv.style.backgroundImage = images[currentIndex];
      nextOverlayDiv.style.opacity = '0'; // Esconde a próxima imagem após a transição
      currentIndex = (currentIndex + 1) % images.length; // Avança para a próxima imagem
    }, 1000); // Deve coincidir com a duração da transição CSS
  }

  // Inicia com a primeira imagem
  changeImage();
  
  // Muda a imagem a cada 4 segundos + 1 segundo de transição
  setInterval(changeImage, 5000);
});


