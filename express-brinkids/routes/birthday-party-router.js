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
 


 
  let jasonPaarse = JSON.parse(req.body.guestList)


  console.log("===================================")
  console.log(jasonPaarse)
  console.log("===================================")




  // for (var i = 0; i < oldArray.length - 1; i+=8) {
  //   array.push(String(oldArray[i+1] + oldArray[i+2] + oldArray[i+3] + oldArray[i+4] + oldArray[i+5] + oldArray[i+6] + oldArray[i+7])); //essa foi a melhor forma que consegui salvar os dados sem um monte de "//" no meio da string
  // }
  const birthday = new BirthdayParty({
    title: req.body.title,
    birthdayPerson: {
      name: req.body.name,
      age: parseInt(req.body.age, 10)
    },
    start: req.body.start,//falta ter a data só tem a hora
    end: req.body.end,//aqui tbm
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
    guestList: req.body.guestList,
    /*partyFeather: { 
      type: req.body.type, 
      id: req.body.id, 
      name: req.body.name 
    },*/
  });

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
        $set: {
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


          // guestList: array,}
        },
      }
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
