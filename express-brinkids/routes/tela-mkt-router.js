const express = require('express');
const moment = require('moment');
const Child = require('../models/child-models');
const Logs = require('../models/logs-models')
const router = express.Router();
const adult = require('../models/adult-models');

router.get('/:date', async (req, res) => {
  console.log(req.body.date)
  try {
    const today = moment().startOf('day').toDate()
    const todayd = moment(req.params.date).endOf('day').toDate()

    const childs = await Logs.find({
      'dateOperation': { $gte: req.params.date, $lte: moment(todayd) },
      $or: [{ 'activity': 'Passaporte', 'action': 'Saida Adulto' }, { 'activity': 'Serviços', 'action': 'Saida' }, { 'activity': 'Aniversario', 'action': 'Edição' }, { 'activity': 'Aniversario', 'action': 'Criação' }],
    });

    return res.json(childs);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/mkt/:date', async (req, res) => {
  console.log(req.params.date)
  try {
    const today = moment().startOf('day').toDate()
    const todayd = moment(req.params.date).endOf('day').toDate()

    const childs = await Logs.find({
      'dateOperation': { $gte: req.params.date, $lte: moment(todayd) },
      $or: [{ 'activity': 'Passaporte', 'action': 'Entrada' }, { 'activity': 'Aniversario', 'action': 'Entrada' }],

    });
console.log(childs)
    return res.json(childs);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  console.log("oiiii")
  try {


    const childs = await Child.find({});

    return res.json(childs);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post('/mkt/busca', async (req, res) => {
  console.log(req.params.date)
  try {


    const childs = await adult.find({'children.kinship': "children"}).populate("children.identifier");
    
    return res.json(childs);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
module.exports = router;
