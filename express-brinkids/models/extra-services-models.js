const mongoose = require('mongoose');
const config = require('../config');

const extraServicesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  unity: String,
  value: String,
});

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const extraServices = mongoose.model('ExtraServices', extraServicesSchema);

module.exports = extraServices;
