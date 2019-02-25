/** Arquivo reponsável por criar as rotas para funcionários */

const express = require('express');
const adult = require('../models/adult-models');
const Employees = require('../models/employees-models');

const Logs = require('../models/logs-models')
const router = express.Router();
const userSystem = require('../models/userSystem-models');
const config = require('../config');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
  try {
    const employees = await adult.find({ isEmployee: true }).populate('identifierEmployee');

    return res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get('/:identifier', async (req, res) => {
  try {
    const adultFound = await adult.find({ _id: req.params.identifier, isEmployee: true }).populate('identifierEmployee');

    if (!adultFound) {
      return res.sendStatus(404);
    }

    return res.json(adultFound);
  } catch (err) {
    console.log(err);
    return res.sendStauts(500);
  }
});

router.get('/search/:search', async (req, res) => {
  try {
    const listSearch = req.params.search.split(' ');
    let firstName;
    let surName;
    let adultSearch;

    if (listSearch.length === 1) {
      [firstName] = listSearch;
      adultSearch = await adult.find({ 'name.firstName': new RegExp(firstName), isEmployee: true }).populate('identifierEmployee');
    } else {
      [firstName, surName] = listSearch;
      adultSearch = await adult.find({ 'name.firstName': new RegExp(firstName), 'name.surName': new RegExp(surName), isEmployee: true }).populate('identifierEmployee');
    }

    return res.json(adultSearch);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
 var funcionario='oi';
  console.log(b)
  if (b.id) {
    const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
    funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  } 
  if(!b.id) {
    console.log("========ola")
     funcionario = "admin"
  }
  try {
    const adultResult = await adult.findByIdAndUpdate(
      req.body.identifier,
      {
        identifierEmployee: req.body.identifier,
        isEmployee: true,
      },
    );

    if (!adultResult) {
      return res.sendStatus(404);
    }

    const employee = new Employees({
     
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
        dateIssue: req.body.WPDateIssue,
        placeIssue: req.body.WPPlaceIssue,
      },
      rg: {
        issuingBody: req.body.RgIssuingBody,
        state: req.body.RgState,
        dateIssue: req.body.RgDateIssue,
      },
      electionTitle: {
        number: req.body.ETnumber,
        zone: req.body.ETzone,
        section: req.body.ETsection,
        state: req.body.ETstate,
      },
      militaryReservist: {
        number: req.body.MRNumber,
        state: req.body.MRState,
        category: req.body.MRCategory,
      },
      passport: {
        number: req.body.PPNumber,
        typeFormat: req.body.PPType,
        issuingCountry: req.body.PPIssuingCountry,
        dateIssue: req.body.PPDateIssue,
        expirationDate: req.body.PPExpirationDate,
      },
      cnh: {
        record: req.body.CNHRecord,
        category: req.body.CNHCategory,
        expirationDate:req.body.CNHExpirationDate,
        comments: req.body.CNHComments,
        placeIssue: req.body.CNHPlaceIssue,
        dateIssue: req.body.CNHDateIssue,
      },
      employeeData: {
        officialPosition: req.body.EDOfficialPosition,
        admissionDate:req.body.EDAdmissionDate,
        resignationDate: '12/12/1970',
        reasonResignation: req.body.EDReasonResignation,
        record: req.body.EDRecord,
        state: req.body.EDState,
      },
      observations: req.body.observations,
    });
    const usuario = adultResult.email.split("@");

    const Login = new userSystem({
      user: usuario[0] + req.body.EDRecord,
      password: 'senha123',
      id: req.body.identifier,
      employees: adultResult.isEmployee,
    })
    const newLogin = await Login.save();
    const newEmployee = await employee.save();

    adultResult.identifierEmployee = newEmployee;

    adultResult.save();

    const log = new Logs({
      activity: 'Funcionario',
      action: 'Criação',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to: adultResult.name.firstName+" "+adultResult.name.surName,


    })
    const newLog = await log.save();

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.put('/exchange-data/:identifier', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  if (req.body.phone
    && req.body.email
    && req.body.street
    && req.body.number
    && req.body.city
    && req.body.state
    && req.body.country
    && req.body.cep
    && req.body.observations) {
    const exchangeData = {
      phone: req.body.phone,
      email: req.body.email,
      address: {
        street: req.body.street,
        number: req.body.number,
        district: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        cep: parseInt(req.body.cep, 10),
      },
      observations: req.body.observations,
    };

    try {
      const adultChange = await adult.findByIdAndUpdate(req.params.identifier, exchangeData);
      const log = new Logs({
        activity: 'Funcionario',
        action: 'Edição',
        dateOperation: new Date(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar
        to: adultChange.name.firstName+" "+adultChange.name.surName,


      })
      const newLog = await log.save();
      if (req.files) {
        console.log("filesss")
        return req.files.photo.mv(
          config.pathPublic() + adultChange.photo,
          errMvFile => (errMvFile ? res.sendStauts(500) : res.sendStatus(204)),
        );
      }
      if (!adultChange) {
        return res.sendStauts(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(400);
  }
});

router.put('/reset-password', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  try {
    const userFind = await userSystem.findOne({id:req.body.identifier});
    console.log(userFind)
    const log = new Logs({
      activity: 'Funcionario',
      action: 'Edição',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to:adultFound[0].name.firstName+" "+adultFound[0].name.surName,


    })
    const newLog = await log.save();
    if (!userFind) {
      return res.sendStatus(404);
    }

    userFind.set({ password: 'senha123' });
    await userFind.save();

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.put('/rota', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  
  if (req.body.officialPosition) {
   
    try {
      const adultChange = await Employees.findById(req.body.identifier);
     
      adultChange.employeeData.officialPosition = req.body.officialPosition;

      adultChange.save();
     
      if (!adultChange) {
        return res.sendStauts(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(400);
  }
});

router.put('/password', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  try {
    const userFind = await userSystem.findById(req.body.identifier);
    const log = new Logs({
      activity: 'Funcionario',
      action: 'Edição',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to: adultFound[0].name.firstName+" "+adultFound[0].name.surName,


    })
    const newLog = await log.save();
    if (!userFind) {
      return res.sendStatus(404);
    }

    userFind.set({ password: req.body.password });
    await userFind.save();

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.delete('/:identifier', async (req, res) => {
  try {
    const a = req.cookies.TOKEN_KEY;
    const b = jwt.verify(a, config.secret_auth);
    const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
    const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
    
    const deletedService = await adult.findByIdAndRemove(req.params.identifier);
   
    const deletedService2 = await Employees.findByIdAndRemove(deletedService.identifierEmployee);
    const deletedService3 =await userSystem.deleteOne({id:req.params.identifier});
    console.log(deletedService,deletedService2,deletedService3)
    const log = new Logs({
      activity: 'Perfil Funcionário',
      action: 'Excluir',
      dateOperation: new Date(),
      from: funcionario,
      to:deletedService.name.firstName+" "+deletedService.name.surName,
      id:req.params.identifier,
    })
    
    const newLog = await log.save();
    if (!deletedService) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

module.exports = router;
