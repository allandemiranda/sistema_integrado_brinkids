const express = require('express');
const Dashboard = require('../models/dashboards-models');

const router = express.Router();

router.post('/', async (req, res) => {

  console.log("Aqui vem o req.body:");
  console.log(req.body);
  console.log(req.body[0]);
  console.log(req.body.idAdult[0])

  if(req.body.time
    && req.body.idAdult
    && req.body.idCria){

  	var i;

    const data = new Dashboard({
      time: req.body.time,
      idAdult: req.body.idAdult,
      idCria: req.body.idCria,   
    });
	};

    try {
     	const newDashboard = await data.save();
     	console.log(newDashboard);
     	return res.status(201).json(newDashboard);
    } catch (err) {
      return res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
  try {
    const dashboards = await Dashboard.find({});

    return res.status(200).json(dashboards);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
