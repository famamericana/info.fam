
//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

//-------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer-invertido/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar-fam/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});

//-------------------------------------------------------------------------------------------------------------------------------
const floatingBtn = document.querySelector('.floating');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        floatingBtn.classList.add('show'); // Mostra o botão
    } else {
        floatingBtn.classList.remove('show'); // Esconde o botão
    }
});

// Adiciona clique nos botões para scroll até 200px acima do formulário
document.querySelectorAll('.btn2').forEach(button => {
    button.addEventListener('click', () => {
        const formSection = document.querySelector('.inscrever');
        if (formSection) {
            const yOffset = -200; // Ajuste de 200px para cima
            const y = formSection.getBoundingClientRect().top + window.scrollY + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    });
});

// Observer para esconder botão flutuante quando o formulário estiver visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const floatingBtn = document.querySelector('.floating');
        if (entry.isIntersecting) {
            floatingBtn.classList.add('hide');
        } else {
            floatingBtn.classList.remove('hide');
        }
    });
}, {
    rootMargin: '-200px 0px 0px 0px' // Considera 200px acima da viewport
});

// Observa a seção do formulário RD
const rdFormSection = document.querySelector('.inscrever');
if (rdFormSection) {
    observer.observe(rdFormSection);
}