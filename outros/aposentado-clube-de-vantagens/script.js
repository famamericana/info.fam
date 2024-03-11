$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer-invertido/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar-invertido/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const googleSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRfEwrOn4LplY12o8ybuJRJ22dgw-phIEvM8ZNzb8KIpUOwfvx_aJEgqyS8GxLhb31DkJZq5b53badH/pub?output=csv';

    fetch(googleSheetURL)
        .then(response => response.text())
        .then(data => {
            let rows = data.split('\n').slice(1);
            rows.forEach(row => {
                let columns = row.split(',');

                // Adicionar itens nas respectivas colunas
                addItemToColumn('desconto-40', columns[0], columns[1], columns[2]);
                addItemToColumn('desconto-20', columns[3], columns[4], columns[5]);
                addItemToColumn('desconto-10', columns[6], columns[7], columns[8]);
            });

        });
});

function addItemToColumn(columnId, imageUrl, descricao, linkUrl) {
    const column = document.getElementById(columnId);

    if (!imageUrl.trim()) return;

    const itemHtml = `
<div class="griditemdescontos">
    <img src="${imageUrl.replace(/"/g, '')}" alt="imagem da empresa" class="desconto-img">
    <div class="descricao">
        <p>${descricao.replace(/"/g, '')}</p>
        <a href="${linkUrl.replace(/"/g, '')}">
            <button class="desc-btn">Saiba Mais</button>
        </a>
    </div>
</div>
`;

    column.innerHTML += itemHtml;
}



//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


// logos looping --------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const sliderWrapper = document.getElementById('logoSliderWrapper');
    const logos = sliderWrapper.getElementsByClassName('logo');
    const moveAmount = 2; // Velocidade de deslocamento dos logos em pixels
    let positions = [];
  
    // Inicializa os logos e suas posições
    function setupLogos() {
      Array.from(logos).forEach((logo, index) => {
        logo.style.backgroundImage = `url('${logo.dataset.logo}')`;
        // Posiciona cada logo imediatamente após o anterior
        positions[index] = index * (150 + 20); // Largura do logo + margem
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
  