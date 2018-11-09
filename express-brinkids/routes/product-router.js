// Este arquivo é responsável por criar as rotas dos produtos do Dashboard

const express = require('express');
const product = require('../models/product-models');
const config = require('../config');

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
router.post('/', async (req, res) => {
  let childrenObj = req.body.children.split(',');
  let adultObj = req.body.adult.split(',');

  const childrenData = {
    id: String(childrenObj[0]),
    name: String(childrenObj[1]),
    birthday: new Date(childrenObj[2]),
    restrictions: String(childrenObj[3]),
    observations: String(childrenObj[4]),
  };
  const adultData = {
    id: String(adultObj[0]),
    name: String(adultObj[1]),
    phone: String(adultObj[2]),
    observations: String(adultObj[3]),
  };
  const data = new product({
    photo: String(req.body.photo),
    service: String(req.body.service),
    time: new Date(req.body.time),
    belongings: parseInt(req.body.belongings, 10),
    children: childrenData,
    adult: adultData,
  });

  try {
    const newProduct = await data.save();
    console.log(newProduct);
    return res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
