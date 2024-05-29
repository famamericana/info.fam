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
document.addEventListener("DOMContentLoaded", function() {
    const savedPreference = localStorage.getItem("darkMode");
    if (savedPreference === "enabled") {
        document.body.classList.add("dark-mode");
    } else if (savedPreference === "disabled") {
        document.body.classList.remove("dark-mode");
    } else {
        checkDarkModePreference(); // Verificar se o sistema está em modo escuro
    }
});


