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
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table lojas(
	id varchar(36) primary key,
    nome varchar(30) unique,
    id_mapa varchar(36),
    acessibilidade int
);

create table mapa(
	id varchar (36) primary key,
    nome varchar(30),
    linhas int,
    colunas int,
    valores json
);

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

