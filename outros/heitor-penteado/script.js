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






