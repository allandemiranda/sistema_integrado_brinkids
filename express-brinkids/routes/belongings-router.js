const express = require('express');
const Belongings = require('../models/belongings-models');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const belongingsJson = await Belongings.find({});

    return res.status(200).json(belongingsJson);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.put('/', async (req, res) => {
  try {
    if (req.body.number === undefined || isNaN(parseInt(req.body.number, 10))) {
      return res.sendStatus(400);
    }
    const belongings = await Belongings.find({});

    if (req.body.number >= 0) {
      belongings[0].number = parseInt(req.body.number, 10);
    }

    belongings.save();

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
