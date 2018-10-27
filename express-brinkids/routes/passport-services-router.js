const express = require('express');
const passportService = require('../models/passport-services-models');

const router = express.Router();

router.post('/', async (req, res) => {

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  if(req.body.name 
    && req.body.description
    && req.body.finalTime
    && req.body.price){

    const passportServices = new PassportServices({
      name: req.body.name,
      description: req.body.description,
      initialTime: req.body.initialTime,
      finalTime: req.body.finalTime,
      price: req.body.price,
    });

    try {
      const newPassportServices = await passportServices.save();
      return res.status(201).json(newPassportServices);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
});

router.get('/', async (req, res) => {
  console.log(req.params);
  console.log('agr sim');
  const data = {
    initialTime: '00:00', 
  };
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;