var mongoose = require('mongoose')
var config = require('../config')
var Schema = mongoose.Schema

var ChildSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  nacionality: String,
  name: {
    firstName: {
      type: String,
      require: true
    },
    surName: {
      type: String,
      require: true
    }
  },
  birthday: {
    type: Date,
    required: true
  },
  sexuality: {
    type: String,
    required: true
  },
  restrictions: String,
  observations: String,
  photo: {
    type: String,
    required: true
  }
})

mongoose.connect('mongodb://localhost/' + config.database)
var Child = mongoose.model('Child', ChildSchema)

module.exports = Child
