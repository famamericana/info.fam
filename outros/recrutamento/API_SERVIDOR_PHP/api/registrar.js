// ============================================
// REGISTRAR - JAVASCRIPT
// FAM - Faculdade de Americana
// ============================================

const API_URL = 'https://famamericana.com.br/recrutamento/api';

// ============================================
// MÁSCARAS E VALIDAÇÕES
// ============================================

// Máscara de telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
    }
});

// ============================================
// INDICADOR DE FORÇA DA SENHA
// ============================================

document.getElementById('senha').addEventListener('input', function(e) {
    const senha = e.target.value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    if (senha.length === 0) {
        strengthBar.className = 'strength-bar-fill';
        strengthText.textContent = '';
        return;
    }

    let strength = 0;
    
    // Critérios de força
    if (senha.length >= 6) strength++;
    if (senha.length >= 8) strength++;
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) strength++;
    if (/\d/.test(senha)) strength++;
    if (/[^a-zA-Z0-9]/.test(senha)) strength++;

    // Classificar força
    if (strength <= 2) {
        strengthBar.className = 'strength-bar-fill strength-weak';
        strengthText.textContent = 'Senha fraca';
        strengthText.style.color = '#f44336';
    } else if (strength <= 3) {
        strengthBar.className = 'strength-bar-fill strength-medium';
        strengthText.textContent = 'Senha média';
        strengthText.style.color = '#ff9800';
    } else {
        strengthBar.className = 'strength-bar-fill strength-strong';
        strengthText.textContent = 'Senha forte';
        strengthText.style.color = '#4CAF50';
    }
});

// ============================================
// CADASTRO DE USUÁRIO
// ============================================

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coletar dados
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cargo = document.getElementById('cargo').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    // Validações
    if (senha !== confirmarSenha) {
        showAlert('As senhas não coincidem', 'error');
        return;
    }

    if (senha.length < 6) {
        showAlert('A senha deve ter no mínimo 6 caracteres', 'error');
        return;
    }

    if (!email.includes('@')) {
        showAlert('Digite um e-mail válido', 'error');
        return;
    }

    // Mostrar loading
    document.getElementById('loading').classList.add('show');
    document.getElementById('submitBtn').disabled = true;

    try {
        const response = await fetch(`${API_URL}/registrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                telefone,
                cargo,
                senha
            })
        });

        const data = await response.json();

        if (data.success) {
            showAlert(data.message, 'success');
            document.getElementById('registerForm').reset();
            
            // Resetar indicador de força da senha
            document.getElementById('strengthBar').className = 'strength-bar-fill';
            document.getElementById('strengthText').textContent = '';
            
            // Redirecionar para login após 3 segundos
            setTimeout(() => {
                window.location.href = 'painel-admin.html';
            }, 3000);
        } else {
            showAlert(data.error || 'Erro ao realizar cadastro', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showAlert('Erro ao conectar com o servidor', 'error');
    } finally {
        document.getElementById('loading').classList.remove('show');
        document.getElementById('submitBtn').disabled = false;
    }
});

// ============================================
// ALERTAS
// ============================================

function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
    
    // Scroll para o topo para ver o alerta
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
