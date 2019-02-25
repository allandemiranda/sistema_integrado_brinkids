/** Este arquivo fica responsável por criar o Schema dos Funcionários */

const mongoose = require('mongoose');
const config = require('../config');

const employeesSchema = new mongoose.Schema({
 
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
    PIS_PASEP: String,
    dateIssue: String,
    placeIssue: String,
  },
  rg: {
    issuingBody: String,
    state: String,
    dateIssue: String,
  },
  electionTitle: {
    number: String,
    zone: String,
    section: String,
    state: String,
  },
  militaryReservist: {
    number: String,
    state: String,
    category: String,
  },
  passport: {
    number: String,
    typeFormat: String,
    issuingCountry: String,
    dateIssue: String,
    expirationDate: String,
  },
  cnh: {
    record: String,
    category: String,
    expirationDate: String,
    comments: String,
    placeIssue: String,
    dateIssue:String,
  },
  employeeData: {
    officialPosition: mongoose.Schema.Types.ObjectId,
    admissionDate: String,
    resignationDate: String,
    reasonResignation: String,
    record: String,
    state: String,
  },
  observations: String,
});

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const employees = mongoose.model('Employee', employeesSchema);

module.exports = employees;
