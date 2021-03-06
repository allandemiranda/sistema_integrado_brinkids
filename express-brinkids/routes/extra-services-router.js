
const express = require('express');
const ExtraServices = require('../models/extra-services-models');
const Logs = require('../models/logs-models')
const router = express.Router();

const userSystem = require('../models/userSystem-models');
const Employees = require('../models/employees-models');

const config = require('../config');
const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');

// const dados = jwt.verify(tokken, config.secret_auth);



router.get('/', async (req, res) => {
  try {
    const service = await ExtraServices.find({});
    console.log(service);

    return res.status(200).json(service);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/search/:name', async (req, res) => {
  try {
    const serviceFound = await ExtraServices.find({ 'name': new RegExp(req.params.name) });
    console.log(serviceFound);
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

  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;

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
    console.log(req.body.employeer)
    try {
      const newService = await extraServices.save();
      const log = new Logs({
        activity: 'Serviços',
        action: 'Criação',
        dateOperation: new Date(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar
        to: newService.name,


      })

      const newLog = await log.save();
      return res.status(201).json(newService);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
});

router.put('/:identifier', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
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
    const log = new Logs({
      activity: 'Serviços',
      action: 'Edição',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to: service.name,

    })
    const newLog = await log.save();
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
    const a = req.cookies.TOKEN_KEY;
    const b = jwt.verify(a, config.secret_auth);
    const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
    const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
    
    const deletedService = await ExtraServices.findByIdAndRemove(req.params.identifier);
    
    const log = new Logs({
      activity: 'Serviços',
      action: 'Excluir',
      dateOperation: new Date(),
      from: funcionario,
      to:deletedService.name
    })
    
    const newLog = await log.save();
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
