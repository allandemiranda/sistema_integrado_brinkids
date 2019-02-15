const express = require('express');
const babypassportServices = require('../models/babypassport-services-models');
const babypassport = require('../models/babypassport-models');

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

    const data = new babypassportServices({
      name: req.body.name,
      description: req.body.description,
      initialTime: req.body.initialTime,
      finalTime: req.body.finalTime,
      price: req.body.price,
    });

    try {
      const newbabypassportServices = await data.save();
      return res.status(201).json(newbabypassportServices);
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
  const psjson = await babypassportServices.find({});
  const babypassportDefault = await babypassport.find({});
  var data;

  psjson.shift()

  if(babypassportDefault.length===0){
    const data2 = new babypassport({
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
    const newbabypassportServices = await data2.save();
    //return res.status(201).json(newbabypassportServices);
  }else{
    data = {
      services: psjson,
      default: babypassportDefault[0],
    };
  }
  
  console.log(babypassportDefault[0])
  console.log(data);
  
  try {
    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/initialTime', async (req, res) => {
  const psjson = await babypassportServices.find({});
  const pjson = await babypassport.find({});
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
    let newInitialTime = String(lastFinalTime.toSS()+1).toMMSS();//jogando nas funções que convertem os formatos e adicionando +1 seg para o novo tempo inicial
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
  const babypassportDefault = await babypassport.find({});
  console.log('------------------')
  console.log(req.body)
  console.log(babypassportDefault[0])
  console.log('------------------')
  babypassportDefault[0].time = req.body.time;
  babypassportDefault[0].price = req.body.price;
  babypassportDefault[0].save();
  console.log(babypassportDefault)
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
    const deletedService = await babypassportServices.findByIdAndRemove(req.params.identifier);

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