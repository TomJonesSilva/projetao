const connection = require('./connection');
const auth = require('../utils/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAll = async () => {
    const [user] = await connection.execute('SELECT * FROM usuario');
    return user;
};


const buscarUsuario = async (req,res) =>{
    const decodedToken = req.decodedToken;
    
    const query = 'SELECT * FROM usuario WHERE id = ?';
    const [usuarios] = await connection.execute(query, [decodedToken.id]);
  
    if (usuarios.length > 0) {
        const usuario = usuarios[0];
        return usuario;
      } else {
        return {mensagem: "Não autorizado"};
      }
}

const sigIn = async (usuario,res) => {
    const {email, senha} = usuario;

    const [usuarioExiste] = await connection.execute('SELECT * FROM usuario WHERE email = ?',[email]);

    if(usuarioExiste.length === 0){
        return {mensagem: "Usuário e/ou senha inválidos"};
    }


    const senhaCorreta = await bcrypt.compare(senha, usuarioExiste[0].senha);
    if (!senhaCorreta) {
        return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
      }

    var query = 'SELECT id, data_criacao, data_atualizacao, ultimo_login, token FROM usuario WHERE email = ?';

    const [outputUsuario] = await connection.execute(query, [email]);

    connection.execute('UPDATE usuario SET ultimo_login = NOW() WHERE id = ?',[outputUsuario[0].id]);

    var usuario = { ...outputUsuario[0] };
    var token = auth.gerarToken({  id:outputUsuario[0].id, email });
    usuario.token = token;

    return usuario;
   

    
};




const sigUp = async (usuario,res) => {
    const {nome, email, senha, telefones} = usuario;

    const [usuarioExiste] = await connection.execute('SELECT * FROM usuario WHERE email = ?',[email]);

    if(usuarioExiste.length > 0){
        return {mensagem: "E-mail já existe"};
    }

   // const dataUTC = new Date(Date.now()).toUTCString();
    const senhaHash = await auth.criptografarSenha(senha);
    const id =  auth.gerarUUID();
    var token = auth.gerarToken({id,email});
    var query = 'INSERT INTO usuario (id, nome, senha, email, telefones, ultimo_login, data_criacao, data_atualizacao) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW())';
    
    const [novoUsuario] = await connection.execute(
        query,[id, nome, senhaHash, email, JSON.stringify(telefones)]
    );

    var query = 'SELECT id, data_criacao, data_atualizacao, ultimo_login FROM usuario WHERE email = ?';
    const [outputUsuario] = await connection.execute(query, [email]);
    var usuario = { ...outputUsuario[0] };
    usuario.token = token;
    return usuario;
    
        
    
};

module.exports ={
    getAll,
    sigUp,
    sigIn,
    buscarUsuario
}