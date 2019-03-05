// Este arquivo é responsável por criar as rotas dos produtos do Dashboard

const express = require('express');
const fs = require('fs');
const Logs = require('../models/logs-models')
const Product = require('../models/product-models');


const config = require('../config');
const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');

const router = express.Router();

// Rota que devolve todos os produtos
router.get('/', (req, res) => {


  //  console.log("Cookies: ", req.cookies.TOKEN_KEY) 
  return Product.find(
    {}, // Como eu eu quero todos os dados, é necessário passar os parâmetros de busca em branco
    (err, productResult) => (err ? res.sendStatus(500) : res.status(200).json(productResult)),
  );
});

router.get('/filter/:search/', async (req, res) => {
  try {
    const products = await Product.find({ 'adult.name': new RegExp(req.params.search) });

    return res.json(products);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

});

// Rota de inserção de produtos
router.post('/', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  
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
          photo: req.body.photo,
          service: child.service,
          time: new Date(req.body.time),
          belongings: req.body.belongings,
          kinship: child.kinship,

            birthdayStart:child.start,
            birthdayEnd:child.end,
            birthdayName:child.name,
          
      });
      if (child.service === "Aniversário") {

        const log = new Logs({
          activity: child.service,
          action: 'Entrada',
          dateOperation: new Date(),
          from: funcionario, //ajsuta o id dps de fazer o login funcionar
          to: adult.name,
          cco: child.name,
          timeLojaFirst: new Date(req.body.time),
          id: child._id

        })
        const newLog = await log.save();
      } else if (child.service === "Passaporte") {

        const log = new Logs({
          activity: child.service,
          action: 'Entrada',
          dateOperation: new Date(),
          from: funcionario, //ajsuta o id dps de fazer o login funcionar
          to: adult.name,
          cco: child.name,
          timeLojaFirst: new Date(req.body.time),
          id: child._id,


        })
        const newLog = await log.save();
      }


      const productSaved = await product.save();

      productSaved.set({ photo: `${config.pathProduct}${productSaved._id}.png` });

      const photoBase64Data = child.photo.replace(/^data:image\/png;base64,/, '');

      fs.writeFile(`${config.pathPublic()}${config.pathProduct}${productSaved._id}.png`, photoBase64Data, 'base64', function (errFile) {
        if (errFile) {
        
        }
      });

      return productSaved;
    });

    const productsSaved = await Promise.all(products);

   

    return res.status(201).json(productsSaved);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
