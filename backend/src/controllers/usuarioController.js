const usuarioModel = require('../models/usuarioModel');

const getAll = async (req,res) => {

    const usuario = await usuarioModel.getAll();

    return res.status(200).json({
        usuario,
        mensagem: 'controller está tudo certo'
    });
};

const sigIn = async (req,res) => {

    const usuario = await usuarioModel.sigIn(req.body,res);
    
    return res.status(201).json(usuario);
};


const sigUp = async (req,res) => {

    const usuario = await usuarioModel.sigUp(req.body,res);
    
    return res.status(201).json(usuario);
};

const buscarUsuario = async (req,res) => {
    const busca = await usuarioModel.buscarUsuario(req, res);
    return res.json(busca);
}

module.exports = {
    getAll,
    sigUp,
    sigIn,
    buscarUsuario
};