/** Arquivo responsável por carregar as configurações do que foi desenvolvido na aplicação */

// Módulos
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const path = require('path');
// const jwt = require('jsonwebtoken')
// const config = require('./config')

// Rotas
const adult = require('./routes/adult-router');
const autentication = require('./routes/autentication-router');
const birthday = require('./routes/birthday-party-router');
const calendar = require('./routes/calendar-router');
const child = require('./routes/child-router');
const dashboard = require('./routes/dashboards-router');
const employees = require('./routes/employees-router');
const product = require('./routes/product-router');
const extraServices = require('./routes/extra-services-router');
const passport = require('./routes/passport-router');
const passportServices = require('./routes/passport-services-router');
const belongings = require('./routes/belongings-router');

// Instanciando o objeto do express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Usando middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors());

// Middleware para checar se o token foi enviado
// app.use(function (req, res, next) {
//   const token = req.body.token || req.query.token || req.headers['x-access-token']

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
app.use('/adult', adult);
app.use('/authentication', autentication);
app.use('/birthday', birthday);
app.use('/calendar', calendar);
app.use('/child', child);
app.use('/dashboard', dashboard);
app.use('/employees', employees);
app.use('/product', product);
app.use('/extraServices', extraServices);
app.use('/passport', passport);
app.use('/passportServices', passportServices);
app.use('/belongings', belongings);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;