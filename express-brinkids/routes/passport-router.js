const express = require('express');
const passport = require('../models/passport-models');
const passportServices = require('../models/passport-services-models');
const product = require('../models/product-models');
const discount = require('../models/discounts-models');
const birthday = require('../models/birthday-party-models');
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
  console.log(productFinded)
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
  if(productFinded[0].service === 'Passaporte'){
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
  } else {//preparando pra terminar quando o aniversário tiver executando normal
    price = parseInt(0, 10).toFixed(2);
    if(birthday.start - adultEntered > 15){}
    if(adultExit>birthday.end){}
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

router.get('/discount/:idCria/:timeAdult/:codDesc', async (req, res) => {
  console.log(req.params.idCria);
  console.log(req.params.timeAdult);

  const discountFinded = await discount.find({ 'name': req.params.codDesc })
  const productFinded = await product.find({ 'children.id': req.params.idCria });
  const adultEntered = productFinded[0].time;
  const adultExit = req.params.timeAdult;
  const adultTime = ((adultExit/60000) - (adultEntered.getTime()/60000));
  console.log('entrada:', adultEntered.getTime()/60000);
  console.log('saída:', adultExit/60000);
  console.log('diferença em minutos:', adultTime);
  const psjson = await passportServices.find({});
  const pjson = await passport.find({});
  console.log(discountFinded)

  let lastFinalTime = psjson[psjson.length-1].finalTime;//Último finalTime do json
  let lastInitialTime = psjson[psjson.length-1].initialTime;
  let lastPrice = psjson[psjson.length-1].price;
  var price;

  if(adultTime>(lastFinalTime.toSS()/60)){
    let time = adultTime - (lastFinalTime.toSS()/60);
    console.log("time sem o ultimo tempo de serviço:", time);
    price = parseFloat(time/parseFloat(pjson[0].time, 10)*parseFloat(pjson[0].price, 10) + parseFloat(lastPrice, 10)).toFixed(2);
    console.log("preço:", price);
  } else {
    for(i = 0; i < psjson.length; i++){
      if(adultTime <= (psjson[i].finalTime.toSS()/60) && adultTime >= (psjson[i].initialTime.toSS()/60)){
        price = psjson[i].price;
        console.log("preço:", price);
      }
    }
  }
  if(discountFinded[0].type === 'Fixo'){
    price = parseFloat(price - discountFinded[0].value).toFixed(2);
    console.log("preço descontado:", price);
    console.log(productFinded[0].name)
  } else {
    price = parseFloat(price - price*(discountFinded[0].value/100)).toFixed(2);
    console.log("preço descontado:", price);
  }
  const data = {
    service: "passaport",
    id: req.params.idCria,
    time: adultTime,
    value: price, 
    discount: discountFinded[0].name,
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

router.get('/discountAdult/:value/:codDesc', async (req, res) => {

const discountFinded = await discount.find({ 'name': req.params.codDesc })
  let finalPrice = req.params.value;
  let valueDisc = discountFinded[0].value;

  if(discountFinded[0].type === 'Fixo'){
    finalPrice = parseFloat(finalPrice - valueDisc).toFixed(2);
    console.log("preço descontado:", finalPrice);
  } else {
    finalPrice = parseFloat(finalPrice - finalPrice*(valueDisc/100)).toFixed(2);
    console.log("preço descontado:", finalPrice);
  }

   const data = {
    service: "passaport",
    id: "",
    time: "",
    value: finalPrice, 
    discount: discountFinded[0].name,
  };
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }


});

module.exports = router;