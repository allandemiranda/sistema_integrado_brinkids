const express = require('express');
const logs = require('../models/logs-models');
const config = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  const data = new logs ({
  
	  activity: req.body.activity,
		action: req.body.action,
		dateOperation: req.body.dateOperation,
		from: req.body.from,
		to: req.body.to,
		cco: req.body.cco,
		price: req.body.price,
		priceMethod: req.body.priceMethod,
		timeLojaFirst: req.body.timeLojaFirst,
		timeLojaLast: req.body.timeLojaLast,
		priceDiscount:{
			id:'s',
			code:'s',
			type:'s',
		},
		});

	  try {
	    const newLog = await data.save();
	    return res.status(201).json(newLog);
	  } catch (err) {
	    return res.sendStatus(500);
	  }
});

router.get('/', async (req, res) => {
  try {
    const log = await logs.find({});
  

    return res.status(200).json(log);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router