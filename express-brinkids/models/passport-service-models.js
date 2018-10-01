const mongoose = require('mongoose');
const config = require('../config');

const passportServiceSchema = new mongoose.Schema({
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
)};

mongoose.connect(`mongodb://localhost/${config.database}`);
const passportService = mongoose.model('Passport', passportServiceSchema);

module.exports = passportService;