const mongoose = require('mongoose');
const config = require('../config');

const passportSchema = new mongoose.Schema({
	time: {
	  type: String,
	  required: true,
	},
	price:{
	  type: String,
	  required: true,
	}
	});

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const passport = mongoose.model('passport', passportSchema);

module.exports = passport;
