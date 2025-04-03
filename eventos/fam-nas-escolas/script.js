// Force HTTPS
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// Load components
$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
    $("#Navbar").load("/codigos-gerais/navbar-invertido/navbar.html", function () {
        // Add active class to current nav item
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    
    // Date picker setup
    const dataInput = document.getElementById('data');
    if (dataInput) {
        // Set min date to today
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.min = hoje;
        
        // Validate weekdays only
        dataInput.addEventListener('change', function() {
            const valorOriginal = this.value;
            const data = new Date(this.value + "T12:00:00");
            const diaSemana = data.getDay();
            

            // Use a condição correta
            if (diaSemana === 0 || diaSemana === 6) {
                alert('Por favor, selecione um dia útil (segunda a sexta-feira).');
                this.value = '';
            }
        });
    }
    
    // Time picker validation
    const horarioInput = document.getElementById('horario');
    if (horarioInput) {
        horarioInput.addEventListener('change', function() {
            const horario = this.value;
            const [horas, minutos] = horario.split(':').map(Number);
            
          
        });
    }
    
    // Phone mask - CORRECTED VERSION
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            // Get input value and remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Limit to max 11 digits
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Format the phone number
            let formattedValue = '';
            
            if (value.length <= 2) {
                // Just the area code digits
                formattedValue = value;
            } else if (value.length <= 7) {
                // Format as (XX) XXXXX
                formattedValue = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else {
                // Format as (XX) XXXXX-XXXX
                formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            }
            
            // Update the input value
            this.value = formattedValue;
        });
        
        // Validate on blur
        telefoneInput.addEventListener('blur', function() {
            const regex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;
            
            if (this.value && !regex.test(this.value)) {
                this.setCustomValidity('Por favor, digite um telefone completo no formato (xx) xxxxx-xxxx');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Theme checkboxes limit
    const themeCheckboxes = document.querySelectorAll('.theme-checkbox');
    const themesSelectedText = document.querySelector('.themes-selected');
    
    if (themeCheckboxes.length) {
        themeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedBoxes = document.querySelectorAll('.theme-checkbox:checked');
                const checkedCount = checkedBoxes.length;
                
                // Update counter text
                themesSelectedText.textContent = `${checkedCount} tema${checkedCount !== 1 ? 's' : ''} selecionado${checkedCount !== 1 ? 's' : ''} (máximo 2)`;
                
                // Apply or remove max-reached class
                themesSelectedText.classList.toggle('max-reached', checkedCount >= 2);
                
                // Enable/disable checkboxes based on selection count
                themeCheckboxes.forEach(cb => {
                    if (checkedCount >= 2) {
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
    
    // Form submission
    const form = document.getElementById('participationForm');
    const modal = document.getElementById('successModal');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formObject = {};
            
            // Process text inputs
            const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], input[type="time"], textarea');
            textInputs.forEach(input => {
                formObject[input.name] = input.value;
            });
            
            // Format date and time together
            if (formObject.data && formObject.horario) {
                // Converter data de yyyy-mm-dd para dd/mm/yyyy
                const dateParts = formObject.data.split('-');
                const dataBR = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                
                const horarioBR = formObject.horario.replace(/(\d{2}):(\d{2})/, '$1h$2');
                formObject.data_horario = `${dataBR} às ${horarioBR}`;
            }
            
            // Process theme checkboxes
            const checkedThemes = Array.from(form.querySelectorAll('.theme-checkbox:checked'))
                .map(checkbox => checkbox.value);
            formObject.temas = checkedThemes.join(', ');
            
            // Add timestamp
            formObject.dataSubmissao = new Date().toLocaleDateString('pt-BR');
            
            // Disable submit button during submission
            const submitButton = form.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando...';
            
            // Substitua pela URL real do seu Google Apps Script Web App
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbzaDcfRXy-Z39Jt9zzjRg3uWXViTBc5HBr_q5-SKDGp_D-vY4zpW9bGoVBwIym5-uqYuQ/exec';
            
            // Send to Google Sheets
            fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                body: JSON.stringify(formObject)
            })
            .then(response => {
                console.log('Formulário enviado com sucesso');
                
                // Reset form
                form.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Solicitação';
                
                // Reset theme checkboxes state
                themesSelectedText.textContent = '0 temas selecionados (máximo 2)';
                themesSelectedText.classList.remove('max-reached');
                themeCheckboxes.forEach(cb => {
                    cb.disabled = false;
                    cb.parentElement.classList.remove('disabled');
                });
                
                // Show success modal
                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            })
            .catch(error => {
                console.error('Erro ao enviar formulário:', error);
                alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.");
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Solicitação';
            });
        });
        
        // Modal close handlers
        if (modal) {
            // Close button
            const closeBtn = document.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                });
            }
            
            // Click outside modal
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
    
    // Create placeholders for missing images
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    imagePlaceholders.forEach(placeholder => {
        if (!placeholder.querySelector('img')) {
            placeholder.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f0f0f0;">
                    <i class="fas fa-image" style="font-size: 3rem; color: #ccc;"></i>
                </div>
            `;
        }
    });
});
