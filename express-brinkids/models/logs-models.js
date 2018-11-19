const mongoose = require('mongoose');
const config = require('../config');

const logsSchema = new mongoose.Schema({
	activity: {
	  type: String,
	  required: true,
	},
	action:{
	  type: String,
	  required: true,
	},
	dateOperation:{
	  type: Date,
	  required: true,
	},
	from:{
	  type: String,
	  required: true,
	},
	to:{
	  type: String,
	  required: true,
	},
	cco:{
	  type: String,
	  required: true,
	},
	price:{
	  type: Number,
	  required: true,
	},
	priceMethod:{
	  type: String,
	  required: true,
	},
	timeLojaFirst:{
	  type: String,
	  required: true,
	},
	timeLojaLast:{
	  type: String,
	  required: true,
	},
	priceDiscount:{
		id:{
			type: String,
			required: true,
		},
		code:{
		  type: String,
		  required: true,
		},
		type:{
		  type: String,
		  required: true,
		},
	},
	});

mongoose.connect(`mongodb://localhost/${config.database}`);
const logs = mongoose.model('Logs', logsSchema);

module.exports = logs;