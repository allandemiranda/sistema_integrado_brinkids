const express = require('express');
const passport = require('../models/passport-models');
const passportServices = require('../models/passport-services-models');
const product = require('../models/product-models');
const config = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  if(req.body.time 
    && req.body.price){

    const data = new passport ({
      time: req.body.time,
      price: req.body.price,
    });

    try {
      const newPassport = await data.save();
      return res.status(201).json(newPassport);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
});

router.get('/:idCria/:timeAdult', async (req, res) => {
  console.log(req.params.idCria);
  console.log(req.params.timeAdult);

  const productFinded = await product.find({ 'children.id': req.params.idCria });
  const adultEntered = productFinded.time;
  console.log('Olha qual tempo achei:', adultEntered);
  const adultExit = req.params.timeAdult;
  const psjson = await passportServices.find({});
  const pjson = await passport.find({});

  let lastFinalTime = psjson[psjson.length-1].finalTime;//Último finalTime do json
  let lastInitialTime = psjson[psjson.length-1].initialTime;
  let lastPrice = psjson[psjson.length-1].price;
  console.log(lastFinalTime);
  var price = 0;

  if(adultExit>lastFinalTime){
    let time = adultExit - lastFinalTime;
    
    price = time*pjson[0].price + lastPrice;
  } else {
    for(i = 0; i < psjson.length; i++){
      if(adultExit <= psjson[i].finalTime && adultExit >= psjson[i].initialTime){
        price = psjson[i].price;
      }
    }
  }
  const data = {
    price: price, 
  };
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }

  console.log('executou router.get()');
  console.log('Tempo Total:', data.time);
  console.log('Preço:', price);
});

module.exports = router;