const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(router);

module.exports = app;

// Dados de exemplo
let produtos = [
  { id: 1, nome: 'Bola de boliche', estoque: 10, prateleira: 'A1', descricao: 'Para jogar no pe dos outros e falar q foi sem querer' },
  { id: 2, nome: 'Taco de golfe', estoque: 20, prateleira: 'B2', descricao: 'Pra fazer massagem nas costas de quem gosta de haskell' },
  // Mais produtos vão aqui
];

// Middleware
app.use(bodyParser.json());

// ---Rotas:

// Retornar todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Retornar produtos por id
app.get('/produtos/:id', (req, res) => {
  const produtoId = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === produtoId);

  if (!produto) {
    res.status(404).json({ erro: 'Produto não encontrado' });
  } else {
    res.json(produto);
  }
});

// Adicionar produtos
app.post('/produtos', (req, res) => {
  const { nome, estoque, prateleira, descricao } = req.body;

  if (!nome || !estoque || isNaN(estoque) || !prateleira || !descricao) {
    res.status(400).json({ erro: 'Dados inválidos' });
  } else {
    const novoProduto = {
      id: produtos.length + 1,
      nome,
      estoque: parseInt(estoque),
      prateleira,
      descricao,
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}`);
});
