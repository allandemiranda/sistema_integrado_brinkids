const mongoose = require('mongoose');
const config = require('../config');

const dashboardSchema = mongoose.Schema({
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
  birthdayParty: String,
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = dashboard;
