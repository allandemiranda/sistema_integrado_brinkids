/** Este documento será responsável por criar as rotas para o calendário */

const express = require('express');
const calendar = require('../models/calendar-models');

const router = express.Router();

function showErr(err, res) {
  console.log(err);
  return res.sendStatus(500);
}

/** Esta rota envia todos os documentos referentes a calendario */
router.get('/', (req, res) => {
  calendar.find({}, (err, result) => (err ? res.sendStatus(500) : res.status(200).json(result)));
});

/** Esta rota cria um novo calendário */
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

    // Parâmetro 'calendarResult' da arrow function foi omitido por nunca ser usado
    // deixando apenas 'err'
    // Era assim: (err, childResult) => ...
    return calendar.create(
      data,
      (err, childResult) => (err ? showErr(err, res) : res.status(201).json(childResult)),
    );
  }

  return res.sendStatus(400);
});

module.exports = router;
