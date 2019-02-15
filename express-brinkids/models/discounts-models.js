const mongoose = require('mongoose');
const config = require('../config');

const discountsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
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
  temporalityType: {
    type: String,
    require: true,
  },
  temporalityDate: {
    type: String,
    require: true,
  },
  validity: {
    type: Date,
    require: true,
  },
  codes: [{
    numberCode: {
      type: String,
      require: true,
    },
    statusUnique: Boolean,
    statusUniqueDate: Date,
    statusUniqueUser: String,
    statusBroadlUser: [{
      idUser: String,
      dateUser: Date,
    }],
  }],
});

discountsSchema.statics.discountsGenerateToday = function (cb) {
  const today = new Date();

  return this.count({
    createdAt: {
      $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      $lt: today.setDate(today.getDate() + 1),
    },
  }, cb);
};

mongoose.connect(`mongodb://localhost/${config.database}`);
const Discount = mongoose.model('Discount', discountsSchema);

module.exports = Discount;
