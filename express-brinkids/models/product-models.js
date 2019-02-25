// Este arquivo é responsável por criar o Schema dos produtos do Dashboard "As crianças"

const mongoose = require('mongoose');
const config = require('../config');

const productSchema = new mongoose.Schema({
  children: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    restrictions: String,
    observations: String,
  },
  adult: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    observations: String,
  },
  photo: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  belongings: Number,
  kinship:String,
  birthdayStart:String,
  birthdayEnd:String,
  birthdayName:String,
});

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const product = mongoose.model('Product', productSchema);

module.exports = product;
