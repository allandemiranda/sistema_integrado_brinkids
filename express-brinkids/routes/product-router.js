// Este arquivo é responsável por criar as rotas dos produtos do Dashboard

const express = require('express');
const product = require('../models/product-models');

const router = express.Router();

// Rota que devolve todos os produtos
router.get('/', (req, res) => {
  product.find(
    {}, // Como eu eu quero todos os dados, é necessário passar os parâmetros de busca em branco
    (err, productResult) => (err ? res.sendStatus(500) : res.status(200).json(productResult)),
  );
});

/* TODO: criar uma função para verificar se os dados das crianças
 * e dos adultos estão preenchidos
 * TODO: tratar os dados das crianças e dos adultos para criar um
 * 'id' para o adulto e as crianças. Provavelmente terei que usar
 * um pacote de hash. Pesquisar na API padrão do Node se existe algo útil
 * ou ir atrás de pacote mesmo(Talvez o próprio bcrypt sirva já)
 */
// Rota de inserção de produtos
router.post('/', (req, res) => {
  if (req.body.photo
    && req.body.service
    && req.body.time) {
    const data = {
      photo: req.body.photo,
      service: req.body.service,
      time: req.body.time,
      belongings: parseInt(req.body.belongings, 10),
      children: JSON.parse(req.body.children),
      adult: JSON.parse(req.body.adult),
      observations: req.body.observations,
    };

    product.create(
      data,
      err => (err ? res.sendStatus(500) : res.sendStatus(201)),
    );
  }
});

module.exports = router;
