const express = require('express');
const ExtraServices = require('../models/extra-services-models');

const router = express.Router();

router.get('/:name', async (req, res) => {
  try {
    const services = await ExtraServices.find({ name: req.params.name });

    console.log(services);

    return res.status(200).json(services);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/:identifier', async (req, res) => {
  try {
    const serviceFound = ExtraServices.findById(req.params.identifier);

    if (!serviceFound) {
      return res.sendStatus(404);
    }

    return res.status(200).json(serviceFound);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  if (req.body.name
    && req.body.type
    && req.body.unity
    && req.body.value) {
    const extraServices = new ExtraServices({
      name: req.body.name,
      type: req.body.type,
      unity: req.body.unity,
      value: req.body.value,
    });

    try {
      const newService = await extraServices.save();

      return res.status(201).json(newService);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
});

router.put('/:identifier', async (req, res) => {
  try {
    const service = await ExtraServices.findByIdAndUpdate(
      req.params.identifier,
      {
        name: req.body.name,
        type: req.body.type,
        unity: req.body.unity,
        value: req.body.value,
      },
    );

    if (!service) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

router.delete('/:identifier', async (req, res) => {
  try {
    const deletedService = await ExtraServices.findByIdAndRemove(req.params.identifier);

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
