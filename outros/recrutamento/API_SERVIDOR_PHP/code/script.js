// ============================================
// PAINEL ADMIN - JAVASCRIPT
// FAM - Faculdade de Americana
// ============================================

// CONFIGURAÇÃO - AJUSTE A URL DA API
const API_URL = 'https://famamericana.com.br/recrutamento/api';

let authToken = localStorage.getItem('authToken');
let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
let isUserAdmin = false;

// ============================================
// INICIALIZAÇÃO
// ============================================

// Função mostrarSecaoVagas
function mostrarSecaoVagas() {
    document.querySelector('.login-section').classList.remove('active');
    document.querySelector('.vagas-section').classList.add('active');
    document.getElementById('userName').textContent = currentUser.nome;
    document.getElementById('userEmail').textContent = currentUser.email;
    
    // Verificar se é admin
    const isAdminStorage = localStorage.getItem('isUserAdmin');
    if (isAdminStorage !== null) {
        isUserAdmin = isAdminStorage === '1';
    } else {
        isUserAdmin = currentUser.isAdmin === true || currentUser.isAdmin === 1 || 
                      currentUser.id == 1 || currentUser.email == 'rh@fam.br';
        localStorage.setItem('isUserAdmin', isUserAdmin ? '1' : '0');
    }
    
    if (isUserAdmin) {
        document.getElementById('tabsContainer').style.display = 'flex';
        document.getElementById('statsContainer').style.display = 'block';
        
        setTimeout(() => {
            if (typeof carregarUsuarios === 'function') carregarUsuarios();
            if (typeof carregarEstatisticas === 'function') carregarEstatisticas();
        }, 0);
    }
    
    carregarVagas();
}

// Verificar se já está logado
if (authToken && currentUser.id) {
    mostrarSecaoVagas();
}

// ============================================
// LOGIN E LOGOUT
// ============================================

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (data.success) {
            authToken = data.token;
            currentUser = data.usuario;
            isUserAdmin = data.usuario.isAdmin;
            
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('isUserAdmin', isUserAdmin ? '1' : '0');
            
            mostrarSecaoVagas();
        } else {
            mostrarAlerta('loginAlert', data.error, 'error');
        }
    } catch (error) {
        mostrarAlerta('loginAlert', 'Erro ao fazer login', 'error');
    }
});

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isUserAdmin');
    location.reload();
}

// ============================================
// VAGAS
// ============================================

async function carregarVagas() {
    try {
        const url = `${API_URL}/vagas?user_id=${currentUser.id}&is_admin=${isUserAdmin ? '1' : '0'}&_t=${Date.now()}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const data = await response.json();

        if (data.success) {
            renderizarVagas(data.vagas);
        }
    } catch (error) {
        mostrarAlerta('vagasAlert', 'Erro ao carregar vagas', 'error');
    }
}

function renderizarVagas(vagas) {
    const container = document.getElementById('vagasList');
    
    if (vagas.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray-600);">Nenhuma vaga cadastrada ainda.</p>';
        return;
    }

    container.innerHTML = vagas.map(vaga => {
        // Usuário só pode editar/desativar suas próprias vagas
        const podeEditar = vaga.criado_por == currentUser.id;
        const criadorInfo = vaga.criador_nome ? `<span class="badge" style="background: var(--info); color: white;"><i class="fas fa-user"></i> ${vaga.criador_nome}</span>` : '';
        
        return `
        <div class="vaga-item">
            <div class="vaga-item-header">
                <div>
                    <h3 class="vaga-item-title">${vaga.titulo}</h3>
                    <div>
                        <span class="badge badge-${vaga.tipo}">
                            <i class="fas fa-${vaga.tipo === 'docente' ? 'chalkboard-teacher' : 'briefcase'}"></i>
                            ${vaga.tipo === 'docente' ? 'Docente' : 'Administrativo'}
                        </span>
                        ${isUserAdmin ? criadorInfo : ''}
                    </div>
                </div>
                <div class="vaga-item-actions">
                    ${podeEditar ? `
                        <button class="btn btn-primary" onclick='editarVaga(${JSON.stringify(vaga)})'>
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-danger" onclick="desativarVaga(${vaga.id})">
                            <i class="fas fa-trash"></i> Deletar
                        </button>
                    ` : '<span style="color: var(--gray-600); font-size: 0.875rem;"><i class="fas fa-lock"></i> Somente leitura</span>'}
                </div>
            </div>
            <p>${vaga.descricao.substring(0, 150)}...</p>
        </div>
    `;
    }).join('');
}

function abrirModalNovaVaga() {
    document.getElementById('modalTitle').textContent = 'Nova Vaga';
    document.getElementById('vagaForm').reset();
    document.getElementById('vagaId').value = '';
    document.getElementById('vagaModal').classList.add('active');
}

function editarVaga(vaga) {
    document.getElementById('modalTitle').textContent = 'Editar Vaga';
    document.getElementById('vagaId').value = vaga.id;
    document.getElementById('vagaTitulo').value = vaga.titulo;
    document.getElementById('vagaTipo').value = vaga.tipo;
    document.getElementById('vagaDescricao').value = vaga.descricao;
    document.getElementById('vagaRequisitos').value = vaga.requisitos || '';
    document.getElementById('vagaDiferenciais').value = vaga.diferenciais || '';
    document.getElementById('vagaRegime').value = vaga.regime || '';
    document.getElementById('vagaJornada').value = vaga.jornada || '';
    document.getElementById('vagaLocal').value = vaga.local || '';
    document.getElementById('vagaSalario').value = vaga.salario || '';
    document.getElementById('vagaModal').classList.add('active');
}

function fecharModal() {
    document.getElementById('vagaModal').classList.remove('active');
}

document.getElementById('vagaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const vagaId = document.getElementById('vagaId').value;
    const vagaData = {
        titulo: document.getElementById('vagaTitulo').value,
        tipo: document.getElementById('vagaTipo').value,
        descricao: document.getElementById('vagaDescricao').value,
        requisitos: document.getElementById('vagaRequisitos').value,
        diferenciais: document.getElementById('vagaDiferenciais').value,
        regime: document.getElementById('vagaRegime').value,
        jornada: document.getElementById('vagaJornada').value,
        local: document.getElementById('vagaLocal').value,
        salario: document.getElementById('vagaSalario').value,
        criado_por: currentUser.id,
        user_id: currentUser.id
    };

    try {
        const url = vagaId ? `${API_URL}/vaga?id=${vagaId}` : `${API_URL}/vaga`;
        const method = vagaId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(vagaData)
        });

        const data = await response.json();

        if (data.success) {
            mostrarAlerta('vagasAlert', vagaId ? 'Vaga atualizada com sucesso!' : 'Vaga criada com sucesso!', 'success');
            fecharModal();
            carregarVagas();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erro ao salvar vaga');
    }
});

async function desativarVaga(id) {
    if (!confirm('Deseja realmente deletar esta vaga?')) return;

    try {
        const response = await fetch(`${API_URL}/vaga?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        });

        const data = await response.json();

        if (data.success) {
            mostrarAlerta('vagasAlert', 'Vaga deletada com sucesso!', 'success');
            carregarVagas();
        }
    } catch (error) {
        alert('Erro ao deletar vaga');
    }
}

// ============================================
// TABS
// ============================================

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    if (tab === 'vagas') {
        document.getElementById('vagasTab').classList.add('active');
        carregarVagas();
    } else if (tab === 'usuarios') {
        document.getElementById('usuariosTab').classList.add('active');
        carregarUsuarios();
    }
}

// ============================================
// USUÁRIOS
// ============================================

async function carregarUsuarios() {
    if (!isUserAdmin) return;
    
    try {
        const response = await fetch(`${API_URL}/usuarios-pendentes?_t=${Date.now()}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const data = await response.json();

        if (data.success) {
            renderizarUsuarios(data.usuarios);
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

function renderizarUsuarios(usuarios) {
    const container = document.getElementById('usuariosList');
    
    if (usuarios.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray-600);">Nenhum usuário para gerenciar.</p>';
        return;
    }
    
    const pendentes = usuarios.filter(u => u.status === 'pendente');
    const aprovados = usuarios.filter(u => u.status === 'aprovado');
    const rejeitados = usuarios.filter(u => u.status === 'rejeitado');
    
    let html = '';
    
    if (pendentes.length > 0) {
        html += '<h3 style="color: var(--warning); margin: 2rem 0 1rem 0;"><i class="fas fa-clock"></i> Pendentes de Aprovação (' + pendentes.length + ')</h3>';
        pendentes.forEach(usuario => html += renderizarUsuarioItem(usuario));
    }
    
    if (aprovados.length > 0) {
        html += '<h3 style="color: var(--success); margin: 2rem 0 1rem 0;"><i class="fas fa-check-circle"></i> Aprovados (' + aprovados.length + ')</h3>';
        aprovados.forEach(usuario => html += renderizarUsuarioItem(usuario));
    }
    
    if (rejeitados.length > 0) {
        html += '<h3 style="color: var(--danger); margin: 2rem 0 1rem 0;"><i class="fas fa-times-circle"></i> Rejeitados (' + rejeitados.length + ')</h3>';
        rejeitados.forEach(usuario => html += renderizarUsuarioItem(usuario));
    }
    
    container.innerHTML = html;
}

function renderizarUsuarioItem(usuario) {
    const statusBadge = {
        'pendente': '<span class="badge-status badge-pendente"><i class="fas fa-clock"></i> Pendente</span>',
        'aprovado': '<span class="badge-status badge-aprovado"><i class="fas fa-check-circle"></i> Aprovado</span>',
        'rejeitado': '<span class="badge-status badge-rejeitado"><i class="fas fa-times-circle"></i> Rejeitado</span>'
    }[usuario.status];
    
    const adminBadge = usuario.is_admin ? '<span class="badge-status" style="background: var(--info); color: white;"><i class="fas fa-user-shield"></i> Admin</span>' : '';
    
    let actions = '';
    
    if (usuario.status === 'pendente') {
        actions = `
            <button class="btn btn-success" onclick="aprovarUsuario(${usuario.id})"><i class="fas fa-check"></i> Aprovar</button>
            <button class="btn btn-danger" onclick="abrirModalRejeitar(${usuario.id})"><i class="fas fa-times"></i> Rejeitar</button>
        `;
    } else if (usuario.status === 'aprovado') {
        if (usuario.is_admin) {
            actions = `<button class="btn btn-secondary" onclick="removerAdmin(${usuario.id})"><i class="fas fa-arrow-down"></i> Remover Admin</button>`;
        } else {
            actions = `<button class="btn" style="background: var(--info); color: white;" onclick="promoverAdmin(${usuario.id})"><i class="fas fa-arrow-up"></i> Promover a Admin</button>`;
        }
    }
    
    return `
        <div class="usuario-item ${usuario.status}">
            <div class="usuario-header">
                <div>
                    <h3 class="usuario-nome">${usuario.nome}</h3>
                    ${statusBadge} ${adminBadge}
                </div>
                <div class="usuario-actions">${actions}</div>
            </div>
            <div class="usuario-info">
                <div class="usuario-info-item"><strong>E-mail:</strong> ${usuario.email}</div>
                <div class="usuario-info-item"><strong>Telefone:</strong> ${usuario.telefone || 'Não informado'}</div>
                <div class="usuario-info-item"><strong>Cargo:</strong> ${usuario.cargo || 'Não informado'}</div>
                <div class="usuario-info-item"><strong>Cadastrado em:</strong> ${usuario.criado_em}</div>
            </div>
        </div>
    `;
}

async function aprovarUsuario(usuarioId) {
    if (!confirm('Deseja aprovar este usuário?')) return;
    
    try {
        const response = await fetch(`${API_URL}/aprovar-usuario`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario_id: usuarioId, admin_id: currentUser.id })
        });

        const data = await response.json();

        if (data.success) {
            mostrarAlerta('vagasAlert', '<i class="fas fa-check-circle"></i> Usuário aprovado!', 'success');
            carregarUsuarios();
            carregarEstatisticas();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erro ao aprovar usuário');
    }
}

function abrirModalRejeitar(usuarioId) {
    document.getElementById('rejeitarUsuarioId').value = usuarioId;
    document.getElementById('motivoRejeicao').value = '';
    document.getElementById('rejeitarModal').classList.add('active');
}

function fecharModalRejeitar() {
    document.getElementById('rejeitarModal').classList.remove('active');
}

document.getElementById('rejeitarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const usuarioId = document.getElementById('rejeitarUsuarioId').value;
    const motivo = document.getElementById('motivoRejeicao').value;
    
    try {
        const response = await fetch(`${API_URL}/rejeitar-usuario`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario_id: usuarioId, motivo: motivo })
        });

        const data = await response.json();

        if (data.success) {
            mostrarAlerta('vagasAlert', '<i class="fas fa-times-circle"></i> Usuário rejeitado.', 'success');
            fecharModalRejeitar();
            carregarUsuarios();
            carregarEstatisticas();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erro ao rejeitar usuário');
    }
});

async function promoverAdmin(usuarioId) {
    if (!confirm('Deseja promover este usuário a Administrador?')) return;
    
    try {
        const response = await fetch(`${API_URL}/promover-admin`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario_id: usuarioId, admin_id: currentUser.id })
        });

        const data = await response.json();

        if (data.success) {
            mostrarAlerta('vagasAlert', '<i class="fas fa-arrow-up"></i> Usuário promovido a Administrador!', 'success');
            carregarUsuarios();
            carregarEstatisticas();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erro ao promover usuário');
    }
}

async function removerAdmin(usuarioId) {
    if (!confirm('Deseja remover os privilégios de administrador deste usuário?')) return;
    
    try {
        const response = await fetch(`${API_URL}/remover-admin`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario_id: usuarioId, admin_id: currentUser.id })
        });

        const data = await response.json();

        if (data.success) {
            mostrarAlerta('vagasAlert', '<i class="fas fa-arrow-down"></i> Privilégios removidos.', 'success');
            carregarUsuarios();
            carregarEstatisticas();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erro ao remover privilégios');
    }
}

// ============================================
// ESTATÍSTICAS
// ============================================

async function carregarEstatisticas() {
    if (!isUserAdmin) return;
    
    try {
        const vagasResponse = await fetch(`${API_URL}/vagas?_t=${Date.now()}`, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const vagasData = await vagasResponse.json();
        
        const usuariosResponse = await fetch(`${API_URL}/usuarios-pendentes?_t=${Date.now()}`, {
            headers: { 
                'Authorization': `Bearer ${authToken}`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const usuariosData = await usuariosResponse.json();
        
        if (vagasData.success && usuariosData.success) {
            const vagasAtivas = vagasData.vagas.length;
            const usuariosPendentes = usuariosData.usuarios.filter(u => u.status === 'pendente').length;
            const admins = usuariosData.usuarios.filter(u => u.is_admin).length;
            
            document.getElementById('statVagasAtivas').textContent = vagasAtivas;
            document.getElementById('statPendentes').textContent = usuariosPendentes;
            document.getElementById('statAdmins').textContent = admins;
        }
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// ============================================
// UTILIDADES
// ============================================

function mostrarAlerta(containerId, mensagem, tipo) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="alert alert-${tipo}">${mensagem}</div>`;
    setTimeout(() => container.innerHTML = '', 5000);
}
