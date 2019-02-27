const express = require('express');
const passportServices = require('../models/passport-services-models');
const passport = require('../models/passport-models');

const router = express.Router();
const config = require('../config');
const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');

router.post('/', async (req, res) => {

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  if(req.body.name 
    
    && req.body.initialTime
    && req.body.finalTime
    && req.body.price){

    const data = new passportServices({
      name: req.body.name,
     
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

String.prototype.toHHMMSS = function () {//convertendo de segundos para o formato mm:ss
    var seconds = parseInt(this, 10);

    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
   
    console.log(seconds,hours,minutes)
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    var time = hours+':'+minutes;
    return time;
}

String.prototype.toSS = function () {//convertendo de mm:ss para segundos
    let nums = this.split(':');
    let mins = parseInt(nums[1], 10)*60;
    let time = parseInt(nums[0], 10)*3600 + mins;

    return time;
}

router.get('/', async (req, res) => {
  const psjson = await passportServices.find({});
  const passportDefault = await passport.find({});
  var data;

  psjson.shift()

  if(passportDefault.length===0){
    const data2 = new passport({
      time: "0",
      price: parseFloat("0,00".replace(',','.')).toFixed(2),
    });
    data = {
      services: psjson,
      default: {
        time: "0",
        price: parseFloat("0,00".replace(',','.')).toFixed(2),
      },
    };
    const newPassportServices = await data2.save();
    //return res.status(201).json(newPassportServices);
  }else{
    data = {
      services: psjson,
      default: passportDefault[0],
    };
  }
  
  console.log(passportDefault[0])
  console.log(data);
  
  try {
    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/initialTime', async (req, res) => {
  const psjson = await passportServices.find({});
  const pjson = await passport.find({});
  let lastFinalTime = psjson[psjson.length-1].finalTime;//ultimo finalTime do json
  console.log(lastFinalTime)
  if(psjson.length===1){//teste pra saber se só tem o json inicial
    const data = {
      initialTime: "00:00", 
      default: pjson[0],
    };
    try {
      return res.status(201).json(data);
    } catch (err) {
      return res.sendStatus(500);
    }
  }else{
    let newInitialTime = "125".toHHMMSS();//jogando nas funções que convertem os formatos e adicionando +1 seg para o novo tempo inicial
    let temporario =  String(lastFinalTime)
    console.log(newInitialTime,temporario,"dsddd");
    const data = {
      initialTime: lastFinalTime,
      default: pjson,
      services: psjson[0],
    };
    try {
      return res.status(201).json(data);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
});

router.put('/', async (req, res) =>{
  const passportDefault = await passport.find({});
  console.log('------------------')
  console.log(req.body)
  console.log(passportDefault[0])
  console.log('------------------')
  passportDefault[0].time = req.body.time;
  passportDefault[0].price = req.body.price;
  passportDefault[0].save();
  console.log(passportDefault)
  console.log('------------------')
  
  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
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