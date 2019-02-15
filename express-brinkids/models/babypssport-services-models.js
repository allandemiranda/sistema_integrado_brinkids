const mongoose = require('mongoose');
const config = require('../config');

const babypassportServicesSchema = new mongoose.Schema({
	name: {
		type: String,
    	required: true,
	},
	description: {
		type: String,
		required: true,
	},
	initialTime: String,
	finalTime: String,
  	price: String,
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const passportServices = mongoose.model('babypassportServices', babypassportServicesSchema);

module.exports = babypassportServices;