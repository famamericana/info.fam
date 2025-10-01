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

$(document).ready(function () {
    $("#BotaoTopo").load("/codigos-gerais/voltartopo/voltartopo.html");
});


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// slider text -----------------------------------------------------------------------------------------------------------------------------------------------------
let slideIndex = 1; // Inicializa o índice do slide como 1
showSlides(slideIndex); // Mostra o primeiro slide

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 } // Volta ao primeiro slide se passar do último
    if (n < 1) { slideIndex = slides.length } // Vai para o último slide se for menor que 1
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Esconde todos os slides
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activetimeline-dot", "");
    }
    slides[slideIndex - 1].style.display = "block"; // Mostra o slide atual
    dots[slideIndex - 1].className += " activetimeline-dot"; // Ativa o dot correspondente
}

let timeoutId = setTimeout(function autoSlide() {
    plusSlides(1); // Muda para o próximo slide
    timeoutId = setTimeout(autoSlide, 3000); // Define o intervalo para mudar slides automaticamente
}, 3000);

const slider = document.querySelector(".slider");
slider.addEventListener("mouseover", () => {
    clearTimeout(timeoutId); // Pausa a mudança automática ao passar o mouse
});

slider.addEventListener("mouseout", () => {
    timeoutId = setTimeout(function autoSlide() {
        plusSlides(1); // Continua a mudança automática após tirar o mouse
        timeoutId = setTimeout(autoSlide, 3000);
    }, 3000);
});

function moveSlide(n) {
    currentSlide(n); // Move para o slide escolhido
    resetAndStartSlideShow(); // Reseta e reinicia o slideshow
}



// IMG SLIDER ------------------------------------------------------------------------------------------------


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

// timeline --------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with the first event activetimeline
    const firstEvent = document.querySelector('.event');
    if (firstEvent) {
        showText('text1', firstEvent);
    }
});

window.addEventListener('resize', updateTimelineLine);

function showText(textId, clickedEvent) {
    // Remove activetimeline class from all events and text contents
    const events = document.querySelectorAll('.event');
    const texts = document.querySelectorAll('.text-content');
    
    events.forEach(event => event.classList.remove('activetimeline'));
    texts.forEach(text => text.classList.remove('activetimeline'));

    // Add activetimeline class to the clicked event and the corresponding text
    clickedEvent.classList.add('activetimeline');
    const activetimelineText = document.getElementById(textId);
    if (activetimelineText) {
        activetimelineText.classList.add('activetimeline');
    }

    // Update the line animation
    updateTimelineLine();
}

function updateTimelineLine() {
    const activetimelineEvent = document.querySelector('.event.activetimeline');
    if (activetimelineEvent) {
        // Get the bounding rectangle of the activetimeline event and the timeline
        const clickedEventRect = activetimelineEvent.getBoundingClientRect();
        const timelineRect = document.querySelector('.timeline').getBoundingClientRect();

        // Calculate the position of the center of the clicked event relative to the timeline
        const centerX = clickedEventRect.left + clickedEventRect.width / 2 - timelineRect.left;

        // Set the width of the timeline line to end at the center of the clicked event
        document.querySelector('.timeline-line').style.width = `${centerX}px`;
    }
}


// datas futuras pesquisas no header ---------------------------------------------------------------------------------------------------

  // Defina as datas das pesquisas
  const pesquisas = [
    { 
        inicio: new Date('2025-09-01'), 
        fim: new Date('2025-09-30'), 
        texto: '01 a 30 de Setembro',
        mesano: '09/2025',
        titulo: 'Autoavaliação CPA',
        descricao: 'Planejamento, avaliação e desenvolvimento institucional, políticas acadêmicas e de gestão, infraestrutura'
    },
  
    { 
        inicio: new Date('2025-11-03'), 
        fim: new Date('2025-11-24'), 
        texto: '03 a 24 de Novembro',
        mesano: '11/2025',
        titulo: 'Autoavaliação CPA',
        descricao: 'Avaliação das disciplinas e turmas'
    },

];

// Obter a data atual
const hoje = new Date();

// Função para verificar o status da pesquisa
function atualizarPesquisa() {
    let status = "Última pesquisa";
    let periodo = "";

    for (let i = 0; i < pesquisas.length; i++) {
        const { inicio, fim, texto } = pesquisas[i];

        if (hoje >= inicio && hoje <= fim) {
            status = "Pesquisa Atual";
            periodo = texto;
            break;
        } else if (hoje < inicio) {
            status = "Próxima pesquisa";
            periodo = texto;
            break;
        }
    }

    // Se nenhuma data estiver no futuro, manter a última pesquisa
    if (status === "Última pesquisa") {
        const ultimaPesquisa = pesquisas[pesquisas.length - 1];
        periodo = ultimaPesquisa.texto;
    }

    // Atualizar os elementos HTML
    document.getElementById("status-pesquisa").innerText = status;
    document.getElementById("periodo-pesquisa").innerText = periodo;
}

// Chame a função para atualizar o conteúdo
atualizarPesquisa();

// Função para popular timeline automaticamente
function popularTimeline() {
    const timeline = document.querySelector('.timeline');
    const textDisplay = document.querySelector('#text-display');
    
    if (!timeline || !textDisplay) return;
    
    // Limpar conteúdo existente (exceto as linhas)
    const existingEvents = timeline.querySelectorAll('.event');
    existingEvents.forEach(event => event.remove());
    
    const existingTexts = textDisplay.querySelectorAll('.text-content');
    existingTexts.forEach(text => text.remove());
    
    // Adicionar eventos da timeline
    pesquisas.forEach((pesquisa, index) => {
        // Criar evento da timeline
        const event = document.createElement('div');
        event.className = 'event';
        if (index === 0) event.classList.add('activetimeline');
        event.onclick = () => showText(`text${index + 1}`, event);
        
        const circle = document.createElement('div');
        circle.className = 'circle';
        
        const mesano = document.createElement('div');
        mesano.className = 'mesano';
        mesano.textContent = pesquisa.mesano;
        
        event.appendChild(circle);
        event.appendChild(mesano);
        timeline.appendChild(event);
        
        // Criar conteúdo de texto
        const textContent = document.createElement('div');
        textContent.id = `text${index + 1}`;
        textContent.className = 'text-content';
        if (index === 0) textContent.classList.add('activetimeline');
        
        textContent.innerHTML = `
            <h3><i><i class="fa-regular fa-calendar"></i> ${pesquisa.texto} </i>- ${pesquisa.titulo}</h3>
            <h4>${pesquisa.descricao}</h4>
            <p>Esta pesquisa é fundamental para o desenvolvimento contínuo da nossa instituição. Sua participação é muito importante para identificarmos oportunidades de melhoria e continuarmos oferecendo a melhor experiência educacional possível.</p>
        `;
        
        textDisplay.appendChild(textContent);
    });
    
    // Atualizar linha da timeline
    updateTimelineLine();
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    popularTimeline();
});