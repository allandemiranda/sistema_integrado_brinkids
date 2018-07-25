/** Schema para usuarios do sistema */

var mongoose = require('mongoose')
var config = require('../config')
var Schema = mongoose.Schema

var addressSchema = new Schema({
  street: {
    type: String,
    require: true
  },
  number: {
    type: Number,
    require: true
  },
  district: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  state: {
    type: String,
    require: true
  },
  country: {
    type: String,
    require: true
  },
  cep: {
    type: Number,
    require: true
  }
})

var childSchema = new Schema({
  identifier: String,
  kinship: String
})

var userAdultSchema = new Schema({
  status: String,
  name: {
    firstName: {
      type: String,
      require: true
    },
    surName: {
      type: String,
      require: true
    }
  },
  birthday: {
    type: Date,
    required: true
  },
  phone: {
    type: Array,
    required: true
  },
  address: [addressSchema],
  rg: Number,
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  maritalStatus: String,
  children: [childSchema],
  observations: String,
  photo: {
    type: String,
    required: true
  }
})

mongoose.connect('mongodb://localhost/' + config.database)
var userAdult = mongoose.model('UserAdult', userAdultSchema)

module.exports = userAdult
