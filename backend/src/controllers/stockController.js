const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');

// Obter informações de estoque para um produto específico e loja
router.get('/:productId/:storeId', async (req, res) => {
  const productId = parseInt(req.params.productId);
  const storeId = parseInt(req.params.storeId);

  try {
    const stockInfo = await Stock.findOne({
      where: { productId, storeId },
    });

    if (!stockInfo) {
      return res.status(404).json({ error: 'Informações de estoque não encontradas.' });
    }

    return res.json(stockInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar informações de estoque para um produto e loja específicos
router.put('/:productId/:storeId', async (req, res) => {
  const productId = parseInt(req.params.productId);
  const storeId = parseInt(req.params.storeId);
  const { quantity, shelf, description } = req.body;

  try {
    let stockInfo = await Stock.findOne({
      where: { productId, storeId },
    });

    if (!stockInfo) {
      stockInfo = await Stock.create({ productId, storeId, quantity, shelf, description });
    } else {
      stockInfo.quantity = quantity;
      stockInfo.shelf = shelf;
      stockInfo.description = description;
      await stockInfo.save();
    }

    return res.json(stockInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
