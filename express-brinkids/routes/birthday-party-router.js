const express = require('express');
const BirthdayParty = require('../models/birthday-party-models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const parties = await BirthdayParty.find({});

    return res.status(200).json(parties);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const guestList = JSON.parse(req.body.guestList);

  const birthday = new BirthdayParty({
    title: req.body.title,
    birthdayPerson: { name: req.body.name, age: parseInt(req.body.age, 10) },
    start: new Date(req.body.start),
    end: new Date(req.body.end),
    description: req.body.description,
    observations: req.body.observations,
    payment: { value: parseInt(req.body.value, 10), method: req.body.method },
    amount: { children: parseInt(req.body.children, 10), adults: parseInt(req.body.adults, 10) },
    guestList,
    partyFeather: [{ type: req.body.type, id: req.body.id, name: req.body.name }],
  });

  try {
    const newBirthday = await birthday.save();
    return res.status(201).json(newBirthday);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
