<?php
require_once 'config.php';
require_once 'email.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '/';

// Roteamento simples
switch ($path) {
    case '/vagas':
        if ($method === 'GET') {
            listarVagas();
        }
        break;
    
    case '/vaga':
        if ($method === 'POST') {
            criarVaga();
        } elseif ($method === 'PUT') {
            atualizarVaga();
        } elseif ($method === 'DELETE') {
            deletarVaga();
        }
        break;
    
    case '/login':
        if ($method === 'POST') {
            login();
        }
        break;
    
    case '/registrar':
        if ($method === 'POST') {
            registrarUsuario();
        }
        break;
    
    case '/usuarios-pendentes':
        if ($method === 'GET') {
            listarUsuariosPendentes();
        }
        break;
    
    case '/aprovar-usuario':
        if ($method === 'POST') {
            aprovarUsuario();
        }
        break;
    
    case '/rejeitar-usuario':
        if ($method === 'POST') {
            rejeitarUsuario();
        }
        break;
    
    case '/verificar-admin':
        if ($method === 'GET') {
            verificarAdmin();
        }
        break;
    
    case '/promover-admin':
        if ($method === 'POST') {
            promoverAdmin();
        }
        break;
    
    case '/remover-admin':
        if ($method === 'POST') {
            removerAdmin();
        }
        break;
    
    case '/alterar-senha':
        if ($method === 'POST') {
            alterarSenha();
        }
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint não encontrado']);
        break;
}

// ============ FUNÇÕES DA API ============

/**
 * GET /api.php/vagas
 * Listar vagas (para painel admin, filtra por usuário se não for admin)
 */
function listarVagas() {
    global $pdo;
    
    try {
        // Verificar se é uma requisição autenticada (para painel admin)
        $headers = getallheaders();
        $isAuthenticated = isset($headers['Authorization']) && !empty($headers['Authorization']);
        $userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;
        $isAdmin = isset($_GET['is_admin']) && $_GET['is_admin'] === '1';
        
        if ($isAuthenticated && $userId) {
            // Painel admin: mostrar vagas com filtro por usuário
            if ($isAdmin) {
                // Admin vê todas as vagas
                $sql = "SELECT 
                            v.id, v.titulo, v.tipo, v.descricao, v.requisitos, v.diferenciais, 
                            v.regime, v.jornada, v.local, v.salario, v.ativa, v.destaque, 
                            v.publicado_em, v.criado_por,
                            u.nome as criador_nome
                        FROM vagas v
                        LEFT JOIN usuarios_rh u ON v.criado_por = u.id
                        ORDER BY v.destaque DESC, v.publicado_em DESC";
                $stmt = $pdo->query($sql);
            } else {
                // Usuário comum vê apenas suas vagas
                $sql = "SELECT 
                            v.id, v.titulo, v.tipo, v.descricao, v.requisitos, v.diferenciais, 
                            v.regime, v.jornada, v.local, v.salario, v.ativa, v.destaque, 
                            v.publicado_em, v.criado_por,
                            u.nome as criador_nome
                        FROM vagas v
                        LEFT JOIN usuarios_rh u ON v.criado_por = u.id
                        WHERE v.criado_por = ?
                        ORDER BY v.destaque DESC, v.publicado_em DESC";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$userId]);
            }
        } else {
            // Público: apenas vagas ativas
            $sql = "SELECT 
                        id, titulo, tipo, descricao, requisitos, diferenciais, 
                        regime, jornada, local, salario, destaque, publicado_em
                    FROM vagas 
                    WHERE ativa = 1 
                        AND (expira_em IS NULL OR expira_em > NOW())
                    ORDER BY destaque DESC, publicado_em DESC";
            $stmt = $pdo->query($sql);
        }
        
        $vagas = $stmt->fetchAll();
        
        // Formatar datas
        foreach ($vagas as &$vaga) {
            if ($vaga['publicado_em']) {
                $vaga['publicado_em'] = date('d/m/Y', strtotime($vaga['publicado_em']));
            }
            $vaga['destaque'] = (bool) $vaga['destaque'];
            $vaga['ativa'] = (bool) $vaga['ativa'];
        }
        
        echo json_encode([
            'success' => true,
            'vagas' => $vagas
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao buscar vagas']);
    }
}

/**
 * POST /api.php/login
 * Autenticar usuário do RH - APENAS SE APROVADO
 */
function login() {
    global $pdo;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['email']) || !isset($data['senha'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email e senha são obrigatórios']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT id, nome, email, senha, status, is_admin FROM usuarios_rh WHERE email = ? AND ativo = 1");
        $stmt->execute([$data['email']]);
        $usuario = $stmt->fetch();
        
        if (!$usuario) {
            http_response_code(401);
            echo json_encode(['error' => 'Email ou senha inválidos']);
            return;
        }
        
        // Verificar se está aprovado
        if ($usuario['status'] !== 'aprovado') {
            http_response_code(403);
            echo json_encode([
                'error' => 'Acesso negado',
                'message' => 'Seu cadastro ainda não foi aprovado pelo administrador. Aguarde a aprovação.',
                'status' => $usuario['status']
            ]);
            return;
        }
        
        if (password_verify($data['senha'], $usuario['senha'])) {
            // Atualizar último acesso
            $pdo->prepare("UPDATE usuarios_rh SET ultimo_acesso = NOW() WHERE id = ?")
                ->execute([$usuario['id']]);
            
            // Verificar se é admin usando o campo is_admin
            $isAdmin = (bool) $usuario['is_admin'];
            
            // Gerar token simples (em produção, use JWT)
            $token = bin2hex(random_bytes(32));
            
            echo json_encode([
                'success' => true,
                'token' => $token,
                'usuario' => [
                    'id' => $usuario['id'],
                    'nome' => $usuario['nome'],
                    'email' => $usuario['email'],
                    'isAdmin' => $isAdmin
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Email ou senha inválidos']);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao autenticar']);
    }
}

/**
 * POST /api.php/vaga
 * Criar nova vaga (requer autenticação)
 */
function criarVaga() {
    global $pdo;
    
    // Verificar autenticação (simplificado - em produção use JWT)
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validação
    $camposObrigatorios = ['titulo', 'tipo', 'descricao', 'criado_por'];
    foreach ($camposObrigatorios as $campo) {
        if (empty($data[$campo])) {
            http_response_code(400);
            echo json_encode(['error' => "Campo '$campo' é obrigatório"]);
            return;
        }
    }
    
    try {
        $sql = "INSERT INTO vagas (
                    titulo, tipo, descricao, requisitos, diferenciais, 
                    regime, jornada, local, salario, ativa, destaque, criado_por, publicado_em
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['titulo'],
            $data['tipo'],
            $data['descricao'],
            $data['requisitos'] ?? null,
            $data['diferenciais'] ?? null,
            $data['regime'] ?? null,
            $data['jornada'] ?? null,
            $data['local'] ?? null,
            $data['salario'] ?? null,
            $data['ativa'] ?? 1,
            $data['destaque'] ?? 0,
            $data['criado_por']
        ]);
        
        echo json_encode([
            'success' => true,
            'id' => $pdo->lastInsertId(),
            'message' => 'Vaga criada com sucesso'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao criar vaga']);
    }
}

/**
 * PUT /api.php/vaga?id=123
 * Atualizar vaga existente (apenas criador pode editar)
 */
function atualizarVaga() {
    global $pdo;
    
    // Verificar autenticação
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID da vaga é obrigatório']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Verificar se é o criador da vaga
    $userId = $data['user_id'] ?? null;
    if (!$userId) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do usuário é obrigatório']);
        return;
    }
    
    try {
        // Verificar se a vaga pertence ao usuário
        $stmt = $pdo->prepare("SELECT criado_por FROM vagas WHERE id = ?");
        $stmt->execute([$id]);
        $vaga = $stmt->fetch();
        
        if (!$vaga) {
            http_response_code(404);
            echo json_encode(['error' => 'Vaga não encontrada']);
            return;
        }
        
        // Apenas o criador pode editar sua vaga
        if ($vaga['criado_por'] != $userId) {
            http_response_code(403);
            echo json_encode(['error' => 'Você não tem permissão para editar esta vaga']);
            return;
        }
        
        $campos = [];
        $valores = [];
        
        $camposPermitidos = ['titulo', 'tipo', 'descricao', 'requisitos', 'diferenciais', 
                             'regime', 'jornada', 'local', 'salario', 'ativa', 'destaque'];
        
        foreach ($camposPermitidos as $campo) {
            if (isset($data[$campo])) {
                $campos[] = "$campo = ?";
                $valores[] = $data[$campo];
            }
        }
        
        if (empty($campos)) {
            http_response_code(400);
            echo json_encode(['error' => 'Nenhum campo para atualizar']);
            return;
        }
        
        $valores[] = $id;
        $sql = "UPDATE vagas SET " . implode(', ', $campos) . " WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($valores);
        
        echo json_encode([
            'success' => true,
            'message' => 'Vaga atualizada com sucesso'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao atualizar vaga']);
    }
}

/**
 * DELETE /api.php/vaga?id=123
 * Desativar vaga
 */
function deletarVaga() {
    global $pdo;
    
    // Verificar autenticação
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID da vaga é obrigatório']);
        return;
    }
    
    try {
        // Não deletar, apenas desativar
        $stmt = $pdo->prepare("UPDATE vagas SET ativa = 0 WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Vaga desativada com sucesso'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao desativar vaga']);
    }
}

/**
 * POST /api.php/registrar
 * Registrar novo usuário (público) - Fica pendente de aprovação
 */
function registrarUsuario() {
    global $pdo;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validação
    $camposObrigatorios = ['nome', 'email', 'senha', 'telefone'];
    foreach ($camposObrigatorios as $campo) {
        if (empty($data[$campo])) {
            http_response_code(400);
            echo json_encode(['error' => "Campo '$campo' é obrigatório"]);
            return;
        }
    }
    
    // Validar formato de email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email inválido']);
        return;
    }
    
    // Validar senha (mínimo 6 caracteres)
    if (strlen($data['senha']) < 6) {
        http_response_code(400);
        echo json_encode(['error' => 'A senha deve ter no mínimo 6 caracteres']);
        return;
    }
    
    try {
        // Verificar se email já existe
        $stmt = $pdo->prepare("SELECT id FROM usuarios_rh WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            http_response_code(400);
            echo json_encode(['error' => 'Este e-mail já está cadastrado']);
            return;
        }
        
        // Hash da senha
        $senhaHash = password_hash($data['senha'], PASSWORD_DEFAULT);
        
        // Inserir usuário com status 'pendente'
        $sql = "INSERT INTO usuarios_rh (nome, email, senha, telefone, cargo, status) 
                VALUES (?, ?, ?, ?, ?, 'pendente')";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['nome'],
            $data['email'],
            $senhaHash,
            $data['telefone'],
            $data['cargo'] ?? null
        ]);
        
        $userId = $pdo->lastInsertId();
        
        // Enviar e-mail para o usuário
        emailCadastroRealizado($data['nome'], $data['email']);
        
        // Enviar e-mail para TODOS os admins
        $adminStmt = $pdo->query("SELECT email FROM usuarios_rh WHERE is_admin = 1 AND ativo = 1");
        $admins = $adminStmt->fetchAll();
        
        foreach ($admins as $admin) {
            emailNovoUsuarioPendente($admin['email'], $data['nome'], $data['email']);
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Cadastro realizado! Aguarde a aprovação do administrador. Você receberá um e-mail quando for aprovado.',
            'id' => $userId
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao registrar usuário']);
    }
}

/**
 * GET /api.php/usuarios-pendentes
 * Listar usuários pendentes de aprovação (apenas admin)
 */
function listarUsuariosPendentes() {
    global $pdo;
    
    // Verificar autenticação
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    try {
        $sql = "SELECT id, nome, email, telefone, cargo, status, is_admin, criado_em 
                FROM usuarios_rh 
                WHERE status IN ('pendente', 'aprovado', 'rejeitado')
                ORDER BY 
                    CASE status 
                        WHEN 'pendente' THEN 1
                        WHEN 'aprovado' THEN 2
                        WHEN 'rejeitado' THEN 3
                    END,
                    criado_em DESC";
        
        $stmt = $pdo->query($sql);
        $usuarios = $stmt->fetchAll();
        
        // Formatar datas e converter is_admin para boolean
        foreach ($usuarios as &$usuario) {
            $usuario['criado_em'] = date('d/m/Y H:i', strtotime($usuario['criado_em']));
            $usuario['is_admin'] = (bool) $usuario['is_admin'];
        }
        
        echo json_encode([
            'success' => true,
            'usuarios' => $usuarios
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao buscar usuários']);
    }
}

/**
 * POST /api.php/aprovar-usuario
 * Aprovar usuário pendente (apenas admin)
 */
function aprovarUsuario() {
    global $pdo;
    
    // Verificar autenticação
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['usuario_id']) || empty($data['admin_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do usuário e do admin são obrigatórios']);
        return;
    }
    
    try {
        // Buscar dados do usuário
        $stmt = $pdo->prepare("SELECT nome, email FROM usuarios_rh WHERE id = ?");
        $stmt->execute([$data['usuario_id']]);
        $usuario = $stmt->fetch();
        
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuário não encontrado']);
            return;
        }
        
        // Aprovar usuário
        $sql = "UPDATE usuarios_rh 
                SET status = 'aprovado', 
                    aprovado_por = ?,
                    aprovado_em = NOW()
                WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$data['admin_id'], $data['usuario_id']]);
        
        // Enviar e-mail de aprovação
        emailCadastroAprovado($usuario['nome'], $usuario['email']);
        
        echo json_encode([
            'success' => true,
            'message' => 'Usuário aprovado com sucesso'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao aprovar usuário']);
    }
}

/**
 * POST /api.php/rejeitar-usuario
 * Rejeitar usuário pendente (apenas admin)
 */
function rejeitarUsuario() {
    global $pdo;
    
    // Verificar autenticação
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['usuario_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do usuário é obrigatório']);
        return;
    }
    
    try {
        // Buscar dados do usuário
        $stmt = $pdo->prepare("SELECT nome, email FROM usuarios_rh WHERE id = ?");
        $stmt->execute([$data['usuario_id']]);
        $usuario = $stmt->fetch();
        
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuário não encontrado']);
            return;
        }
        
        // Rejeitar usuário
        $sql = "UPDATE usuarios_rh 
                SET status = 'rejeitado',
                    observacoes = ?
                WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$data['motivo'] ?? null, $data['usuario_id']]);
        
        // Enviar e-mail de rejeição
        emailCadastroRejeitado($usuario['nome'], $usuario['email'], $data['motivo'] ?? '');
        
        echo json_encode([
            'success' => true,
            'message' => 'Usuário rejeitado'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao rejeitar usuário']);
    }
}

/**
 * GET /api.php/verificar-admin
 * Verificar se o usuário logado é admin
 */
function verificarAdmin() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    // Aqui você verificaria o token e retornaria se é admin
    // Por simplicidade, retornando true para demonstração
    echo json_encode([
        'success' => true,
        'isAdmin' => true
    ]);
}

/**
 * POST /api.php/promover-admin
 * Promover usuário a administrador (apenas admin pode fazer)
 */
function promoverAdmin() {
    global $pdo;
    
    // Verificar autenticação
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['usuario_id']) || empty($data['admin_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do usuário e do admin são obrigatórios']);
        return;
    }
    
    try {
        // Verificar se quem está promovendo é admin
        $stmt = $pdo->prepare("SELECT is_admin FROM usuarios_rh WHERE id = ?");
        $stmt->execute([$data['admin_id']]);
        $admin = $stmt->fetch();
        
        if (!$admin || !$admin['is_admin']) {
            http_response_code(403);
            echo json_encode(['error' => 'Apenas administradores podem promover outros usuários']);
            return;
        }
        
        // Buscar dados do usuário a ser promovido
        $stmt = $pdo->prepare("SELECT nome, email, status FROM usuarios_rh WHERE id = ?");
        $stmt->execute([$data['usuario_id']]);
        $usuario = $stmt->fetch();
        
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuário não encontrado']);
            return;
        }
        
        // Verificar se está aprovado
        if ($usuario['status'] !== 'aprovado') {
            http_response_code(400);
            echo json_encode(['error' => 'Apenas usuários aprovados podem ser promovidos a administrador']);
            return;
        }
        
        // Promover a admin
        $sql = "UPDATE usuarios_rh SET is_admin = 1 WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$data['usuario_id']]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Usuário promovido a administrador com sucesso'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao promover usuário']);
    }
}

/**
 * POST /api.php/remover-admin
 * Remover privilégios de administrador (apenas admin pode fazer)
 */
function removerAdmin() {
    global $pdo;
    
    // Verificar autenticação
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['usuario_id']) || empty($data['admin_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do usuário e do admin são obrigatórios']);
        return;
    }
    
    try {
        // Verificar se quem está removendo é admin
        $stmt = $pdo->prepare("SELECT is_admin FROM usuarios_rh WHERE id = ?");
        $stmt->execute([$data['admin_id']]);
        $admin = $stmt->fetch();
        
        if (!$admin || !$admin['is_admin']) {
            http_response_code(403);
            echo json_encode(['error' => 'Apenas administradores podem remover privilégios']);
            return;
        }
        
        // Não permitir remover o próprio privilégio
        if ($data['usuario_id'] == $data['admin_id']) {
            http_response_code(400);
            echo json_encode(['error' => 'Você não pode remover seus próprios privilégios de administrador']);
            return;
        }
        
        // Verificar se é o último admin
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios_rh WHERE is_admin = 1");
        $result = $stmt->fetch();
        
        if ($result['total'] <= 1) {
            http_response_code(400);
            echo json_encode(['error' => 'Não é possível remover o último administrador do sistema']);
            return;
        }
        
        // Remover privilégios de admin
        $sql = "UPDATE usuarios_rh SET is_admin = 0 WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$data['usuario_id']]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Privilégios de administrador removidos com sucesso'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao remover privilégios']);
    }
}

/**
 * POST /api.php/alterar-senha
 * Alterar senha do usuário logado
 */
function alterarSenha() {
    global $pdo;
    
    // Verificar autenticação
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['usuario_id']) || empty($data['senha_atual']) || empty($data['senha_nova'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Todos os campos são obrigatórios']);
        return;
    }
    
    // Validar senha nova (mínimo 6 caracteres)
    if (strlen($data['senha_nova']) < 6) {
        http_response_code(400);
        echo json_encode(['error' => 'A senha deve ter no mínimo 6 caracteres']);
        return;
    }
    
    try {
        // Buscar usuário e verificar senha atual
        $stmt = $pdo->prepare("SELECT senha FROM usuarios_rh WHERE id = ?");
        $stmt->execute([$data['usuario_id']]);
        $usuario = $stmt->fetch();
        
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuário não encontrado']);
            return;
        }
        
        // Verificar senha atual
        if (!password_verify($data['senha_atual'], $usuario['senha'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Senha atual incorreta']);
            return;
        }
        
        // Atualizar senha
        $senhaHash = password_hash($data['senha_nova'], PASSWORD_DEFAULT);
        $sql = "UPDATE usuarios_rh SET senha = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$senhaHash, $data['usuario_id']]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Senha alterada com sucesso'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao alterar senha']);
    }
}
?>
