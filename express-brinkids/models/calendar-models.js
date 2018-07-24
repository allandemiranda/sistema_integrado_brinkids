/** Este documento será responsável por criar o Schema do calendário */

var mongoose = require('mongoose')
var config = require('../config')
var Schema = mongoose.Schema

var calendarSchema = new Schema({
  color: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  opening: {
    type: Date,
    require: true
  },
  closing: {
    type: Date,
    require: true
  },
  associated: String
})

mongoose.connect('mongodb://localhost/' + config.database)
var calendar = mongoose.model('Calendar', calendarSchema)

module.exports = calendar
