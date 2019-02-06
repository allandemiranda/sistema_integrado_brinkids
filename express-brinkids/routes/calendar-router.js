/** Este documento será responsável por criar as rotas para o calendário */

const express = require('express');
const Calendar = require('../models/calendar-models');
const BirthdayParty = require('../models/birthday-party-models');
const Logs = require('../models/logs-models')
const config = require('../config');
const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');
const router = express.Router();
const moment = require('moment');

/** Esta rota envia todos os documentos referentes a calendario */
router.get('/', async (req, res) => {
  try {
    const birthdays = await Calendar.find({});
    const parties = await BirthdayParty.find({});

    return res.status(200).json([...birthdays, ...parties]);
  } catch (err) {
    return res.sendStatus(500);
  }
});

/** Esta rota cria uma nova data */
router.post('/', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  if (req.body.color
    && req.body.title
    && req.body.start
    && req.body.end) {

    const calendar = new Calendar({
      color: req.body.color,
      title: req.body.title,
      start: new Date(req.body.start),
      end: new Date(req.body.end),
      description: req.body.description,
      address: req.body.address,
      associated: req.body.associated,
    });



    try {
      const newCalendar = await calendar.save();
          //fazedno os logs da criação de eventos
      const log = new Logs({
        activity: 'Evento',
        action: 'Criação',
        dateOperation: moment().format(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar
        to: newCalendar._id,
       

      })
      const newLog = await log.save();
      

      return res.status(201).json(newCalendar);

    } catch (err) {

      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
});

router.put('/:id', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  if (req.body.title
    && req.body.start
    && req.body.end) {
    try {
      const calendar = await Calendar.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          start: new Date(req.body.start),
          end: new Date(req.body.end),
        },
      );
      const log = new Logs({
        activity: 'Evento',
        action: 'Edição',
        dateOperation: new Date(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar
        to: req.params.id,
      })
      const newLog = await log.save();

      if (!calendar) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(400);
  }
});

router.delete('/:id', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  try {
    const calendar = await Calendar.findByIdAndRemove(req.params.id);
    const log = new Logs({
      activity: 'Evento',
      action: 'Delete',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to: req.params.id,
    })
    const newLog = await log.save();

    if (!calendar) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
