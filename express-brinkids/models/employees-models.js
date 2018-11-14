/** Este arquivo fica responsável por criar o Schema dos Funcionários */

const mongoose = require('mongoose');
const config = require('../config');

const employeesSchema = new mongoose.Schema({
  gender: String,
  education: String,
  kinship: {
    fatherName: String,
    motherName: String,
  },
  birthplace: {
    city: String,
    state: String,
  },
  workPortifolio: {
    number: String,
    series: String,
    state: String,
    type: String,
    issuingCountry: String,
    dateIssue: Date,
    expirationDate: Date,
  },
  cnh: {
    record: String,
    category: String,
    expirationDate: Date,
    comments: String,
    placeIssue: String,
    dateIssue: Date,
  },
  employeeData: {
    officialP: {
      PIS_PASEP: String,
      dateIssue: Date,
      placeIssue: String,
    },
    rg: {
      issuingBody: String,
      state: String,
      dateIssue: Date,
    },
    electionTitle: {
      number: String,
      zone: String,
      section: String,
      state: String,
    },
    militaryReservist: {
      number: String,
      series: String,
      category: String,
    },
  },
  observations: String,
});

mongoose.connect(`mongodb://localhost/${config.database}`);
const employees = mongoose.model('Employee', employeesSchema);

module.exports = employees;
