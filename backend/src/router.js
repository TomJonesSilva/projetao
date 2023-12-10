const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const usuarioMiddleware = require('./middleweres/usuarioMiddleware');

const lojaController = require('./controllers/lojaController');

const stockController = require('./controllers/stockController');

const router = express.Router();

const usuarioRouter = express.Router();
router.use('/usuario', usuarioRouter);

const lojaRouter = express.Router();
router.use('/loja', lojaRouter);

const stockRouter = express.Router();
router.use('/stock', stockRouter);


//usuario
usuarioRouter.get('/listar', usuarioController.getAll);
usuarioRouter.post('/login', usuarioMiddleware.validateBodyCadastro, usuarioController.sigUp);
usuarioRouter.post('/cadastro', usuarioMiddleware.validateBodyLogin, usuarioController.sigIn);
usuarioRouter.get('/busca',usuarioMiddleware.verifyJTW,usuarioController.buscarUsuario);


//lojas
console.log("entrou em rotas da loja");
lojaRouter.post('/inserir',lojaController.inserir);
lojaRouter.post('/buscar',lojaController.buscar);


//stock
stockRouter.get('/procura', stockController.get);
stockRouter.post('./put', stockController.put);



module.exports = router;