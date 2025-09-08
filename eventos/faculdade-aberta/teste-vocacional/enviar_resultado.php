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
    
    // Preparar anexos embutidos (gráficos como imagens)
    $cids = [];
    if (isset($resultados['images']) && is_array($resultados['images'])) {
        foreach (['self','persona','stress','wheel'] as $key) {
            if (!empty($resultados['images'][$key]) && is_string($resultados['images'][$key])) {
                $cid = anexarImagemBase64($mail, $resultados['images'][$key], "chart_{$key}.png");
                if ($cid) { $cids[$key] = $cid; }
            }
        }
    }

    // Gerar HTML do email (com CIDs)
    $html_email = gerarEmailHTML($resultados, $cids);
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

function gerarEmailHTML($resultados, $cids = []) {
    $predominante = $resultados['predominante'];
    $self = $resultados['self'];
    $persona = $resultados['persona'];
    $stress = $resultados['stress'];
    $cursos = $resultados['cursos'] ?? [];
    $profissoes = $resultados['profissoes'] ?? [];
    $frases = $resultados['frases'] ?? [];
    
    $html = '
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultados DISC</title>
                <style>
                        /* Identidade próxima ao teste (accent #45b7e5, cards escuros em bg claro para compatibilidade) */
                        :root { --accent:#45b7e5; --text:#0f172a; --muted:#475569; --card:#ffffff; --line:#e5e7eb; }
                        body { font-family: Arial, "Segoe UI", Tahoma, sans-serif; line-height:1.6; color:var(--text); max-width: 760px; margin:0 auto; padding:0; background:#f5f7fb; }
                        .wrap { padding: 24px; }
                        .header { background: linear-gradient(135deg, var(--accent), #3b82f6); color:#fff; padding:22px; text-align:center; border-radius: 12px 12px 0 0; }
                        .content { background:#fff; padding: 18px; border:1px solid var(--line); border-top:none; border-radius:0 0 12px 12px; }
                        .h1 { margin:0; font-size:22px; }
                        .sub { margin:6px 0 0; font-size:13px; opacity:.9 }
                        .section { background: var(--card); border:1px solid var(--line); border-left:4px solid var(--accent); border-radius:10px; padding:14px; margin:14px 0; }
                        .predominante { font-size:24px; font-weight:700; color:#0b5fa8; }
                        .pill { display:inline-block; border:1px solid var(--line); border-radius:999px; padding:4px 10px; font-size:12px; margin: 4px 6px 0 0; }
                        .grid { display:flex; flex-wrap:wrap; gap:10px; }
                        .chart { width: calc(50% - 10px); min-width:260px; border:1px solid var(--line); border-radius:8px; padding:8px; background:#fff; text-align:center }
                        .chart img { width:100%; height:auto; border-radius:6px; }
                        .list { margin:8px 0; padding-left:16px; }
                        .list li { margin:4px 0; }
                        .footer { margin-top:16px; padding:12px; background:#eef2f7; text-align:center; font-size:12px; color:#334155; border-radius:8px; }
                        .muted { color:#64748b; font-size:13px; }
                </style>
    </head>
    <body>
                <div class="wrap">
                    <div class="header">
                            <h1 class="h1">🎯 Seus Resultados do Teste DISC</h1>
                            <p class="sub">Faculdade de Americana - FAM</p>
                    </div>
                    <div class="content">
            <div class="result-box">
                <h2>📊 Perfil Predominante</h2>
                <div class="predominante">' . $predominante . '</div>
            </div>
                        <div class="section">
                                <strong>Por que ' . htmlspecialchars($predominante) . '?</strong>
                                <p class="muted">' . htmlspecialchars(implode(' ', $frases)) . '</p>
                                <div>
                                    <span class="pill">Estilo: <b>' . htmlspecialchars($predominante) . '</b></span>
                                    <span class="pill">SELF: ' . implode(' / ', $self) . '</span>
                                    <span class="pill">PERSONA: ' . implode(' / ', $persona) . '</span>
                                    <span class="pill">STRESS: ' . implode(' / ', $stress) . '</span>
                                </div>
                        </div>
            
                        <div class="section">
                                <h3>📊 Visualizações</h3>
                                <div class="grid">
                                    ' . (isset($cids['self']) ? '<div class="chart"><div>SELF</div><img src="cid:' . $cids['self'] . '" alt="Gráfico SELF"></div>' : '') . '
                                    ' . (isset($cids['persona']) ? '<div class="chart"><div>PERSONA</div><img src="cid:' . $cids['persona'] . '" alt="Gráfico PERSONA"></div>' : '') . '
                                    ' . (isset($cids['stress']) ? '<div class="chart"><div>STRESS</div><img src="cid:' . $cids['stress'] . '" alt="Gráfico STRESS"></div>' : '') . '
                                    ' . (isset($cids['wheel']) ? '<div class="chart" style="width:100%"><div>Roda DISC (SELF)</div><img src="cid:' . $cids['wheel'] . '" alt="Roda DISC"></div>' : '') . '
                                </div>
                                <p class="muted">As imagens acima representam: SELF (tendência natural), PERSONA (como você se apresenta) e STRESS (pressões percebidas). A Roda DISC mostra a distribuição relativa do seu SELF em cada eixo D/I/S/C.</p>
                        </div>';
    
    if (!empty($cursos)) {
        $html .= '
            <div class="section">
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
            <div class="section">
                <h3>💼 Profissões Alinhadas</h3>
                <ul class="lista">';
        foreach ($profissoes as $profissao) {
            $html .= '<li>' . htmlspecialchars($profissao) . '</li>';
        }
        $html .= '</ul>
            </div>';
    }
    
    $html .= '
                        <div class="section">
                <p><strong>⚠️ Importante:</strong> O DISC não determina talento nem limita escolhas; serve como <em>insight</em> para alinhar ambiente e estilo de trabalho.</p>
            </div>
                    </div>
                    <div class="footer">
                            <p>Este resultado foi gerado pelo Teste Vocacional DISC da FAM</p>
                            <p>Para mais informações, visite: <a href="https://fam.br">fam.br</a></p>
                            <p>Data: ' . date('d/m/Y H:i') . '</p>
                    </div>
                </div>
    </body>
    </html>';
    
    return $html;
}

/**
 * Anexa imagem base64 (dataURL) ao email e retorna o CID para uso no HTML.
 */
function anexarImagemBase64(PHPMailer $mail, string $dataUrl, string $filename = 'image.png') {
    if (strpos($dataUrl, 'data:image') !== 0) return null;
    [$meta, $content] = explode(',', $dataUrl, 2);
    if (!$content) return null;
    // Detectar mime
    $mime = 'image/png';
    if (preg_match('#data:(.*?);base64#', $meta, $m)) {
        $mime = $m[1];
    }
    $binary = base64_decode($content);
    if ($binary === false) return null;
    $cid = uniqid('img_', true) . '@disc';
    $mail->addStringEmbeddedImage($binary, $cid, $filename, 'base64', $mime);
    return $cid;
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
