const express = require('express');
const passportService = require('../models/passport-services-models');
const config = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  if(req.body.name 
    && req.body.descripition
    && req.body.initialTime
    && req.body.finalTime){

    const data = {
      name: req.body.name,
      descripition: req.body.descripition,
      initialTime: new Date(req.body.initialTime),
      finalTime: new Date(req.body.finalTime),
    };

    try {
    return res.status(201).json(data);
    } catch (err) {
    return res.sendStatus(500);
    }
  }

return res.sendStatus(500);
});

module.exports = router;