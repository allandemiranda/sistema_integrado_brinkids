const express = require('express');
const passportServices = require('../models/passport-services-models');
const passport = require('../models/passport-models');

const router = express.Router();

router.post('/', async (req, res) => {

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  if(req.body.name 
    && req.body.description
    && req.body.initialTime
    && req.body.finalTime
    && req.body.price){

    const data = new passportServices({
      name: req.body.name,
      description: req.body.description,
      initialTime: req.body.initialTime,
      finalTime: req.body.finalTime,
      price: req.body.price,
    });

    try {
      const newPassportServices = await data.save();
      return res.status(201).json(newPassportServices);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
});

String.prototype.toMMSS = function () {//convertendo de segundos para o formato mm:ss
    let sec_num = parseInt(this, 10);
    let minutes = Math.floor(sec_num / 60);
    let seconds = sec_num - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

String.prototype.toSS = function () {//convertendo de mm:ss para segundos
    let nums = this.split(':');
    let mins = parseInt(nums[1], 10);
    let secs = mins+parseInt(nums[0],10)*60;

    return secs;
}

router.get('/', async (req, res) => {

  // if(psjson.length>1){//teste pra saber se só tem o json inicial
  // lista = [];

  // for(i=1; i<psjson.length;i++){
  //   lista += psjson[i];
  //   const data = {
  //     name: .name,
  //     description: psjson[i].description,
  //     initialTime: psjson[i].initialTime,
  //     finalTime: pjson[i].finalTime,
  //     price: psjson[i].price,
  //   };
  // }
  try {
    const psjson = await passportServices.find({});
    psjson.shift();
    return res.status(201).json(psjson);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.get('/initialTime', async (req, res) => {
  const psjson = await passportServices.find({});
  const pjson = await passport.find({});
  let lastFinalTime = psjson[psjson.length-1].finalTime;//ultimo finalTime do json

  if(psjson.length===1){//teste pra saber se só tem o json inicial
    const data = {
      initialTime: '00:00', 
      default: pjson,
    };
    try {
      return res.status(201).json(data);
    } catch (err) {
      return res.sendStatus(500);
    }
  }else{
    let newInitialTime = String(lastFinalTime.toSS()+1).toMMSS();//jogando nas funções que convertem os formatos e adicionando +1 seg para o novo tempo inicial
    console.log(newInitialTime);
    const data = {
      initialTime: newInitialTime,
      default: pjson,
      services: psjson,
    };
    try {
      return res.status(201).json(data);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
});

router.delete('/:identifier', async (req, res) => {
  console.log('executed');
  try {
    const deletedService = await passportServices.findByIdAndRemove(req.params.identifier);

    if (!deletedService) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

module.exports = router;