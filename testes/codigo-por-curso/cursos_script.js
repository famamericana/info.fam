/* Referencias
https://codepen.io/a7rarpress/pen/MWPgaMq
https://jsfiddle.net/4vm1sht5/3/
*/





var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});


window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  var header = document.getElementById("sticky-header");
  var topHeader = document.getElementById("top-header");

  // Definir limite para quando o cabeçalho deve encolher
  var shrinkBoundary = topHeader.offsetHeight + 50;

  if (window.pageYOffset > topHeader.offsetHeight) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
    header.classList.remove("shrink");
  }

  if (window.pageYOffset > shrinkBoundary) {
    header.classList.add("shrink");
  }
}


$(window).on("scroll", function(){
  highlight();
});

function highlight(){
  var scroll = $(window).scrollTop();
  var height = $(window).height();

  $(".highlight").each(function(){
    var pos = $(this).offset().top;
    if (scroll+height >= pos) {
      $(this).addClass("active");
    } 
    console.log(pos);
    console.log(scroll);
  });
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Abre a primeira aba por padrão
document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("tablinks")[0].click();
});

$(document).ready(function () {
  $("#meuFooter").load("/codigos-gerais/footer/footer.html");
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


//BOTÃO SETA ---------------------------------------------------------------------------------

document.querySelectorAll('.containerseta').forEach(item => {
  item.addEventListener('click', () => {
    const section = document.querySelector('#target-section');
    if (section) {
      const offsetTop = section.offsetTop;
      const offsetToScroll = offsetTop - 100; // Ajuste 100px para o valor desejado
      window.scrollTo({
        top: offsetToScroll,
        behavior: 'smooth'
      });
    }
  });
});


// scroll daora --------------------------------------------------------------------------------------------
function checkSectionInView() {
  const sections = document.querySelectorAll('section');
  const navDots = document.querySelectorAll('.nav-dot');
  let activeIndex = -1; // Índice da seção ativa

  // Obter a posição de scroll atual e a altura da viewport
  const scrollPosition = window.scrollY + window.innerHeight / 2; // Ponto médio da viewport

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    // Se o ponto médio da viewport estiver dentro da seção
    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      activeIndex = index;
    }
  });


}

// Adicionando a função ao evento de scroll e ao carregar a página
window.addEventListener('scroll', checkSectionInView);
document.addEventListener('DOMContentLoaded', checkSectionInView);



// Seleciona todos os elementos que devem ter o comportamento de rolagem suave
document.querySelectorAll('.nav-dot').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("Clicado:", this.getAttribute('href')); // Para depuração
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const offsetTop = targetSection.offsetTop;

    const offsetToScroll = offsetTop - 100; 

    window.scrollTo({
      top: offsetToScroll,
      behavior: 'smooth'
    });
  });
});



// Função para mostrar/esconder o botão de rolar para o topo
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// Função unificada para rolar para o topo com rolagem suave
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}



//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


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


// descrição matriz -----------------------------------------------------------------------

function mostrarDescricao(elemento) {
  let descricao = elemento.nextElementSibling;

  if (descricao.style.display === 'block') {
    descricao.style.display = 'none';
    return;
  }

  let todasDescricoes = document.querySelectorAll('.descricao');
  for (let i = 0; i < todasDescricoes.length; i++) {
    todasDescricoes[i].style.display = 'none';
  }

  descricao.style.display = 'block';
}

// não deixar sozinho matriz -----------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function() {
  const grid = document.querySelector('#lista');
  const items = grid.querySelectorAll('.item');
  if (items.length % 2 !== 0) {
    items[items.length - 1].classList.add('item-last-alone');
  }
});



// degradê imagens conheça mais cursos -----------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
  var images = [
    "url('/graduacoes/codigo-por-curso/imagescursos/piscina.png')",
    "url('/graduacoes/codigo-por-curso/imagescursos/vet.png')",
    "url('/graduacoes/codigo-por-curso/imagescursos/praca.png')",
    "url('/graduacoes/codigo-por-curso/imagescursos/estacionamento.png')",
    "url('/graduacoes/codigo-por-curso/imagescursos/bloco2.png')",
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
