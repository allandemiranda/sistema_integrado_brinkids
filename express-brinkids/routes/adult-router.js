/**
 * Este arquivo será responsável por criar as rotas relacionadas aos Adultos
 */

const express = require('express');
const Logs = require('../models/logs-models')
const userAdult = require('../models/adult-models');
const moment = require('moment');
const config = require('../config');
const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');
const router = express.Router();


function teste(err, res) {
  console.log(err);
  return res.sendStatus(500);
}

// Rota responsável por realizar a pesquisa dos adultos no sistema
router.get('/filter/:search/:type', (req, res) => {

  // 'search': Contém a pesquisa da página. Pode ser o CPF ou o nome
  // 'type': Indica se é desejado pesquisar por CPF ou por nome
  // Inicia a variável que vai receber a consulta
  // Para saber mais sobre consultas: http://mongoosejs.com/docs/queries.html
  let query;

  // Checa se a requisição é por CPF ou por nome
  // e cria a consulta específica para cada caso
  if (req.params.type === 'CPF') {
    // Como a pesquisa virá apenas com o CPF, posso passar 'search' direto na pesquisa
    query = userAdult.find({ cpf: req.params.search });
  } else {
    // Inicia as variáveis que vão conter os valores existentes na URL
    const listSearch = req.params.search.split(' ');
    let firstName;
    let surName;

    if (listSearch.length === 1) {
      [firstName] = listSearch;
      query = userAdult.find({ 'name.firstName': new RegExp(firstName), isEmployee: false });
    } else {
      // Forma de atribuir valores da lista a variáveis
      // É equivalente a:
      // firstName = listSearch[0]
      // surName = listSearch[1]
      [firstName, surName] = listSearch;
      query = userAdult.find({ 'name.firstName': new RegExp(firstName), 'name.surName': new RegExp(surName), isEmployee: false });
    }
  }

  // Executa a consulta e devolve o status HTTP da requisição
  query.exec((err, result) => (err ? res.sendStatus(500) : res.json(result)));
});

router.get('/', (req, res) => {
  userAdult.find({}, (err, result) => (err ? res.sendStatus(500) : res.status(200).json(result)));
});

router.get('/:identifier', async (req, res) => {
  try {
    const adultFound = await userAdult.findById(req.params.identifier);

    if (!adultFound) {
      return res.sendStatus(404);
    }

    return res.json(adultFound);
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
  if (!b.admin) {
    const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
     funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  } else {
     funcionario = "admin"
  }

  if (req.files
    && req.body.firstName
    && req.body.surName
    && req.body.birthday
    && req.body.phone
    && req.body.street
    && req.body.number
    && req.body.district
    && req.body.city
    && req.body.state
    && req.body.country
    && req.body.cep
    && req.body.nacionality
    && req.body.sexuality
    && req.body.cpf
    && req.body.email
    && req.body.maritalStatus) {
      
    userAdult.findOne({ cpf: req.body.cpf }, (err, adultFound) => {
      if (err) {
        return res.sendStatus(500);
      }

      if (adultFound === null) {
        const photoFile = req.files.file;

        const data = {
          name: {
            firstName: req.body.firstName,
            surName: req.body.surName,
          },
          birthday:req.body.birthday,
          phone: [req.body.phone],
          address: {
            street: req.body.street,
            number: parseInt(req.body.number, 10),
            district: req.body.district,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            cep: req.body.cep,
          },
          rg: req.body.rg,
          cpf: req.body.cpf,
          email: req.body.email,
          nacionality: req.body.nacionality,
          sexuality: req.body.sexuality,
          maritalStatus: req.body.maritalStatus,
          children: JSON.parse(req.body.criancas),
          observations: req.body.observations,
          photo: '/caminho',
          isEmployee: false,
        };

        userAdult.create(data, (errAdult, adultResult) => {
          if (errAdult) {
            console.log(errAdult);
            return res.sendStatus(500);
          }
          const photoNameComponents = photoFile.name.split('.');
          const fileName = `${config.pathAdult}${adultResult._id}.png`; /**< url completa da localização do arquivo no computador */
          id = adultResult._id
          adultResult.photo = fileName; /** Atualiza o nome do arquivo */
          adultResult.save((errAdultSave) => {
            /** Atualiza no banco a nova informação */

            if (errAdultSave) {
              return res.sendStatus(500);
            }
          });

          /** Pega o arquivo e salva no servidor */
          photoFile.mv(
            config.pathPublic() + fileName, // Nome do arquivo
            errFile => (errFile ? res.sendStatus(500) : res.sendStatus(201)),
          );
          const log = {
            activity: 'Perfil Adulto',
            action: 'Criação',
            dateOperation: new Date(),
            from: funcionario, //ajsuta o id dps de fazer o login funcionar
            to: adultResult.name.firstName+" "+adultResult.name.surName,
            id: adultResult._id,
          }
          Logs.create(log, (errLog, logchil) => {

          })
        });

      } else {
        return res.sendStatus(409);
      }
    });

  } else {
    return res.sendStatus(400);
  }
});

router.post('/appendChild', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  if (req.body.listChildren
    && req.body.identifierParent) {
    try {
      const adult = await userAdult.findByIdAndUpdate(
        req.body.identifierParent,
        { $push: { children: { $each: req.body.listChildren } } },
      );
      const log = new Logs({
        activity: 'Perfil Adulto',
        action: 'Edição',
        dateOperation: new Date(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar
        to: adult.name.firstName+" "+adult.name.surName,
        id: req.body.identifierParent,
      })
      const newLog = await log.save();
      if (!adult) {
        return res.sendStatus(404);
      }

      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
});

router.put('/:identifier', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;
  let lista=[]
  console.log(req.body.children.length,req.body.children)
  if(req.body.children.length===0){
    lista =[]
  }else{
    lista=req.body.children
  }
  try {
    const adultModified = await userAdult.findByIdAndUpdate(req.params.identifier, {
      $set: {
        phone: req.body.phone,
        email: req.body.email,
        address: {
          street: req.body.street,
          district: req.body.district,
          number: parseInt(req.body.number, 10),
          cep: req.body.cep,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
        },
        observations: req.body.observations,
        children:lista
      },

    });
    const log = new Logs({
      activity: 'Perfil Adulto',
      action: 'Edição',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to: adultModified.name.firstName+" "+adultModified.name.surName,
      id:req.params.identifier,
    })
    const newLog = await log.save();
    if (!adultModified) {
      return res.sendStatus(404);
    }

    if (req.files) {
      console.log("mudar foto",req.files)
      return req.files.photo.mv(
        config.pathPublic() + adultModified.photo, // Nome do arquivo
        errFile => (errFile ? res.sendStatus(500) : res.sendStatus(204)),
      );
    }
    return res.sendStatus(201);
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
    
    const deletedService = await userAdult.findByIdAndRemove(req.params.identifier);
   
    const log = new Logs({
      activity: 'Perfil Adulto',
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
