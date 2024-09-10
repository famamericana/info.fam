$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});


// GALERIA ###############################################################################################################################################

function changeImage(imageSrc) {
    document.getElementById('mainImage').src = imageSrc;
}

// Set the initial main image to the first thumbnail on page load
window.onload = function() {
    changeImage('images/logos/1896-main.png');
}