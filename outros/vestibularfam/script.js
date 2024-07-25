
$(document).ready(function () {
    $("#meuFooter").load("footer/footer.html");
});

/// tabs ---------------------------------------------------------------------------------------------------------------------------------------------------------------

function openTab(evt, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt) evt.currentTarget.className += " active";

    // Esconder o texto inicial
    document.getElementById("initialText").style.display = "none";
}

// Verifica se há um hash na URL ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    var hash = window.location.hash.substring(1); // Remove o '#' da string
    if (hash) {
        var element = document.getElementById(hash);
        if (element) {
            openTab(null, hash); // Chama openTab sem um evento se o hash corresponder a uma aba
            var link = document.querySelector(".tablinks[onclick*='" + hash + "']");
            if (link) {
                link.className += " active";
            }
        }
    }
});






