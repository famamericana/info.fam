document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave com offset para #tipodeinscricao
    const btnInscreva = document.querySelector('a.button[href="#tipodeinscricao"]');
    if (btnInscreva) {
        btnInscreva.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('tipodeinscricao');
            if (target) {
                const offset = 80; // ajuste para mostrar o texto
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    }

    // Funcionalidade da régua de descontos
    setupDescontosRegua();
    
    // Inicializa as funções da navbar primeiro para garantir que o menu esteja pronto
    handleNavbarScroll();
    setupMobileMenu();
    
    const bolas = document.querySelectorAll('.bola');
    // Posição original/padrão de cada bola
    const posOriginal = [];
    bolas.forEach((bola) => {
        const computedStyle = window.getComputedStyle(bola);
        posOriginal.push({
            transform: computedStyle.transform === 'none' ? '' : computedStyle.transform
        });
    });
    
    // Efeito de paralaxe para as bolas quando o mouse se move
    document.addEventListener('mousemove', function(e) {
        // Posição relativa do mouse na tela (valores entre 0 e 1)
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        bolas.forEach((bola, index) => {
            // Fator de movimento diferente para cada bola (quanto maior o índice, mais lento o movimento)
            const fatorMovimento = 15 / (index + 1);
            
            // Mover a bola com base na posição do mouse
            const moveX = (mouseX - 0.5) * fatorMovimento * 20;
            const moveY = (mouseY - 0.5) * fatorMovimento * 20;
            
            // Aplicar transformação adicional, preservando a animação CSS
            bola.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + mouseX * 0.05})`;
        });
    });
    
    // Paralaxe no scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        bolas.forEach((bola, index) => {
            // Velocidade de paralaxe diferente para cada bola
            const scrollSpeed = 0.05 * (index % 4 + 1);
            const yOffset = scrollTop * scrollSpeed;
            
            // Aplicar transformação de scroll
            bola.style.transform = `translateY(${yOffset}px)`;
        });
    });
    
    // Log para diagnóstico
    console.log('Script inicializado');
});

// Navbar scroll effect function
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.navbar-scroll-indicator');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / docHeight) * 100;
        
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Atualizar a largura da barra de progresso baseada no scroll
        if (scrollIndicator) {
            scrollIndicator.style.width = scrollProgress + '%';
            
            // Mostrar/ocultar a linha baseado no scroll
            if (scrollTop > 50) {
                scrollIndicator.style.opacity = '1';
            } else {
                scrollIndicator.style.opacity = '0';
            }
        }
    });
}

// Mobile menu toggle function
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Log para diagnóstico
    console.log('Menu toggle element:', menuToggle);
    console.log('Nav menu element:', navMenu);
      if (menuToggle && navMenu) {
        // Garantir que o evento de clique é adicionado corretamente
        menuToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Evita que o evento se propague para o documento
            console.log('Menu toggle clicked');
            
            // Toggle the active state on both the menu toggle and the SVG icon
            menuToggle.classList.toggle('active');
            const hamburgerIcon = menuToggle.querySelector('.ham');
            if (hamburgerIcon) {
                hamburgerIcon.classList.toggle('active');
            }
            navMenu.classList.toggle('active');
            
            console.log('Menu active state:', navMenu.classList.contains('active'));
            
            // Adiciona/remove o bloqueio de rolagem quando o menu está aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Keyboard accessibility - allow activation with Enter and Space
        menuToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                menuToggle.click();
            }
        });
    } else {
        console.error('Menu elements not found');
    }
    
    // Não fechar o menu quando clicar dentro do menu
    if (navMenu) {
        navMenu.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
      // Fechar o menu quando clicar fora
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('#menu-toggle') && 
            !event.target.closest('#nav-menu')) {
            menuToggle.classList.remove('active');
            const hamburgerIcon = menuToggle.querySelector('.ham');
            if (hamburgerIcon) {
                hamburgerIcon.classList.remove('active');
            }
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
      // Fechar o menu quando clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            const hamburgerIcon = menuToggle.querySelector('.ham');
            if (hamburgerIcon) {
                hamburgerIcon.classList.remove('active');
            }
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
      // Fechar o menu quando redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                const hamburgerIcon = menuToggle.querySelector('.ham');
                if (hamburgerIcon) {
                    hamburgerIcon.classList.remove('active');
                }
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// slider text -----------------------------------------------------------------------------------------------------------------------------------------------------
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    // Check if slides and dots exist before proceeding
    if (!slides || slides.length === 0 || !dots || dots.length === 0) {
        return; // Exit the function if elements don't exist
    }
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    // Check if the current slide exists before accessing
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active-dot";
        }
        startProgress();
    }
}

let timeoutId;
let progressTimer;

function resetProgress() {
    clearTimeout(progressTimer);
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        progressBar.innerHTML = "";
    }
}

function startProgress() {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        progressBar.innerHTML = "<div class='progress'></div>";
        setTimeout(() => {
            const progress = document.querySelector(".progress");
            if (progress) {
                progress.style.animation = "progressBar 10s linear forwards";
            }
        }, 100);
    }
}

function autoSlide() {
    if (!slideClicked) {
        plusSlides(1); // Avança para o próximo slide se o usuário não tiver clicado em um ponto
    }
    startProgress();
    slideClicked = false; // Reinicia slideClicked para permitir o avanço automático após 10 segundos
    clearTimeout(timeoutId); // Limpa o timeout anterior para garantir que não haja múltiplos timeouts ativos
    timeoutId = setTimeout(autoSlide, 10000);
}

timeoutId = setTimeout(autoSlide, 10000);

const slider = document.querySelector(".slider");
if (slider) {
    slider.addEventListener("mouseover", () => {
        clearTimeout(timeoutId);
        resetProgress();
    });

    slider.addEventListener("mouseout", () => {
        resetProgress(); // Resetar a barra de progresso
        startProgress(); // Iniciar a animação novamente
        timeoutId = setTimeout(autoSlide, 10000);
    });
}

let slideClicked = false;

function moveSlide(n) {
    currentSlide(n);
    clearTimeout(timeoutId);
    resetProgress();
    startProgress(); // Reinicia o progresso ao mover o slide manualmente
    if (n !== slideIndex) {
        slideClicked = true; // Define slideClicked como true apenas se o slide for alterado
    }
    timeoutId = setTimeout(autoSlide, 10000);
}

// trocar img media menor --------///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkScreenSize() {
    const slide1 = document.getElementById("slide1");
    const slide2 = document.getElementById("slide2");

    // Check if both slides exist before changing their sources
    if (slide1 && slide2) {
        if (window.innerWidth < 600) {
            slide1.src = "images/Vestibular-2025.2_Inverno_Banner_VestibularFam_1080x800_mobile.png"; // Altere para a imagem desejada
            slide2.src = "images/Pós_Graduação_2024_1080x800.png";
        } else {
            slide1.src = "images/Vestibular2025_Inverno_Banner_VestibularFam_960x300.png";
            slide2.src = "images/Pós_Graduação_2024_960x300.png";
        }
    }
}

// Chama a função ao carregar a página e ao redimensionar a tela
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

// Tipos de Inscrição - Funcionalidade de Expansão
document.addEventListener('DOMContentLoaded', function() {
    // Nova lógica: select único
    const select = document.getElementById('tipoInscricaoSelect');
    const detalhe = document.getElementById('inscricaoDetalhe');

    // Resetar select e detalhe ao carregar
    if (select) {
        select.selectedIndex = 0;
    }
    if (detalhe) {
        detalhe.style.display = 'none';
        detalhe.innerHTML = '';
    }

    const opcoes = {
        'vestibular': {
            titulo: 'Vestibular Online',
            texto: 'Faça sua prova de casa, quando quiser! Nossa redação dissertativa-argumentativa está disponível 24/7. Resultado em minutos após a conclusão.',
            textoCompleto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: 'https://famamericana.com.br/vestibular',
            linkText: 'Inscrever-se no Vestibular'
        },
        'enem': {
            titulo: 'Use sua Nota do ENEM',
            texto: 'Conquistou 400+ pontos na redação do ENEM (2015 em diante)? Entre direto na FAM sem vestibular tradicional!',
            textoCompleto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: 'https://famamericana.com.br/enem',
            linkText: 'Inscrever-se com ENEM'
        },
        'segunda-graduacao': {
            titulo: '2ª Graduação',
            texto: 'Já é graduado? Processo simplificado sem vestibular. Elimine matérias já cursadas e foque no que é novo para você.',
            textoCompleto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: 'https://famamericana.com.br/segunda-graduacao',
            linkText: 'Inscrever-se 2ª Graduação'
        },
        'transferencia': {
            titulo: 'Transferência',
            texto: 'Venha ser FAM! Transferência simples com aproveitamento de disciplinas. Análise curricular por apenas R$50,00.',
            textoCompleto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: 'https://famamericana.com.br/transferencia',
            linkText: 'Solicitar Transferência'
        },
        'pos-graduacao': {
            titulo: 'Pós-Graduação',
            texto: 'Especializações presenciais e EaD sem vestibular. MBA e cursos de alta qualidade para impulsionar sua carreira. Visite <a class="linklegal" href="https://posfam.com.br" target="_blank">posfam.com.br</a> para conhecer todas as opções de cursos de pós-graduação.',
            textoCompleto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: 'https://famamericana.com.br/pos-graduacao',
            linkText: 'Ver Pós-Graduação'
        },
        'reabertura': {
            titulo: 'Reabertura de Matrícula',
            texto: 'Ex-aluno FAM? Volte e continue de onde parou. Continue seus estudos com análise curricular facilitada. <p class="detalhes">Pendências financeiras? Entre em contato: <a href="mailto:cfa@fam.br">cfa@fam.br</a></p>',
            textoCompleto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            link: 'https://famamericana.com.br/tecnicos',
            linkText: 'Reabrir Matrícula'
        }
    };

    
    // Função para alternar a visibilidade do texto completo
    function toggleSaibaMais(button) {
        const contentDiv = button.closest('.opcao-content');
        const textoCompleto = contentDiv.querySelector('.texto-completo');
        const isExpandido = button.classList.contains('expandido');
        
        if (isExpandido) {
            textoCompleto.style.maxHeight = '0';
            textoCompleto.style.opacity = '0';
            button.textContent = 'Saiba Mais';
            button.classList.remove('expandido');
        } else {
            textoCompleto.style.maxHeight = textoCompleto.scrollHeight + 'px';
            textoCompleto.style.opacity = '1';
            button.textContent = 'Ver Menos';
            button.classList.add('expandido');
        }
    }

      if (select) {
        select.addEventListener('change', function() {
            const val = select.value;
            if (opcoes[val]) {
                detalhe.style.display = 'block';
                detalhe.innerHTML = `
                    <div class="opcao-item active">
                        <div class="opcao-header" style="cursor:default;">
                        
                            <h3>${opcoes[val].titulo}</h3>
                        </div>
                        <div class="opcao-content" style="max-height:none;">
                            <p>${opcoes[val].texto}</p>
                            <div class="texto-completo" style="max-height: 0; overflow: hidden; opacity: 0; transition: all 0.3s ease;">
                                <p>${opcoes[val].textoCompleto}</p>
                            </div>
                            <div class="opcao-botoes" >
                                <button class="btn-saiba-mais" onclick="toggleSaibaMais(this)">Saiba Mais</button>
                                <a href="${opcoes[val].link}" target="_blank" class="btn-inscricao">${opcoes[val].linkText}</a>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                detalhe.style.display = 'none';
                detalhe.innerHTML = '';
            }
        });
    }

    // Adicionar a função toggleSaibaMais ao escopo global
    window.toggleSaibaMais = toggleSaibaMais;
});

// Função para animar os cards de desconto e contador regressivo com scroll trigger
function setupDescontosRegua() {
    const descontoSection = document.querySelector('.desconto-section');
    const descontoCards = document.querySelectorAll('.desconto-card');
    const timelineLinha = document.querySelector('.timeline-linha');
    const countdownElement = document.getElementById('countdown');

    // Função para determinar qual desconto está ativo e atualizar interface
    function atualizarDescontoAtivo() {
        const hoje = new Date();
        const dezembro20 = new Date(2025, 11, 20, 23, 59, 59); // 20 de dezembro de 2025
        const janeiro30 = new Date(2026, 0, 30, 23, 59, 59); // 30 de janeiro de 2026
        const marco30 = new Date(2026, 2, 30, 23, 59, 59); // 30 de março de 2026
        
        let descontoAtivo = 30; // padrão
        let dataLimite = marco30; // desconto de 30% vai até 30/03/2026
        let proximoDesconto = null;
        
        if (hoje <= dezembro20) {
            descontoAtivo = 50;
            dataLimite = dezembro20;
            proximoDesconto = 40;
        } else if (hoje <= janeiro30) {
            descontoAtivo = 40;
            dataLimite = janeiro30;
            proximoDesconto = 30;
        }

        // Atualizar cards ativos
        descontoCards.forEach(card => {
            card.classList.remove('ativo');
            if (parseInt(card.dataset.desconto) === descontoAtivo) {
                card.classList.add('ativo');
            }
        });

        // Atualizar cor da timeline
        if (timelineLinha) {
            timelineLinha.className = 'timeline-linha desconto-' + descontoAtivo;
        }

        // Atualizar cor do countdown
        if (countdownElement) {
            countdownElement.className = 'countdown-timer countdown-' + descontoAtivo;
        }

        // Atualizar texto do destaque
        const descontoDestaque = document.getElementById('desconto-destaque');
        if (descontoDestaque) {
            descontoDestaque.textContent = `Garante já o seu desconto de ${descontoAtivo}%!`;
        }

        return { descontoAtivo, dataLimite, proximoDesconto };
    }

    // Estado inicial
    let estadoAtual = atualizarDescontoAtivo();

    // Hover effects nos cards
    descontoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('ativo')) {
                this.style.transform = 'translateY(-5px)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('ativo')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Contador regressivo
    function atualizarContador() {
        const agora = new Date().getTime();
        const tempoRestante = estadoAtual.dataLimite.getTime() - agora;

        if (tempoRestante > 0) {
            const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
            const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
        } else {
            // Tempo acabou, atualizar para próximo desconto
            estadoAtual = atualizarDescontoAtivo();

            // Se ainda há tempo restante, continuar contador
            if (estadoAtual.dataLimite.getTime() - agora > 0) {
                atualizarContador();
            } else {
                countdownElement.innerHTML = "Tempo esgotado!";
                const countdownInfo = document.querySelector('.countdown-info');
                if (countdownInfo) {
                    countdownInfo.style.display = 'none';
                }
            }
        }
    }

    // Atualizar contador a cada segundo
    atualizarContador();
    setInterval(atualizarContador, 1000);

    // Intersection Observer para ativar animações no scroll
    const observerOptions = {
        threshold: 0.3, // 30% do elemento visível
        rootMargin: '0px 0px -50px 0px' // Ativar 50px antes de entrar completamente na viewport
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Ativar animações quando a seção entra na viewport

                // Animação dos cards com stagger
                descontoCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                        if (card.classList.contains('ativo')) {
                            card.style.transform = 'translateY(-5px)';
                        }
                    }, index * 200);
                });

                // Animação da timeline
                if (timelineLinha) {
                    setTimeout(() => {
                        timelineLinha.style.width = '100%';
                        timelineLinha.style.opacity = '1';
                        // Garantir que a classe de cor está aplicada
                        timelineLinha.className = 'timeline-linha desconto-' + estadoAtual.descontoAtivo;
                    }, 600);
                }

                // Garantir que a classe do countdown está aplicada
                if (countdownElement) {
                    countdownElement.className = 'countdown-timer countdown-' + estadoAtual.descontoAtivo;
                }

                // Parar de observar após ativar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Começar a observar a seção de descontos
    if (descontoSection) {
        observer.observe(descontoSection);
    }
}

// Funcionalidade de copiar cupom
    function setupCupomCopy() {
        const cupons = document.querySelectorAll('.desconto-cupom');
        
        cupons.forEach(cupom => {
            cupom.addEventListener('click', async function() {
                const cupomText = this.dataset.cupom;
                
                try {
                    // Copiar para a área de transferência
                    await navigator.clipboard.writeText(cupomText);
                    
                    // Adicionar classe copiado
                    this.classList.add('copied');
                    
                    // Remover classe após 1 segundo
                    setTimeout(() => {
                        this.classList.remove('copied');
                    }, 1000);
                    
                } catch (err) {
                    console.error('Erro ao copiar cupom:', err);
                    // Fallback para navegadores mais antigos
                    const textArea = document.createElement('textarea');
                    textArea.value = cupomText;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // Mesmo feedback visual
                    this.classList.add('copied');
                    setTimeout(() => {
                        this.classList.remove('copied');
                    }, 1000);
                }
            });
        });
    }
    
    // Chamar a função de copiar cupons
    setupCupomCopy();