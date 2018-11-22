const express = require('express');
const ProfessionalPosition = require('../models/professional-position-models');
const config = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {

  if (req.body.name
    && req.body.description
    && req.body.classes
    && req.body.functions) {
    const data = new ProfessionalPosition({
      name: req.body.name,
      description: req.body.description,
      classes: req.body.classes,
      functions: req.body.functions,
    });

    try {
      console.log('tentando salvar...');
      console.log(data);
      const newProfessionalPosition = await data.save();
      return res.status(201).json(newProfessionalPosition);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
});

router.get('/', (req, res) => {
  ProfessionalPosition.find({}, (err, result) => {
    try {
      res.status(200).json(result);
    } catch (err) {
      res.sendStatus(500);
    }
  });
});

router.put('/:identifier', async (req, res) => {

  try {
    const professionalPositionChange = await ProfessionalPosition.findByIdAndUpdate(
      req.params.identifier,
      {
        name: req.body.name,
        description: req.body.description,
        classes: req.body.classes,
        functions: req.body.functions,

      }
    );

    if (!professionalPositionChange) {
      return res.sendStauts(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.delete('/:identifier', async (req, res) => {
  try {
    const deletedProfessionalPosition = await ProfessionalPosition.findByIdAndRemove(req.params.identifier);

    if (!deletedProfessionalPosition) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

module.exports = router;
