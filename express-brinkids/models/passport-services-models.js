const mongoose = require('mongoose');
const config = require('../config');

const passportServicesSchema = new mongoose.Schema({
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
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const passportServices = mongoose.model('PassportServices', passportServicesSchema);

module.exports = passportServices;