$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

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


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


document.addEventListener("DOMContentLoaded", function() {
    // Função que ajusta o conteúdo baseado na largura da tela
    function ajustarConteudo() {
      var larguraTela = window.innerWidth;
      var div4 = document.querySelector('.div4');
      var div3 = document.querySelector('.div3');
      var dias = document.querySelector('.dias');
      var mes = document.querySelector('.mes');
  
      // Se a tela é menor que 500px, move os elementos para div3
      if (larguraTela < 600 && dias && mes && div3) {
        div3.appendChild(dias);
        div3.appendChild(mes);
      } 
      // Se a tela é maior que 500px, retorna os elementos para div4
      else if (larguraTela >= 600 && dias && mes && div4) {
        div4.appendChild(dias);
        div4.appendChild(mes);
      }
    }
  
    // Executa a função de ajuste quando a página é carregada
    ajustarConteudo();
  
    // Adiciona um ouvinte de evento para redimensionamento da janela para ajustar o conteúdo conforme necessário
    window.addEventListener('resize', ajustarConteudo);
  });
  



  // tab ----------------------------------------------------------------
  document.querySelectorAll('.accordion input[type="radio"]').forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.tab__content').forEach(content => {
            content.style.maxHeight = '0'; // Fecha todos os conteúdos
        });

        if (this.checked) {
            const content = this.nextElementSibling.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + 'px'; // Abre o conteúdo específico
        }
    });
});
