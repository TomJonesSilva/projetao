const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const usuarioMiddleware = require('./middleweres/usuarioMiddleware');
const router = express.Router();

router.get('/usuario', usuarioController.getAll);
router.post('/sigUp', usuarioMiddleware.validateBodyCadastro, usuarioController.sigUp);
router.post('/sigIn', usuarioMiddleware.validateBodyLogin, usuarioController.sigIn);
router.get('/busca',usuarioMiddleware.verifyJTW,usuarioController.buscarUsuario);

module.exports = router;