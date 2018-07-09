/**
 * Este arquivo será responsável por criar as rotas relacionadas aos Adultos
 */

var express = require('express')
var userAdult = require('../models/userAdult')
var router = express.Router()

router.post('/', function (req, res) {
  if (!req.files) {
    return res.sendStatus(400)
  }

  if (req.body.name &&
      req.body.birthday &&
      req.body.phone &&
      req.body.address &&
      req.body.cpf) {
    userAdult.findOne({cpf: req.body.cpf}, function (err, adultFound) {
      if (err) {
        return res.sendStatus(500)
      }

      let date = req.body.birthday.split('/')
      let adultDate = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]))

      if (adultFound === null) {
        let data = {
          name: req.body.name,
          birthday: new Date(adultDate),
          phone: req.body.phone,
          address: req.body.address,
          gr: req.body.gr,
          cpf: req.body.cpf,
          maritalStatus: req.body.maritalStatus,
          children: [{crianca: 3}],
          observations: 'Observações',
          photo: '/caminho'
        }

        userAdult.create(data, function (err, adultResult) {
          if (err) {
            console.log(err)
            return res.sendStatus(500)
          }

          return res.sendStatus(201)
        })
      } else {
        return res.sendStatus(409)
      }
    })
  } else {
    console.log('passou aqui')
    return res.sendStatus(400)
  }
})

module.exports = router
