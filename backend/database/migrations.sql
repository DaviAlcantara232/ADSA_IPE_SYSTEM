-- =====================================
-- ADSA IPÊ SYSTEM
-- BANCO DE DADOS
-- =====================================

CREATE DATABASE IF NOT EXISTS adsa_ipe_system
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE adsa_ipe_system;

-- =====================================
-- USUÁRIOS
-- =====================================

CREATE TABLE IF NOT EXISTS usuarios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(150) NOT NULL,

    email VARCHAR(200) NOT NULL UNIQUE,

    cpf CHAR(11) UNIQUE,

    senha VARCHAR(255) NOT NULL,

    tipo ENUM('admin','pastor','lider','tesoureiro','membro')
        DEFAULT 'membro',

    status ENUM('ativo','inativo','bloqueado')
        DEFAULT 'ativo',

    email_verificado BOOLEAN DEFAULT FALSE,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================
-- MEMBROS
-- =====================================

CREATE TABLE IF NOT EXISTS membros (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(150) NOT NULL,

    email VARCHAR(200),

    cpf CHAR(11),

    telefone VARCHAR(20),

    nascimento DATE,

    endereco TEXT,

    status ENUM('ativo','inativo')
        DEFAULT 'ativo',

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================
-- FINANCEIRO
-- =====================================

CREATE TABLE IF NOT EXISTS financeiro (

    id INT AUTO_INCREMENT PRIMARY KEY,

    tipo ENUM('entrada','saida') NOT NULL,

    descricao VARCHAR(255) NOT NULL,

    valor DECIMAL(12,2) NOT NULL,

    data DATE NOT NULL,

    usuario_id INT,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_financeiro_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)

);

-- =====================================
-- EVENTOS
-- =====================================

CREATE TABLE IF NOT EXISTS eventos (

    id INT AUTO_INCREMENT PRIMARY KEY,

    titulo VARCHAR(150) NOT NULL,

    descricao TEXT,

    data_evento DATE,

    horario TIME,

    local VARCHAR(255),

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);