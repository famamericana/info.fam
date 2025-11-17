# 🧪 Testes Manuais da API - Sistema de Vagas FAM

Este documento contém exemplos de como testar manualmente a API usando PowerShell ou curl.

---

## 🔧 Pré-requisitos

### PowerShell (Windows)
Já vem instalado. Abra o PowerShell e execute os comandos diretamente.

### curl (Windows/Linux/Mac)
No Windows 10+, curl já vem instalado. Para versões antigas, baixe em: https://curl.se/download.html

---

## 🌐 Configuração

Defina a URL base da sua API:

```powershell
# PowerShell
$API_URL = "https://famamericana.com.br/recrutamento/api/api.php"
```

```bash
# Bash/Linux/Mac
export API_URL="https://famamericana.com.br/recrutamento/api/api.php"
```

---

## 1️⃣ Listar Vagas (Público)

### PowerShell:
```powershell
Invoke-RestMethod -Uri "$API_URL/vagas" -Method GET
```

### curl:
```bash
curl -X GET "$API_URL/vagas"
```

### Resposta esperada:
```json
{
  "success": true,
  "vagas": [
    {
      "id": 1,
      "titulo": "Analista de RH",
      "tipo": "administrativo",
      "descricao": "...",
      "destaque": true
    }
  ]
}
```

---

## 2️⃣ Login (Autenticação)

### PowerShell:
```powershell
$body = @{
    email = "rh@fam.br"
    senha = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "$API_URL/login" -Method POST -Body $body -ContentType "application/json"
$token = $response.token
Write-Host "Token: $token"
```

### curl:
```bash
curl -X POST "$API_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rh@fam.br",
    "senha": "admin123"
  }'
```

### Resposta esperada:
```json
{
  "success": true,
  "token": "abc123xyz...",
  "usuario": {
    "id": 1,
    "nome": "Administrador",
    "email": "rh@fam.br"
  }
}
```

---

## 3️⃣ Criar Vaga (Autenticado)

### PowerShell:
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$body = @{
    titulo = "Professor de Computação"
    tipo = "docente"
    descricao = "Lecionar disciplinas de programação"
    requisitos = "Mestrado em Ciência da Computação"
    diferenciais = "Doutorado, experiência com pesquisa"
    regime = "Horista"
    jornada = "20h semanais"
    local = "Americana/SP"
    salario = "Conforme convenção"
    ativa = 1
    destaque = 1
    criado_por = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "$API_URL/vaga" -Method POST -Headers $headers -Body $body
```

### curl:
```bash
curl -X POST "$API_URL/vaga" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Professor de Computação",
    "tipo": "docente",
    "descricao": "Lecionar disciplinas de programação",
    "requisitos": "Mestrado em Ciência da Computação",
    "diferenciais": "Doutorado, experiência com pesquisa",
    "regime": "Horista",
    "jornada": "20h semanais",
    "local": "Americana/SP",
    "salario": "Conforme convenção",
    "ativa": 1,
    "destaque": 1,
    "criado_por": 1
  }'
```

### Resposta esperada:
```json
{
  "success": true,
  "id": 3,
  "message": "Vaga criada com sucesso"
}
```

---

## 4️⃣ Atualizar Vaga (Autenticado)

### PowerShell:
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$body = @{
    titulo = "Professor de Computação - ATUALIZADO"
    destaque = 0
} | ConvertTo-Json

Invoke-RestMethod -Uri "$API_URL/vaga?id=3" -Method PUT -Headers $headers -Body $body
```

### curl:
```bash
curl -X PUT "$API_URL/vaga?id=3" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Professor de Computação - ATUALIZADO",
    "destaque": 0
  }'
```

### Resposta esperada:
```json
{
  "success": true,
  "message": "Vaga atualizada com sucesso"
}
```

---

## 5️⃣ Desativar Vaga (Autenticado)

### PowerShell:
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "$API_URL/vaga?id=3" -Method DELETE -Headers $headers
```

### curl:
```bash
curl -X DELETE "$API_URL/vaga?id=3" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Resposta esperada:
```json
{
  "success": true,
  "message": "Vaga desativada com sucesso"
}
```

---

## 🧪 Script Completo de Teste (PowerShell)

Salve este script como `testar-api.ps1` e execute:

```powershell
# Configuração
$API_URL = "https://famamericana.com.br/recrutamento/api/api.php"

Write-Host "=== TESTE 1: Listar vagas públicas ===" -ForegroundColor Cyan
try {
    $vagas = Invoke-RestMethod -Uri "$API_URL/vagas" -Method GET
    Write-Host "✅ Sucesso! Encontradas $($vagas.vagas.Count) vagas" -ForegroundColor Green
    $vagas.vagas | ForEach-Object { Write-Host "  - $($_.titulo)" }
} catch {
    Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== TESTE 2: Login ===" -ForegroundColor Cyan
try {
    $loginBody = @{
        email = "rh@fam.br"
        senha = "admin123"
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "$API_URL/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.token
    Write-Host "✅ Login bem-sucedido! Usuário: $($loginResponse.usuario.nome)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro no login: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

Write-Host "`n=== TESTE 3: Criar vaga ===" -ForegroundColor Cyan
try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }

    $vagaBody = @{
        titulo = "TESTE - Vaga Automática"
        tipo = "administrativo"
        descricao = "Esta é uma vaga de teste criada automaticamente"
        requisitos = "Nenhum - apenas teste"
        regime = "Teste"
        jornada = "Teste"
        local = "Teste"
        salario = "Teste"
        ativa = 1
        destaque = 0
        criado_por = $loginResponse.usuario.id
    } | ConvertTo-Json

    $createResponse = Invoke-RestMethod -Uri "$API_URL/vaga" -Method POST -Headers $headers -Body $vagaBody
    $vagaId = $createResponse.id
    Write-Host "✅ Vaga criada! ID: $vagaId" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao criar vaga: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

Write-Host "`n=== TESTE 4: Atualizar vaga ===" -ForegroundColor Cyan
try {
    $updateBody = @{
        titulo = "TESTE - Vaga ATUALIZADA"
    } | ConvertTo-Json

    Invoke-RestMethod -Uri "$API_URL/vaga?id=$vagaId" -Method PUT -Headers $headers -Body $updateBody
    Write-Host "✅ Vaga atualizada!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao atualizar vaga: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== TESTE 5: Desativar vaga ===" -ForegroundColor Cyan
try {
    Invoke-RestMethod -Uri "$API_URL/vaga?id=$vagaId" -Method DELETE -Headers $headers
    Write-Host "✅ Vaga desativada!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao desativar vaga: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== TESTE 6: Verificar vagas públicas novamente ===" -ForegroundColor Cyan
try {
    $vagas = Invoke-RestMethod -Uri "$API_URL/vagas" -Method GET
    Write-Host "✅ Total de vagas ativas: $($vagas.vagas.Count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== TESTES CONCLUÍDOS ===" -ForegroundColor Yellow
```

---

## 🧪 Script Completo de Teste (Bash/Linux/Mac)

Salve este script como `testar-api.sh` e execute com `bash testar-api.sh`:

```bash
#!/bin/bash

# Configuração
API_URL="https://famamericana.com.br/recrutamento/api/api.php"

echo "=== TESTE 1: Listar vagas públicas ==="
curl -s -X GET "$API_URL/vagas" | jq '.'

echo -e "\n=== TESTE 2: Login ==="
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rh@fam.br",
    "senha": "admin123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
USER_ID=$(echo $LOGIN_RESPONSE | jq -r '.usuario.id')

echo "Token obtido: $TOKEN"

echo -e "\n=== TESTE 3: Criar vaga ==="
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/vaga" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"titulo\": \"TESTE - Vaga Automática\",
    \"tipo\": \"administrativo\",
    \"descricao\": \"Esta é uma vaga de teste\",
    \"ativa\": 1,
    \"destaque\": 0,
    \"criado_por\": $USER_ID
  }")

VAGA_ID=$(echo $CREATE_RESPONSE | jq -r '.id')
echo "Vaga criada com ID: $VAGA_ID"

echo -e "\n=== TESTE 4: Atualizar vaga ==="
curl -s -X PUT "$API_URL/vaga?id=$VAGA_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "TESTE - Vaga ATUALIZADA"
  }' | jq '.'

echo -e "\n=== TESTE 5: Desativar vaga ==="
curl -s -X DELETE "$API_URL/vaga?id=$VAGA_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n=== TESTES CONCLUÍDOS ==="
```

---

## 📊 Testar Performance

### PowerShell:
```powershell
Measure-Command {
    Invoke-RestMethod -Uri "$API_URL/vagas" -Method GET
}
```

### curl:
```bash
curl -w "@curl-format.txt" -o /dev/null -s "$API_URL/vagas"
```

Crie o arquivo `curl-format.txt`:
```
time_namelookup:  %{time_namelookup}s\n
time_connect:  %{time_connect}s\n
time_appconnect:  %{time_appconnect}s\n
time_pretransfer:  %{time_pretransfer}s\n
time_redirect:  %{time_redirect}s\n
time_starttransfer:  %{time_starttransfer}s\n
time_total:  %{time_total}s\n
```

---

## 🔍 Verificar CORS

### PowerShell:
```powershell
$response = Invoke-WebRequest -Uri "$API_URL/vagas" -Method GET
$response.Headers["Access-Control-Allow-Origin"]
```

### curl:
```bash
curl -I "$API_URL/vagas" | grep -i "access-control"
```

---

## 🐛 Debug de Erros

### Ver resposta completa com headers:

#### PowerShell:
```powershell
$response = Invoke-WebRequest -Uri "$API_URL/vagas" -Method GET
$response.StatusCode
$response.Headers
$response.Content
```

#### curl:
```bash
curl -v "$API_URL/vagas"
```

---

## 📝 Notas

- Substitua `$API_URL` pela URL real da sua API
- Substitua `SEU_TOKEN_AQUI` pelo token obtido no login
- Use `-Verbose` no PowerShell para mais detalhes
- Use `-v` no curl para modo verbose
- Os scripts de teste criam e removem dados automaticamente

---

## ✅ Checklist de Testes

- [ ] Endpoint público `/vagas` retorna 200
- [ ] Login retorna token válido
- [ ] Criar vaga retorna ID
- [ ] Atualizar vaga retorna sucesso
- [ ] Desativar vaga retorna sucesso
- [ ] Endpoints protegidos bloqueiam sem token
- [ ] CORS permite requisições do domínio correto
- [ ] Tempo de resposta < 500ms
- [ ] Erros retornam códigos HTTP corretos
