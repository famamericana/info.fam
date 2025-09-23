
// --- SCRIPT.JS - FORMULÁRIO DE CANDIDATURA ---

// --- CONFIGURAÇÃO ---
// Substitua pela URL real do seu Web App do Google Apps Script
const SCRIPT_URL_CANDIDATURA = 'https://script.google.com/macros/s/AKfycbweYRuLtrQXx9Y31GZOoqpf5GdLJf8VDwly85D4Ek7-RUhBDQV6PP8CnvJCwRQAZdGXgQ/exec';

// --- LÓGICA DE INTERFACE E ENVIO ---

document.addEventListener('DOMContentLoaded', function () {

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
    function setupAreaSelection(sectionId, maxSelecoes = 5) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const checkboxes = section.querySelectorAll('.area-checkbox');
        const counterText = section.querySelector('.areas-selected');

        if (checkboxes.length && counterText) {
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const checkedBoxes = section.querySelectorAll('.area-checkbox:checked');
                    const checkedCount = checkedBoxes.length;

                    counterText.textContent = `${checkedCount} área${checkedCount !== 1 ? 's' : ''} selecionada${checkedCount !== 1 ? 's' : ''}`;

                    counterText.classList.toggle('max-reached', checkedCount >= maxSelecoes);

                    checkboxes.forEach(cb => {
                        if (checkedCount >= maxSelecoes) {
                            if (!cb.checked) {
                                cb.disabled = true;
                                cb.parentElement.classList.add('disabled');
                            }
                        } else {
                            cb.disabled = false;
                            cb.parentElement.classList.remove('disabled');
                        }
                    });
                });
            });
        }
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

    // Inicializa os limites de seleção para ambas as seções
    setupAreaSelection('camposAdministrativo', 5); // Limite de 5 áreas para admin
    setupAreaSelection('camposDocente', 5);       // Limite de 5 áreas para docente

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
                // Se não houver arquivo
                if (tipoVaga === 'docente') {
                    // O arquivo é obrigatório para docentes
                    alert('O upload do currículo é obrigatório para vagas docentes.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    return;
                }
                // Para administrativo, envia sem arquivo
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
