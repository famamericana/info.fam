
// --- SCRIPT.JS - FORMULÁRIO DE CANDIDATURA ---

// --- CONFIGURAÇÃO ---
// Substitua pela URL real do seu Web App do Google Apps Script
const SCRIPT_URL_CANDIDATURA = 'https://script.google.com/macros/s/AKfycbxk6NUXtEVht1_ZEbGztKPGl0tYRO1-DkXgiEwaUSNn2SDU_ogGPIJ36pXHt3gqE-ASBA/exec';

// --- LÓGICA DE INTERFACE E ENVIO ---

document.addEventListener('DOMContentLoaded', function () {

    // --- CANVAS PARTICLE BACKGROUND ---
    // Creates a lightweight particle system on a canvas placed behind the body content.
    (function initParticleBackground() {
        // Respect reduced motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery && mediaQuery.matches) return;

        // Create canvas and insert as first child of body
        const canvas = document.createElement('canvas');
        canvas.id = 'bg-particles-canvas';
        canvas.style.position = 'fixed';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
    // keep canvas behind content
    canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.28';
        // place behind content but inside stacking context of body
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let particles = [];
        const maxParticles = 80; // modest number for performance

        function cssVar(name, fallback) {
            try {
                return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
            } catch (e) {
                return fallback;
            }
        }

        // use the theme primary color with slight variation
        const primary = cssVar('#f9e20f', '#f9e20f') || '#f9e20f';

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            width = canvas.clientWidth || window.innerWidth;
            height = canvas.clientHeight || window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            // Use setTransform to avoid accumulating scales on repeated resizes
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function rand(min, max) { return Math.random() * (max - min) + min; }

        function createParticle() {
            return {
                x: rand(0, width),
                y: rand(0, height),
                vx: rand(-0.2, 0.2),
                vy: rand(-0.15, 0.15),
                r: rand(1, 3.2),
                alpha: rand(0.12, 0.9),
                tw: rand(0.002, 0.008),
                t: rand(0, Math.PI * 2)
            };
        }

        function initParticles() {
            particles = new Array(maxParticles).fill(0).map(() => createParticle());
        }

        let mouse = { x: -9999, y: -9999 };
        window.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });

        function update(dt) {
            for (let p of particles) {
                // gentle drift
                p.x += p.vx * dt;
                p.y += p.vy * dt;

                // small sinusoidal motion
                p.t += p.tw * dt;
                p.x += Math.sin(p.t) * 0.12;

                // bounce edges
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

                // mouse repulsion
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    p.x += (dx / (dist || 1)) * force * 8;
                    p.y += (dy / (dist || 1)) * force * 8;
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            // subtle glow background circles
            for (let p of particles) {
                ctx.beginPath();
                ctx.fillStyle = `rgba(${hexToRgb(primary)}, ${p.alpha})`;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function hexToRgb(hex) {
            const h = hex.replace('#', '').trim();
            const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `${r}, ${g}, ${b}`;
        }

        let last = performance.now();
        function frame(now) {
            const dt = Math.min(60, now - last) / 16.67; // normalized to ~60fps
            last = now;
            update(dt);
            draw();
            requestAnimationFrame(frame);
        }

        // initialize
        resize();
        initParticles();
        window.addEventListener('resize', function () {
            // debounce small resizes
            clearTimeout(window._bgResizeTimeout);
            window._bgResizeTimeout = setTimeout(resize, 120);
        });

        // start loop
        requestAnimationFrame(frame);
    })();


    // --- Elementos do Formulário de Candidatura ---
    const formCandidatura = document.getElementById('candidaturaForm');
    const tipoVagaSelect = document.getElementById('tipoVaga');
    const camposComuns = document.getElementById('camposComuns');
    const camposAdmin = document.getElementById('camposAdministrativo');
    const camposDocente = document.getElementById('camposDocente');
    const modalCandidatura = document.getElementById('successModalCandidatura');
    const telefoneInputCandidatura = document.getElementById('telefoneCandidatura');

    // --- Funções Auxiliares ---

    /**
     * Aplica máscara de CPF (xxx.xxx.xxx-xx)
     * @param {HTMLInputElement} input - O campo de input do CPF
     */
    function aplicarMascaraCPF(input) {
        if (!input) return;

        input.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            let formattedValue = '';
            if (value.length <= 3) {
                formattedValue = value;
            } else if (value.length <= 6) {
                formattedValue = `${value.substring(0, 3)}.${value.substring(3)}`;
            } else if (value.length <= 9) {
                formattedValue = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6)}`;
            } else {
                formattedValue = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9)}`;
            }
            this.value = formattedValue;
        });

        input.addEventListener('blur', function () {
            const regex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
            if (this.value && !regex.test(this.value)) {
                this.setCustomValidity('Por favor, digite um CPF completo no formato xxx.xxx.xxx-xx');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    /**
     * Aplica máscara de telefone (xx) xxxxx-xxxx
     * @param {HTMLInputElement} input - O campo de input do telefone
     */
    function aplicarMascaraTelefone(input) {
        if (!input) return;

        input.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            let formattedValue = '';
            if (value.length <= 2) {
                formattedValue = value;
            } else if (value.length <= 7) {
                formattedValue = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else {
                formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            }
            this.value = formattedValue;
        });

        input.addEventListener('blur', function () {
            const regex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;
            if (this.value && !regex.test(this.value)) {
                this.setCustomValidity('Por favor, digite um telefone completo no formato (xx) xxxxx-xxxx');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    /**
     * Configura o limite de seleção de áreas de interesse
     * @param {string} sectionId - ID da seção que contém os checkboxes
     * @param {number} maxSelecoes - Número máximo de seleções permitidas
     */
    function setupAreaSelection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const checkboxes = section.querySelectorAll('.area-checkbox');
        const counterText = section.querySelector('.areas-selected');

        if (checkboxes.length && counterText) {
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const checkedBoxes = section.querySelectorAll('.area-checkbox:checked');
                    const checkedCount = checkedBoxes.length;

                    // Mostrar contador atual — sem limite e sem desabilitar checkboxes
                    counterText.textContent = `${checkedCount} área${checkedCount !== 1 ? 's' : ''} selecionada${checkedCount !== 1 ? 's' : ''}`;
                    counterText.classList.remove('max-reached');
                });
            });
        }
    }

    /**
     * Valida o formulário e habilita/desabilita o botão de submit
     */
    function validateForm() {
        const submitButton = formCandidatura.querySelector('.submit-button');
        if (!submitButton) return;

        const tipoVaga = tipoVagaSelect.value;
        if (!tipoVaga) {
            submitButton.disabled = true;
            return;
        }

        // Campos comuns
        const nome = document.getElementById('nomeCompleto').value.trim();
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefoneCandidatura').value;
        const email = document.getElementById('email').value.trim();
        const endereco = document.getElementById('endereco').value.trim();

        // Basic presence checks (masks provide format guidance)
        if (!nome || !cpf || !telefone || !email || !endereco) {
            submitButton.disabled = true;
            return;
        }

        // Áreas de interesse
        let areasSelecionadas = 0;
        if (tipoVaga === 'administrativo') {
            areasSelecionadas = document.querySelectorAll('#camposAdministrativo .area-checkbox:checked').length;
            // arquivo obrigatório para administrativo
            const fileInput = document.getElementById('arquivoAdmin');
            if (areasSelecionadas === 0 || !fileInput || !fileInput.files[0]) {
                submitButton.disabled = true;
                return;
            }
        } else if (tipoVaga === 'docente') {
            areasSelecionadas = document.querySelectorAll('#camposDocente .area-checkbox:checked').length;
            // Para docente o arquivo é opcional — apenas precisa ter pelo menos uma área selecionada
            if (areasSelecionadas === 0) {
                submitButton.disabled = true;
                return;
            }
        }

        submitButton.disabled = false;
    }

    /**
     * Mostra/esconde campos com base no tipo de vaga selecionado
     */
    function atualizarVisibilidadeCampos() {
        const tipo = tipoVagaSelect.value;
        camposComuns.style.display = tipo ? 'block' : 'none';
        camposAdmin.style.display = tipo === 'administrativo' ? 'block' : 'none';
        camposDocente.style.display = tipo === 'docente' ? 'block' : 'none';

        // Resetar seleções e estados anteriores
        document.querySelectorAll('#camposAdministrativo .areas-selected, #camposDocente .areas-selected').forEach(el => {
            el.textContent = '0 áreas selecionadas';
            el.classList.remove('max-reached');
        });
        document.querySelectorAll('.area-checkbox').forEach(cb => {
            cb.checked = false;
            cb.disabled = false;
            cb.parentElement.classList.remove('disabled');
        });

        validateForm();
    }

    /**
     * Fecha o modal de sucesso
     */
    function fecharModal() {
        if (modalCandidatura) {
            modalCandidatura.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // --- Inicialização ---

    // Aplica máscara de telefone
    if (telefoneInputCandidatura) {
        aplicarMascaraTelefone(telefoneInputCandidatura);
    }

    // Aplica máscara de CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        aplicarMascaraCPF(cpfInput);
    }

    // Configura a mudança de tipo de vaga
    if (tipoVagaSelect) {
        tipoVagaSelect.addEventListener('change', atualizarVisibilidadeCampos);
    }

    // Inicializa seleção de áreas (agora sem limite)
    setupAreaSelection('camposAdministrativo');
    setupAreaSelection('camposDocente');

    // Validação inicial
    validateForm();

    // Adiciona listeners para validação
    tipoVagaSelect.addEventListener('change', validateForm);
    document.getElementById('nomeCompleto').addEventListener('input', validateForm);
    document.getElementById('cpf').addEventListener('input', validateForm);
    document.getElementById('telefoneCandidatura').addEventListener('input', validateForm);
    document.getElementById('email').addEventListener('input', validateForm);
    document.getElementById('endereco').addEventListener('input', validateForm);
    document.querySelectorAll('.area-checkbox').forEach(cb => cb.addEventListener('change', validateForm));
    document.getElementById('arquivoAdmin').addEventListener('change', validateForm);
    document.getElementById('arquivoDocente').addEventListener('change', validateForm);

    // --- Envio do Formulário ---

    if (formCandidatura) {
        formCandidatura.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitButton = this.querySelector('.submit-button');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            const tipoVaga = this.tipoVaga.value;
            if (!tipoVaga) {
                alert('Por favor, selecione o tipo de vaga.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }

            const formData = new FormData(this);
            const formObject = {};

            // Processa campos de texto, email, tel, etc.
            for (const [key, value] of formData.entries()) {
                // Trata campos de checkbox (áreas de interesse) como arrays
                if (key === 'areaInteresseAdmin' || key === 'areaInteresseDocente') {
                    if (!formObject[key]) {
                        formObject[key] = [];
                    }
                    formObject[key].push(value);
                } else {
                    // Para outros campos, pega o último valor
                    formObject[key] = value;
                }
            }
            formObject.tipoVaga = tipoVaga;

            // Processa o arquivo
            const fileInput = this.querySelector(`input[type="file"][name="arquivo"]`);
            if (fileInput && fileInput.files[0]) {
                const file = fileInput.files[0];

                // Validação de tamanho (ex: 5MB)
                const maxSizeMB = 5;
                if (file.size > maxSizeMB * 1024 * 1024) {
                    alert(`O arquivo é muito grande. O tamanho máximo é ${maxSizeMB}MB.`);
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    return;
                }

                // Validação de tipo
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                if (!validTypes.includes(file.type)) {
                    alert('Tipo de arquivo inválido. Permitidos: PDF, DOC, DOCX.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (event) {
                    formObject.arquivo = {
                        name: file.name,
                        type: file.type,
                        data: event.target.result // Base64
                    };
                    enviarDados(formObject, submitButton, originalButtonText);
                };
                reader.onerror = function (error) {
                    console.error('Erro ao ler o arquivo:', error);
                    alert('Erro ao ler o arquivo. Tente novamente.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                };
                reader.readAsDataURL(file); // Lê como Data URL (Base64)
            } else {
                // Se não houver arquivo: tornamos o arquivo obrigatório apenas para Administrativo
                if (tipoVaga === 'administrativo') {
                    alert('O upload do currículo é obrigatório para vagas administrativas.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    return;
                }
                // Para docente, envio sem arquivo é permitido
                enviarDados(formObject, submitButton, originalButtonText);
            }
        });
    }

    /**
     * Envia os dados coletados para o Google Apps Script
     * @param {Object} dataToSend - Objeto contendo os dados do formulário
     * @param {HTMLButtonElement} button - Botão de submit
     * @param {string} originalText - Texto original do botão
     */
    function enviarDados(dataToSend, button, originalText) {
        fetch(SCRIPT_URL_CANDIDATURA, {
            method: 'POST',
            mode: 'no-cors', // Crucial para evitar CORS de sites externos
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                // Com mode: 'no-cors', não conseguimos ler a resposta real.
                // Mas se chegou aqui sem erro de rede, assumimos sucesso.
                console.log('Formulário de candidatura enviado com sucesso (ou requisição feita).');
                formCandidatura.reset();
                atualizarVisibilidadeCampos(); // Reseta visibilidade dos campos

                button.disabled = false;
                button.textContent = originalText;

                // Mostra modal de sucesso
                if (modalCandidatura) {
                    modalCandidatura.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            })
            .catch(error => {
                console.error('Erro ao enviar formulário de candidatura:', error);
                alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.");
                button.disabled = false;
                button.textContent = originalText;
            });
    }

    // --- Modal de Sucesso ---

    if (modalCandidatura) {
        const closeBtn = modalCandidatura.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', fecharModal);
        }
        window.addEventListener('click', function (event) {
            if (event.target === modalCandidatura) {
                fecharModal();
            }
        });
    }

});


$(document).ready(function () {
    // Use relative paths because leading "/" points to site root and breaks when opened from a nested folder or file://
    $("#meuFooter").load("../../codigos-gerais/footer/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    // Use relative path to load navbar from the project's codigos-gerais folder
    $("#Navbar").load("../../codigos-gerais/navbar-fam/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado, if available
        if (typeof setupDropdown === 'function') {
            setupDropdown();
        }
    });
});


//https forçar -------------------------------------------------------------------------------------------------------------------------------
// Only force HTTPS when the page is loaded over plain http and not when using file:// or localhost
if (location.protocol === 'http:' && !location.hostname.startsWith('127.0') && location.hostname !== 'localhost') {
    try {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    } catch (e) {
        // ignore redirect errors in restricted environments
        console.warn('HTTPS redirect suppressed:', e);
    }
}
