const express = require('express');
const router = express.Router();
const birthdayParty = require('../models/birthday-party-models');

router.post('/', (req, res) => {
  const guestList = JSON.parse(req.body.guestList);
  const data = {
    title: req.body.title,
    birthdayPerson: { name: req.body.name, age: parseInt(req.body.age, 10) },
    start: new Date(req.body.start),
    end: new Date(req.body.end),
    description: req.body.description,
    observations: req.body.observations,
    payment: { value: parseInt(req.body.value, 10), method: req.body.method },
    amount: { children: parseInt(req.body.children, 10), adults: parseInt(req.body.adults, 10) },
    guestList: guestList,
    partyFeather: [{ type: req.body.type, id: req.body.id, name: req.body.name }],
  };

  console.log(data);

  return res.sendStatus(200);
});

module.exports = router;
