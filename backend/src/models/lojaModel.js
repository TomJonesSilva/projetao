const connection = require('./connection');
const auth = require('../utils/auth');
const { v4: uuidv4 } = require('uuid');


const inserir = async (loja)=>{
    console.log("entrou no model");
    const {nome, id_mapa, acessibilidade} = loja;
    var query = 'INSERT INTO lojas (id, nome, id_mapa, acessibilidade) VALUES (?, ?, ?,?)';
    await connection.execute(query,[uuidv4(), nome, id_mapa, acessibilidade]);
    return {mensagem: "loja cadastrada"};
};

const busca = async (loja) => {
    const { nome } = loja;
    var query = `SELECT * FROM lojas WHERE nome LIKE '%${nome}%'`;
    var [lojas] = await connection.execute(query);
    return lojas;
};


module.exports = {
    inserir,
    busca
}