

/* NAVBAR /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar_main .navbar-custom');
    if (window.pageYOffset > 90) {
        navbar.classList.add('navbar-custom_fixed-navbar');
    } else {
        navbar.classList.remove('navbar-custom_fixed-navbar');
    }
});

const menuToggle = document.getElementById('mobile-menu-custom');
const mobileLinks = document.getElementById('mobile-links-custom');
const checkbox = document.getElementById('check-custom');


menuToggle.addEventListener('click', () => {
    if (checkbox.checked) {
        mobileLinks.classList.add('open');
        document.body.classList.add('no-scroll'); // Adiciona a classe para desabilitar o scroll
    } else {
        mobileLinks.classList.remove('open');
        document.body.classList.remove('no-scroll'); // Remove a classe para habilitar o scroll

        // Desmarca o checkbox ativo
        document.querySelectorAll('.accordion input[type="checkbox"]:checked').forEach(checkedInput => {
            checkedInput.checked = false;
            checkedInput.nextElementSibling.nextElementSibling.style.maxHeight = '0';
        });
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileLinks.classList.remove('open');
        checkbox.checked = false;
        document.body.classList.remove('no-scroll'); // Garante que o scroll seja habilitado ao redimensionar
    }
});

document.addEventListener('click', (event) => {
    const isClickInside = menuToggle.contains(event.target) || mobileLinks.contains(event.target);
    if (!isClickInside) {
        mobileLinks.classList.remove('open');
        checkbox.checked = false;
        document.body.classList.remove('no-scroll'); // Garante que o scroll seja habilitado ao clicar fora
    }
});

window.addEventListener('scroll', () => {
    if (checkbox.checked) {
        mobileLinks.classList.remove('open');
        checkbox.checked = false;
        document.body.classList.remove('no-scroll'); // Garante que o scroll seja habilitado ao rolar
    }
});


document.querySelectorAll('.accordion input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', function () {
        const content = this.nextElementSibling.nextElementSibling;

        if (this.checked) {
            // Fecha todos os conteúdos
            document.querySelectorAll('.tab__content').forEach(content => {
                content.style.maxHeight = '0';
            });

            // Abre o conteúdo específico
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            // Fecha o conteúdo se o checkbox foi desmarcado
            content.style.maxHeight = '0';
        }
    });
});
