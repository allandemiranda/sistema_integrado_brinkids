/** Este documento será responsável por criar o Schema do calendário */

const mongoose = require('mongoose');
const config = require('../config');

const calendarSchema = new mongoose.Schema({
  color: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  opening: {
    type: Date,
    require: true,
  },
  closing: {
    type: Date,
    require: true,
  },
  associated: String,
});

mongoose.connect(`mongodb://localhost/'${config.database}`);
const calendar = mongoose.model('Calendar', calendarSchema);

module.exports = calendar;
