const express = require('express');
const passport = require('../models/passport-models');
const config = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  if(req.body.name
    && req.body.descripition
    && req.body.initialTime
    && req.body.time
    && req.body.price){

    const passport = {
      name: req.body.name,
      descripition: req.body.descripition,
      initialTime: new Date(req.body.initialTime),
      finalTime: new Date(req.body.finalTime),
      time: req.body.time,
      price: req.body.price,
    };

    try {
    return res.status(201).json(passport);
    } catch (err) {
    return res.sendStatus(500);
    }
  }

function calculatePrice(req, res) {
  let totalTime = (passport.finalTime.getTime() - passport.initialTime.getTime())/60000;
  //O tempo total recebe o valor em milisegundos, por isso, dividindo por 60000 converto em minutos.
  let pricePerMinute = 5;
  //Preço por minuto é definido pelo cliente e vai ser dinâmico por enquanto não tem campo que receba isso no front.
  if(totalTime!=0){
    let totalPrice=totalTime*pricePerMinute;
  }
return totalPrice;
}

return res.sendStatus(400);
});

module.exports = router;