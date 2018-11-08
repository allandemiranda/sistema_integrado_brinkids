const express = require('express');
const professionalPosition = require('../models/professional-position-models');
const config = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);

  if(req.body.time 
    && req.body.price){

    const data = new professionalPosition ({
      name: req.body.name,
      description: req.body.description,
      classes: req.body.classes,
      functions: req.body.functions,
    });

    try {
      const newProfessionalPosition = await data.save();
      return res.status(201).json(newProfessionalPosition);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
});

router.get('/', async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const ppjson = await professionalPosition.find({});
  const data = {
    professionalPosition: ppjson, 
  };
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.put('/', async (req, res) => {
  if (req.body.name
    && req.body.description
    && req.body.classes
    && req.body.functions) {
      const exchangeData = {
        name: req.body.phone,
        description: req.body.email,
        classes: req.body.street,
        functions: req.body.number,
      };

    try {
      const professionalPositionChange = await professionalPosition.findByIdAndUpdate(req.body.identifier, exchangeData);

      if (!professionalPositionChange) {
        return res.sendStauts(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;