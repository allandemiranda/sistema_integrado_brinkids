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
  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  associated: String,
});

calendarSchema.statics.all = async function all() {
  let birthdays;

  try {
    birthdays = await this.find({});
  } catch (err) {
    return err;
  }

  return birthdays;
};

mongoose.connect(`mongodb://localhost/'${config.database}`);
const calendar = mongoose.model('Calendar', calendarSchema);

module.exports = calendar;
