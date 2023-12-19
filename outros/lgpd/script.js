function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.body.classList.add("body-no-scroll");
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.classList.remove("body-no-scroll");
}

// Fechando o modal quando clicado fora dele
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

// Fechando o modal quando o botão 'X' é clicado
document.querySelectorAll('.close-button').forEach(button => {
    button.onclick = function() {
        closeModal(this.closest('.modal').id);
    };
});
