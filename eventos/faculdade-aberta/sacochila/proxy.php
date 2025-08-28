<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// URL do seu Google Apps Script Web App
$WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxov1wiTUsyLROqNIjhnfebttO_suJ0pKalAKQpOYlJ5cnxGKkY_oFOSqWS1VYdWwNg/exec';

// Se for uma requisição OPTIONS (pré-voo CORS), apenas retorne os headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Processar requisições GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = urlencode($_GET['id']);
        $url = $WEB_APP_URL . '?id=' . $id;
        
        // Fazer a requisição para o Google Apps Script
        $response = file_get_contents($url);
        
        if ($response === FALSE) {
            http_response_code(500);
            echo json_encode(['result' => 'error', 'message' => 'Erro ao conectar com o servidor']);
        } else {
            echo $response;
        }
    } else {
        http_response_code(400);
        echo json_encode(['result' => 'error', 'message' => 'ID não fornecido']);
    }
    exit();
}

// Processar requisições POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obter o conteúdo JSON do corpo da requisição
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if ($data === null) {
        http_response_code(400);
        echo json_encode(['result' => 'error', 'message' => 'Dados JSON inválidos']);
        exit();
    }
    
    // Configurar a requisição para o Google Apps Script
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data),
        ],
    ];
    
    $context  = stream_context_create($options);
    $response = file_get_contents($WEB_APP_URL, false, $context);
    
    if ($response === FALSE) {
        http_response_code(500);
        echo json_encode(['result' => 'error', 'message' => 'Erro ao conectar com o servidor']);
    } else {
        echo $response;
    }
    exit();
}

// Se o método não for GET, POST ou OPTIONS
http_response_code(405);
echo json_encode(['result' => 'error', 'message' => 'Método não permitido']);
?>