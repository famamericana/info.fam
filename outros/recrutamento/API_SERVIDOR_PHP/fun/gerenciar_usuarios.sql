-- Script para adicionar novos usuários do RH
-- Execute este script sempre que precisar adicionar um novo usuário

USE recrutamento_fam;

-- ADICIONAR NOVO USUÁRIO
-- Substitua os valores abaixo e execute este comando

-- Exemplo 1: Usuário com senha "senha123"
-- IMPORTANTE: Sempre use senhas fortes em produção!
INSERT INTO usuarios_rh (nome, email, senha) 
VALUES (
    'Nome do Usuário',
    'email@fam.br',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
    -- Esta é a hash de "admin123" - Altere usando PHP
);

-- =====================================================
-- GERAR HASH DE SENHA
-- =====================================================
-- Você pode gerar uma hash segura usando este script PHP:
-- 
-- <?php
-- $senha = 'sua_senha_aqui';
-- $hash = password_hash($senha, PASSWORD_DEFAULT);
-- echo $hash;
-- ?>
--
-- Depois, copie a hash gerada e use no INSERT acima

-- =====================================================
-- ALTERAR SENHA DE USUÁRIO EXISTENTE
-- =====================================================
-- UPDATE usuarios_rh 
-- SET senha = 'HASH_AQUI'
-- WHERE email = 'email@fam.br';

-- =====================================================
-- DESATIVAR USUÁRIO
-- =====================================================
-- UPDATE usuarios_rh 
-- SET ativo = 0 
-- WHERE email = 'email@fam.br';

-- =====================================================
-- REATIVAR USUÁRIO
-- =====================================================
-- UPDATE usuarios_rh 
-- SET ativo = 1 
-- WHERE email = 'email@fam.br';

-- =====================================================
-- LISTAR TODOS OS USUÁRIOS
-- =====================================================
-- SELECT id, nome, email, ativo, criado_em, ultimo_acesso 
-- FROM usuarios_rh;

-- =====================================================
-- VERIFICAR ATIVIDADE DOS USUÁRIOS
-- =====================================================
-- SELECT 
--     nome,
--     email,
--     ultimo_acesso,
--     DATEDIFF(NOW(), ultimo_acesso) as dias_sem_acesso,
--     ativo
-- FROM usuarios_rh
-- ORDER BY ultimo_acesso DESC;

-- =====================================================
-- ESTATÍSTICAS DE VAGAS POR USUÁRIO
-- =====================================================
-- SELECT 
--     u.nome,
--     COUNT(v.id) as total_vagas,
--     SUM(CASE WHEN v.ativa = 1 THEN 1 ELSE 0 END) as vagas_ativas,
--     SUM(CASE WHEN v.destaque = 1 THEN 1 ELSE 0 END) as vagas_destaque
-- FROM usuarios_rh u
-- LEFT JOIN vagas v ON u.id = v.criado_por
-- GROUP BY u.id, u.nome
-- ORDER BY total_vagas DESC;
