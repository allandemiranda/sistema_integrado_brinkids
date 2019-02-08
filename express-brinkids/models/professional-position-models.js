const mongoose = require('mongoose');
const config = require('../config');

const professionalPositionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    required: true,
  },
  functions: [{
    id: {
      type: Number,
      required: true,
    }
  }],
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const professionalPosition = mongoose.model('ProfessionalPosition', professionalPositionSchema);

module.exports = professionalPosition;