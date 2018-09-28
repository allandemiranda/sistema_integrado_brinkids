/** Arquivo reponsável por criar as rotas para funcionários */

const express = require('express');
const adult = require('../models/adult-models');
const Employees = require('../models/employees-models');
const userSystem = require('../models/userSystem-models');

const router = express.Router();


router.get('/', (req, res) => {
  Employees.find({}, (err, result) => (err ? res.sendStatus(500) : res.status(200).json(result)));
});

router.get('/search/:search', async (req, res) => {
  try {
    const listSearch = req.params.search.split(' ');
    let firstName;
    let surName;
    let adultSearch;

    if (listSearch.length === 1) {
      [firstName] = listSearch;
      adultSearch = await adult.find({ 'name.firstName': new RegExp(firstName), isEmployee: false });
    } else {
      [firstName, surName] = listSearch;
      adultSearch = await adult.find({ 'name.firstName': new RegExp(firstName), 'name.surName': new RegExp(surName), isEmployee: false });
    }

    return res.json(adultSearch);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const employee = new Employees({
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
  });

  try {
    const adultResult = await adult.findByIdAndUpdate(req.body.identifier, { isEmployee: true });

    if (!adultResult) {
      return res.sendStatus(404);
    }

    const newEmployee = await employee.save();
    newEmployee.set({ _id: adultResult._id });

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.put('/reset-password', async (req, res) => {
  try {
    const userFind = await userSystem.findById(req.body.identifier);

    if (!userFind) {
      return res.sendStatus(404);
    }

    if (req.body.olderPassword === userFind.password) {
      userFind.set({ password: req.body.newPassword });
      await userFind.save();

      return res.sendStatus(204);
    }

    return res.sendStatus(400);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
