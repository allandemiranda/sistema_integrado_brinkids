const express = require('express');
const Discount = require('../models/discounts-models');
const Logs = require('../models/logs-models')
const config = require('../config');

const router = express.Router();

const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');

const numberCode = async () => {
  const actualDate = new Date();

  const totalDiscountsToday = await Discount.discountsGenerateToday();

  const stringCode = `BRK${actualDate.getDate()}${actualDate.getMonth() + 1}${actualDate.getFullYear() % 100}${totalDiscountsToday + 1}`;

  return stringCode;
};

router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find({});

    return res.json(discounts);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/filter/:code', async (req, res) => {
  try {
    const discounts = await Discount.find({});

    return res.json(discounts);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
/**
 * TODO: Quando entrar a parte de login de usuários com token, precisa
 * ajeitar os campos relacionados ao usuário
 */
router.post('/', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;

  if (req.body.name
    && req.body.description
    && req.body.to
    && req.body.amount
    && req.body.type
    && req.body.value
    && req.body.temporalityType
    && req.body.validity) {
    try {
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
          temporalityType: req.body.temporalityTaype,
          validity: new Date(req.body.validity),
          codes: {
            numberCode: await numberCode(),
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
            numberCode: await numberCode(),
            statusBroadlUser: [],
          },
        });
      }

      const newDiscount = await discount.save();
      const log = new Logs({
        activity: 'Desconto',
        action: 'Criação',
        dateOperation: new Date(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar
        to: newDiscount._id,


      })
      const newLog = await log.save();

      return res.json(newDiscount);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(400);
  }
});
router.delete('/filter/:identifier', async (req, res) => {
  try {
    const a = req.cookies.TOKEN_KEY;
    const b = jwt.verify(a, config.secret_auth);
    const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
    const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
    
    const deletedService = await Discount.findByIdAndRemove(req.params.identifier);
    
    const log = new Logs({
      activity: 'Descontos',
      action: 'Delete',
      dateOperation: new Date(),
      from: funcionario,
    })
    
    const newLog = await log.save();
    if (!deletedService) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});
module.exports = router;
