<?php
require_once 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Headers para permitir requisições AJAX
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// Receber dados JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar dados recebidos
if (!$data || !isset($data['email']) || !isset($data['resultados'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

$email_destinatario = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
if (!$email_destinatario) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

$resultados = $data['resultados'];

try {
    // Carregar configurações
    $config = require 'config_email.php';
    
    // Criar instância do PHPMailer
    $mail = new PHPMailer(true);
    
    // Configurações do servidor SMTP
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL para porta 465
    $mail->Port = $config['smtp_port'];
    $mail->CharSet = 'UTF-8';
    
    // Configurações do email
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($email_destinatario);
    $mail->addReplyTo($config['reply_to'], $config['from_name']);
    
    // Conteúdo do email
    $mail->isHTML(true);
    $mail->Subject = 'Seus Resultados do Teste DISC - FAM';
    
    // Gerar HTML do email
    $html_email = gerarEmailHTML($resultados);
    $mail->Body = $html_email;
    
    // Versão texto alternativa
    $mail->AltBody = gerarEmailTexto($resultados);
    
    // Enviar email
    $mail->send();
    
    echo json_encode([
        'success' => true,
        'message' => 'Resultados enviados com sucesso para ' . $email_destinatario
    ]);
    
} catch (Exception $e) {
    error_log("Erro ao enviar email: " . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode([
        'error' => 'Falha ao enviar email',
        'details' => $e->getMessage()
    ]);
}

function gerarEmailHTML($resultados) {
    $predominante = $resultados['predominante'];
    $self = $resultados['self'];
    $persona = $resultados['persona'];
    $stress = $resultados['stress'];
    $cursos = $resultados['cursos'] ?? [];
    $profissoes = $resultados['profissoes'] ?? [];
    
    $html = '
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultados DISC</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
            .result-box { background: white; margin: 15px 0; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; }
            .predominante { font-size: 24px; font-weight: bold; color: #2563eb; }
            .scores { display: flex; gap: 10px; margin: 10px 0; }
            .score-item { background: #e2e8f0; padding: 8px 12px; border-radius: 4px; text-align: center; flex: 1; }
            .lista { margin: 10px 0; }
            .lista li { margin: 5px 0; }
            .footer { margin-top: 20px; padding: 15px; background: #e2e8f0; text-align: center; font-size: 12px; color: #64748b; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🎯 Seus Resultados do Teste DISC</h1>
            <p>Faculdade de Americana - FAM</p>
        </div>
        
        <div class="content">
            <div class="result-box">
                <h2>📊 Perfil Predominante</h2>
                <div class="predominante">' . $predominante . '</div>
            </div>
            
            <div class="result-box">
                <h3>📈 Pontuações</h3>
                <p><strong>SELF (D/I/S/C):</strong> ' . implode(' / ', $self) . '</p>
                <p><strong>PERSONA (D/I/S/C):</strong> ' . implode(' / ', $persona) . '</p>
                <p><strong>STRESS (D/I/S/C):</strong> ' . implode(' / ', $stress) . '</p>
            </div>';
    
    if (!empty($cursos)) {
        $html .= '
            <div class="result-box">
                <h3>🎓 Cursos Recomendados</h3>
                <ul class="lista">';
        foreach ($cursos as $curso) {
            $html .= '<li>' . htmlspecialchars($curso) . '</li>';
        }
        $html .= '</ul>
            </div>';
    }
    
    if (!empty($profissoes)) {
        $html .= '
            <div class="result-box">
                <h3>💼 Profissões Alinhadas</h3>
                <ul class="lista">';
        foreach ($profissoes as $profissao) {
            $html .= '<li>' . htmlspecialchars($profissao) . '</li>';
        }
        $html .= '</ul>
            </div>';
    }
    
    $html .= '
            <div class="result-box">
                <p><strong>⚠️ Importante:</strong> O DISC não determina talento nem limita escolhas; serve como <em>insight</em> para alinhar ambiente e estilo de trabalho.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Este resultado foi gerado pelo Teste Vocacional DISC da FAM</p>
            <p>Para mais informações, visite: <a href="https://fam.br">fam.br</a></p>
            <p>Data: ' . date('d/m/Y H:i') . '</p>
        </div>
    </body>
    </html>';
    
    return $html;
}

function gerarEmailTexto($resultados) {
    $predominante = $resultados['predominante'];
    $self = $resultados['self'];
    $persona = $resultados['persona'];
    $stress = $resultados['stress'];
    $cursos = $resultados['cursos'] ?? [];
    $profissoes = $resultados['profissoes'] ?? [];
    
    $texto = "SEUS RESULTADOS DO TESTE DISC - FAM\n";
    $texto .= "=====================================\n\n";
    $texto .= "PERFIL PREDOMINANTE: " . $predominante . "\n\n";
    $texto .= "PONTUAÇÕES:\n";
    $texto .= "SELF (D/I/S/C): " . implode(' / ', $self) . "\n";
    $texto .= "PERSONA (D/I/S/C): " . implode(' / ', $persona) . "\n";
    $texto .= "STRESS (D/I/S/C): " . implode(' / ', $stress) . "\n\n";
    
    if (!empty($cursos)) {
        $texto .= "CURSOS RECOMENDADOS:\n";
        foreach ($cursos as $curso) {
            $texto .= "- " . $curso . "\n";
        }
        $texto .= "\n";
    }
    
    if (!empty($profissoes)) {
        $texto .= "PROFISSÕES ALINHADAS:\n";
        foreach ($profissoes as $profissao) {
            $texto .= "- " . $profissao . "\n";
        }
        $texto .= "\n";
    }
    
    $texto .= "IMPORTANTE: O DISC não determina talento nem limita escolhas; serve como insight para alinhar ambiente e estilo de trabalho.\n\n";
    $texto .= "Teste realizado em: " . date('d/m/Y H:i') . "\n";
    $texto .= "FAM - Faculdade de Americana\n";
    $texto .= "Site: https://fam.br";
    
    return $texto;
}
?>
