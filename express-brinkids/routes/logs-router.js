const express = require('express');
const logs = require('../models/logs-models');
const config = require('../config');
const moment = require('moment');

const router = express.Router();

router.post('/', async (req, res) => {

	console.log("Aqui vem o req.body:");
	console.log(req.body);

	const data = new logs({

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
		priceDiscount: {
			id: 's',
			code: 's',
			type: 's',
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



router.put('/filter', async (req, res) => {
	console.log("entrei========sssss")
	if (req.body.operador !== "") {

		if (req.body.atividade !== "") {

			if (req.body.start !== "" && req.body.end !== "") {

				if (req.body.pagamento !== "") {
					try {
						const Log = await logs.find({ 'priceMethod': new RegExp(req.body.pagamento), 'from': new RegExp(req.body.operador), 'activity': new RegExp(req.body.atividade), 'dateOperation': { $gte: moment(req.body.start), $lte: moment(req.body.end) } });

						return res.json(Log);
					} catch (err) {
						console.log(err);
						return res.sendStatus(500);
					}
				}

			} else if (req.body.pagamento !== "") {
				try {
					const Log = await logs.find({ 'priceMethod': new RegExp(req.body.pagamento), 'from': new RegExp(req.body.operador), 'activity': new RegExp(req.body.atividade) });

					return res.json(Log);
				} catch (err) {
					console.log(err);
					return res.sendStatus(500);
				}
			} else {
				try {
					const Log = await logs.find({ 'from': new RegExp(req.body.operador), 'activity': new RegExp(req.body.atividade), 'dateOperation': { $gte: moment(req.body.start), $lte: moment(req.body.end) } });

					return res.json(Log);
				} catch (err) {
					console.log(err);
					return res.sendStatus(500);
				}
			}
			try {
				const Log = await logs.find({ 'from': new RegExp(req.body.operador), 'activity': new RegExp(req.body.atividade) });

				return res.json(Log);
			} catch (err) {
				console.log(err);
				return res.sendStatus(500);
			}
		} else if (req.body.start !== "" && req.body.end !== "") {

			if (req.body.pagamento !== "") {
				try {
					const Log = await logs.find({ 'priceMethod': new RegExp(req.body.pagamento), 'from': new RegExp(req.body.operador), 'dateOperation': { $gte: moment(req.body.start), $lte: moment(req.body.end) } });

					return res.json(Log);
				} catch (err) {
					console.log(err);
					return res.sendStatus(500);
				}
			} else {
				try {
					const Log = await logs.find({ 'from': new RegExp(req.body.operador), 'dateOperation': { $gte: moment(req.body.start), $lte: moment(req.body.end) } });

					return res.json(Log);
				} catch (err) {
					console.log(err);
					return res.sendStatus(500);
				}
			}

		} else {
			try {
				const Log = await logs.find({ 'from': req.body.operador });

				return res.json(Log);
			} catch (err) {
				console.log(err);
				return res.sendStatus(500);
			}
		}

	} else if (req.body.atividade !== "") {

		if (req.body.start !== "" && req.body.end !== "") {
			if (req.body.pagamento !== "") {
				try {
					const Log = await logs.find({ 'priceMethod': new RegExp(req.body.pagamento), 'activity': new RegExp(req.body.atividade), 'dateOperation': { $gte: moment(req.body.start), $lte: moment(req.body.end) } });

					return res.json(Log);
				} catch (err) {
					console.log(err);
					return res.sendStatus(500);
				}
			} else {
				try {
					const Log = await logs.find({ 'activity': new RegExp(req.body.atividade), 'dateOperation': { $gte: moment(req.body.start), $lte: moment(req.body.end) } });

					return res.json(Log);
				} catch (err) {
					console.log(err);
					return res.sendStatus(500);
				}
			}

		} else if (req.body.pagamento !== "") {
			try {
				const Log = await logs.find({ 'priceMethod': new RegExp(req.body.pagamento), 'activity': new RegExp(req.body.atividade) });

				return res.json(Log);
			} catch (err) {
				console.log(err);
				return res.sendStatus(500);
			}
		} else {
			try {
				const Log = await logs.find({ 'activity': new RegExp(req.body.atividade) });

				return res.json(Log);
			} catch (err) {
				console.log(err);
				return res.sendStatus(500);
			}
		}

	} else if (req.body.start !== "" && req.body.end !== "") {
		if(req.body.pagamento!==""){
			try {
				const Log = await logs.find({ 'priceMethod': new RegExp(req.body.pagamento),'dateOperation': { $gte: moment(req.body.start), $lte: moment(req.body.end) } });
	
				return res.json(Log);
			} catch (err) {
				console.log(err);
				return res.sendStatus(500);
			}
		}else{
			try {
				const Log = await logs.find({ 'dateOperation': { $gte: moment(req.body.start), $lte: moment(req.body.end) } });
	
				return res.json(Log);
			} catch (err) {
				console.log(err);
				return res.sendStatus(500);
			}
		}
		
	} else if(req.body.pagamento !=="") {
		try {
			const Log = await logs.find({ 'priceMethod': new RegExp(req.body.pagamento) });

			return res.json(Log);
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		
	}else{
		try {
			const Log = await logs.find({});

			return res.json(Log);
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	}
});

module.exports = router