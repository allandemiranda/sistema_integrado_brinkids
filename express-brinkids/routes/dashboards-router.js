const express = require('express');
const Dashboard = require('../models/dashboards-models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const dashboards = await Dashboard.find({});

    return res.status(200).json(dashboards);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    //TODO: Completar para pegar cada criança e adicionar num dashboard
    //TODO: Integrar com o front
    req.body.children.forEach();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
