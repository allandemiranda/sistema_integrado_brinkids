const express = require('express');
const passport = require('../models/passport-models');
const passportServices = require('../models/passport-services-models');
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

router.get('/', async (req, res) => {
  console.log(req.params);
  const psjson = await passportServices.find({});
  var lastFinalTime = psjson[psjson.length-1].finalTime;//Último finalTime do json
  var lastInitialTime = psjson[psjson.length-1].initialTime;
  var lastPrice = psjson[psjson.length-1].price;
  console.log(lastFinalTime)
  if(data.time>=lastFinalTime){
    let time = data.time - lastFinalTime;
    let price = time*data.price + lastPrice;
  } else {
    for(i = 0; i < psjson.length; i++){
      if(data.time <= lastFinalTime && data.time >= lastInitialTime){
        let price = psjson[i].price;
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