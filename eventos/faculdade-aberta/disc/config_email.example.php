<?php
// Arquivo de configurações de exemplo
// COPIE este arquivo para "config_email.php" e configure suas credenciais reais

return [
    'smtp_host' => 'smtp.gmail.com',  // Para Gmail
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_username' => 'SEU-EMAIL@gmail.com', // SUBSTITUA pelo seu email
    'smtp_password' => 'SUA-SENHA-APP',       // SUBSTITUA pela senha de app do Gmail
    'from_email' => 'SEU-EMAIL@gmail.com',    // SUBSTITUA pelo seu email
    'from_name' => 'FAM - Teste Vocacional',
    'reply_to' => 'SEU-EMAIL@gmail.com'       // SUBSTITUA pelo seu email
];

/*
CONFIGURAÇÃO PARA GMAIL:
1. Vá em https://myaccount.google.com/security
2. Ative a "Verificação em 2 etapas"
3. Em "Senhas de app", gere uma senha específica para este projeto
4. Use essa senha de app no campo 'smtp_password' (não sua senha real)

OUTRAS OPÇÕES DE SMTP:
- Outlook/Hotmail: smtp-mail.outlook.com, porta 587
- Yahoo: smtp.mail.yahoo.com, porta 587  
- SendGrid, Mailgun, AWS SES, etc.

SEGURANÇA:
- Nunca comite o arquivo config_email.php no Git
- Use variáveis de ambiente em produção
- Mantenha as credenciais seguras
*/
?>
