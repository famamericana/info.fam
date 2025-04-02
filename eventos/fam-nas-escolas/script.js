// Force HTTPS
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// Load components
$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
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
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Elements to animate
    const elementsToAnimate = document.querySelectorAll('.section-title, .section-subtitle, .theme-item, .benefit-card');
    
    // Add animation class when element is in viewport
    function checkVisibility() {
        elementsToAnimate.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'fadeInUp 0.8s ease forwards';
                // Add delay for sequential items
                if (element.classList.contains('theme-item') || element.classList.contains('benefit-card')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    element.style.animationDelay = `${0.1 * index}s`;
                }
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
});

// Form submission to Google Sheets
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('participationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formObject = {};
            
            // Process text inputs
            const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
            textInputs.forEach(input => {
                formObject[input.name] = input.value;
            });
            
            // Process checkboxes for themes (collect checked values)
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
                
                    // Show success message
                    form.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle" style="font-size: 3rem; color: #2d559a; margin-bottom: 20px;"></i>
                            <h3>Solicitação Enviada com Sucesso!</h3>
                            <p>Agradecemos seu interesse. Nossa equipe entrará em contato em breve.</p>
                        </div>
                    `;
                    
                    // Scroll to success message
                    window.scrollTo({
                        top: form.offsetTop - 100,
                        behavior: 'smooth'
                    });
                })
                .catch(error => {
                    console.error('Erro ao enviar formulário:', error);
                    alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.");
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Enviar Solicitação';
                });
            });
        }
    });
    
    // Create a placeholder for images if they don't exist yet
    document.addEventListener('DOMContentLoaded', function() {
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
    
    // Limit theme selection to maximum 2
    document.addEventListener('DOMContentLoaded', function() {
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
            if (checkedCount >= 2) {
              themesSelectedText.classList.add('max-reached');
            } else {
              themesSelectedText.classList.remove('max-reached');
            }
            
            // Disable unchecked checkboxes if max reached
            if (checkedCount >= 2) {
              themeCheckboxes.forEach(cb => {
                if (!cb.checked) {
                  cb.disabled = true;
                  cb.parentElement.classList.add('disabled');
                }
              });
            } else {
              // Enable all checkboxes if under max
              themeCheckboxes.forEach(cb => {
                cb.disabled = false;
                cb.parentElement.classList.remove('disabled');
              });
            }
          });
        });
      }
    });
    
    // Máscara para o campo de telefone
    document.addEventListener('DOMContentLoaded', function() {
      const telefoneInput = document.getElementById('telefone');
      
      if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
          let value = e.target.value;
          
          // Remove todos os caracteres não numéricos
          value = value.replace(/\D/g, '');
          
          // Aplica a máscara conforme o usuário digita
          if (value.length <= 11) {
            // Formata como (xx) xxxxx-xxxx
            if (value.length > 2) {
              value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            }
            if (value.length > 10) {
              value = value.substring(0, 10) + '-' + value.substring(10);
            }
          }
          
          // Atualiza o valor do campo
          e.target.value = value;
        });
        
        // Valida quando o usuário sai do campo
        telefoneInput.addEventListener('blur', function(e) {
          const value = e.target.value;
          const regex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;
          
          if (value && !regex.test(value)) {
            telefoneInput.setCustomValidity('Por favor, digite um telefone no formato (xx) xxxxx-xxxx');
          } else {
            telefoneInput.setCustomValidity('');
          }
        });
      }
    });
    
    // Inicialização do calendário para seleção de data e hora
    document.addEventListener('DOMContentLoaded', function() {
      const dataHorarioInput = document.getElementById('data_horario');
      
      if (dataHorarioInput && typeof flatpickr === 'function') {
        // Configuração do Flatpickr
        flatpickr(dataHorarioInput, {
          enableTime: true,         // Habilita seleção de hora
          dateFormat: "d/m/Y H:i",  // Formato brasileiro de data
          minDate: "today",         // Não permite datas passadas
          locale: "pt",             // Localização para português
          time_24hr: true,          // Formato 24h
          minuteIncrement: 30,      // Incrementos de 30 minutos
          allowInput: false,        // Não permite digitação direta
          disableMobile: false,     // Mantém o calendário em dispositivos móveis
          
          // Desabilita fins de semana e horários fora do expediente
          disable: [
            function(date) {
              // Desabilita sábados e domingos
              return (date.getDay() === 0 || date.getDay() === 6);
            }
          ],
          
          // Limita os horários entre 8h e 18h
          minTime: "08:00",
          maxTime: "18:00",
          
          // Placeholder personalizado
          placeholder: "Selecione data e horário preferenciais"
        });
        
        // Abre o calendário quando o ícone é clicado
        const calendarIcon = document.querySelector('.calendar-icon');
        if (calendarIcon) {
          calendarIcon.addEventListener('click', function() {
            dataHorarioInput._flatpickr.open();
          });
        }
      }
    });
    