const connection = require('./connection');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const buscarMapa = async (req,res) =>{
    const decodedToken = req.decodedToken;
    
    var query = 'SELECT * FROM mapa WHERE id = ?';
    const [mapas] = await connection.execute(query, [decodedToken.id]);
  
    if (mapas.length > 0) {
        const mapa = mapas[0];
        return mapa;
      } else {
        return {mensagem: "Erro"};
      }
}