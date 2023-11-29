const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gerarUUID = () => {
   return uuidv4();
  };

  
const criptografarSenha = async (senha) => {
    try {
      const hash = await bcrypt.hash(senha, 10);
      return hash;
    } catch (error) {
      console.error('Erro ao criptografar senha:', error);
      throw error;
    }
  };

const gerarToken = (dados) => {
    return jwt.sign(dados, process.env.JTW_KEY, { expiresIn: '1m' });
  };

  const decodedToken = (token) =>{
    return jwt.verify(token, process.env.JWT_KEY);
  }
  



  module.exports = {
    gerarUUID,
    criptografarSenha,
    gerarToken,
    decodedToken
  }