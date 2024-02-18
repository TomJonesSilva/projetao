const mapaModel = require('../models/mapaModel');

const buscar = async (req, res) =>{
    var mapa = await mapaModel.buscarMapa(req.body);
    return res.json(mapa);
}

const cadastrarMapa = async (req, res) => {
    var mapa = await mapaModel.cadastrarMapa(req.body);
    return res.json(mapa);
}

const calcularMelhorTrajeto = async (req, res) =>{
    const {mapaid, inicio, fim} = req.body;
    var mapa = await mapaModel.buscarMapa(mapaid);
    const melhorTrajeto = await calcularRota(mapa,inicio, fim);
    return res.json(melhorTrajeto);
}
async function calcularRota(mapa, inicio, fim){
        const linhas = mapa.length;
        const colunas = mapa[0].length;
    
        const visitados = Array(linhas).fill(null).map(() => Array(colunas).fill(false));
        const fila = [{ linha: inicio[0], coluna: inicio[1], distancia: 0, caminho: [inicio] }];
    
        const isValido = (linha, coluna) => linha >= 0 && linha < linhas && coluna >= 0 && coluna < colunas && mapa[linha][coluna] === 0 && !visitados[linha][coluna];
    
        while (fila.length > 0) {
            const { linha, coluna, distancia, caminho } = fila.shift();
    
            if (linha === fim[0] && coluna === fim[1]) {
                return caminho;
            }
    
            const direcoes = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Cima, Direita, Baixo, Esquerda
            for (const [dx, dy] of direcoes) {
                const novaLinha = linha + dx;
                const novaColuna = coluna + dy;
    
                if (isValido(novaLinha, novaColuna)) {
                    visitados[novaLinha][novaColuna] = true;
                    fila.push({ linha: novaLinha, coluna: novaColuna, distancia: distancia + 1, caminho: [...caminho, [novaLinha, novaColuna]] });
                }
            }
        }
    
        return []; // Não há caminho válido
    }
    /*
    // Exemplo de uso:
    const mapaJSON = '[[0,0,0,0,0],[1,1,1,1,0],[0,0,0,0,0],[0,1,1,1,1],[0,0,0,0,0]]';
    const mapa = JSON.parse(mapaJSON);
    
    const inicio = [0, 0];
    const fim = [4, 4];
    
    console.log(calcularRota(mapa, inicio, fim)); // Saída: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[3,3],[4,3],[4,4]] (menor caminho)
    */
    
}
module.exports = {
    buscar,
    cadastrarMapa,
    calcularMelhorTrajeto
}