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


document.addEventListener("DOMContentLoaded", function() {
    const images = ["images/PdE_imgs.svg", "images/PdE_imgs1.svg", "images/PdE_imgs2.svg"];
    let currentImageIndex = 0;
    const imageElement = document.querySelector('.svgImage');

    setInterval(() => {
        // Atualiza o índice da imagem
        currentImageIndex = (currentImageIndex + 1) % images.length;

        // Adiciona uma classe para a transição
        imageElement.classList.add('fade');

        // Espera a transição terminar para mudar a imagem e remover a classe 'fade'
        setTimeout(() => {
            imageElement.src = images[currentImageIndex];
            imageElement.classList.remove('fade');
        }, 500); // 500 ms para a duração da transição
    }, 2000); // Troca a imagem a cada 2000 ms (2 segundos)
});
