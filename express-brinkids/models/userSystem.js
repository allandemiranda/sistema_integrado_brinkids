/** Schema para usuarios do sistema */

var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var config = require('../config')
var Schema = mongoose.Schema

var UserSchema = new Schema({ /** Criação do Schema que conterá 4 campos */
	user: String, /** Um campo de usuário do tipo texto que servirá autenticação e consulta no banco */
	password: String, /** Um campo de senha. Obs.: Ela é deve ser criptografada antes de ser salva */
	status: String, /** Um campo de status onde deve inidcar se terá privilégios ou não */
	observations: Array /** Um campo de observações */
})

/**
 * Antes de salvar um novo usuário no banco a senha deve ser criptografada.
 * Para isso, utilizamos a biblioteca bcrypt
 */
UserSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

mongoose.connect('mongodb://localhost/' + config.database_name)
var UserSystem = mongoose.model('User', UserSchema)

module.exports = UserSystem
