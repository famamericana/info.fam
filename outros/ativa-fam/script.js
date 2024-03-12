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
        positions[index] = index * (160 + 20); // Largura do logo + margem
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
          positions[index] = maxPosition + 150 + 20 > wrapperWidth ? maxPosition + 100 + 20 : wrapperWidth;
        }
        // Aplica a nova posição ao logo
        logos[index].style.transform = `translateX(${positions[index]}px)`;
      });
  
      requestAnimationFrame(slideLogos);
    }
  
    setupLogos();
    requestAnimationFrame(slideLogos);
  });
  