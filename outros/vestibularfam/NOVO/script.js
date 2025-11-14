document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave e consistente para #tipodeinscricao em todos os links
    const inscrevaLinks = document.querySelectorAll('a[href="#tipodeinscricao"]');
    if (inscrevaLinks && inscrevaLinks.length) {
        inscrevaLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const target = document.getElementById('tipodeinscricao');
                const navbar = document.querySelector('.navbar');
                const menuToggle = document.getElementById('menu-toggle');
                const navMenu = document.getElementById('nav-menu');

                if (!target) return;

                function doScroll() {
                    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
                    const extraOffset = 20; // margem extra para dar espaço abaixo do navbar (aumentado)
                    const top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - extraOffset;
                    window.scrollTo({ top, behavior: 'smooth' });
                    // update URL hash without jumping
                    history.replaceState(null, '', '#tipodeinscricao');
                }

                // If mobile menu is open, close it first so the target position is consistent
                if (navMenu && navMenu.classList.contains('active')) {
                    if (menuToggle) menuToggle.classList.remove('active');
                    const hamburgerIcon = menuToggle ? menuToggle.querySelector('.ham') : null;
                    if (hamburgerIcon) hamburgerIcon.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    // small delay to allow layout to update after closing menu
                    setTimeout(doScroll, 160);
                } else {
                    doScroll();
                }
            });
        });
    }

    // Funcionalidade da régua de descontos
    setupDescontosRegua();
    
    // Efeito de digitação
    setupTypewriterEffect();
    
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
            slide1.src = "images/VV2026.1_1080x800_site.png"; // Altere para a imagem desejada
            slide2.src = "images/Pós_Graduação_2024_1080x800.png";
        } else {
            slide1.src = "images/VV2026.1_1080x300_site.png";
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
            texto: 'Faça sua prova de casa, quando quiser! Nossa redação dissertativa-argumentativa está disponível 24 horas por dia. Resultado em minutos após a conclusão.',
            textoCompleto: 'Após a entrega da redação, os dados complementares serão disponibilizados e deverão ser preenchidos para que seja possível avançar para a próxima etapa. Somente após esse procedimento, o boleto da mensalidade da matrícula será liberado para pagamento. É importante lembrar que esse boleto já diz respeito a sua primeira mensalidade, referente ao mês de janeiro, portanto o próximo será apenas para fevereiro.',
            link: 'http://fam.inscricao.crmeducacional.com/Login/60',
            linkText: 'Inscrever-se no Vestibular'
        },
        'enem': {
            titulo: 'Use sua Nota do ENEM',
            texto: 'Conquistou 400+ pontos na redação do ENEM (2015 em diante)? Entre direto na FAM sem vestibular tradicional!',
            textoCompleto: 'O ENEM é uma prova aplicada anualmente para avaliar o desempenho dos estudantes que estão concluindo o Ensino Médio e é utilizado como uma das principais formas de ingresso e desconto nos cursos de modalidade presencial. Mas para que o ENEM seja válido, ele não pode ter sido realizado na condição de treineiro e a redação precisa de um mínimo de 400 pontos. É muito importante lembrar que a pontuação se dá por casas centesimais, portanto, não se esqueça de sempre aplicar dois zeros após a vírgula, para que a nota seja computada corretamente.',
            link: 'http://fam.inscricao.crmeducacional.com/Login/61',
            linkText: 'Inscrever-se com ENEM'
        },
        'segunda-graduacao': {
            titulo: '2ª Graduação',
            texto: 'Já é graduado? Processo simplificado sem vestibular.',
            textoCompleto: 'Mediante a apresentação do diploma de Ensino Superior, você garante a dispensa do vestibular e ainda pode solicitar o aproveitamento de disciplinas equivalentes, após a matrícula. Para isso, basta encaminhar o Histórico Acadêmico e o Conteúdo Programático das disciplinas para o e-mail do Departamento de Matrículas: <a class="linklegal" href="mailto:matricula@fam.br"> matricula@fam.br</a>.',
            link: 'http://fam.inscricao.crmeducacional.com/Login/62',
            linkText: 'Inscrever-se 2ª Graduação'
        },
        'transferencia': {
            titulo: 'Transferência',
            texto: 'Venha ser FAM! Transferência simples com aproveitamento de disciplinas. Análise curricular por apenas R$50,00.',
            textoCompleto: 'Para garantir o melhor aproveitamento das suas disciplinas já cursadas, é essencial que você prepare a documentação adequada. Você sabe o que é o Conteúdo Programático e qual a sua importância? Também chamado de Ementa ou Plano de Ensino, o Conteúdo Programático é um documento específico de cada disciplina, que descreve detalhadamente todo o conteúdo abordado, contendo a carga horária e informando as referências bibliográficas. É um documento fundamental para a Análise da Grade Curricular, pois auxiliará o(a) coordenador(a) a identificar em qual semestre você melhor se encaixa, sem que haja qualquer tipo de prejuízo.',
            link: 'http://fam.inscricao.crmeducacional.com/Login/63',
            linkText: 'Solicitar Transferência'
        },
        'pos-graduacao': {
            titulo: 'Pós-Graduação',
            texto: '<span class="aviso">Cupom não válido para Pós-Graduação.</span> Especializações presenciais e EaD sem vestibular. MBA e cursos de alta qualidade para impulsionar sua carreira.',
            link: 'https://fam.inscricao.crmeducacional.com/login/67',
            linkText: 'Inscrever-se na Pós-Graduação'
        },
        'reabertura': {
            titulo: 'Reabertura de Matrícula',
            texto: 'Já foi aluno da FAM, precisou trancar o curso e agora quer voltar? A Reabertura de Matrícula (RA) é a sua solução para retomar os estudos. <p class="detalhes">Pendências financeiras? Entre em contato: <a href="mailto:cfa@fam.br">cfa@fam.br</a></p>',
            textoCompleto: 'Para alunos que já cursaram pelo menos um semestre completo na FAM e interromperam a graduação, é possível solicitar a reabertura do curso. O processo é simples: inclui a realização de uma prova online, além da análise da grade curricular pela FAM, que informará em qual semestre o aluno poderá continuar e quais disciplinas serão aproveitadas. Taxa: A reabertura de matrícula tem o custo de R$ 50,00.',
            link: 'http://fam.inscricao.crmeducacional.com/Login/64',
            linkText: 'Reabrir Matrícula'
        }
    };

    
    // Função para alternar a visibilidade do texto completo
    function toggleSaibaMais(button) {
        const contentDiv = button.closest('.opcao-content');
        const opcaoItem = button.closest('.opcao-item');
        const titulo = opcaoItem.querySelector('h3').textContent;
        
        // Se for pós-graduação, redirecionar para posfam.com.br
        if (titulo === 'Pós-Graduação') {
            window.open('https://posfam.com.br', '_blank');
            return;
        }
        
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
                // On mobile, scroll the select into view so the generated details are visible
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        const navbar = document.querySelector('.navbar');
                        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
                        const extraOffset = 16;
                        const top = select.getBoundingClientRect().top + window.pageYOffset - navbarHeight - extraOffset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }, 120); // small delay to allow DOM insertion
                }
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
    const provaDeBolsas = document.querySelector('.provadebolsas');

    // Função para determinar qual desconto está ativo e atualizar interface
    function atualizarDescontoAtivo() {
        const hoje = new Date();
        const dezembro20 = new Date(2025, 11, 20, 23, 59, 59); // 20 de dezembro de 2025
    const janeiro31 = new Date(2026, 0, 31, 23, 59, 59); // 31 de janeiro de 2026
        const marco30 = new Date(2026, 2, 30, 23, 59, 59); // 30 de março de 2026
        
        let descontoAtivo = 30; // padrão
        let dataLimite = marco30; // desconto de 30% vai até 30/03/2026
        let proximoDesconto = null;
        
        if (hoje <= dezembro20) {
            descontoAtivo = 50;
            dataLimite = dezembro20;
            proximoDesconto = 40;
        } else if (hoje <= janeiro31) {
            descontoAtivo = 40;
            dataLimite = janeiro31;
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
                // If we're observing the desconto section, unobserve it after activation.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Começar a observar a seção de descontos
    if (descontoSection) {
        observer.observe(descontoSection);
    }
    // Observar a seção da prova de bolsas para aplicar fade-in
    if (provaDeBolsas) {
        const provaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    provaDeBolsas.classList.add('visible');
                    provaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25, rootMargin: '0px 0px -50px 0px' });

        provaObserver.observe(provaDeBolsas);
    }

    // Observe #tipodeinscricao to add fade-in class when visible
    const tipoDeInscricao = document.getElementById('tipodeinscricao');
    if (tipoDeInscricao) {
        const tipoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tipoDeInscricao.classList.add('visible');
                    tipoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        tipoObserver.observe(tipoDeInscricao);
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

// Efeito de digitação (typewriter) para elementos com classe .typewriter
function setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');

    // Per-element controller to support pause/resume when visibility changes
    const controllers = new WeakMap();

    function clearControllerTimers(ctrl) {
        if (!ctrl) return;
        if (ctrl.timeoutId) { clearTimeout(ctrl.timeoutId); ctrl.timeoutId = null; }
        if (ctrl.waitingTimeout) { clearTimeout(ctrl.waitingTimeout); ctrl.waitingTimeout = null; }
    }

    function startController(element, texts) {
        if (controllers.has(element)) return; // already created

        const ctrl = {
            texts: texts.slice(),
            currentIndex: 0,
            charIndex: 0,
            isVisible: false,
            timeoutId: null,
            waitingTimeout: null,
            speedType: 80,
            speedErase: 40,
            running: false
        };

        controllers.set(element, ctrl);

        // typing step
        function stepType() {
            if (!ctrl.isVisible) {
                // pause
                ctrl.running = false;
                return;
            }
            const text = ctrl.texts[ctrl.currentIndex];
            if (ctrl.charIndex < text.length) {
                element.textContent += text.charAt(ctrl.charIndex);
                ctrl.charIndex++;
                ctrl.timeoutId = setTimeout(stepType, ctrl.speedType);
            } else {
                // finished typing
                ctrl.charIndex = text.length;
                ctrl.waitingTimeout = setTimeout(() => {
                    // ensure still visible
                    if (!ctrl.isVisible) { ctrl.running = false; return; }
                    // start erasing
                    stepErase();
                }, ctrl.currentIndex === 0 ? 5000 : 3000);
            }
        }

        // erasing step
        function stepErase() {
            if (!ctrl.isVisible) { ctrl.running = false; return; }
            const currentText = element.textContent || '';
            if (currentText.length > 0) {
                element.textContent = currentText.substring(0, currentText.length - 1);
                ctrl.timeoutId = setTimeout(stepErase, ctrl.speedErase);
            } else {
                // move to next text after short pause
                ctrl.currentIndex = (ctrl.currentIndex + 1) % ctrl.texts.length;
                ctrl.charIndex = 0;
                ctrl.waitingTimeout = setTimeout(() => {
                    if (!ctrl.isVisible) { ctrl.running = false; return; }
                    stepType();
                }, 500);
            }
        }

        // start cycle when visible
        function startCycleIfNeeded() {
            if (ctrl.running) return;
            ctrl.running = true;
            // ensure empty before typing first time
            if (!element.textContent) {
                ctrl.charIndex = 0;
            }
            stepType();
        }

        // expose control actions
        ctrl.start = function() { ctrl.isVisible = true; startCycleIfNeeded(); };
        ctrl.pause = function() { ctrl.isVisible = false; clearControllerTimers(ctrl); ctrl.running = false; };

        return ctrl;
    }

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            let ctrl = controllers.get(element);
            if (!ctrl && element.dataset.text) {
                // parse texts (accept JSON array or single string)
                let texts;
                try { texts = JSON.parse(element.dataset.text); }
                catch (e) { texts = [element.dataset.text]; }
                ctrl = startController(element, texts);
            }

            if (!ctrl) return;

            if (entry.isIntersecting) {
                // resume/start
                element.classList.add('typewriter-started');
                ctrl.start();
            } else {
                // pause
                ctrl.pause();
            }
        });
    }, observerOptions);

    typewriterElements.forEach(element => {
        if (element.dataset.text) observer.observe(element);
    });
}