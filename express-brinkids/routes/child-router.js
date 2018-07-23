/**
 * Este arquivo será responsável por criar as rotas relacionadas as crianças
 */

var fs = require('fs')
var express = require('express')
var child = require('../models/child-models')
var config = require('../config')
var router = express.Router()

/**
 * Função para checar se a data da criança é válida
 * @param actualDate Data de quando essa operação for feita no sistema
 * @param childDate Idade da criança
 * @return 'true' caso a idade da criaça seja sempre menor que 14 ou 'false' caso contrário
 */
function checkAge (actualDate, childDate) {
  let compareDate = new Date(
    actualDate.getFullYear() - 14,
    actualDate.getMonth(),
    actualDate.getDate(), 0, 0, 0, 0) /**< Date. Pegará a data atual e subtrairá 14 anos para fazer a checagem com a idade da criança */

  return childDate > compareDate
}

// Resgata todas as crianças
router.get('/', function (req, res) {
  child.find({}, function (err, result) {
    if (err) {
      return res.sendStatus(500)
    } else {
      return res.status(200).json(result)
    }
  })
})

/**
 * Rota para inserção de crianças no banco de dados
 * @param rota Rota usada para requisição
 * @param callback Função a ser executada
 * @return código de status HTTP
 */
router.post('/', function (req, res) {
  if (!req.files) { // Checa se existe arquivos sendo enviados
    console.log('Não tem arquivos')
   return res.sendStatus(400)
  }

  let actualDate = new Date()/**< Data atual do sistema */
  let childDate = new Date(req.body.birthday) /**< Data de nascimento da criança */

  /**
   * Checa se a criança possui menos de 14 anos ou não
   * Se possuir menos de 14 anos, ela é adicionada ao sistema
   */
  if (checkAge(actualDate, childDate)) {
    /**
     * Checa se todos os dados obrigatórios da criança foram enviados na requisição
     */

    if (req.body.number &&
        req.body.firstName &&
        req.body.surName &&
        req.body.birthday &&
        req.body.sexuality) {
      /**
       * Checa se já existe uma criança no sistema.
       * Se não existe, então uma nova é cadastrada com as informações enviadas
       */
      child.findOne({number: req.body.number}, function (err, childResult) {
        if (err) {
          return res.sendStatus(500)
        }

        /** Checa se não existe uma criança no sistema */
        if (childResult === null) {
          let photoFile = req.files.file /**< fileUpload.UploadedFile. Representa o arquivo de foto da criança  */

          let dados = {
            number: req.body.number,
            nacionality: req.body.nacionality,
            name: {
              first: req.body.firstName,
              surname: req.body.surName
            },
            birthday: childDate,
            sexuality: req.body.sexuality,
            restrictions: req.body.restrictions,
            observations: req.body.observations,
            photo: '/'
          } /**< Objeto. Contém os dados da criança para inserção no banco */

          /** Salva a criança no banco */
          child.create(dados, function (err, childResult) {
            if (err) {
              return res.sendStatus(500)
            }

            let fileName = config.pathChild + childResult._id + '.png' /**< url completa da localização do arquivo no computador */
            childResult.photo = fileName /** Atualiza o nome do arquivo */
            childResult.save(function (err) { /** Atualiza no banco a nova informação */
              if (err) {
                child.findOneAndRemove({number: req.body.number}, function (err) {
                  return res.sendStatus(500)
                })
              } else {
                /** Pega o arquivo e salva no servidor */
                photoFile.mv(config.pathPublic() + fileName, function (err) {
                  if (err) {
                    child.findOneAndRemove({number: req.body.number}, function (err) {
                      return res.sendStatus(500)
                    })
                  } else {
                    return res.sendStatus(201)
                  }
                })
              }
            })
          })
        } else {
          return res.sendStatus(409)
        }
      })
    } else {
      console.log('Alguma informação obrigatória está faltando')
      return res.sendStatus(400)
    }
  } else {
    return res.sendStatus(400)
  }
})

// Rota preparada para fazer as alterações
// Ainda a definir como deve funcionar de maneira robusta
router.put('/', function (req, res) {
  if (req.body.identifier && req.body.restrictions) {
    child.findById(req.body.identifier, function (err, childResult) {
      if (err) {
        return res.sendStatus(500)
      }

      childResult.set({restrictions: req.body.restrictions})
      return res.sendStatus(200)
    })
  } else {
    return res.sendStatus(400)
  }
})

// Deleta crianças pelo seu identificador
router.delete('/', function (req, res) {
  if (req.body.identifier) {
    child.deleteOne({_id: req.body.identifier}, function (err) {
      if (err) {
        return res.sendStatus(500)
      }

      fs.unlink(config.pathPublic() + config.pathChild + req.body.identifier + '.png', function (err) {
        return err ? res.sendStatus(500) : res.sendStatus(200)
      })
    })
  }
})

module.exports = router
