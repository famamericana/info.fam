// header ----------------------------------------------------------------------------------------------------------------------------------------------

function toggleAccordion(index) {
    const tabs = document.querySelectorAll('.accordion .tab .content');
    const currentTab = tabs[index];

    if (currentTab.style.display === 'block') {
        currentTab.style.display = 'none';
    } else {
        for (let tab of tabs) {
            tab.style.display = 'none';
        }
        currentTab.style.display = 'block';
    }
}

// classico fam -----------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

$(document).ready(function () {
    $("#BotaoTopo").load("/codigos-gerais/voltartopo/voltartopo.html");
});


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}



// galeria -------------------------------------------------------------------------------------------------------------------------------

document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', function() {
        var src = this.src;
        var alt = this.alt;
        document.getElementById('popup-img').src = src;
        document.getElementById('popup-overlay').style.display = 'flex';
    });
});

function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
}

// Adiciona o evento de clique ao popup-overlay
document.getElementById('popup-overlay').addEventListener('click', function(event) {
    // Verifica se o clique foi no popup-overlay e não em seus filhos
    if (event.target === this) {
        closePopup();
    }
});

// menu mobile ---------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os links dentro do <nav>
    var links = document.querySelectorAll('nav ul li a');

    // Adiciona um event listener para cada link
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            // Desmarca o checkbox
            document.getElementById('check').checked = false;
        });
    });
});

//---------------------------------------------------------------

