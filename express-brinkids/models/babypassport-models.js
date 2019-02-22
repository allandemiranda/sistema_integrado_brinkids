const mongoose = require('mongoose');
const config = require('../config');

const babypassportSchema = new mongoose.Schema({
	time: {
	  type: String,
	  required: true,
	},
	price:{
	  type: String,
	  required: true,
	}
	});

mongoose.connect(`mongodb://localhost/${config.database}`);
const babypassport = mongoose.model('babypassport', babypassportSchema);

module.exports = babypassport;
