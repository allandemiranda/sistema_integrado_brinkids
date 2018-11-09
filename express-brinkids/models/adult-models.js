/** Schema para usuarios do sistema */

const mongoose = require('mongoose');
const config = require('../config');


const childSchema = new mongoose.Schema({
  identifier: String,
  kinship: String,
});

const userAdultSchema = new mongoose.Schema({
  status: String,
  name: {
    firstName: {
      type: String,
      require: true,
    },
    surName: {
      type: String,
      require: true,
    },
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: Array,
    of: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    cep: {
      type: Number,
      require: true,
    },
  },
  rg: Number,
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  nacionality: {
    type: String,
    require: true,
  },
  sexuality: {
    type: String,
    require: true,
  },
  maritalStatus: String,
  children: [{
    identifier: String,
    kinship: String,
  }],
  observations: String,
  photo: {
    type: String,
    required: true,
  },
  isEmployee: Boolean,
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const userAdult = mongoose.model('UserAdult', userAdultSchema);

module.exports = userAdult;
