const mongoose = require('mongoose');
const config = require('../config');

const passportSchema = new mongoose.Schema({
	service: {
		name: {
			type: String,
      require: true,
		},
  	description: {
  		type: String,
  		require: true,
  	},
  	initialTime: String,
  	finalTime: String,
    price: String,
  },
  default: {
    time: String,
    price: String,
  }
)};

mongoose.connect(`mongodb://localhost/${config.database}`);
const passport = mongoose.model('Passport', passportSchema);

module.exports = passport;