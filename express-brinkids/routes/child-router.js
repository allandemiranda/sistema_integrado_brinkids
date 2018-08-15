
/**
 * Este arquivo será responsável por criar as rotas relacionadas as crianças
 */

const express = require('express');
const child = require('../models/child-models');
const config = require('../config');

const router = express.Router();

/**
 * Função para checar se a data da criança é válida
 * @param actualDate Data de quando essa operação for feita no sistema
 * @param childDate Idade da criança
 * @return 'true' caso a idade da criaça seja sempre menor que 14 ou 'false' caso contrário
 */
function checkAge(actualDate, childDate) {
  const compareDate = new Date(
    actualDate.getFullYear() - 14,
    actualDate.getMonth(),
    actualDate.getDate(), 0, 0, 0, 0,
  );

    /** < Date. Pegará a data atual e subtrairá 14 anos
     * para fazer a checagem com a idade da criança
    */

  return childDate > compareDate;
}

// Resgata crianças de acordo com o parâmetro 'search' passado na URL
router.get('/filter/:search', (req, res) => {
  const search = req.params.search.split(' ');
  let query;

  // Se vc digitar apenas um nome grande, então a pesquisa vai ser apenas no
  // primeiro nome(Exemplo: Jeremias. Tem 8 letras ao menos)
  // Caso contrário, faz uma pesquisa no nome e no sobrenome
  if (search.length === 1) {
    const firstName = search[0];
    query = child.find({ 'name.firstName': new RegExp(firstName) });
  } else {
    const firstName = search[0];
    const surName = search[1];
    query = child.find({ 'name.firstName': new RegExp(firstName), 'name.surName': new RegExp(surName) });
  }

  query.exec((err, result) => (err ? res.sendStatus(500) : res.status(200).json(result)));
});

/**
 * Rota para inserção de crianças no banco de dados
 * @param rota Rota usada para requisição
 * @param callback Função a ser executada
 * @return código de status HTTP
 */
router.post('/', (req, res) => {
  const actualDate = new Date()/**< Data atual do sistema */
  const childDate = new Date(req.body.birthday) /**< Data de nascimento da criança */

  /**
   * Checa se a criança possui menos de 14 anos ou não
   * Se possuir menos de 14 anos, ela é adicionada ao sistema
   */
  if (checkAge(actualDate, childDate)) {
    /**
     * Checa se todos os dados obrigatórios da criança foram enviados na requisição
     */

    if (req.files
        && req.body.number
        && req.body.firstName
        && req.body.surName
        && req.body.birthday
        && req.body.sexuality) {
      /**
       * Checa se já existe uma criança no sistema.
       * Se não existe, então uma nova é cadastrada com as informações enviadas
       */
      child.findOne({ number: req.body.number }, (err, childResult) => {
        if (err) {
          return res.sendStatus(500);
        }

        /** Checa se não existe uma criança no sistema */
        if (childResult === null) {
          const photoFile = req.files.file; /**< fileUpload.UploadedFile. Representa o arquivo de foto da criança  */

          const dados = {
            number: req.body.number,
            nacionality: req.body.nacionality,
            name: {
              firstName: req.body.firstName,
              surName: req.body.surName,
            },
            birthday: childDate,
            sexuality: req.body.sexuality,
            restrictions: req.body.restrictions,
            observations: req.body.observations,
            photo: '/',
          }; /**< Objeto. Contém os dados da criança para inserção no banco */

          /** Salva a criança no banco */
          child.create(dados, (errChild, childCreateResult) => {
            if (errChild) {
              return res.sendStatus(500);
            }

            const fileName = `${config.pathChild}${childCreateResult._id}.png`; /**< url completa da localização do arquivo no computador */
            childCreateResult.photo = fileName /** Atualiza o nome do arquivo */
            childCreateResult.save((errSaveChildResult) => { /** Atualiza no banco a nova informação */
              if (errSaveChildResult) {
                child.findOneAndRemove({ number: req.body.number }, (err) => {
                  return res.sendStatus(500);
                })
              } else {
                /** Pega o arquivo e salva no servidor */
                photoFile.mv(config.pathPublic() + fileName, (errMvFile) => {
                  if (errMvFile) {
                    child.findOneAndRemove({ number: req.body.number }, (err) => {
                      return res.sendStatus(500);
                    });
                  } else {
                    return res.sendStatus(201);
                  }
                });
              }
            });
          });
        } else {
          return res.sendStatus(409);
        }
      });
    } else {
      return res.sendStatus(400);
    }
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;
