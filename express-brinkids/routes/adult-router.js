/**
 * Este arquivo será responsável por criar as rotas relacionadas aos Adultos
 */

const express = require('express');
const userAdult = require('../models/adult-models');
const config = require('../config');

const router = express.Router();

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
      query = userAdult.find({ 'name.firstName': new RegExp(firstName) });
    } else {
      // Forma de atribuir valores da lista a variáveis
      // É equivalente a:
      // firstName = listSearch[0]
      // surName = listSearch[1]
      [firstName, surName] = listSearch;
      query = userAdult.find({ 'name.firstName': new RegExp(firstName), 'name.surName': new RegExp(surName) });
    }
  }

  // Executa a consulta e devolve o status HTTP da requisição
  query.exec((err, result) => (err ? res.sendStatus(500) : res.status(200).json(result)));
});

router.get('/', (req, res) => {
  userAdult.find({}, (err, result) => res.status(200).json(result));
});

router.post('/', (req, res) => {
  console.log(req.body);
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
      && req.body.cpf
      && req.body.email
      && req.body.maritalStatus) {
    userAdult.findOne({ cpf: req.body.cpf }, (err, adultFound) => {
      if (err) {
        return res.sendStatus(500);
      }

      if (adultFound === null) {
        const photoFile = req.files.file;
        const date = req.body.birthday.split('/');
        const adultDate = new Date(date[2], date[1], date[0]);

        const data = {
          name: {
            firstName: req.body.firstName,
            surName: req.body.surName,
          },
          birthday: adultDate,
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
          maritalStatus: req.body.maritalStatus,
          children: [{ identifier: '3', kinship: 'parentesco' }],
          observations: 'Observações',
          photo: '/caminho',
        };

        userAdult.create(data, (errAdult, adultResult) => {
          if (errAdult) {
            return res.sendStatus(500);
          }
          const photoNameComponents = photoFile.name.split('.');
          const fileName = `${config.pathAdult}${adultResult._id}.${photoNameComponents[photoNameComponents.length - 1]}`; /**< url completa da localização do arquivo no computador */

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

module.exports = router;
