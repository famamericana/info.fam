# ✅ Checklist de Deploy - Sistema de Vagas FAM

Use este checklist para garantir que tudo está configurado corretamente antes de colocar o sistema em produção.

---

## 📋 Pré-Deploy

### Servidor PHP (famamericana.com.br)

- [ ] Banco de dados MySQL criado
- [ ] Arquivo `database.sql` executado com sucesso
- [ ] Credenciais do banco configuradas em `config.php`
- [ ] CORS configurado corretamente (não usar `*` em produção)
- [ ] Arquivos PHP enviados para o servidor
- [ ] Permissões de arquivo configuradas (644 para arquivos, 755 para pastas)
- [ ] `.htaccess` configurado e funcionando
- [ ] PHP 7.4+ instalado no servidor
- [ ] Extensão PDO MySQL habilitada no PHP
- [ ] HTTPS configurado e funcionando

### Site Público (info.fam)

- [ ] Arquivos `vagas-api.js` e `vagas-styles.css` no lugar correto
- [ ] `index.html` atualizado com os novos scripts
- [ ] URL da API configurada corretamente em `vagas-api.js`
- [ ] Testado em diferentes navegadores
- [ ] Testado em dispositivos móveis
- [ ] HTTPS configurado e funcionando

---

## 🔒 Segurança

- [ ] Senha padrão do admin alterada
- [ ] Senhas fortes para todos os usuários
- [ ] HTTPS forçado em ambos os domínios
- [ ] CORS restrito ao domínio específico
- [ ] Arquivo `config.php` não acessível diretamente
- [ ] Arquivo `database.sql` não acessível diretamente
- [ ] Headers de segurança configurados no `.htaccess`
- [ ] SQL injection prevenido (prepared statements)
- [ ] XSS prevenido (escape de HTML no JavaScript)
- [ ] Validação de inputs no servidor
- [ ] Rate limiting considerado (opcional mas recomendado)

---

## 🧪 Testes

### API (Backend)

- [ ] Login funciona corretamente
- [ ] Criar vaga funciona
- [ ] Editar vaga funciona
- [ ] Desativar vaga funciona
- [ ] Listar vagas públicas funciona
- [ ] Autenticação bloqueia endpoints protegidos
- [ ] Erros retornam mensagens apropriadas
- [ ] CORS permite requisições do site público

### Painel Administrativo

- [ ] Login funciona
- [ ] Criar vaga funciona no painel
- [ ] Editar vaga funciona no painel
- [ ] Desativar vaga funciona no painel
- [ ] Lista de vagas carrega corretamente
- [ ] Modal abre e fecha corretamente
- [ ] Badges de tipo e destaque aparecem
- [ ] Logout funciona

### Site Público

- [ ] Vagas carregam automaticamente
- [ ] Vagas em destaque aparecem primeiro
- [ ] Cards de vaga estão bem formatados
- [ ] Botão "Candidatar-se" funciona
- [ ] Formulário é preenchido com o tipo correto
- [ ] Mensagem de "nenhuma vaga" aparece quando vazio
- [ ] Erro de conexão é tratado graciosamente
- [ ] Atualização automática funciona (5 min)

### Responsividade

- [ ] Desktop (> 1024px)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (< 768px)
- [ ] iPhone/Safari
- [ ] Android/Chrome

### Navegadores

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## 📊 Dados Iniciais

- [ ] Usuário admin criado
- [ ] Senha do admin alterada
- [ ] Vagas de exemplo criadas (opcional)
- [ ] Banco de dados testado com dados reais

---

## 🔄 Backup

- [ ] Script de backup do banco configurado
- [ ] Backup manual realizado antes do deploy
- [ ] Política de backup automático definida
- [ ] Restauração de backup testada

---

## 📝 Documentação

- [ ] Equipe do RH treinada
- [ ] Manual de uso criado
- [ ] Credenciais documentadas (em local seguro)
- [ ] URLs importantes documentadas
- [ ] Contato de suporte definido

---

## 🚀 Deploy

### Passo a Passo

1. **Backup**
   - [ ] Fazer backup do banco de dados atual (se existir)
   - [ ] Fazer backup dos arquivos atuais

2. **Upload dos arquivos**
   - [ ] Enviar arquivos PHP para `famamericana.com.br/recrutamento/api/`
   - [ ] Enviar arquivos JS/CSS para `info.fam/recrutamento/`
   - [ ] Verificar permissões dos arquivos

3. **Banco de dados**
   - [ ] Criar banco de dados
   - [ ] Executar `database.sql`
   - [ ] Verificar se as tabelas foram criadas
   - [ ] Inserir dados iniciais

4. **Configuração**
   - [ ] Configurar `config.php` com credenciais corretas
   - [ ] Configurar CORS para domínio correto
   - [ ] Configurar URL da API em `vagas-api.js`

5. **Testes em produção**
   - [ ] Testar login no painel
   - [ ] Criar vaga de teste
   - [ ] Verificar se aparece no site público
   - [ ] Editar vaga de teste
   - [ ] Desativar vaga de teste
   - [ ] Testar em mobile

6. **Limpeza**
   - [ ] Remover vagas de teste
   - [ ] Limpar console logs de desenvolvimento
   - [ ] Verificar se não há erros no console

7. **Monitoramento**
   - [ ] Configurar logs de erro PHP
   - [ ] Configurar Google Analytics (se necessário)
   - [ ] Monitorar primeiras requisições

---

## 🎯 Pós-Deploy

### Primeira Semana

- [ ] Monitorar logs de erro diariamente
- [ ] Verificar se RH consegue usar o sistema
- [ ] Coletar feedback da equipe
- [ ] Ajustar conforme necessário

### Primeiro Mês

- [ ] Analisar estatísticas de uso
- [ ] Verificar performance da API
- [ ] Revisar necessidade de otimizações
- [ ] Planejar melhorias futuras

---

## 🆘 Troubleshooting

### Se algo der errado:

1. **Verificar logs:**
   - PHP error log
   - Console do navegador
   - Network tab (F12)

2. **Testar API diretamente:**
   ```
   https://famamericana.com.br/recrutamento/api/api.php/vagas
   ```

3. **Verificar CORS:**
   - Deve retornar header `Access-Control-Allow-Origin`

4. **Rollback se necessário:**
   - Restaurar backup
   - Investigar problema
   - Corrigir e tentar novamente

---

## 📞 Contatos de Emergência

- **Desenvolvedor:** _________________
- **TI FAM:** _________________
- **Hosting/Servidor:** _________________

---

## ✅ Aprovação Final

- [ ] Teste completo realizado
- [ ] RH aprovou o sistema
- [ ] TI aprovou a segurança
- [ ] Documentação entregue
- [ ] Sistema em produção

**Data do Deploy:** ___/___/_____

**Responsável:** _________________

**Assinatura:** _________________

---

## 📈 KPIs para Monitorar

- Número de vagas criadas por mês
- Tempo médio de uma vaga ativa
- Número de candidaturas por vaga
- Taxa de erro da API
- Tempo de resposta da API
- Dispositivos mais usados para acessar
