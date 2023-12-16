const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJTW = (req,res,next) => {
    const token = req.headers['authorization'];
    console.log("entrou");
    jwt.verify(token,process.env.JTW_KEY,(err, decoded)=>{
        console.log("dentro do verify");
        console.log(decoded);
        if(err) {
            console.log("if de não outorizado");
            return res.json({mensagem: "Não autorizado"})
        }
        console.log("passou do nao autorizado");
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            console.log("entoru em sesao invalida");
            return res.json({ mensagem: "Sessão inválida" });
          }
          console.log("deu tudo certo ");
          req.decodedToken = decoded;
          next();
    });
};

const validateBodyCadastro = (req,res,next) => {
    const { body } = req;

    if ((body.nome === undefined) || (body.email === undefined) || (body.senha === undefined)||(body.email === undefined)){
        return  res.status(400).json({mensagem: 'campos (nome, email e senha) obrigatorios '});
    }
    if ((body.nome === '') || (body.email === '') || (body.senha === '')){
        return res.status(400).json({mensagem: 'campos (nome, email e senha) não podem ser vazio '});
    }
    next();  
};

const validateBodyLogin = (req,res,next) => {
    const { body } = req;

    if ((body.email === undefined) || (body.senha === undefined)){
        return  res.status(400).json({mensagem: 'campos (email e senha) obrigatorios '});
    }

    next();  
};
module.exports = {
    validateBodyCadastro,
    validateBodyLogin,
    verifyJTW
};