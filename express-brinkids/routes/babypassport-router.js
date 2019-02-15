const express = require('express');
const babypassport = require('../models/babypassport-models');
const babypassportServices = require('../models/babypassport-services-models');
const config = require('../config');
const adult = require('../models/adult-models');


const moment = require('moment');


const Logs = require('../models/logs-models')
const router = express.Router();

const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  if (req.body.time
    && req.body.price) {

    const data = new babyPassport({
      time: req.body.time,
      price: req.body.price,
    });

    try {
      const newbabyPassport = await data.save();
      const log = new Logs({
        activity: 'Passaporte',
        action: 'Criação',
        dateOperation: new Date(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar
        to: newbabyPassport._id,


      })
      const newLog = await log.save();
      return res.status(201).json(newbabyPassport);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
});