const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(router);
app.use(bodyParser.json());
app.use('/stock', stockController);

module.exports = app;

