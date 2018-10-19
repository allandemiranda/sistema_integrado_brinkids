const express = require('express');
const Discount = require('../models/discounts-models');
const config = require('../config');

const router = express.Router();

const numberCode = () => {
  const actualDate = new Date();
  const totalDIscountsToday = Discount.discountsGenerateToday() + 1;

  let stringCode = `BRK${actualDate.getDate()}${actualDate.getMonth() + 1}${actualDate.getFullYear() % 100}${totalDIscountsToday}`;

  return stringCode;
};

router.post('/', async (req, res) => {
  if (req.body.name
      && req.body.description
      && req.body.to
      && req.body.amount
      && req.body.type
      && req.body.value
      && req.body.temporalityTaype
      && req.body.validity) {
    let discount;

    if (req.body.value === 'Unico') {
      discount = new Discount({
        name: req.body.name,
        createdAt: new Date(),
        description: req.body.description,
        to: req.body.to,
        amount: parseInt(req.body.amount, 10),
        type: req.body.type,
        value: parseInt(req.body.value, 10),
        temporalityTaype: req.body.temporalityTaype,
        validity: new Date(req.body.validity),
        codes: {
          numberCode: numberCode(),
          statusUnique: 'notUsed',
          statusUniqueDate: new Date(),
          statusUniqueUser: '123',
          statusBroadlUser: [],
        },
      });
    } else {
      discount = new Discount({
        name: req.body.name,
        createdAt: new Date(),
        description: req.body.description,
        to: req.body.to,
        amount: parseInt(req.body.amount, 10),
        type: req.body.type,
        value: parseInt(req.body.value, 10),
        temporalityTaype: req.body.temporalityTaype,
        validity: new Date(req.body.validity),
        codes: {
          numberCode: numberCode(),
          statusBroadlUser: [],
        },
      });
    }

    try {
      const newDiscount = await discount.save();

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;
