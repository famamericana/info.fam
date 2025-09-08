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
    $mail->Subject = 'Seus Resultados do DISC - FAM';
    
    // Preparar anexos embutidos (gráficos como imagens)
    $cids = [];
    if (isset($resultados['images']) && is_array($resultados['images'])) {
        error_log("DEBUG: Imagens recebidas: " . json_encode(array_keys($resultados['images'])));
        foreach (['self','persona','stress','wheel'] as $key) {
            if (!empty($resultados['images'][$key]) && is_string($resultados['images'][$key])) {
                $cid = anexarImagemBase64($mail, $resultados['images'][$key], "chart_{$key}.png");
                if ($cid) { 
                    $cids[$key] = $cid; 
                    error_log("DEBUG: Imagem {$key} anexada com CID: {$cid}");
                } else {
                    error_log("DEBUG: Falha ao anexar imagem {$key}");
                }
            } else {
                error_log("DEBUG: Imagem {$key} não encontrada ou inválida");
            }
        }
    } else {
        error_log("DEBUG: Nenhuma imagem encontrada nos resultados");
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
    
        $accent = '#45b7e5';
        $bg = '#f5f7fb';
        $text = '#0f172a';
        $muted = '#64748b';
        $line = '#e5e7eb';
        $card = '#ffffff';

        $chartsHtml = '';
        if (isset($cids['self'])) {
                $chartsHtml .= '<div style="margin:12px 0; border:1px solid ' . $line . '; border-radius:8px; padding:10px; background:' . $card . '; text-align:center;">'
                        . '<div style="font-size:13px; color:' . $muted . '; margin-bottom:6px;">SELF</div>'
                        . '<img src="cid:' . $cids['self'] . '" alt="Gráfico SELF" style="display:block; width:100%; height:auto; border-radius:6px;">'
                        . '</div>';
        }
        if (isset($cids['persona'])) {
                $chartsHtml .= '<div style="margin:12px 0; border:1px solid ' . $line . '; border-radius:8px; padding:10px; background:' . $card . '; text-align:center;">'
                        . '<div style="font-size:13px; color:' . $muted . '; margin-bottom:6px;">PERSONA</div>'
                        . '<img src="cid:' . $cids['persona'] . '" alt="Gráfico PERSONA" style="display:block; width:100%; height:auto; border-radius:6px;">'
                        . '</div>';
        }
        if (isset($cids['stress'])) {
                $chartsHtml .= '<div style="margin:12px 0; border:1px solid ' . $line . '; border-radius:8px; padding:10px; background:' . $card . '; text-align:center;">'
                        . '<div style="font-size:13px; color:' . $muted . '; margin-bottom:6px;">STRESS</div>'
                        . '<img src="cid:' . $cids['stress'] . '" alt="Gráfico STRESS" style="display:block; width:100%; height:auto; border-radius:6px;">'
                        . '</div>';
        }
        if (isset($cids['wheel'])) {
                $chartsHtml .= '<div style="margin:12px 0; border:1px solid ' . $line . '; border-radius:8px; padding:10px; background:' . $card . '; text-align:center;">'
                        . '<div style="font-size:13px; color:' . $muted . '; margin-bottom:6px;">Roda DISC (SELF)</div>'
                        . '<img src="cid:' . $cids['wheel'] . '" alt="Roda DISC" style="display:block; width:100%; height:auto; border-radius:6px;">'
                        . '</div>';
        }

        $pills = '<span style="display:inline-block; border:1px solid ' . $line . '; border-radius:999px; padding:4px 10px; font-size:12px; margin:4px 6px 0 0;">Estilo: <b>' . htmlspecialchars($predominante) . '</b></span>'
                     . '<span style="display:inline-block; border:1px solid ' . $line . '; border-radius:999px; padding:4px 10px; font-size:12px; margin:4px 6px 0 0;">SELF: ' . implode(' / ', $self) . '</span>'
                     . '<span style="display:inline-block; border:1px solid ' . $line . '; border-radius:999px; padding:4px 10px; font-size:12px; margin:4px 6px 0 0;">PERSONA: ' . implode(' / ', $persona) . '</span>'
                     . '<span style="display:inline-block; border:1px solid ' . $line . '; border-radius:999px; padding:4px 10px; font-size:12px; margin:4px 6px 0 0;">STRESS: ' . implode(' / ', $stress) . '</span>';

    $html = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Resultados DISC</title></head><body style="margin:0; padding:0; color:' . $text . '; font-family: Arial, Tahoma, Verdana, sans-serif; line-height:1.6;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td align="center" style="padding:24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="760" style="max-width:760px; width:100%; border-collapse:collapse;">
              <tr>
                <td style="background:' . $accent . '; color:#ffffff; padding:22px; text-align:center; border-radius:12px 12px 0 0;">
                  <div style="font-size:22px; margin:0; font-weight:700;">Seus Resultados do DISC</div>
                  <div style="margin-top:6px; font-size:13px; opacity:0.95;">Faculdade de Americana - FAM</div>
                </td>
              </tr>
              <tr>
                <td style="background:' . $card . '; padding:18px; border:1px solid ' . $line . '; border-top:none; border-radius:0 0 12px 12px;">
                  <div style="background:' . $card . '; border:1px solid ' . $line . '; border-left:4px solid ' . $accent . '; border-radius:10px; padding:14px; margin:0 0 12px;">
                    <div style="font-size:18px; margin:0 0 6px;">Perfil Predominante</div>
                    <div style="font-size:24px; font-weight:700; color:#0b5fa8;">' . htmlspecialchars($predominante) . '</div>
                  </div>
                  <div style="background:' . $card . '; border:1px solid ' . $line . '; border-left:4px solid ' . $accent . '; border-radius:10px; padding:14px; margin:12px 0;">
                    <div style="font-weight:600; margin-bottom:6px;">Por que ' . htmlspecialchars($predominante) . '?</div>
                    <div style="color:' . $muted . '; font-size:13px; margin:0 0 8px;">' . htmlspecialchars(implode(' ', $frases)) . '</div>
                    <div>' . $pills . '</div>
                  </div>
                  <div style="background:' . $card . '; border:1px solid ' . $line . '; border-left:4px solid ' . $accent . '; border-radius:10px; padding:14px; margin:12px 0;">
                    <div style="font-weight:600; margin-bottom:8px;">Visualizações</div>
                    ' . $chartsHtml . '
                    <div style="color:' . $muted . '; font-size:13px; margin-top:6px;">As imagens mostram: SELF (tendência natural), PERSONA (como você se apresenta) e STRESS (pressões percebidas). A Roda DISC representa a distribuição do SELF nos eixos D/I/S/C.</div>
                  </div>';        if (!empty($cursos)) {
                $html .= '<div style="background:' . $card . '; border:1px solid ' . $line . '; border-left:4px solid ' . $accent . '; border-radius:10px; padding:14px; margin:12px 0;">
                                        <div style="font-weight:600; margin-bottom:6px;">Cursos Recomendados</div>
                                        <ul style="margin:8px 0; padding-left:18px;">';
                foreach ($cursos as $curso) {
                        $html .= '<li style="margin:4px 0;">' . htmlspecialchars($curso) . '</li>';
                }
                $html .= '</ul></div>';
        }

        if (!empty($profissoes)) {
                $html .= '<div style="background:' . $card . '; border:1px solid ' . $line . '; border-left:4px solid ' . $accent . '; border-radius:10px; padding:14px; margin:12px 0;">
                                        <div style="font-weight:600; margin-bottom:6px;">Profissões Alinhadas</div>
                                        <ul style="margin:8px 0; padding-left:18px;">';
                foreach ($profissoes as $profissao) {
                        $html .= '<li style="margin:4px 0;">' . htmlspecialchars($profissao) . '</li>';
                }
                $html .= '</ul></div>';
        }

        $html .= '<div style="background:' . $card . '; border:1px solid ' . $line . '; border-left:4px solid ' . $accent . '; border-radius:10px; padding:14px; margin:12px 0;">
                                <div><strong>Importante:</strong> O DISC não determina talento nem limita escolhas; serve como <em>insight</em> para alinhar ambiente e estilo de trabalho.</div>
                            </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-top:12px;">
                                    <div style="margin-top:0; padding:12px; background:#eef2f7; text-align:center; font-size:12px; color:#334155; border-radius:8px;">
                                        <div>Este resultado foi gerado pelo DISC da FAM</div>
                                        <div>Data: ' . date('d/m/Y H:i') . '</div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body></html>';
    
    return $html;
}

/**
 * Anexa imagem base64 (dataURL) ao email e retorna o CID para uso no HTML.
 */
function anexarImagemBase64(PHPMailer $mail, string $dataUrl, string $filename = 'image.png') {
    if (strpos($dataUrl, 'data:image') !== 0) {
        error_log("DEBUG: DataURL inválida para {$filename}");
        return null;
    }
    
    $parts = explode(',', $dataUrl, 2);
    if (count($parts) !== 2) {
        error_log("DEBUG: Formato de dataURL inválido para {$filename}");
        return null;
    }
    
    [$meta, $content] = $parts;
    if (!$content) {
        error_log("DEBUG: Conteúdo base64 vazio para {$filename}");
        return null;
    }
    
    // Detectar mime
    $mime = 'image/png';
    if (preg_match('#data:(.*?);base64#', $meta, $m)) {
        $mime = $m[1];
    }
    
    $binary = base64_decode($content);
    if ($binary === false || strlen($binary) < 100) {
        error_log("DEBUG: Falha na decodificação base64 ou imagem muito pequena para {$filename}");
        return null;
    }
    
    $cid = uniqid('img_', true) . '@disc';
    try {
        $mail->addStringEmbeddedImage($binary, $cid, $filename, 'base64', $mime);
        error_log("DEBUG: Imagem {$filename} anexada com sucesso. Tamanho: " . strlen($binary) . " bytes");
        return $cid;
    } catch (Exception $e) {
        error_log("DEBUG: Erro ao anexar imagem {$filename}: " . $e->getMessage());
        return null;
    }
}

function gerarEmailTexto($resultados) {
    $predominante = $resultados['predominante'];
    $self = $resultados['self'];
    $persona = $resultados['persona'];
    $stress = $resultados['stress'];
    $cursos = $resultados['cursos'] ?? [];
    $profissoes = $resultados['profissoes'] ?? [];
    
    $texto = "SEUS RESULTADOS DO DISC - FAM\n";
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
    $texto .= "Realizado em: " . date('d/m/Y H:i') . "\n";
    $texto .= "FAM - Faculdade de Americana\n";
    $texto .= "Site: https://fam.br";
    
    return $texto;
}
?>
