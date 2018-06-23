var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var fileUpload = require('express-fileupload')
var jwt = require('jsonwebtoken')
var app = express()

app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var autenticacao = require('./routes/autenticacao')
var crianca = require('./routes/crianca')

app.use('/crianca', crianca)
app.use('/usuarios', autenticacao)

app.listen(3001, function () {
  console.log("O servidor está rodando")
})