# 🔐 Sistema de Aprovação de Usuários - Guia Completo

## 📋 O Que Mudou?

Agora o sistema tem **controle total** sobre quem pode gerenciar vagas:

### ✅ Antes:
- Qualquer pessoa com login podia criar vagas
- Sem controle de aprovação

### ✅ Agora:
- ✅ **Registro público** - Qualquer pessoa da FAM pode se cadastrar
- ✅ **Aprovação manual** - Apenas o administrador aprova novos usuários
- ✅ **E-mails automáticos** - Notificações em cada etapa
- ✅ **Status de usuário** - pendente, aprovado, rejeitado
- ✅ **Acesso bloqueado** - Usuários pendentes não conseguem fazer login

---

## 🎯 Fluxo Completo

```
1. Usuário se cadastra
   ↓
2. Status: PENDENTE
   ↓
3. E-mail para usuário: "Aguarde aprovação"
   ↓
4. E-mail para admin: "Novo usuário pendente"
   ↓
5. Admin acessa painel e aprova/rejeita
   ↓
6. E-mail para usuário: "Aprovado" ou "Rejeitado"
   ↓
7. Se aprovado: Pode fazer login e gerenciar vagas
```

---

## 📁 Novos Arquivos Criados

### 1. `email.php`
- Configuração e envio de e-mails
- Templates HTML profissionais
- Funções para cada tipo de notificação

### 2. `registrar.html`
- Página pública de cadastro
- Validação de senha forte
- Máscara de telefone
- Interface responsiva

### 3. `update_database.sql`
- Script para atualizar banco existente
- Adiciona novas colunas
- Atualiza usuários existentes

### 4. `api.php` (atualizado)
- Novos endpoints de aprovação
- Validação de status no login
- Gerenciamento de usuários

---

## 🚀 Como Instalar/Atualizar

### Se está instalando pela primeira vez:

1. Use o `database.sql` normal
2. Configure o `email.php` com suas credenciais SMTP
3. Faça upload de todos os arquivos
4. Pronto!

### Se já tem o sistema instalado:

1. **Backup do banco de dados** (IMPORTANTE!)
   ```bash
   mysqldump -u usuario -p recrutamento_fam > backup.sql
   ```

2. **Executar atualização**
   ```bash
   mysql -u usuario -p recrutamento_fam < update_database.sql
   ```

3. **Configurar e-mail** em `email.php`:
   ```php
   define('SMTP_HOST', 'smtp.hostinger.com');
   define('SMTP_USER', 'noreply@famamericana.com.br');
   define('SMTP_PASS', 'sua_senha_aqui');
   ```

4. **Fazer upload dos novos arquivos**:
   - `email.php` (novo)
   - `registrar.html` (novo)
   - `api.php` (atualizado)

---

## 📧 Configuração de E-mail

### Opção 1: Mail() Nativo (Mais Simples)

O `email.php` já está configurado para usar o `mail()` do PHP, que funciona na maioria dos servidores compartilhados.

**Vantagens:**
- ✅ Funciona sem configuração adicional
- ✅ Não precisa de credenciais SMTP
- ✅ Suportado pela maioria dos hostings

**Desvantagens:**
- ⚠️ Pode cair na caixa de spam
- ⚠️ Depende da configuração do servidor

### Opção 2: SMTP (Mais Confiável)

Se preferir usar SMTP (mais confiável):

1. Instale o PHPMailer via Composer:
   ```bash
   composer require phpmailer/phpmailer
   ```

2. Ou baixe manualmente de: https://github.com/PHPMailer/PHPMailer

3. Descomente a seção SMTP no `email.php`

### Configurações SMTP Comuns:

#### Hostinger:
```php
SMTP_HOST: 'smtp.hostinger.com'
SMTP_PORT: 587
SMTP_USER: 'seu-email@famamericana.com.br'
SMTP_PASS: 'sua_senha'
```

#### Gmail:
```php
SMTP_HOST: 'smtp.gmail.com'
SMTP_PORT: 587
SMTP_USER: 'seu-email@gmail.com'
SMTP_PASS: 'senha de app' // Não use a senha normal!
```

**Para Gmail, você precisa gerar uma "Senha de App":**
1. Acesse: https://myaccount.google.com/security
2. Ative a verificação em duas etapas
3. Vá em "Senhas de app"
4. Gere uma senha para "E-mail"

---

## 🎨 URLs do Sistema

### Público (Qualquer pessoa pode acessar):
- **Cadastro:** `https://famamericana.com.br/recrutamento/api/registrar.html`
- **Vagas:** `https://famamericana.com.br/recrutamento/api/api.php/vagas`

### Autenticado (Requer aprovação):
- **Login:** `https://famamericana.com.br/recrutamento/api/painel-admin.html`
- **Criar Vaga:** Após login no painel

### Admin Only (Apenas administrador):
- **Aprovar Usuários:** No painel, aba "Usuários Pendentes"

---

## 👨‍💼 Painel Administrativo

O administrador (primeiro usuário ou email rh@fam.br) verá uma aba adicional:

### **Aba "Usuários Pendentes"**

Exibe:
- 📋 Nome do usuário
- ✉️ E-mail
- 📞 Telefone
- 💼 Cargo
- 📅 Data de cadastro
- 🔘 Botões: Aprovar / Rejeitar

**Ações:**
- ✅ **Aprovar:** Libera acesso + envia e-mail
- ❌ **Rejeitar:** Bloqueia acesso + envia e-mail (com motivo opcional)

---

## 📊 Status de Usuários

### 🟡 Pendente
- Recém cadastrado
- Aguardando aprovação do admin
- Não pode fazer login
- Recebeu e-mail de "aguarde aprovação"

### 🟢 Aprovado
- Aprovado pelo administrador
- Pode fazer login
- Pode gerenciar vagas
- Recebeu e-mail de "acesso liberado"

### 🔴 Rejeitado
- Rejeitado pelo administrador
- Não pode fazer login
- Recebeu e-mail explicando a rejeição
- Admin pode adicionar motivo

---

## 🔒 Segurança

### Melhorias Implementadas:

1. **Validação de Senha**
   - Mínimo 6 caracteres
   - Indicador de força (fraca, média, forte)
   - Confirmação obrigatória

2. **E-mail Institucional**
   - Recomendado usar @fam.br
   - Validação de formato

3. **Telefone**
   - Campo obrigatório
   - Máscara automática
   - Para contato em caso de dúvidas

4. **Aprovação Manual**
   - Evita cadastros fraudulentos
   - Controle total do administrador

5. **E-mails Automáticos**
   - Rastreabilidade
   - Usuário sempre informado
   - Admin notificado imediatamente

---

## 📧 Tipos de E-mails Enviados

### 1. **Cadastro Realizado** (para usuário)
- ✉️ **Quando:** Após registro
- 📝 **Conteúdo:** Confirmação de cadastro, status pendente
- 🎨 **Estilo:** Amarelo (atenção)

### 2. **Novo Usuário Pendente** (para admin)
- ✉️ **Quando:** Após registro
- 📝 **Conteúdo:** Dados do novo usuário, link para painel
- 🎨 **Estilo:** Azul (informação)

### 3. **Cadastro Aprovado** (para usuário)
- ✉️ **Quando:** Admin aprova
- 📝 **Conteúdo:** Acesso liberado, link para login
- 🎨 **Estilo:** Verde (sucesso)

### 4. **Cadastro Rejeitado** (para usuário)
- ✉️ **Quando:** Admin rejeita
- 📝 **Conteúdo:** Explicação, motivo (opcional), contato RH
- 🎨 **Estilo:** Amarelo (alerta)

---

## 🧪 Testar E-mails

1. Edite o arquivo `email.php`

2. No final do arquivo, descomente:
   ```php
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

   testarEmail();
   ```

3. Acesse: `https://famamericana.com.br/recrutamento/api/email.php`

4. Verifique seu e-mail

5. Se funcionou, comente novamente a função

---

## 🐛 Troubleshooting

### Problema: E-mails não chegam

**Soluções:**
1. Verificar configuração SMTP em `email.php`
2. Verificar caixa de spam
3. Testar com a função `testarEmail()`
4. Verificar logs do servidor: `tail -f /var/log/mail.log`

### Problema: Erro ao aprovar usuário

**Soluções:**
1. Verificar se `email.php` foi carregado
2. Verificar permissões dos arquivos
3. Verificar logs de erro do PHP
4. Testar endpoint manualmente:
   ```bash
   curl -X POST https://famamericana.com.br/recrutamento/api/api.php/aprovar-usuario \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"usuario_id": 2, "admin_id": 1}'
   ```

### Problema: Usuário não consegue se cadastrar

**Soluções:**
1. Verificar se `registrar.html` está acessível
2. Abrir console do navegador (F12) e ver erros
3. Verificar se API está respondendo
4. Verificar banco de dados

---

## ✅ Checklist de Implementação

### Configuração:
- [ ] Banco de dados atualizado (`update_database.sql`)
- [ ] `email.php` configurado com credenciais SMTP
- [ ] URL base configurada em `email.php`
- [ ] Arquivos enviados para servidor
- [ ] Permissões corretas (644 para PHP)

### Testes:
- [ ] E-mail de teste funcionando
- [ ] Cadastro de novo usuário funciona
- [ ] Admin recebe e-mail de novo usuário
- [ ] Aprovação funciona
- [ ] Usuário aprovado recebe e-mail
- [ ] Login funciona após aprovação
- [ ] Usuário pendente não consegue login
- [ ] Rejeição funciona

### Documentação:
- [ ] Equipe RH treinada
- [ ] Processo de aprovação documentado
- [ ] E-mails de teste salvos
- [ ] Credenciais SMTP seguras

---

## 📚 Para Mais Informações

- **Documentação PHPMailer:** https://github.com/PHPMailer/PHPMailer
- **Testar SMTP:** https://www.smtper.net/
- **Gerar senhas de app Gmail:** https://myaccount.google.com/apppasswords

---

## 💡 Dicas

1. **Use e-mail institucional** (@fam.br) para maior credibilidade
2. **Teste os e-mails** antes de colocar em produção
3. **Monitore a caixa de spam** nas primeiras vezes
4. **Aprove apenas pessoas conhecidas** do RH
5. **Documente o motivo** ao rejeitar usuários
6. **Faça backup** antes de atualizar o banco

---

**Desenvolvido para: FAM - Faculdade de Americana**  
**Versão:** 2.0 - Sistema de Aprovação  
**Data:** Novembro 2025
