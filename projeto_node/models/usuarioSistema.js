var mongoose = require('mongoose')
var config = require('../config/config')
var Schema = mongoose.Schema

var UsuarioSchema = new Schema({
	user: String,
	password: String,
	status: String,
	observations: Array
})

// hashing a password before saving it to the database
UsuarioSchema.pre('save', function (next) {
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
var UsuarioSistema = mongoose.model('Usuario', UsuarioSchema)

module.exports = UsuarioSistema
