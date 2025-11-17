-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS recrutamento_fam CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE recrutamento_fam;

-- Tabela de usuários do RH
CREATE TABLE IF NOT EXISTS usuarios_rh (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    cargo VARCHAR(100),
    status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
    is_admin TINYINT(1) DEFAULT 0,
    ativo TINYINT(1) DEFAULT 1,
    token_verificacao VARCHAR(64) NULL,
    email_verificado TINYINT(1) DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP NULL,
    aprovado_por INT NULL,
    aprovado_em TIMESTAMP NULL,
    observacoes TEXT NULL,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_token (token_verificacao),
    INDEX idx_is_admin (is_admin),
    FOREIGN KEY (aprovado_por) REFERENCES usuarios_rh(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de vagas
CREATE TABLE IF NOT EXISTS vagas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- 'administrativo' ou 'docente'
    descricao TEXT NOT NULL,
    requisitos TEXT,
    diferenciais TEXT,
    regime VARCHAR(100), -- 'CLT', 'PJ', etc
    jornada VARCHAR(100), -- 'Integral', 'Parcial', etc
    local VARCHAR(255),
    salario VARCHAR(100),
    ativa TINYINT(1) DEFAULT 1,
    destaque TINYINT(1) DEFAULT 0,
    criado_por INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    publicado_em TIMESTAMP NULL,
    expira_em TIMESTAMP NULL,
    FOREIGN KEY (criado_por) REFERENCES usuarios_rh(id) ON DELETE CASCADE,
    INDEX idx_tipo (tipo),
    INDEX idx_ativa (ativa),
    INDEX idx_destaque (destaque),
    INDEX idx_criado_em (criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir usuário administrador padrão (senha: admin123 - ALTERE DEPOIS!)
-- Status 'aprovado' e is_admin = 1 para ter acesso total
INSERT INTO usuarios_rh (nome, email, senha, status, is_admin, email_verificado) 
VALUES ('Administrador', 'rh@fam.br', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'aprovado', 1, 1);

-- Exemplo de vagas iniciais
INSERT INTO vagas (titulo, tipo, descricao, requisitos, diferenciais, regime, jornada, local, salario, ativa, destaque, criado_por) VALUES
(
    'Analista de RH',
    'administrativo',
    'Procuramos um Analista de RH para integrar nossa equipe e contribuir com processos de recrutamento e seleção.',
    'Superior completo em Psicologia, RH ou áreas afins; Experiência com recrutamento e seleção; Conhecimento em legislação trabalhista',
    'Conhecimento em softwares de gestão de RH; Experiência em instituições de ensino',
    'CLT',
    '40 horas semanais',
    'Americana/SP - Presencial',
    'A combinar',
    1,
    1,
    1
),
(
    'Professor de Engenharia Civil',
    'docente',
    'Oportunidade para docente lecionar disciplinas relacionadas à Engenharia Civil.',
    'Graduação em Engenharia Civil; Mestrado ou Doutorado (desejável); Experiência em docência no ensino superior',
    'Experiência profissional na área; Publicações científicas; Cadastro no Lattes',
    'Horista',
    'Horários variados conforme grade',
    'Americana/SP',
    'Conforme convenção coletiva',
    1,
    1,
    1
);
