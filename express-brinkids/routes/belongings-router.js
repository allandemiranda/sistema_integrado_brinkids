const express = require('express');
const Belongings = require('../models/belongings-models');

const router = express.Router();


router.get('/', async (req, res) => {
	try{
    const belongingsJson = await Belongings.find({});

		return res.status(200).json(belongingsJson);
	} catch (err) {
    console.log(err);
    return res.sendStatus(500);
	}
});

router.put('/', async (req, res) => {
  try {
    const belongings = await Belongings.find({});

    belongings[0].number += 1;

    belongings.save();

    return res.sendStatus(204);
	} catch (err) {
    console.log(err);
    return res.sendStatus(500);
	}
});

router.delete('/', async (req, res) => {
  try {
    const belongings = await Belongings.find({});

    // Impede que exista um número negativo de gavetas quando
    // não tenha nenhuma gaveta usada
    if (belongings[0].number === 0) {
      return res.sendStatus(400);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
