var express = require('express')
var userSystem = require('../models/userSystem-models')
var jwt = require('jsonwebtoken')
var config = require('../config')
var router = express.Router()

// Cria usuario
router.post('/', function (req, res) {
  if (req.body.user && req.body.password) {
    let dados = {
      user: req.body.user,
      password: req.body.password,
      employees: true
    }
    userSystem.create(dados, function (err, small) {
      if (err) {
        return res.sendStatus(500)
      } else {
        return res.sendStatus(201)
      }
    })
  } else {
    return res.sendStatus(400)
  }
})

// Rota responsável por realizar a autenticação
router.get('/', function (req, res) {
  // Primeiro checa se existe um usuário no sistema
  userSystem.findOne({user: req.query.user}, function (err, user) {
    if (err) {
      return res.sendStatus(500)
    } else if (user) { // Se ele existir, prosseguimos
      if (req.query.password === user.password) { // Agora checamos se a senha é válida
        // Caso a senha do usuário seja válida iremos criar um token
        // Para criar o token, deve ser passado 3 parâmetros:
        // 1) O usuário no formato de Json
        // 2) Uma chave para usar na criação do token
        // 3) Um objeto com parâmetros opcionais (Nesse caso, eu adiciono o tempo de expiração)
        var token = jwt.sign(user.toJSON(), config.secret_auth, {
          expiresIn: 60 * 60 * 24 // o token irá expirar em 24 horas
        })

        // Se tudo der certo, enviamos o token
        res.json({token: token})
      } else {
        return res.sendStatus(401)
      }
    } else {
      return res.sendStatus(404)
    }
  })
})

// GET /logout (Obs.: Necessário refatorar o logout)
// router.get('/logout', function (req, res, next) {
//   if (req.session) {
//     // delete session object
//     req.session.destroy(function (err) {
//       return err ? res.sendStatus(500) : res.sendStatus(200)
//     })
//   } else {
//     return res.sendStatus(400)
//   }
// })

router.get('/mostra_usuarios', function (req, res) {
  userSystem.find({}, function (err, result) {
    return err ? res.sendStatus(500) : res.status(200).json(result)
  })
})

module.exports = router
