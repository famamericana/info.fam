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


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


// ------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Altura da navbar (ajuste conforme necessário)
    var offsetHeight = 160; // Altura da sua navbar

    // Função para realizar o scroll ajustado
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offsetHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    // Quando o botão Planilhas é apertado
    document.querySelector('.botao-planilha').addEventListener('click', function () {
        scrollToElement('planilha');
    });


});
