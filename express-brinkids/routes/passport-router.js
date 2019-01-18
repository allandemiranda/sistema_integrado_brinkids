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
  const adultEntered = productFinded[0].time;
  const adultExit = req.params.timeAdult;
  const adultTime = ((adultExit/60000) - (adultEntered.getTime()/60000));
  console.log('entrada:', adultEntered.getTime()/60000);
  console.log('saída:', adultExit/60000);
  console.log('diferença em minutos:', adultTime);
  const psjson = await passportServices.find({});
  const pjson = await passport.find({});

  let lastFinalTime = psjson[psjson.length-1].finalTime;//Último finalTime do json
  let lastInitialTime = psjson[psjson.length-1].initialTime;
  let lastPrice = psjson[psjson.length-1].price;
  var price;

  if(adultTime>(lastFinalTime.toSS()/60)){
    let time = adultTime - (lastFinalTime.toSS()/60);
    console.log("time sem o ultimo tempo de serviço:", time);
    price = parseFloat(time/parseInt(pjson[0].time, 10)*parseInt(pjson[0].price, 10) + parseInt(lastPrice, 10)).toFixed(2);
    console.log("preço:", price);
  } else {
    for(i = 0; i < psjson.length; i++){
      if(adultTime <= (psjson[i].finalTime.toSS()/60) && adultTime >= (psjson[i].initialTime.toSS()/60)){
        price = psjson[i].price;
        console.log("preço:", price);
      }
    }
  }
  const data = {
    service: "passaport",
    id: req.params.idCria,
    time: adultTime,
    value: price, 
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