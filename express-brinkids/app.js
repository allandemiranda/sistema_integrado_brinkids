var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var fileUpload = require('express-fileupload')
var cors = require('cors')
// var jwt = require('jsonwebtoken')
// var config = require('./config')

var autentication = require('./routes/autentication-router')
var child = require('./routes/child-router')
var adult = require('./routes/adult-router')
var calendar = require('./routes/calendar-router')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())
app.use(cors())

// Middleware para checar se o token foi enviado
// app.use(function (req, res, next) {
//   var token = req.body.token || req.query.token || req.headers['x-access-token']

//   if (token) {
//     jwt.verify(token, config.secret_auth, function (err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Falha ao tentar autenticar o token!' });    
//       } else {
//         // se tudo correr bem, salver a requisição para o uso em outras rotas
//         req.decoded = decoded
//         next()
//       }
//     })
//   } else {
//     // se não tiver o token, retornar o erro 401
//     return res.sendStatus(401)
//   }
// })

app.use('/crianca', child)
app.use('/authentication', autentication)
app.use('/adulto', adult)
app.use('/calendar', calendar)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
