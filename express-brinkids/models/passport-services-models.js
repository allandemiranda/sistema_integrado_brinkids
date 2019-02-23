const mongoose = require('mongoose');
const config = require('../config');

const passportServicesSchema = new mongoose.Schema({
	name: {
		type: String,
    	required: true,
	},
	description: {
		type: String,
		
	},
	initialTime: String,
	finalTime: String,
  	price: String,
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const passportServices = mongoose.model('passportServices', passportServicesSchema);

module.exports = passportServices;
