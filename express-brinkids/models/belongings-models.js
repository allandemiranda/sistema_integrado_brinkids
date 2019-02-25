const mongoose = require('mongoose');
const config = require('../config');

const belongingsSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
});

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const belongings = mongoose.model('Belongings', belongingsSchema);

module.exports = belongings;
