# API de Recrutamento FAM

## Instalação

1. Copie os arquivos para: `famamericana.com.br/recrutamento/api/`

2. Crie o banco de dados executando `database.sql`:
```bash
mysql -u root -p < database.sql
```

3. Configure o arquivo `config.php` com suas credenciais do MySQL:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'recrutamento_fam');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
```

4. **IMPORTANTE**: No `config.php`, altere o CORS para o domínio correto:
```php
header('Access-Control-Allow-Origin: https://famamericana.com.br');
```

5. Configure o `.htaccess` para URLs amigáveis (opcional mas recomendado)

## Credenciais padrão

- **Email**: rh@fam.br
- **Senha**: admin123

⚠️ **ALTERE IMEDIATAMENTE APÓS PRIMEIRO LOGIN!**

## Endpoints da API

### Público (sem autenticação)

#### Listar vagas ativas
```
GET https://famamericana.com.br/recrutamento/api/api.php/vagas
```

Resposta:
```json
{
  "success": true,
  "vagas": [
    {
      "id": 1,
      "titulo": "Analista de RH",
      "tipo": "administrativo",
      "descricao": "...",
      "requisitos": "...",
      "diferenciais": "...",
      "regime": "CLT",
      "jornada": "40h semanais",
      "local": "Americana/SP",
      "salario": "A combinar",
      "destaque": true,
      "publicado_em": "15/11/2025"
    }
  ]
}
```

### Autenticado (requer token)

#### Login
```
POST https://famamericana.com.br/recrutamento/api/api.php/login
Content-Type: application/json

{
  "email": "rh@fam.br",
  "senha": "admin123"
}
```

#### Criar vaga
```
POST https://famamericana.com.br/recrutamento/api/api.php/vaga
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "titulo": "Professor de Direito",
  "tipo": "docente",
  "descricao": "Lecionar disciplinas...",
  "requisitos": "Mestrado em Direito...",
  "diferenciais": "Doutorado...",
  "regime": "Horista",
  "jornada": "Variável",
  "local": "Americana/SP",
  "salario": "Conforme convenção",
  "ativa": 1,
  "destaque": 0,
  "criado_por": 1
}
```

#### Atualizar vaga
```
PUT https://famamericana.com.br/recrutamento/api/api.php/vaga?id=1
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "titulo": "Novo título",
  "ativa": 0
}
```

#### Desativar vaga
```
DELETE https://famamericana.com.br/recrutamento/api/api.php/vaga?id=1
Authorization: Bearer SEU_TOKEN
```

## Segurança

⚠️ **ANTES DE COLOCAR EM PRODUÇÃO:**

1. Altere a senha padrão
2. Configure HTTPS
3. Implemente JWT em vez do token simples
4. Configure CORS corretamente
5. Adicione rate limiting
6. Configure logs de segurança
7. Faça backup regular do banco

## Estrutura de arquivos

```
/recrutamento/api/
├── config.php       # Configurações e conexão DB
├── api.php          # Endpoints da API
├── database.sql     # Script de criação do banco
├── README.md        # Este arquivo
└── .htaccess        # Configuração Apache (criar)
```

## .htaccess (opcional)

Crie este arquivo para URLs mais limpas:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ api.php/$1 [L,QSA]
```
