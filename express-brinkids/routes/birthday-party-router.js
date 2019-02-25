const express = require('express');
const BirthdayParty = require('../models/birthday-party-models');
const Logs = require('../models/logs-models')
const router = express.Router();
const config = require('../config');
const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');

const moment = require('moment');
router.get('/', async (req, res) => {
  try {
    const parties = await BirthdayParty.find({}).sort({birthdayDate:-1});

    return res.status(200).json(parties);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.get('/a', async (req, res) => {
  const parties3 = await BirthdayParty.find({});
  const hj = moment().startOf('day').subtract(1,"hours").format()
  const final =  moment().endOf('day').format()
  console.log(hj,final,parties3[0].birthdayDate    )
  // let p = "08:30"
  // let h = p.split(":");
  // let i =moment().hour(h[0]).minute(h[1]);
  // console.log(i)
  // const hora1 = moment().endOf('day').format("HH:MM")
  // console.log(moment().format("YYYY-MM-DD HH:MM"),moment().endOf('day').format("YYYY-MM-DD HH:MM"))

  try {
    const parties = await BirthdayParty.find({ 'birthdayDate': { $gte: hj, $lte:final } });
    console.log(parties)
    return res.status(200).json(parties);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.post('/', async (req, res) => {

  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;


  let jasonPaarse = req.body.guestList


  console.log("===================================")
  console.log(req.body.guestList[0])
  console.log("===================================")




  // for (var i = 0; i < oldArray.length - 1; i+=8) {
  //   array.push(String(oldArray[i+1] + oldArray[i+2] + oldArray[i+3] + oldArray[i+4] + oldArray[i+5] + oldArray[i+6] + oldArray[i+7])); //essa foi a melhor forma que consegui salvar os dados sem um monte de "//" no meio da string
  // }

  let inicio = req.body.start;
  let inicio2 = inicio.split(":");
  let inicioFinal = moment().hour(inicio2[0]).minute(inicio2[1]);
  let final = req.body.end;
  let final2 = final.split(":");
  let final3 = moment().hour(final2[0]).minute(final2[1]);
  console.log(final3, inicioFinal)
  const birthday = new BirthdayParty({
    title: req.body.title,
    birthdayPerson: {
      name: req.body.name,
      age: parseInt(req.body.age, 10)
    },
    birthdayDate: req.body.birthdayDate,
    start: inicioFinal,//falta ter a data só tem a hora
    end: final3,//aqui tbm
    description: req.body.description,
    observations: req.body.observations,
    payment: {
      value: parseFloat(req.body.value),
      method: req.body.method
    },
    amount: {
      children: parseInt(req.body.children, 10),
      adults: parseInt(req.body.adults, 10)
    },
    guestList: req.body.guestList,
    partyFeather: [],
    /*partyFeather: { 
      type: req.body.type, 
      id: req.body.id, 
      name: req.body.name 
    },*/
  });

  try {

    const newBirthday = await birthday.save();

    const log = new Logs({
      activity: 'Aniversario',
      action: 'Criação',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to: newBirthday.title,
      price: newBirthday.payment.value,
      priceMethod: newBirthday.payment.method,
      id:newBirthday._id,


    })
    const newLog = await log.save();


    return res.status(201).json(newBirthday);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.delete('/:identifier', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  try {
    const deletedService = await BirthdayParty.findByIdAndDelete(req.params.identifier);
    console.log(deletedService)
    const changuePrice = await Logs.update({ 'id': req.params.identifier }, { $set: { "price": 0 } })


    const log = new Logs({
      activity: 'Aniversario',
      action: 'Excluir',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to:deletedService.title,
      id:req.params.identifier

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

router.put('/:identifier', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  let inicio = req.body.start;
  let inicio2 = inicio.split(":");
  console.log(inicio2)
  let inicioFinal = moment().hour(inicio2[0]).minute(inicio2[1]);
  let final = req.body.end;
  let final2 = final.split(":");
  console.log(final2)
  let final3 = moment().hour(final2[0]).minute(final2[1]);
  try {
    const service = await BirthdayParty.findByIdAndUpdate(
      req.params.identifier,
      {
        $set: {
          birthdayDate: req.body.birthdayDate,
          title: req.body.title,
          birthdayPerson: {
            name: req.body.name,
            age: parseInt(req.body.age, 10)
          },
          start: inicioFinal,
          end: final3,
          description: req.body.description,
          observations: req.body.observations,
          payment: {
            value: parseFloat(req.body.value),
            method: req.body.method
          },
          amount: {
            children: parseInt(req.body.children, 10),
            adults: parseInt(req.body.adults, 10)
          },

          guestList: req.body.guestList,

          // guestList: array,}
        },
      }
    );
    const changuePrice = await Logs.update({ 'id': req.params.identifier }, { $set: { "price": parseFloat(req.body.value) } })
    console.log(changuePrice)
    const log = new Logs({
      activity: 'Aniversario',
      action: 'Edição',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to: req.body.title,
      price: parseFloat(req.body.value),
      priceMethod: req.body.method,
      id:req.params.identifier
    })
    const newLog = await log.save();
    if (!service) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

router.put('/partyFeather/:identifier', async (req, res) => {

  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;

  if (req.body.adult) {
    try {
      const birthday = await BirthdayParty.findById(req.params.identifier);

      birthday.partyFeather.push(req.body.adult);


      birthday.save()

      if (!birthday) {

        return res.sendStauts(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  if (req.body.child) {
    console.log("================================")



    try {


      const birthday = await BirthdayParty.findById(req.params.identifier);

      birthday.guestList.map((list, indice, array) => {

        if (list._id.toString() === req.body.id) {
          console.log("================================")
          birthday.guestList[indice] = req.body.child;
          console.log("deu certo")

        }
      })

      birthday.partyFeather.push(req.body.child);


      birthday.save()

      if (!birthday) {
        console.log("=================")
        console.log("olaaaaaa")
        console.log("=================")
        return res.sendStauts(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  if (req.body.childExtra) {

    try {

      const birthday = await BirthdayParty.findById(req.params.identifier);
      birthday.guestList.push(req.body.childExtra);


      birthday.save()

      if (!birthday) {

        return res.sendStauts(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
  const log = new Logs({
    activity: 'Aniversario',
    action: 'Edição',
    dateOperation: new Date(),
    from: funcionario, //ajsuta o id dps de fazer o login funcionar
    to: birthday.title,
    id:birthday._id

  })
});

module.exports = router;
