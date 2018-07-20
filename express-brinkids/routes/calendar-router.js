/** Este documento será responsável por criar as rotas para o calendário */

var express = require('express')
var calendar = require('../models/calendar-models')
var router = express.Router()

/** Esta rota envia todos os documentos referentes a calendario */
router.get('/', function (req, res) {
  calendar.find({}, function (err, result) {
    return err ? res.sendStatus(500) : res.status(200).json(result)
  })
})

/** Esta rota cria um novo calendário */
router.post('/', function (req, res) {
  if (req.body.color &&
      req.body.type &&
      req.body.title &&
      req.body.opening &&
      req.body.closing) {
    let data = {
      color: req.body.color,
      type: req.body.type,
      title: req.body.title,
      opening: new Date(req.body.opening),
      closing: new Date(req.body.closing),
      associated: req.body.associated
    }
    calendar.create(data, function (err, calendarResult) {
      return err ? res.sendStatus(500) : res.sendStatus(201)
    })
  } else {
    return res.sendStatus(400)
  }
})

module.exports = router
