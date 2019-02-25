const mongoose = require('mongoose');
const config = require('../config');

const ChildSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  nacionality: String,
  name: {
    firstName: {
      type: String,
      require: true,
    },
    surName: {
      type: String,
      require: true,
    },
  },
  birthday: {
    type: Date,
    required: true,
  },
  sexuality: {
    type: String,
    required: true,
  },
  restrictions: String,
  observations: String,
  photo: {
    type: String,
    required: true,
  },
});

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const Child = mongoose.model('Child', ChildSchema);
module.exports = Child;
