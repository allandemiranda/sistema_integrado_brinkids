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
  console.log(req.body)
  const guestList = JSON.stringify(req.body.guestList);
  var oldArray = req.body.guestList.split('"');
  var array = new Array();
  console.log(oldArray.length)
  for (var i = 0; i < oldArray.length - 1; i+=8) {
    array.push(String(oldArray[i+1] + oldArray[i+2] + oldArray[i+3] + oldArray[i+4] + oldArray[i+5] + oldArray[i+6] + oldArray[i+7]));
  }
  const birthday = new BirthdayParty({
    title: req.body.title,
    birthdayPerson: { 
      name: req.body.name, 
      age: parseInt(req.body.age, 10) 
    },
    start: req.body.start,
    end: req.body.end,
    description: req.body.description,
    observations: req.body.observations,
    payment: { 
      value: parseInt(req.body.value, 10),
      method: req.body.method 
    },
    amount: { 
      children: parseInt(req.body.children, 10), 
      adults: parseInt(req.body.adults, 10) 
    },
    guestList: array,
    /*partyFeather: { 
      type: req.body.type, 
      id: req.body.id, 
      name: req.body.name 
    },*/
  });
  console.log(array)
  try {
    const newBirthday = await birthday.save();
    return res.status(201).json(newBirthday);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.delete('/:identifier', async (req, res) => {
  try {
    const deletedService = await BirthdayParty.findByIdAndRemove(req.params.identifier);

    if (!deletedService) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

router.put('/:identifier', async (req, res) => {
  try {
    const service = await BirthdayParty.findByIdAndUpdate(
      req.params.identifier,
      {
        title: req.body.title,
        birthdayPerson: { 
          name: req.body.name, 
          age: req.body.age, 
        },
        start: req.body.start,
        end: req.body.end,
        description: req.body.description,
        observations: req.body.observations,
        payment: { 
          value: req.body.value, 
          method: req.body.method 
        },
        amount: { 
          children: req.body.children,  
          adults: req.body.adults,  
        },
        // guestList: array,
      },
    );

    if (!service) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

module.exports = router;
