$(document).ready(function () {
    $("#Navbar").load("/hospital-veterinario/codigos/navbar/navbar.html");
});

$(document).ready(function () {
    $("#Footer").load("/hospital-veterinario/codigos/footer/footer.html");
});


// darkmode ------------------------------------------------------------------------------------------------------------------------------------------------------------

/*
// Função para verificar e aplicar o modo escuro automaticamente com base nas configurações do sistema
function checkDarkModePreference() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }
}

// Função para alternar manualmente entre os modos claro e escuro
function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    // Salvar a escolha da pessoa no armazenamento local
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// Event listener para o botão de alternar modo
document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);

// Verificar a preferência do usuário ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    const savedPreference = localStorage.getItem("darkMode");
    if (savedPreference === "enabled") {
        document.body.classList.add("dark-mode");
    } else if (savedPreference === "disabled") {
        document.body.classList.remove("dark-mode");
    } else {
        checkDarkModePreference(); // Verificar se o sistema está em modo escuro
    }
});

*/


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