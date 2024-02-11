create database desafio2;
use desafio2;

CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30),
    email VARCHAR(30) UNIQUE,
    senha VARCHAR(255), 
    telefones JSON,
    ultimo_login TIMESTAMP,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE lojas(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) UNIQUE,
    acessibilidade BIT,
    PRIMARY KEY (id)
);

CREATE TABLE mapa(
	id INT NOT NULL AUTO_INCREMENT,
    loja_id INT,
    valores JSON,
    PRIMARY KEY (id),
    FOREIGN KEY (loja_id) REFERENCES lojas(id)
);

CREATE TABLE produtos(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(36),
    mapa_id INT,
    posicao_x INT,
    posicao_y INT,
    PRIMARY KEY (id),
    FOREIGN KEY (mapa_id) REFERENCES mapa(id)
);

