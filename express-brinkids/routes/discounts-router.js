const express = require('express');
const Discount = require('../models/discounts-models');
const Logs = require('../models/logs-models')
const config = require('../config');
const Child = require('../models/child-models');
const router = express.Router();

const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');

const numberCode = async (i) => {
  const actualDate = new Date();

  const totalDiscountsToday = await Discount.discountsGenerateToday();

  const stringCode = `BRK${actualDate.getDate()}${actualDate.getMonth() + 1}${actualDate.getFullYear() % 100}${actualDate.getHours()}${actualDate.getMinutes()}${actualDate.getSeconds()}${totalDiscountsToday + i}`;

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
router.get('/verdesconto/:code', async (req, res) => {
  let temporario = [];
  const discounts = await Discount.findById({ '_id': req.params.code });
  if (discounts.temporalityType === "Geral") {
    if (discounts.to === "Child") {
      discounts.codes.map((event, indice) => {
        console.log(discounts.codes.length)
        let child;
        event.statusBroadlUser.map(async (mapa, index) => {
          console.log(event.statusBroadlUser.length, "oiiiiii")
          if (mapa.idUser != undefined) {
            console.log("enteiiii")
            child = await Child.findById({ '_id': mapa.idUser })

            temporario.push({ name: child.name.firstName + " " + child.name.surName, number: event.numberCode, data: mapa.dateUser, to: discounts.to })

          }

        })
      })

    } else {
      discounts.codes.map((event, indice) => {
        console.log(discounts.codes.length)
        let child;
        event.statusBroadlUser.map(async (mapa, index) => {

          if (mapa.idUser != undefined) {
            console.log("enteiiii")
            child = await adult.findById({ '_id': mapa.idUser })

            temporario.push({ name: child.name.firstName + " " + child.name.surName, number: event.numberCode, data: mapa.dateUser, to: discounts.to })

          }

        })
      })
    }
  } else {
    if (discounts.to === "Child") {
      discounts.codes.map(async (event, indice) => {
        console.log(discounts.codes.length)
        let child;


        if (event.statusUniqueUser != undefined) {
          console.log("enteiiii")
          child = await Child.findById({ '_id': event.statusUniqueUser })

          temporario.push({ name: child.name.firstName + " " + child.name.surName, number: event.numberCode, data: event.statusUniqueDate, to: discounts.to })

        }


      })

    } else {
      discounts.codes.map(async (event, indice) => {
        console.log(discounts.codes.length)
        let child;


        if (event.statusUniqueUser != undefined) {

          child = await adult.findById({ '_id': event.statusUniqueUser })

          temporario.push({ name: child.name.firstName + " " + child.name.surName, number: event.numberCode, data: event.statusUniqueDate, to: discounts.to })

        }


      })
    }
  }
  setTimeout(() => {
    try {

      console.log(temporario)
      return res.json({ dados: temporario, desconto: discounts });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }, 200)


});

router.get('/filter/:code/:type', async (req, res) => {
  try {
    const discounts = await Discount.find({ 'codes.numberCode': req.params.code, 'to': req.params.type });

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
        console.log("entrei")
        discount = new Discount({
          name: req.body.name,
          createdAt: new Date(),
          description: req.body.description,
          to: req.body.to,
          amount: parseInt(req.body.amount, 10),
          type: req.body.type,
          value: parseFloat(req.body.value).toFixed(2),
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
        let temporario = []
        for (var as = 1; as <= parseInt(req.body.amount, 10); as++) {
          temporario.push({ numberCode: await numberCode(as), statusBroadlUser: [] })
        }
        console.log(temporario)
        discount = new Discount({
          name: req.body.name,
          createdAt: new Date(),
          description: req.body.description,
          to: req.body.to,
          amount: parseInt(req.body.amount, 10),
          type: req.body.type,
          value: parseFloat(req.body.value).toFixed(2),
          temporalityType: req.body.temporalityType,
          validity: new Date(req.body.validity),
          temporalityDate: req.body.temporalityDate,

          codes: temporario,
        });
      }

      const newDiscount = await discount.save();
      const log = new Logs({
        activity: 'Desconto',
        action: 'Criação',
        dateOperation: new Date(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar
        to: req.body.name,


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
      activity: 'Desconto',
      action: 'Excluir',
      dateOperation: new Date(),
      from: funcionario,
      to: deletedService.name
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
