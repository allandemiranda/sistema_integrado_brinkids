const mongoose = require('mongoose');
const config = require('../config');

const birthdayPartySchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  birthdayPerson: {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
  },
  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  observations: String,
  payment: {
    value: {
      type: Number,
      require: true,
    },
    method: {
      type: String,
      require: true,
    },
  },
  amount: {
    children: Number,
    adults: Number,
  },
  guestList: [{
    type: String,
    name: {
      type: String,
      require: true,
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
