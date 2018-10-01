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
	text: String,
	quantity: String,
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const extraServices = mongoose.model('ExtraServices', extraServicesSchema);

module.exports = extraServices;