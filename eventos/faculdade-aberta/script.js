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


document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os cards, exceto o da div5
    const cards = document.querySelectorAll('.myCard:not(.flipped)');
    const flippedCard = document.querySelector('.div4 .myCard');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Remove a classe 'flipped' da div5 quando o mouse passar sobre outro card
            flippedCard.classList.remove('flipped');
        });
    });
});
