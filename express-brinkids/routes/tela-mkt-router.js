const express = require('express');
const moment = require('moment');
const Child = require('../models/child-models');

const router = express.Router();

router.get('/:day/:month/:year', async (req, res) => {
  try {
    const today = moment(`${req.params.year}-${req.params.month}-${req.params.day}`).startOf('day');

    const childs = await Child.find({
      birthday: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
      }
    });

    return res.json(childs[0]);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
