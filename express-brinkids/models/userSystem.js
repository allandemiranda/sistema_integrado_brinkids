/** Schema para usuarios do sistema */

var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var config = require('../config')
var Schema = mongoose.Schema

var UserSchema = new Schema({ /**< Criação do Schema que conterá 4 campos */
  user: String, /**< Um campo de usuário do tipo texto que servirá autenticação e consulta no banco */
  password: String, /**< Um campo de senha. Obs.: Ela é deve ser criptografada antes de ser salva */
  status: String, /**< Um campo de status onde deve inidcar se terá privilégios ou não */
  employees: Boolean /**< Checa se é um funcionário ou não */
})

/**
 * Antes de salvar um novo usuário no banco a senha deve ser criptografada.
 * Para isso, utilizamos a biblioteca bcrypt
 */
/*
UserSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
}) */

UserSchema.statics.authenticate = function (userName, password, callback) {
  UserSystem.findOne({ user: userName })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error('User not found.')
        err.status = 401
        return callback(err)
      }
      if (password === user.password) {
        return callback(null, user)
      } else {
        return callback()
      }
      /* bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          callback(err)
        }
        if (result === true) {
          return callback(null, user)
        } else {
          return callback()
        }
      }) */
    })
}

mongoose.connect('mongodb://localhost/' + config.database_name)
var UserSystem = mongoose.model('User', UserSchema)

module.exports = UserSystem
