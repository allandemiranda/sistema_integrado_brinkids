/** Schema para usuarios do sistema */

var mongoose = require('mongoose')
var config = require('../config')
var Schema = mongoose.Schema

var userAdultSchema = new Schema({
  status: String,
  name: {
    type: Map,
    require: true
  },
  birthday: {
    type: Date,
    required: true
  },
  phone: {
    type: Array,
    required: true
  },
  address: {
    type: Map,
    required: true
  },
  gr: Number,
  cpf: {
    type: String,
    required: true
  },
  maritalStatus: String,
  children: {
    type: Array,
    of: String
  },
  observations: String,
  photo: {
    type: String,
    required: true
  }
})

mongoose.connect('mongodb://localhost/' + config.database_name)
var userAdult = mongoose.model('UserAdult', userAdultSchema)

module.exports = userAdult
