$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer-invertido/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});

// itens animação -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const items = [
    "<span style='font-weight: 600;color: #e53888;'>1</span> Item", 
    "<span style='font-weight: 600;color: #45b7e5;'>2</span> itens", 
    "<span style='font-weight: 600;color: #F2C800;'>3</span> itens", 
    "<span style='font-weight: 600;color: #EC81AE;'>4</span> itens", 
    "<span style='font-weight: 600;color: #3eb288;'>5</span> itens"
];

const descriptions = [
    "<span style='font-weight: 600;color: #e53888;'>1</span> hora de atividade complementar", 
    "<span style='font-weight: 600;color: #45b7e5;'>2</span> horas de atividades complementares", 
    "<span style='font-weight: 600;color: #F2C800;'>3</span> horas de atividades complementares", 
    "<span style='font-weight: 600;color: #EC81AE;'>4</span> horas de atividades complementares", 
    "<span style='font-weight: 600;color: #3eb288;'>5</span> horas de atividades complementares"
];

let index = 0;
let isFirstExecution = true;

function updateContent() {
    document.getElementById('itemhoras').innerHTML = items[index];
    document.getElementById('descriptionhoras').innerHTML = descriptions[index];
    
    index = (index + 1) % items.length;

    if (isFirstExecution) {
        setInterval(updateContent, 1000);
        isFirstExecution = false;
    }
}

// Executar após meio segundo apenas na primeira vez
setTimeout(updateContent, 100);



//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}



// fundo  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const colors = ["#e03776","#8f3e98","#4687bf","#3bab6f","#f9c25e","#f47274"];
const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_XLINK = "http://www.w3.org/1999/xlink";

let heartsRy = []

function useTheHeart(n){
  let use = document.createElementNS(SVG_NS, 'use');
  use.n = n;
  use.setAttributeNS(SVG_XLINK, 'xlink:href', '#heart');
  use.setAttributeNS(null, 'transform', `scale(${use.n})`);
  use.setAttributeNS(null, 'fill', colors[n%colors.length]);
  use.setAttributeNS(null, 'x', -69);
  use.setAttributeNS(null, 'y', -69);
  use.setAttributeNS(null, 'width', 138);
  use.setAttributeNS(null, 'height', 138);
  
  heartsRy.push(use)
  hearts.appendChild(use);
}

for(let n = 18; n >= 0; n--){useTheHeart(n)}

function Frame(){
  window.requestAnimationFrame(Frame);
  for(let i = 0; i < heartsRy.length; i++){
    if(heartsRy[i].n < 18){heartsRy[i].n +=.01
     }else{
     heartsRy[i].n = 0;
     hearts.appendChild(heartsRy[i])
    }
    heartsRy[i].setAttributeNS(null, 'transform', `scale(${heartsRy[i].n})`);
  }
}

Frame()

// onde é o nicom ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('tooltipTrigger').addEventListener('click', function(event) {
    var tooltip = document.getElementById('myTooltip');
    var iconRect = event.target.getBoundingClientRect();

    // Verifica se o tooltip já está visível
    if (tooltip.classList.contains('show')) {
        tooltip.classList.remove('show'); // Esconde se já estiver visível
    } else {
        // Certifique-se de que o tooltip esteja visível para calcular sua largura
        tooltip.classList.add('show');
        var tooltipRect = tooltip.getBoundingClientRect();

        // Calcula a posição para centralizar o tooltip
        var leftPosition = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2) + window.scrollX;
        var topPosition = iconRect.bottom + window.scrollY;

        tooltip.style.left = leftPosition + 'px';
        tooltip.style.top = topPosition + 'px';
    }

    event.stopPropagation();
});

document.addEventListener('click', function() {
    var tooltip = document.getElementById('myTooltip');
    if (tooltip.classList.contains('show')) {
        tooltip.classList.remove('show');
    }
});

window.addEventListener('scroll', function() {
    var tooltip = document.getElementById('myTooltip');
    if (tooltip.classList.contains('show')) {
        var icon = document.getElementById('tooltipTrigger');
        var iconRect = icon.getBoundingClientRect();
        var tooltipRect = tooltip.getBoundingClientRect();

        var leftPosition = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2) + window.scrollX;
        var topPosition = iconRect.bottom + window.scrollY;

        tooltip.style.left = leftPosition + 'px';
        tooltip.style.top = topPosition + 'px';
    }
});


// tabs --------------------------------------------------------------------------------------------------------------------------------

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
