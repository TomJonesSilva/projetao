const connection = require('./connection');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const buscarMapa = async (mapa) =>{
    const {id} = mapa;
    
    var query = 'SELECT * FROM mapa WHERE id = ?';
    const [mapas] = await connection.execute(query, id);
  
    if (mapas.length > 0) {
        const mapa = mapas[0];
        return mapa;
      } else {
        return {mensagem: "Erro"};
      }
}

const cadastrarMapa =async (mapa) =>{
  const { id, loja_id, valores } = mapa;
  var query = 'INSERT INTO mapa (id, loja_id, valores) VALUES(?,?,?)';
  const [novoMapa] = await connection.execute(query,[id, loja_id, JSON.stringify(valores)]);

  if( novoMapa && novoMapa.affectedRows )
    return {mensagem: "mapa cadastrado com sucesso"};
    else 
      return{mensagem: "erro ao cadastrar mapa"};
}

module.exports = {
  buscarMapa,
  cadastrarMapa
}