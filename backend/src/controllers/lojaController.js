const lojaModel = require('../models/lojaModel');

const buscar = async (req,res)=>{
    var loja = await lojaModel.busca(req.body);
    return res.json(loja);
}

const inserir = async (req,res)=>{
    console.log("entoru no controle");
    var resultado = await lojaModel.inserir(req.body);
    return res.status(201).json(resultado);
};

module.exports = {
    buscar,
    inserir
}