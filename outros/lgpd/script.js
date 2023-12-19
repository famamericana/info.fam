// script.js
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}
