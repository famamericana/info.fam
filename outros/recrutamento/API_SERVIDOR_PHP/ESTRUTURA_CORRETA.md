# 📁 Estrutura Correta dos Arquivos no Servidor

## ⚠️ IMPORTANTE: Como organizar os arquivos

### Estrutura no servidor `famamericana.com.br`:

```
public_html/
└── recrutamento/
    ├── api/                          ← CRIAR ESTA PASTA!
    │   ├── config.php
    │   ├── api.php
    │   ├── .htaccess
    │   ├── painel-admin.html
    │   ├── gerar-hash.php
    │   └── README.md
    └── (outros arquivos do site)
```

## 🔧 URLs Corretas Após a Configuração:

- **API:** `https://famamericana.com.br/recrutamento/api/api.php/vagas`
- **Painel RH:** `https://famamericana.com.br/recrutamento/api/painel-admin.html`
- **Gerar Hash:** `https://famamericana.com.br/recrutamento/api/gerar-hash.php`

## ✅ Passos para Corrigir:

### 1. No servidor, criar a pasta `api` dentro de `recrutamento/`:

Via FTP/cPanel:
- Acesse: `public_html/recrutamento/`
- Crie uma nova pasta chamada `api`

### 2. Mover os arquivos PHP para dentro da pasta `api/`:

Mova estes arquivos para `recrutamento/api/`:
- ✅ `config.php`
- ✅ `api.php`
- ✅ `.htaccess`
- ✅ `painel-admin.html`
- ✅ `gerar-hash.php`

### 3. Verificar permissões:

```
recrutamento/api/
├── config.php        (644)
├── api.php          (644)
├── .htaccess        (644)
├── painel-admin.html (644)
└── gerar-hash.php   (644)
```

### 4. Testar as URLs:

#### Teste 1: API (público)
```
https://famamericana.com.br/recrutamento/api/api.php/vagas
```
**Esperado:** JSON com lista de vagas (mesmo que vazia)

#### Teste 2: Painel Admin
```
https://famamericana.com.br/recrutamento/api/painel-admin.html
```
**Esperado:** Tela de login

#### Teste 3: Gerar Hash
```
https://famamericana.com.br/recrutamento/api/gerar-hash.php
```
**Esperado:** Formulário para gerar hash de senha

## 🐛 Troubleshooting

### Se ainda der "página não existe":

#### 1. Verificar se o .htaccess está funcionando:

Acesse diretamente:
```
https://famamericana.com.br/recrutamento/api/api.php
```

Se funcionar, o problema é o .htaccess. Tente este .htaccess alternativo:

```apache
# .htaccess alternativo
RewriteEngine On
RewriteBase /recrutamento/api/

# Redirecionar requisições para api.php
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ api.php/$1 [L,QSA]
```

#### 2. Se o servidor não suporta .htaccess:

Use as URLs completas:
- API: `https://famamericana.com.br/recrutamento/api/api.php/vagas`
- Login: `https://famamericana.com.br/recrutamento/api/api.php/login`

#### 3. Verificar logs do servidor:

No cPanel:
- Metrics → Errors
- Procure por erros relacionados a `/recrutamento/api/`

#### 4. Testar PHP básico:

Crie um arquivo `test.php` em `recrutamento/api/`:

```php
<?php
phpinfo();
?>
```

Acesse: `https://famamericana.com.br/recrutamento/api/test.php`

Se aparecer a página de informações do PHP, o servidor está funcionando.

## 📞 Comando de Teste Rápido

### PowerShell (no seu PC):

```powershell
# Testar API
Invoke-WebRequest -Uri "https://famamericana.com.br/recrutamento/api/api.php/vagas" -Method GET

# Testar painel
Invoke-WebRequest -Uri "https://famamericana.com.br/recrutamento/api/painel-admin.html" -Method GET
```

### Se retornar 404:
- Arquivos não estão no lugar certo
- Verificar FTP/cPanel

### Se retornar 500:
- Erro no PHP
- Verificar logs do servidor
- Verificar credenciais do banco em `config.php`

### Se retornar 200:
- ✅ Funcionando! Acesse pelo navegador

## 🎯 Resumo da Correção:

**Antes (ERRADO):**
```
recrutamento/
├── config.php        ← ERRADO
├── api.php          ← ERRADO
└── painel-admin.html ← ERRADO
```

**Depois (CORRETO):**
```
recrutamento/
└── api/              ← CRIAR ESTA PASTA
    ├── config.php
    ├── api.php
    └── painel-admin.html
```

## ✅ Checklist Final:

- [ ] Pasta `api` criada dentro de `recrutamento/`
- [ ] Arquivos PHP movidos para `recrutamento/api/`
- [ ] `.htaccess` está dentro de `recrutamento/api/`
- [ ] Banco de dados criado e `database.sql` executado
- [ ] Credenciais corretas em `config.php`
- [ ] URL de teste funciona: `https://famamericana.com.br/recrutamento/api/api.php/vagas`
- [ ] Painel abre: `https://famamericana.com.br/recrutamento/api/painel-admin.html`

---

**Depois de fazer isso, os arquivos no site público (info.fam) vão funcionar automaticamente!**
