$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar-fam/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


    // Simulação de funcionalidade de curtidas
        document.querySelector('.like-button').addEventListener('click', function() {
            const countElement = this.querySelector('.like-count');
            let count = parseInt(countElement.textContent);
            
            if(this.classList.contains('liked')) {
                count--;
                this.classList.remove('liked');
                this.querySelector('i').style.color = '';
            } else {
                count++;
                this.classList.add('liked');
                this.querySelector('i').style.color = '#ff3366';
            }
            
            countElement.textContent = count.toLocaleString();
        });