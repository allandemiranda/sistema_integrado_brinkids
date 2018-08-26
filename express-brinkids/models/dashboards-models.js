const mongoose = require('mongoose');
const config = require('../config');

const dashboardSchema = mongoose.Schema({
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
    name: {
      id: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    observations: String,
  },
  birthdayParty: String,
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = dashboard;
