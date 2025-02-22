
//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

//-------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer-invertido/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar-fam/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});

//-------------------------------------------------------------------------------------------------------------------------------
const floatingBtn = document.querySelector('.floating');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        floatingBtn.classList.add('show'); // Mostra o botão
    } else {
        floatingBtn.classList.remove('show'); // Esconde o botão
    }
});