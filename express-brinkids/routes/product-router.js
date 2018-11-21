// Este arquivo é responsável por criar as rotas dos produtos do Dashboard

const express = require('express');
const fs = require('fs');

const Product = require('../models/product-models');
const config = require('../config');

const router = express.Router();

// Rota que devolve todos os produtos
router.get('/', (req, res) => {
  Product.find(
    {}, // Como eu eu quero todos os dados, é necessário passar os parâmetros de busca em branco
    (err, productResult) => (err ? res.sendStatus(500) : res.status(200).json(productResult)),
  );
});

// Rota de inserção de produtos
router.post('/', async (req, res) => {

  try {
    const adult = JSON.parse(req.body.adult);

    const products = JSON.parse(req.body.children).map(async (child) => {
      const product = new Product({
        children: {
          id: child._id,
          name: child.name,
          birthday: new Date(child.birthday),
          restrictions: child.restrictions,
          observations: child.observations,
        },
        adult: {
          id: adult._id,
          name: adult.name,
          phone: adult.phone,
          observations: adult.observations,
        },
        photo: '/123.png',
        service: req.body.service,
        time: new Date(req.body.time),
        belongings: req.body.belongings,
      });

      const productSaved = await product.save();

      productSaved.set({ photo: `${config.pathProduct}${productSaved._id}.png` });

      const photoBase64Data = child.photo.replace(/^data:image\/png;base64,/, '');

      fs.writeFile(`${config.pathPublic()}${config.pathProduct}${productSaved._id}.png`, photoBase64Data, 'base64', function(errFile) {
        if (errFile) {
          throw new Error(errFile);
        }
      });

      return productSaved;
    });

    const productsSaved = await Promise.all(products);

    console.log(productsSaved);

    return res.status(201).json(productsSaved);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
