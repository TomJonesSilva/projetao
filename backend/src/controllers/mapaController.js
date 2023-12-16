const mapaModel = require('../models/mapaModel');

const buscar = async (req,res)=>{
    var mapa = await mapaModel.buscarMapa(req.body);
    return res.json(mapa);
}