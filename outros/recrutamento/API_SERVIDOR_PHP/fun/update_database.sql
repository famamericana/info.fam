-- ====================================================
-- ATUALIZAÇÃO DO BANCO DE DADOS
-- Sistema de Aprovação de Usuários
-- ====================================================

USE recrutamento_fam;

-- ATENÇÃO: Execute estes comandos APENAS se você já tem o banco criado
-- Se está instalando pela primeira vez, use o database.sql completo

-- 1. Adicionar novas colunas na tabela usuarios_rh
ALTER TABLE usuarios_rh 
ADD COLUMN telefone VARCHAR(20) AFTER senha,
ADD COLUMN cargo VARCHAR(100) AFTER telefone,
ADD COLUMN status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente' AFTER cargo,
ADD COLUMN is_admin TINYINT(1) DEFAULT 0 AFTER status,
ADD COLUMN token_verificacao VARCHAR(64) NULL AFTER ativo,
ADD COLUMN email_verificado TINYINT(1) DEFAULT 0 AFTER token_verificacao,
ADD COLUMN aprovado_por INT NULL AFTER ultimo_acesso,
ADD COLUMN aprovado_em TIMESTAMP NULL AFTER aprovado_por,
ADD COLUMN observacoes TEXT NULL AFTER aprovado_em;

-- 2. Adicionar índices para melhor performance
ALTER TABLE usuarios_rh
ADD INDEX idx_status (status),
ADD INDEX idx_token (token_verificacao),
ADD INDEX idx_is_admin (is_admin);

-- 3. Adicionar chave estrangeira (pode falhar se já existir)
ALTER TABLE usuarios_rh
ADD CONSTRAINT fk_aprovado_por 
FOREIGN KEY (aprovado_por) REFERENCES usuarios_rh(id) ON DELETE SET NULL;

-- 4. Atualizar usuário admin existente para ter status 'aprovado' e is_admin = 1
UPDATE usuarios_rh 
SET status = 'aprovado', is_admin = 1, email_verificado = 1 
WHERE id = 1 OR email = 'rh@fam.br';

-- 5. Atualizar todos os usuários existentes para 'aprovado' (se houver)
-- Descomente a linha abaixo se quiser aprovar todos os usuários existentes
-- UPDATE usuarios_rh SET status = 'aprovado' WHERE status IS NULL;

-- ====================================================
-- VERIFICAR ATUALIZAÇÃO
-- ====================================================

-- Verificar estrutura da tabela
DESCRIBE usuarios_rh;

-- Listar usuários com novo status
SELECT id, nome, email, status, criado_em FROM usuarios_rh;

-- ====================================================
-- ROLLBACK (caso algo dê errado)
-- ====================================================
-- Execute apenas se precisar reverter as alterações

/*
ALTER TABLE usuarios_rh
DROP FOREIGN KEY fk_aprovado_por;

ALTER TABLE usuarios_rh
DROP COLUMN telefone,
DROP COLUMN cargo,
DROP COLUMN status,
DROP COLUMN token_verificacao,
DROP COLUMN email_verificado,
DROP COLUMN aprovado_por,
DROP COLUMN aprovado_em,
DROP COLUMN observacoes,
DROP INDEX idx_status,
DROP INDEX idx_token;
*/
