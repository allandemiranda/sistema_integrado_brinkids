const express = require('express');
const Discount = require('../models/discounts-models');
const config = require('../config');

const router = express.Router();

// TODO: Necessidade de analisar com o front-end para ver como a
// variável 'numberCode' será gerada e como os descontos serão usados
router.post('/', async (req, res) => {
  if (req.body.name
      && req.body.description
      && req.body.to
      && req.body.amount
      && req.body.type
      && req.body.value
      && req.body.temporalityTaype
      && req.body.validity
      && req.body.numberCode
      && req.body.statusUnique
      && req.body.statusUniqueDate
      && req.body.statusUniqueUser
      && req.body.idUser
      && req.body.dateUser) {
    const discount = new Discount({
      name: req.body.name,
      description: req.body.description,
      to: req.body.to,
      amount: parseInt(req.body.amount, 10),
      type: req.body.type,
      value: parseInt(req.body.value, 10),
      temporalityTaype: req.body.temporalityTaype,
      validity: new Date(req.body.validity),
      codes: {
        numberCode: req.body.numberCode,
        statusUnique: req.body.statusUnique,
        statusUniqueDate: new Date(req.body.statusUniqueDate),
        statusUniqueUser: req.body.statusUniqueUser,
        statusBroadlUser: {
          idUser: req.body.idUser,
          dateUser: new Date(req.body.dateUser),
        },
      },
    });

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
