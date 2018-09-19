/** Este documento será responsável por criar as rotas para o calendário */

const express = require('express');
const calendar = require('../models/calendar-models');

const router = express.Router();

function showErr(err, res) {
  console.log(err);
  return res.sendStatus(500);
}

/** Esta rota envia todos os documentos referentes a calendario */
router.get('/', async (req, res) => {
  let birthdays;

  try {
    birthdays = await calendar.all();
  } catch (err) {
    return res.sendStatus(500);
  }

  return res.status(200).json(birthdays);
});

/** Esta rota cria uma nova data */
router.post('/', (req, res) => {
  if (req.body.color
      && req.body.type
      && req.body.title
      && req.body.start
      && req.body.end) {
    const data = {
      color: req.body.color,
      type: req.body.type,
      title: req.body.title,
      start: new Date(req.body.start),
      end: new Date(req.body.end),
      associated: req.body.associated,
    };

    return calendar.create(
      data,
      (err, childResult) => (err ? showErr(err, res) : res.status(201).json(childResult)),
    );
  }

  return res.sendStatus(400);
});

router.put('/:id', (req, res) => {
  const data = {
    title: req.body.title,
    start: new Date(req.body.start),
    end: new Date(req.body.end),
  };

  return calendar.findByIdAndUpdate(
    req.params.id,
    data,
    err => (err ? res.sendStatus(500) : res.sendStatus(204)),
  );
});

router.delete('/:id', (req, res) => (
  calendar.findByIdAndRemove(
    req.params.id,
    err => (err ? res.sendStatus(500) : res.sendStatus(204)),
  )
));

module.exports = router;
