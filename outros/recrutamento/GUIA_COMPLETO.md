# 🎓 Sistema de Vagas FAM - Guia Completo

## 📋 Visão Geral

Sistema completo para gerenciamento de vagas de recrutamento da FAM, com:
- **API REST em PHP/MySQL** para gerenciamento pelo RH
- **Interface pública em HTML/JS** para exibição das vagas
- **Painel administrativo** para o RH criar/editar vagas

## 🏗️ Arquitetura

```
famamericana.com.br/recrutamento/api/    → API PHP (servidor do RH)
info.fam/recrutamento/                     → Site público (exibe vagas)
```

---

## 📦 Instalação

### 1️⃣ Servidor PHP (famamericana.com.br)

#### Arquivos criados:
- `API_SERVIDOR_PHP/config.php` - Configurações do banco
- `API_SERVIDOR_PHP/api.php` - Endpoints da API
- `API_SERVIDOR_PHP/database.sql` - Estrutura do banco
- `API_SERVIDOR_PHP/painel-admin.html` - Interface administrativa
- `API_SERVIDOR_PHP/README.md` - Documentação da API

#### Passos:

1. **Criar banco de dados:**
```bash
mysql -u root -p < database.sql
```

2. **Configurar credenciais** em `config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'recrutamento_fam');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
```

3. **Configurar CORS** em `config.php`:
```php
// Em produção, substitua * pelo domínio específico
header('Access-Control-Allow-Origin: https://famamericana.com.br');
```

4. **Upload dos arquivos** para o servidor:
```
famamericana.com.br/
└── recrutamento/
    └── api/
        ├── config.php
        ├── api.php
        └── painel-admin.html
```

5. **Acessar painel administrativo:**
```
https://famamericana.com.br/recrutamento/api/painel-admin.html
```

**Credenciais padrão:**
- Email: `rh@fam.br`
- Senha: `admin123`

⚠️ **ALTERE IMEDIATAMENTE APÓS PRIMEIRO LOGIN!**

---

### 2️⃣ Site Público (info.fam)

#### Arquivos criados:
- `vagas-api.js` - Cliente JavaScript para consumir a API
- `vagas-styles.css` - Estilos para as vagas
- `index.html` - Atualizado para incluir os novos arquivos

#### Passos:

1. **Os arquivos já estão no lugar correto:**
```
info.fam/outros/recrutamento/
├── index.html (atualizado)
├── vagas-api.js (novo)
├── vagas-styles.css (novo)
└── script.js (existente)
```

2. **Configurar URL da API** em `vagas-api.js`:
```javascript
const API_CONFIG = {
    baseURL: 'https://famamericana.com.br/recrutamento/api/api.php',
    timeout: 10000
};
```

3. **Pronto!** As vagas aparecerão automaticamente na página.

---

## 🎯 Como Usar

### Para o RH:

1. **Acessar painel:**
   ```
   https://famamericana.com.br/recrutamento/api/painel-admin.html
   ```

2. **Fazer login** com as credenciais

3. **Criar nova vaga:**
   - Clicar em "+ Nova Vaga"
   - Preencher os campos
   - Marcar se é destaque
   - Salvar

4. **Editar vaga existente:**
   - Clicar em "Editar" na vaga desejada
   - Fazer alterações
   - Salvar

5. **Desativar vaga:**
   - Clicar em "Desativar"
   - Confirmar

### Para visitantes do site:

1. Acessar: `https://famamericana.com.br/info.fam/recrutamento`
2. Ver vagas disponíveis automaticamente
3. Clicar em "Candidatar-se" para ir ao formulário

---

## 🔧 Estrutura da API

### Endpoints Públicos:

#### Listar vagas ativas
```
GET /api.php/vagas
```
Retorna todas as vagas ativas e não expiradas.

### Endpoints Autenticados:

#### Login
```
POST /api.php/login
{
  "email": "rh@fam.br",
  "senha": "admin123"
}
```

#### Criar vaga
```
POST /api.php/vaga
Authorization: Bearer TOKEN
{
  "titulo": "Professor de Direito",
  "tipo": "docente",
  "descricao": "...",
  ...
}
```

#### Atualizar vaga
```
PUT /api.php/vaga?id=1
Authorization: Bearer TOKEN
{
  "titulo": "Novo título",
  ...
}
```

#### Desativar vaga
```
DELETE /api.php/vaga?id=1
Authorization: Bearer TOKEN
```

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `usuarios_rh`
- `id` - ID do usuário
- `nome` - Nome completo
- `email` - E-mail (único)
- `senha` - Senha hash (bcrypt)
- `ativo` - Status (1 = ativo)
- `criado_em` - Data de criação
- `ultimo_acesso` - Último login

### Tabela: `vagas`
- `id` - ID da vaga
- `titulo` - Título da vaga
- `tipo` - 'administrativo' ou 'docente'
- `descricao` - Descrição completa
- `requisitos` - Requisitos necessários
- `diferenciais` - Diferenciais desejados
- `regime` - Tipo de contrato (CLT, PJ, etc)
- `jornada` - Carga horária
- `local` - Localização
- `salario` - Faixa salarial
- `ativa` - Status (1 = ativa)
- `destaque` - Destacar (1 = sim)
- `criado_por` - ID do usuário que criou
- `criado_em` - Data de criação
- `atualizado_em` - Última atualização
- `publicado_em` - Data de publicação
- `expira_em` - Data de expiração (opcional)

---

## 🔒 Segurança

### ⚠️ ANTES DE COLOCAR EM PRODUÇÃO:

1. **Alterar senha padrão** do usuário admin
2. **Configurar HTTPS** em ambos os domínios
3. **Restringir CORS** para domínio específico
4. **Implementar JWT** em vez de token simples
5. **Adicionar rate limiting** para prevenir abuso
6. **Configurar logs** de acesso e erros
7. **Fazer backup regular** do banco de dados
8. **Validar inputs** no servidor (já implementado parcialmente)
9. **Configurar permissões** adequadas dos arquivos PHP
10. **Usar prepared statements** (já implementado)

---

## 🎨 Personalização

### Alterar cores das vagas:
Editar `vagas-styles.css`:
```css
.vaga-header {
    background: linear-gradient(135deg, #003366 0%, #004080 100%);
}
```

### Adicionar novos campos:
1. Atualizar `database.sql` (adicionar coluna)
2. Atualizar `api.php` (adicionar no INSERT/UPDATE)
3. Atualizar `painel-admin.html` (adicionar campo no form)
4. Atualizar `vagas-api.js` (exibir novo campo)

---

## 🐛 Troubleshooting

### Problema: Vagas não aparecem no site

**Soluções:**
1. Verificar console do navegador (F12)
2. Confirmar que a API está respondendo:
   ```
   https://famamericana.com.br/recrutamento/api/api.php/vagas
   ```
3. Verificar CORS no `config.php`
4. Confirmar que há vagas ativas no banco

### Problema: Erro ao fazer login

**Soluções:**
1. Verificar credenciais
2. Confirmar que o banco está criado
3. Verificar logs do PHP
4. Testar conexão do banco em `config.php`

### Problema: CORS Error

**Solução:**
Configurar corretamente em `config.php`:
```php
header('Access-Control-Allow-Origin: https://famamericana.com.br');
```

---

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 Mobile (< 480px)
- 📱 Tablet (480px - 768px)
- 💻 Desktop (> 768px)

---

## 🚀 Melhorias Futuras

- [ ] Implementar JWT para autenticação mais segura
- [ ] Adicionar sistema de permissões (admin, editor, viewer)
- [ ] Exportar vagas para PDF
- [ ] Estatísticas de visualizações
- [ ] Sistema de notificações por e-mail
- [ ] Filtros avançados no site público
- [ ] API para integração com LinkedIn/Indeed
- [ ] Upload de imagens nas vagas
- [ ] Sistema de candidaturas integrado

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar esta documentação
2. Conferir logs do servidor
3. Testar endpoints da API manualmente
4. Verificar permissões de arquivo/banco

---

## 📄 Licença

Sistema desenvolvido exclusivamente para FAM - Faculdade de Americana.
Todos os direitos reservados © 2025
