/**
 * Este arquivo será responsável por criar as rotas relacionadas aos Adultos
 */

const express = require('express');
const userAdult = require('../models/adult-models');
const config = require('../config');

const router = express.Router();

function teste(json, res) {
  console.log(json);
  return res.status(200).json(json);
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
  query.exec((err, result) => (err ? res.sendStatus(500) : teste(result, res)));
});

router.get('/', (req, res) => {
  userAdult.find({}, (err, result) => (err ? res.sendStatus(500) : res.status(200).json(result)));
});

router.post('/', (req, res) => {
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
          birthday: new Date(req.body.birthday),
          phone: [req.body.phone],
          address: [{
            street: req.body.street,
            number: parseInt(req.body.number, 10),
            district: req.body.district,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            cep: req.body.cep,
          }],
          rg: req.body.rg,
          cpf: req.body.cpf,
          email: req.body.email,
          nacionality: req.body.nacionality,
          sexuality: req.body.sexuality,
          maritalStatus: req.body.maritalStatus,
          children: JSON.parse(req.body.criancas),
          observations: req.body.obervations,
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

          adultResult.photo = fileName; /** Atualiza o nome do arquivo */
          adultResult.save((errAdultSave) => { /** Atualiza no banco a nova informação */
            if (errAdultSave) {
              return res.sendStatus(500);
            }
          });

          /** Pega o arquivo e salva no servidor */
          photoFile.mv(
            config.pathPublic() + fileName, // Nome do arquivo
            errFile => (errFile ? res.sendStatus(500) : res.sendStatus(201)),
          );
        });
      } else {
        return res.sendStatus(409);
      }
    });
  } else {
    return res.sendStatus(400);
  }
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

router.put('/:identifier', async (req, res) => {
  if (req.files.file
      && req.body.phone
      && req.body.email
      && req.body.street
      && req.body.district
      && req.body.number
      && req.body.cep
      && req.body.city
      && req.body.state
      && req.body.country
      && req.body.observations) {
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
        },
      });
      const photo = req.files.file;

      if (!adultModified) {
        return res.sendStatus(404);
      }

      photo.mv(
        adultModified.photo, // Nome do arquivo
        errFile => (errFile ? res.sendStatus(500) : res.sendStatus(204)),
      );
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
});

module.exports = router;
