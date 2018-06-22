var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var config = require('./config/config')
var app = express()

var autenticacao = require('./routes/autenticacao')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/usuarios', autenticacao)

app.listen(3001, function () {
  console.log("O servidor está rodando")
})