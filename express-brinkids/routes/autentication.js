var express = require('express')
var userSystem = require('../models/userSystem')
var router = express.Router()

// Cria usuario
router.post('/', function (req, res) {
  if (req.body.user && req.body.password) {
    let dados = {
      user: req.body.user,
      password: req.body.password,
      status: '',
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

router.post('/autentica', function (req, res) {
  if (req.body.user && req.body.password) {
    userSystem.authenticate(req.body.user, req.body.password, function (err, user) {
      if (err || !user) {
        return res.sendStatus(500)
      } else {
        req.session.userId = user._id
        return res.sendStatus(200)
      }
    })
  }
})

router.get('/teste', function (req, res) {
  userSystem.findById(req.session.userId, function (err, user) { // Transformar isso em um midllware
    if (err) {
      return res.sendStatus(500)
    } else {
      if (user === null) {
        return res.sendStatus(400)
      } else {
        return res.sendStatus(200)
      }
    }
  })
})

// GET /logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/')
      }
    })
  }
})

module.exports = router
