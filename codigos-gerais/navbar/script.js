document.addEventListener('DOMContentLoaded', function() {
    var itemDropdown = document.querySelector('.item-dropdown');
    var conteudoDropdown = document.querySelector('.conteudo-dropdown');

    // Mostrar o dropdown quando passar o mouse sobre 'Diversos'
    itemDropdown.addEventListener('mouseenter', function() {
        conteudoDropdown.style.display = 'block';
    });

    // Esconder o dropdown quando o mouse sai do item 'Diversos'
    itemDropdown.addEventListener('mouseleave', function() {
        // Atraso para dar tempo de mover o mouse para o conteúdo do dropdown
        setTimeout(function() {
            // Se o mouse não estiver sobre o conteúdo do dropdown, esconde-o
            if (!conteudoDropdown.matches(':hover')) {
                conteudoDropdown.style.display = 'none';
            }
        }, 300); // Ajuste este tempo conforme necessário
    });

    // Esconder o dropdown quando o mouse sai do conteúdo do dropdown
    conteudoDropdown.addEventListener('mouseleave', function() {
        conteudoDropdown.style.display = 'none';
    });

    // Alternar a visibilidade do dropdown no clique
    itemDropdown.addEventListener('click', function() {
        if (conteudoDropdown.style.display === 'flex') {
            conteudoDropdown.style.display = 'none';
        } else {
            conteudoDropdown.style.display = 'flex';
        }
    });
});
