create database desafio2;
use desafio2;

-- Criação da tabela usuario
CREATE TABLE usuario (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(30),
    email VARCHAR(30) UNIQUE,
    senha VARCHAR(255), 
    telefones JSON,
    ultimo_login TIMESTAMP,
    token VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

