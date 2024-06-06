$(document).ready(function () {
    $("#Navbar").load("/hospital-veterinario/codigos/navbar/navbar.html");
});

$(document).ready(function () {
    $("#Footer").load("/hospital-veterinario/codigos/footer/footer.html");
});


// darkmode ------------------------------------------------------------------------------------------------------------------------------------------------------------

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



/// tabs ---------------------------------------------------------------------------------------------------------------------------------------------------------------

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // Esconder o texto inicial
    document.getElementById("initialText").style.display = "none";
}


