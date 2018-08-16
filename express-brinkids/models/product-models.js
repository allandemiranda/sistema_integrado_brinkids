// Este arquivo é responsável por criar o Schema dos produtos do Dashboard "As crianças"

const mongoose = require('mongoose');
const config = require('../config');

const productSchema = new mongoose.Schema({
  photo: {
    type: String,
    require: true,
  },
  service: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
    require: true,
  },
  belongings: Number,
  children: {
    id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    birthday: {
      type: Date,
      require: true,
    },
    restrictions: String,
    observations: String,
  },
  adult: {
    id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    observations: String,
  },
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const product = mongoose.model('Product', productSchema);

module.exports = product;
