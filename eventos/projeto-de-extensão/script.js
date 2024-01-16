$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});


// LOGO MUDAR TAMANHO PC/MOBILE --------------------------------------------------------------------------------------------------------------------------------------------
function ajustarLogo() {
    var largura = window.innerWidth;
    var logoQuadrado = document.getElementById('logoQuadrado');
    var logoRetangular = document.getElementById('logoRetangular');
  
    if (largura < 875) { // Ponto de corte
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
  






  const images = document.querySelectorAll('.imagemprincipal .svgImage');
  let currentImageIndex = 0;
  
  // Inicialmente, defina a primeira imagem como visível
  images[currentImageIndex].style.opacity = 1;
  
  setInterval(() => {
      images[currentImageIndex].style.opacity = 0;
      currentImageIndex = (currentImageIndex + 1) % images.length;
      images[currentImageIndex].style.opacity = 1;
  }, 3000); // 1000 milissegundos = 1 segundo
  

  
  const imagesM = document.querySelectorAll('.imagemprincipalMobile .svgImage');
  let currentImageMIndex = 0;
  
  // Inicialmente, defina a primeira imagem como visível
  imagesM[currentImageIndex].style.opacity = 1;
  
  setInterval(() => {
      imagesM[currentImageMIndex].style.opacity = 0;
      currentImageMIndex = (currentImageMIndex + 1) % imagesM.length;
      imagesM[currentImageMIndex].style.opacity = 1;
  }, 3000); // 1000 milissegundos = 1 segundo
  

