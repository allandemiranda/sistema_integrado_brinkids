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

router.get('/autenticacao', function (req, res) {
  if (req.query.user && req.query.password) {
    userSystem.authenticate(req.query.user, req.query.password, function (err, user) {
      if (err) {
        return res.sendStatus(err.status)
      } else if (!user){
        return res.sendStatus(404)
      } else {
        req.session.userId = user._id
        return res.sendStatus(200)
      }
    })
  } else {
    return res.sendStatus(400)
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
      return err ? res.sendStatus(500) : res.sendStatus(200)
    })
  } else {
    return res.sendStatus(400)
  }
})

router.get('/', function (req, res) {
  userSystem.find({}, function (err, result) {
    err ? res.sendStatus(500) : res.status(200).json(result)
  })
})

module.exports = router
