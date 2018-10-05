const mongoose = require('mongoose');
const config = require('../config');

const discountsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  temporalityTaype: {
    type: String,
    require: true,
  },
  validity: {
    type: Date,
    require: true,
  },
  codes: {
    numberCode: {
      type: String,
      require: true,
    },
    statusUnique: String,
    statusUniqueDate: Date,
    statusUniqueUser: String,
    statusBroadlUser: {
      idUser: String,
      dateUser: Date,
    },
  },
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const Discount = mongoose.model('Discount', discountsSchema);

module.exports = Discount;
