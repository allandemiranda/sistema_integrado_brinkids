const mongoose = require('mongoose');
const config = require('../config');

const birthdayPartySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  birthdayPerson: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  observations: String,
  payment: {
    value: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
  },
  amount: {
    children: Number,
    adults: Number,
  },
  guestList: 
  [{
    type: String,
    name: {
      type: String,
      required: true,
    },
    age: Number,
    id: String,
  }],
  partyFeather: [{
    type: String,
    id: String,
    name: String,
  }],
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const birthdayParty = mongoose.model('BirthdayParty', birthdayPartySchema);

module.exports = birthdayParty;
