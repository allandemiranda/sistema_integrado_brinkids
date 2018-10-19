const mongoose = require('mongoose');
const config = require('../config');

const passportSchema = new mongoose.Schema({
	time: {
	  type: String,
	  require: true,
	},
	price:{
	  type: String,
	  require: true,
	}
	});

mongoose.connect(`mongodb://localhost/${config.database}`);
const passport = mongoose.model('Passport', passportSchema);

module.exports = passport;
