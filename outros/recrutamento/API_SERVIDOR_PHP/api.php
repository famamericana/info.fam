<?php
require_once 'config.php';

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
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint não encontrado']);
        break;
}

// ============ FUNÇÕES DA API ============

/**
 * GET /api.php/vagas
 * Listar vagas ativas (público)
 */
function listarVagas() {
    global $pdo;
    
    try {
        // Buscar apenas vagas ativas e ordenar por destaque e data
        $sql = "SELECT 
                    id, titulo, tipo, descricao, requisitos, diferenciais, 
                    regime, jornada, local, salario, destaque, publicado_em
                FROM vagas 
                WHERE ativa = 1 
                    AND (expira_em IS NULL OR expira_em > NOW())
                ORDER BY destaque DESC, publicado_em DESC";
        
        $stmt = $pdo->query($sql);
        $vagas = $stmt->fetchAll();
        
        // Formatar datas
        foreach ($vagas as &$vaga) {
            if ($vaga['publicado_em']) {
                $vaga['publicado_em'] = date('d/m/Y', strtotime($vaga['publicado_em']));
            }
            $vaga['destaque'] = (bool) $vaga['destaque'];
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
 * Autenticar usuário do RH
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
        $stmt = $pdo->prepare("SELECT id, nome, email, senha FROM usuarios_rh WHERE email = ? AND ativo = 1");
        $stmt->execute([$data['email']]);
        $usuario = $stmt->fetch();
        
        if ($usuario && password_verify($data['senha'], $usuario['senha'])) {
            // Atualizar último acesso
            $pdo->prepare("UPDATE usuarios_rh SET ultimo_acesso = NOW() WHERE id = ?")
                ->execute([$usuario['id']]);
            
            // Gerar token simples (em produção, use JWT)
            $token = bin2hex(random_bytes(32));
            
            echo json_encode([
                'success' => true,
                'token' => $token,
                'usuario' => [
                    'id' => $usuario['id'],
                    'nome' => $usuario['nome'],
                    'email' => $usuario['email']
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
 * Atualizar vaga existente
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
    
    try {
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
?>
