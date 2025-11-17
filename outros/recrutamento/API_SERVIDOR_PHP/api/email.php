<?php
/**
 * Configuração e envio de e-mails
 * Sistema de Vagas FAM
 */

// Configurações de e-mail - AJUSTE CONFORME SEU SERVIDOR
define('SMTP_HOST', 'smtp.hostinger.com'); // ou smtp.gmail.com, etc
define('SMTP_PORT', 465); // 587 para TLS, 465 para SSL
define('SMTP_USER', 'noreply@famamericana.com.br'); // seu e-mail
define('SMTP_PASS', 'Vt:H0Rg%3Co<Gr3V{T274fwIGD6fmM^2M!%0'); // senha do e-mail
define('SMTP_FROM', 'noreply@famamericana.com.br');
define('SMTP_FROM_NAME', 'Sistema de Vagas FAM');

// URL base do sistema (interface do painel/api exposta em /recrutamento)
define('BASE_URL', 'https://famamericana.com.br/recrutamento');

/**
 * Enviar e-mail usando mail() nativo do PHP
 * Funciona na maioria dos servidores compartilhados
 */
function enviarEmail($para, $nome, $assunto, $mensagem) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM . ">" . "\r\n";
    $headers .= "Reply-To: " . SMTP_FROM . "\r\n";
    
    $mensagemHTML = templateEmail($mensagem);
    
    return mail($para, $assunto, $mensagemHTML, $headers);
}

/**
 * Template HTML para e-mails
 */
function templateEmail($conteudo) {
    return "
    <!DOCTYPE html>
    <html lang='pt-BR'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;'>
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #f5f5f5; padding: 20px;'>
            <tr>
                <td align='center'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
                        <!-- Header -->
                        <tr>
                            <td style='background: linear-gradient(135deg, #003366 0%, #004080 100%); padding: 30px; text-align: center;'>
                                <h1 style='color: #ffffff; margin: 0; font-size: 24px;'>FAM - Faculdade de Americana</h1>
                                <p style='color: #ffffff; margin: 10px 0 0 0; font-size: 14px;'>Sistema de Gerenciamento de Vagas</p>
                            </td>
                        </tr>
                        <!-- Conteúdo -->
                        <tr>
                            <td style='padding: 40px 30px;'>
                                $conteudo
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style='background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;'>
                                <p style='color: #757575; font-size: 12px; margin: 0;'>
                                    Este é um e-mail automático. Por favor, não responda.<br>
                                    © " . date('Y') . " FAM - Faculdade de Americana. Todos os direitos reservados.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    ";
}

/**
 * E-mail de boas-vindas após cadastro (pendente de aprovação)
 */
function emailCadastroRealizado($nome, $email) {
    $conteudo = "
        <h2 style='color: #003366; margin-top: 0;'>Olá, $nome!</h2>
        <p style='color: #333; line-height: 1.6;'>
            Seu cadastro foi realizado com sucesso no Sistema de Gerenciamento de Vagas da FAM.
        </p>
        <p style='color: #333; line-height: 1.6;'>
            <strong>Status:</strong> Aguardando aprovação do administrador
        </p>
        <div style='background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;'>
            <p style='color: #856404; margin: 0;'>
                ⏳ <strong>Atenção:</strong> Seu acesso será liberado após a aprovação do administrador. 
                Você receberá um e-mail assim que seu cadastro for aprovado.
            </p>
        </div>
        <p style='color: #333; line-height: 1.6;'>
            <strong>Dados cadastrados:</strong><br>
            Nome: $nome<br>
            E-mail: $email
        </p>
        <p style='color: #333; line-height: 1.6;'>
            Caso não tenha realizado este cadastro, por favor, entre em contato conosco imediatamente.
        </p>
    ";
    
    return enviarEmail($email, $nome, 'Cadastro realizado - Aguardando aprovação', $conteudo);
}

/**
 * E-mail notificando admin sobre novo cadastro pendente
 */
function emailNovoUsuarioPendente($adminEmail, $nomeUsuario, $emailUsuario) {
    $urlPainel = BASE_URL . '/painel-admin.html';
    
    $conteudo = "
        <h2 style='color: #003366; margin-top: 0;'>Novo Usuário Aguardando Aprovação</h2>
        <p style='color: #333; line-height: 1.6;'>
            Um novo usuário se cadastrou no sistema e está aguardando sua aprovação.
        </p>
        <div style='background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;'>
            <p style='color: #0d47a1; margin: 0;'>
                <strong>Nome:</strong> $nomeUsuario<br>
                <strong>E-mail:</strong> $emailUsuario
            </p>
        </div>
        <p style='color: #333; line-height: 1.6;'>
            Acesse o painel administrativo para aprovar ou rejeitar este usuário:
        </p>
        <div style='text-align: center; margin: 30px 0;'>
            <a href='$urlPainel' style='background-color: #003366; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;'>
                Acessar Painel
            </a>
        </div>
    ";
    
    return enviarEmail($adminEmail, 'Administrador', 'Novo usuário aguardando aprovação', $conteudo);
}

/**
 * E-mail de aprovação de cadastro
 */
function emailCadastroAprovado($nome, $email) {
    $urlLogin = BASE_URL . '/painel-admin.html';
    
    $conteudo = "
        <h2 style='color: #003366; margin-top: 0;'>Parabéns, $nome! 🎉</h2>
        <p style='color: #333; line-height: 1.6;'>
            Seu cadastro foi <strong style='color: #4CAF50;'>aprovado</strong> pelo administrador!
        </p>
        <div style='background-color: #d4edda; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0;'>
            <p style='color: #155724; margin: 0;'>
                ✅ <strong>Acesso liberado!</strong> Agora você pode fazer login e gerenciar vagas.
            </p>
        </div>
        <p style='color: #333; line-height: 1.6;'>
            <strong>Seus dados de acesso:</strong><br>
            E-mail: $email<br>
            Senha: A senha que você cadastrou
        </p>
        <div style='text-align: center; margin: 30px 0;'>
            <a href='$urlLogin' style='background-color: #4CAF50; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;'>
                Fazer Login
            </a>
        </div>
        <p style='color: #333; line-height: 1.6;'>
            Caso tenha esquecido sua senha, entre em contato com o administrador.
        </p>
    ";
    
    return enviarEmail($email, $nome, 'Cadastro aprovado - Acesso liberado!', $conteudo);
}

/**
 * E-mail de rejeição de cadastro
 */
function emailCadastroRejeitado($nome, $email, $motivo = '') {
    $motivoHTML = '';
    if ($motivo) {
        $motivoHTML = "
        <div style='background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;'>
            <p style='color: #856404; margin: 0;'>
                <strong>Motivo:</strong> $motivo
            </p>
        </div>
        ";
    }
    
    $conteudo = "
        <h2 style='color: #003366; margin-top: 0;'>Olá, $nome</h2>
        <p style='color: #333; line-height: 1.6;'>
            Infelizmente, seu cadastro no Sistema de Gerenciamento de Vagas da FAM não foi aprovado.
        </p>
        $motivoHTML
        <p style='color: #333; line-height: 1.6;'>
            Se você acredita que isso é um erro ou deseja mais informações, 
            por favor, entre em contato com o departamento de Recursos Humanos.
        </p>
        <p style='color: #333; line-height: 1.6;'>
            <strong>Contato RH:</strong><br>
            E-mail: rh@fam.br<br>
            Telefone: (19) 3xxx-xxxx
        </p>
    ";
    
    return enviarEmail($email, $nome, 'Cadastro não aprovado', $conteudo);
}

/**
 * E-mail de notificação quando uma nova vaga é criada (opcional)
 */
function emailNovaVagaCriada($adminEmails, $tituloVaga, $tipoVaga) {
    $conteudo = "
        <h2 style='color: #003366; margin-top: 0;'>Nova Vaga Publicada</h2>
        <p style='color: #333; line-height: 1.6;'>
            Uma nova vaga foi publicada no sistema.
        </p>
        <div style='background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;'>
            <p style='color: #0d47a1; margin: 0;'>
                <strong>Título:</strong> $tituloVaga<br>
                <strong>Tipo:</strong> " . ($tipoVaga == 'docente' ? 'Docente' : 'Administrativo') . "
            </p>
        </div>
    ";
    
    foreach ($adminEmails as $email) {
        enviarEmail($email, 'Administrador', 'Nova vaga publicada', $conteudo);
    }
}

/**
 * Teste de configuração de e-mail
 * Descomente para testar
 */
/*
function testarEmail() {
    $teste = enviarEmail(
        'seu-email@example.com',
        'Teste',
        'Teste de Configuração',
        '<p>Se você está lendo isso, o envio de e-mails está funcionando!</p>'
    );
    
    if ($teste) {
        echo "✅ E-mail enviado com sucesso!";
    } else {
        echo "❌ Erro ao enviar e-mail.";
    }
}

// testarEmail();
*/
?>
