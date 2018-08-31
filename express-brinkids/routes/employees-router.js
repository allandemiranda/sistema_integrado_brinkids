/** Arquivo reponsável por criar as rotas para funcionários */

const express = require('express');
const employees = require('../models/employees-models');
const adult = require('../models/adult-models');

const router = express.Router();

function teste(err, res) {
  console.log(err);
  return res.status(500);
}

router.get('/', (req, res) => {
  employees.find({}, (err, result) => (err ? res.sendStatus(500) : res.status(200).json(result)));
});

router.post('/', (req, res) => {

  const data = {
    functions: ['Trabalho1', 'trabalho2'],
    gender: req.body.gender,
    education: req.body.education,
    kinship: {
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
    },
    birthplace: {
      city: req.body.birthplaceCity,
      state: req.body.birthplaceState,
    },
    workPortifolio: {
      number: req.body.WPNumber,
      series: req.body.WPSeries,
      state: req.body.WPState,
      PIS_PASEP: req.body.WPPIS_PASEP,
      dateIssue: new Date(req.body.WPDateIssue),
      placeIssue: new Date(req.body.WPPlaceIssue),
    },
    rg: {
      issuingBody: req.body.RgIssuingBody,
      state: req.body.RgState,
      dateIssue: new Date(req.body.RgDateIssue),
    },
    militaryReservist: {
      number: req.body.MRNumber,
      state: req.body.MRState,
      category: req.body.MRCategory,
    },
    electionTitle: {
      number: req.body.ETnumber,
      zone: req.body.ETzone,
      section: req.body.ETsection,
      state: req.body.ETstate,
    },
    passport: {
      number: req.body.PPNumber,
      typeFormat: req.body.PPType,
      issuingCountry: req.body.PPIssuingCountry,
      dateIssue: new Date(req.body.PPDateIssue),
      expirationDate: new Date(req.body.PPExpirationDate),
    },
    cnh: {
      record: req.body.CNHRecord,
      category: req.body.CNHCategory,
      expirationDate: new Date(req.body.CNHExpirationDate),
      comments: req.body.CNHComments,
      placeIssue: req.body.CNHPlaceIssue,
      dateIssue: new Date(req.body.CNHDateIssue),
    },
    employeeData: {
      officialPosition: req.body.EDOfficialPosition,
      admissionDate: new Date(req.body.EDAdmissionDate),
      resignationDate: '12/12/1970',
      reasonResignation: req.body.EDReasonResignation,
      record: req.body.EDRecord,
      state: req.body.EDState,
    },
    observations: req.body.observations,
  };

  adult.findById(req.body.identifier, (errAdult, adultResult) => {
    if (errAdult) {
      return res.sendStatus(500);
    }

    adultResult.set({ isEmployee: true });
    adultResult.save((err) => {
      if (err) {
        return res.sendStatus(500);
      }
      return employees.create(
        data,
        errEmployee => (
          errEmployee ? teste(errEmployee, res) : res.sendStatus(201)
        ),
      );
    });
  });
});

module.exports = router;
