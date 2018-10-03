const express = require('express');
const router = express.Router();
const passport = require('../models/passport-models');
const config = require('../config');

const router = express.Router();

function calculatePrice(req, res) {
	//inSearchOfSomethingThatIDontKnowWhatIs
}

router.post('/', async (req, res) => {
  if(req.body.name
    && req.body.descripition
    && req.body.initialTime
    && req.body.finalTime
    && req.body.time
    && req.body.price){

    const passport = {
      name: req.body.name,
      descripition: req.body.descripition,
      initialTime: req.body.initialTime,
      finalTime: req.body.finalTime,
      time: req.body.time,
      price: req.body.price,
    };

    try {
    console.log(req.body);
    return res.status(201).json(passport);
    } catch (err) {
    return res.sendStatus(500);
    }
  }

return res.sendStatus(400);
});

module.exports = router;