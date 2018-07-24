/** Arquivo responsável por carregar as configurações do que foi desenvolvido na aplicação */

// Módulos
var cookieParser = require('cookie-parser')
var cors = require('cors')
var createError = require('http-errors')
var express = require('express')
var fileUpload = require('express-fileupload')
var logger = require('morgan')
var path = require('path')
// var jwt = require('jsonwebtoken')
// var config = require('./config')

// Rotas
var adult = require('./routes/adult-router')
var autentication = require('./routes/autentication-router')
var calendar = require('./routes/calendar-router')
var child = require('./routes/child-router')
var employees = require('./routes/employees-router')

// Instanciando o objeto do express
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Usando middlewares
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
//         return res.json({ success: false, message: 'Falha ao tentar autenticar o token!' })
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

// Usando as rotas
app.use('/adult', adult)
app.use('/authentication', autentication)
app.use('/calendar', calendar)
app.use('/child', child)
app.use('/employees', employees)

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
