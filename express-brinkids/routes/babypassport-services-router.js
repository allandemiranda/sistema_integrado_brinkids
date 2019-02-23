const express = require('express');
const babyPassportServices = require('../models/babypassport-services-models');
const babyPassport = require('../models/babypassport-models');

const router = express.Router();
const config = require('../config');
const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');

router.post('/', async (req, res) => {

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  if(req.body.name 
    && req.body.description
    && req.body.initialTime
    && req.body.finalTime
    && req.body.price){

    const data = new babyPassportServices({
      name: req.body.name,
      description: req.body.description,
      initialTime: req.body.initialTime,
      finalTime: req.body.finalTime,
      price: req.body.price,
    });

    try {
      const newbabyPassportServices = await data.save();
      return res.status(201).json(newbabyPassportServices);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
});

String.prototype.toHHMMSS = function () => {//convertendo de segundos para o formato HH:mm
    var seconds = parseInt(this, 10);
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    var time = hours+':'+minutes;
    return time;
}

String.prototype.toSS = function () {//convertendo de HH:mm para segundos
    let nums = this.split(':');
    let mins = parseInt(nums[1], 10)*60;
    let time = parseInt(nums[0], 10)*3600 + mins;

    return time;
}

router.get('/', async (req, res) => {
  const psjson = await babyPassportServices.find({});
  const babyPassportDefault = await babyPassport.find({});
  var data;

  psjson.shift()

  if(babyPassportDefault.length===0){
    const data2 = new babyPassport({
      time: "0",
      price: "0",
    });
    data = {
      services: psjson,
      default: {
        time: "0",
        price: "0",
      },
    };
    const newbabyPassportServices = await data2.save();
    //return res.status(201).json(newbabyPassportServices);
  }else{
    data = {
      services: psjson,
      default: babyPassportDefault[0],
    };
  }
  
  console.log(babyPassportDefault[0])
  console.log(data);
  
  try {
    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/initialTime', async (req, res) => {
  const psjson = await babyPassportServices.find({});
  const pjson = await babyPassport.find({});
  let lastFinalTime = psjson[psjson.length-1].finalTime;//ultimo finalTime do json
  if(psjson.length===1){//teste pra saber se só tem o json inicial
    const data = {
      initialTime: '00:00', 
      default: pjson[0],
    };
    try {
      return res.status(201).json(data);
    } catch (err) {
      return res.sendStatus(500);
    }
  }else{
    let newInitialTime = String(lastFinalTime.toSS()+1).toHHMMSS();//jogando nas funções que convertem os formatos e adicionando +1 seg para o novo tempo inicial
    console.log(newInitialTime);
    const data = {
      initialTime: newInitialTime,
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
  const babyPassportDefault = await babyPassport.find({});
  console.log('------------------')
  console.log(req.body)
  console.log(babyPassportDefault[0])
  console.log('------------------')
  babyPassportDefault[0].time = req.body.time;
  babyPassportDefault[0].price = req.body.price;
  babyPassportDefault[0].save();
  console.log(babyPassportDefault)
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
    const deletedService = await babyPassportServices.findByIdAndRemove(req.params.identifier);

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