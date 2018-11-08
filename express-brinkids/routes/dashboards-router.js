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

module.exports = router;