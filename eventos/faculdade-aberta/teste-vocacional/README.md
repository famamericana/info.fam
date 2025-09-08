# 📧 Teste DISC com Envio por Email

Sistema de teste vocacional DISC com funcionalidade de envio dos resultados por email.

## 🚀 Instalação

### 1. Instalar dependências
```bash
composer install
```

### 2. Configurar email
1. Copie o arquivo de exemplo:
   ```bash
   cp config_email.example.php config_email.php
   ```

2. Edite `config_email.php` com suas credenciais:
   - Para **Gmail**: use senha de app (não sua senha normal)
   - Para **Outlook**: configure SMTP do Outlook  
   - Para outros: ajuste host e porta conforme necessário

### 3. Configuração Gmail (Recomendado)
1. Acesse [Google Account Security](https://myaccount.google.com/security)
2. Ative **Verificação em 2 etapas**
3. Gere uma **Senha de app** específica para este projeto
4. Use essa senha no `config_email.php`

## 📁 Estrutura de Arquivos

```
teste-vocacional/
├── index.php              # Página principal do teste
├── style.css              # Estilos do teste
├── enviar_resultado.php    # Script para envio de email
├── config_email.php       # Configurações SMTP (não versionado)
├── config_email.example.php # Exemplo de configuração
├── composer.json          # Dependências PHP
└── vendor/                # Bibliotecas instaladas
```

## 🔒 Segurança

- ✅ Arquivo `config_email.php` está no `.gitignore`
- ✅ Validação de email no frontend e backend
- ✅ Sanitização de dados enviados
- ✅ Headers CORS configurados
- ⚠️ **Nunca** versione credenciais reais no Git

## 🛠️ Como Funciona

1. **Usuário** realiza o teste DISC
2. **Sistema** calcula os resultados (D/I/S/C)
3. **Usuário** opcionalmente insere email
4. **Frontend** envia dados via AJAX para `enviar_resultado.php`
5. **Backend** gera email HTML personalizado (com gráficos embutidos) e envia via PHPMailer

## 📧 Exemplo de Email Enviado

O email contém:
- 🎯 Perfil predominante (D/I/S/C)
- 📊 Pontuações detalhadas (SELF/PERSONA/STRESS)
- 🖼️ Gráficos do Chart.js (SELF, PERSONA, STRESS) e a Roda DISC como imagens
- 🎓 Cursos recomendados pela FAM
- 💼 Profissões alinhadas ao perfil
- ✨ Design responsivo e profissional

Observação: alguns clientes de email bloqueiam imagens por padrão. Peça ao usuário para permitir exibição de imagens para ver os gráficos.

## 🐛 Resolução de Problemas

**Erro de autenticação Gmail:**
- Verifique se a verificação em 2 etapas está ativa
- Use senha de app, não sua senha normal
- Confirme o email no `config_email.php`

**Erro "Class not found":**
```bash
composer install
```

**Email não chega:**
- Verifique spam/lixo eletrônico
- Teste com diferentes provedores de email
- Verifique logs do servidor

## 🔧 Personalização

Para customizar o email, edite as funções em `enviar_resultado.php`:
- `gerarEmailHTML()` - Layout e conteúdo HTML
- `gerarEmailTexto()` - Versão texto alternativa
