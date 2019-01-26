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
  
  const childName = await productFinded[0].children.name;

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
  
  } else {//preparando pra terminar quando o aniversário tiver executando normal
    price = parseInt(0, 10).toFixed(2);
    if(birthday.start - adultEntered > 15){}
    if(adultExit>birthday.end){}
  }
  
  const data = {
    service: "passaport",
    name: childName,
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

router.get('/discount/:idCria/:codDesc/:valueChild/', async (req, res) => {

  const productFinded = await product.find({ 'children.id': req.params.idCria });
  const adultEntered = productFinded[0].time;
  
  const adultExit = req.params.timeAdult;
  const adultTime = ((adultExit/60000) - (adultEntered.getTime()/60000));
  
  const discountFinded = await discount.find({ 'name': req.params.codDesc })

  const childName = await productFinded[0].children.name;
  console.log(productFinded[0].children.name)

  if(discountFinded[0].type === 'Fixo'){
  
    price = parseFloat(discountFinded[0].value).toFixed(2);
    console.log("valor do desconto:", price);
  
  } else {
  
    price = req.params.valueChild;
    price = parseFloat(price*(discountFinded[0].value/100)).toFixed(2);
    console.log("valor do desconto:", price);
  
  }
  
  const data = {
    service: "passaport",
    name: childName,
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

router.get('/discountAdult/:idAdult/:value/:codDesc', async (req, res) => {

  const discountFinded = await discount.find({ 'name': req.params.codDesc });
  let finalPrice = req.params.value;
  let valueDisc = discountFinded[0].value;

  const adultFinded = await product.find({ 'adult.id': req.params.idAdult });
  let adultName = adultFinded[0].adult.name;
  console.log(adultName);

  if(discountFinded[0].type === 'Fixo'){
    finalPrice = parseFloat(finalPrice - valueDisc).toFixed(2);
    console.log("preço descontado:", finalPrice);
  } else {
    finalPrice = parseFloat(finalPrice - finalPrice*(valueDisc/100)).toFixed(2);
    console.log("preço descontado:", finalPrice);
  }

   const data = {
    service: "passaport",
    name: adultName,
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