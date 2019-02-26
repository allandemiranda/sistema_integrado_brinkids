const mongoose = require('mongoose');
const config = require('../config');

const babypassportServicesSchema = new mongoose.Schema({
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

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const babypassportServices = mongoose.model('babypassportServices', babypassportServicesSchema);

module.exports = babypassportServices;