/** Schema para usuarios do sistema */

var mongoose = require('mongoose')
var config = require('../config')
var Schema = mongoose.Schema

var UsuarioAdultoSchema = new Schema({
  status: String,
  name: {
    first: String,
    surname: String
  }
  birthday: Date,
  phone: Array,
  address: {
    street: String,
    number: String,
    district: String,
    city: String,
    state: String,
    country: String,
    cep: String
  },
  gr: String,
  cpf: String,
  maritalStatus: String,
  children: Array,
  observations: String
})

mongoose.connect('mongodb://localhost/' + config.database_name)
var UsuarioAdultoSistema = mongoose.model('UsuarioAdulto', UsuarioSchema)

module.exports = UsuarioAdultoSistema
