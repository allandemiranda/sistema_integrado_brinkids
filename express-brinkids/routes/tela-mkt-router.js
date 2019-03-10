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
      $or: [{ 'activity': 'Passaporte', 'action': 'Saida Adulto' },{ 'activity': 'Aniversário', 'action': 'Saida Adulto' },{ 'activity': 'Baby Passaporte', 'action': 'Saida Adulto' }, { 'activity': 'Serviços', 'action': 'Saida' }, { 'activity': 'Aniversario', 'action': 'Edição' }, { 'activity': 'Aniversario', 'action': 'Criação' }],
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
  
  let temporario =[]
  try {

    
    const childs = await adult.find({'children.kinship': "children"}).populate("children.identifier");
    childs.map((event,indice) => {
      event.children.map( async(mape,index) => {
        if (mape.kinship === "children" && mape.identifier !== null) {
          let date=0;
          const logs = await Logs.find({  'activity': "Passaporte",'action':"Entrada",'cco':mape.identifier.name.firstName + " " + mape.identifier.name.surName,}).sort({dateOperation:-1});
        
          if(logs[0]!==undefined){
            date= moment(logs[0].dateOperation).format("DD/MM/YYYY");
          }
          temporario.push({
            name: mape.identifier.name.firstName + " " + mape.identifier.name.surName,
            idade: Math.floor(moment(new Date()).diff(moment(mape.identifier.birthday), 'years', true)),
            sexo: mape.identifier.sexuality,
            aniversario: moment(mape.identifier.birthday).utc().format("DD/MM/YYYY"),
            cidade: event.address.city,
            foto: mape.identifier.photo,
            visita:date,
            responsavel: event.name.firstName + " " + event.name.surName,
            email: event.email,
            idAdult: event._id,
            idCria: mape.identifier._id

          })
          let temporarioss = moment(mape.identifier.birthday).format("DD/MM/YYYY");
          
        }
        if(index===event.children.length-1&& indice ===childs.length -1){
          setTimeout(()=>{
            return res.json(temporario);
          },100)
        }
      })
    }) 
    
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
module.exports = router;
