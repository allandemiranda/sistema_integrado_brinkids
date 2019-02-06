const express = require('express');
const moment = require('moment');
const Child = require('../models/child-models');
const Logs = require('../models/logs-models')
const router = express.Router();

router.get('/:date', async (req, res) => {
  console.log(req.body.date)
  try {
    const today = moment().startOf('day').toDate()
    const todayd = moment(req.params.date).endOf('day').toDate()

    const childs = await Logs.find({
      'dateOperation': { $gte: req.params.date, $lte:moment(todayd) }
       });
   
    return res.json(childs);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
