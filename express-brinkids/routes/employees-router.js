/** Arquivo reponsável por criar as rotas para funcionários */

var express = require('express')
var employees = require('../models/employees-models')
var router = express.Router()

router.get('/', function (req, res) {
  employees.find({}, function (err, result) {
    return err ? res.sendStatus(500) : res.status(200).json(result)
  })
})

router.post('/', function (req, res) {
  let data = {
    functions: ['Trabalho1', 'trabalho2'],
    gender: req.body.gender,
    education: req.body.education,
    kinship: {
      fatherName: req.body.fatherName,
      motherName: req.body.motherName
    },
    birthplace: {
      city: req.body.birthplaceCity,
      state: req.body.birthplaceState
    },
    workPortifolio: {
      number: req.body.WPNumber,
      series: req.body.WPSeries,
      state: req.body.WPState,
      PIS_PASEP: req.body.WPPIS_PASEP,
      dateIssue: new Date(req.body.WPDateIssue),
      placeIssue: new Date(req.body.WPPlaceIssue)
    },
    rg: {
      issuingBody: req.body.RgIssuingBody,
      state: req.body.RgState,
      dateIssue: req.body.RgDateIssue
    },
    electionTitle: {
      number: req.body.ETnumber,
      zone: req.body.ETzone,
      section: req.body.ETsection,
      state: req.body.ETstate
    },
    passport: {
      number: req.body.PPNumber,
      type: req.body.PPType,
      issuingCountry: req.body.PPIssuingCountry,
      dateIssue: new Date(req.body.PPDateIssue),
      expirationDate: new Date(req.body.PPExpirationDate)
    },
    cnh: {
      record: req.body.CNHRecord,
      category: req.body.CNHCategory,
      expirationDate: new Date(req.body.CNHExpirationDate),
      comments: req.body.comments,
      placeIssue: req.body.placeIssue,
      dateIssue: new Date(req.body.CNHDateIssue)
    },
    employeeData: {
      officialPosition: req.body.EDOfficialPosition,
      admissionDate: new Date(req.body.EDAdmissionDate),
      resignationDate: new Date(req.body.EDResignationDate),
      reasonResignation: req.body.EDReasonResignation,
      record: req.body.EDRecord,
      state: req.body.EDState
    },
    observations: req.body.observations
  }

  console.log('passou aqui antes de salvar')
  employees.create(data, function (err, employeesResult) {
    console.log('Passou aqui depois de salvar')
    console.log(err)
    return err ? res.sendStatus(500) : res.sendStatus(201)
  })
})

module.exports = router
