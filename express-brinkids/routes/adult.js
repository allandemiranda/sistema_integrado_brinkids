/**
 * Este arquivo será responsável por criar as rotas relacionadas aos Adultos
 */

var express = require('express')
var userAdult = require('../models/userAdult')
var config = require('../config')
var router = express.Router()

router.get('/', function (req, res) {
  userAdult.find({}, function (err, result) {
    return res.json(result)
  })
})

router.post('/', function (req, res) {
  if (!req.files) {
    return res.sendStatus(400)
  }

  if (req.body.firstName &&
      req.body.surName &&
      req.body.birthday &&
      req.body.phone &&
      req.body.street &&
      req.body.number &&
      req.body.district &&
      req.body.city &&
      req.body.state &&
      req.body.country &&
      req.body.cep &&
      req.body.nacionality &&
      req.body.cpf) {
    userAdult.findOne({cpf: req.body.cpf}, function (err, adultFound) {
      if (err) {
        return res.sendStatus(500)
      }

      if (adultFound === null) {
        let photoFile = req.files.fileField
        let date = req.body.birthday.split('/')
        let adultDate = new Date(date[2], date[1], date[0])

        let data = {
          name: {
            firstName: req.body.firstName,
            surName: req.body.surName
          },
          birthday: adultDate,
          phone: [req.body.phone],
          address: [{
            street: req.body.street,
            number: parseInt(req.body.number),
            district: req.body.district,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            cep: req.body.cep
          }],
          gr: req.body.gr,
          cpf: req.body.cpf,
          maritalStatus: req.body.maritalStatus,
          children: [{crianca: '3', kinship: 'parentesco'}],
          observations: 'Observações',
          photo: '/caminho'
        }

        userAdult.create(data, function (err, adultResult) {
          if (err) {
            return res.sendStatus(500)
          } else {
            let photoNameComponents = photoFile.name.split('.')
            let fileName = config.pathAdult +
              adultResult._id + '.' +
              photoNameComponents[photoNameComponents.length - 1] /**< url completa da localização do arquivo no computador */

            adultResult.photo = fileName /** Atualiza o nome do arquivo */
            adultResult.save(function (err) { /** Atualiza no banco a nova informação */
              if (err) {
                return res.sendStatus(500)
              }
            })

            /** Pega o arquivo e salva no servidor */
            photoFile.mv(config.pathPublic() + fileName, function (err) {
              return err ? res.sendStatus(500) : res.sendStatus(201)
            })
          }
        })
      } else {
        return res.sendStatus(409)
      }
    })
  } else {
    return res.sendStatus(400)
  }
})

module.exports = router
