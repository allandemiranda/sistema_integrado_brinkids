/**
 * Este arquivo será responsável por criar as rotas relacionadas as crianças
 */

const express = require('express');
const Child = require('../models/child-models');
const Product = require('../models/product-models');
const Logs = require('../models/logs-models')
const router = express.Router();

const config = require('../config');
const jwt = require('jsonwebtoken');
const adult = require('../models/adult-models');

function teste(json, res) {
  console.log(json);
  return res.status(200).json(json);
}

/**
 * Função para checar se a data da criança é válida
 * @param actualDate Data de quando essa operação for feita no sistema
 * @param ChildDate Idade da criança
 * @return 'true' caso a idade da criaça seja sempre menor que 14 ou 'false' caso contrário
 */
function checkAge(actualDate, ChildDate) {
  const compareDate = new Date(
    actualDate.getFullYear() - 14,
    actualDate.getMonth(),
    actualDate.getDate(), 0, 0, 0, 0,
  );

  /** < Date. Pegará a data atual e subtrairá 14 anos
   * para fazer a checagem com a idade da criança
  */

  return ChildDate > compareDate;
}
router.get('/', async (req, res) => {
  try {
    const parties = await Child.find({});

    return res.status(200).json(parties);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
// Resgata crianças de acordo com o parâmetro 'search' passado na URL
router.get('/filter/:search/:tipo', async (req, res) => {
  let criancaatual = await Product.find({});
  const search = req.params.search.split(' ');
  let query;

  // Se vc digitar apenas um nome grande, então a pesquisa vai ser apenas no
  // primeiro nome(Exemplo: Jeremias. Tem 8 letras ao menos)
  // Caso contrário, faz uma pesquisa no nome e no sobrenome
if(req.params.tipo =="Perfil"){
  try {
    if (search.length === 1) {
      let temporario = [];
      const firstName = search[0];
      query = await Child.find({ 'name.firstName': new RegExp(firstName) });
      criancaatual.map((event, indice) => {
        query.forEach((mape, index,array) => {
         
          if(event.children.id==mape._id){
            
            array.splice(index,1)
          }
          
        })
      })
      return res.json(query);
    } else {
      const firstName = search[0];
      const surName = search[1];
      query = await Child.find({ 'name.firstName': new RegExp(firstName), 'name.surName': new RegExp(surName) });
      criancaatual.map((event, indice) => {
        query.forEach((mape, index,array) => {
         
          if(event.children.id==mape._id){
            
            array.splice(index,1)
          }
          
        })
      })
      return res.json(query);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}else{
  try {
    if (search.length === 1) {
      let temporario = [];
      const firstName = search[0];
      query = await Child.find({ 'name.firstName': new RegExp(firstName) });
      criancaatual.map((event, indice) => {
        query.forEach((mape, index,array) => {
         
          if(event.children.id==mape._id){
            
            array.splice(index,1)
          }
          
        })
      })
      return res.json(query);
    } else {
      const firstName = search[0];
      const surName = search[1];
      query = await Child.find({ 'name.firstName': new RegExp(firstName), 'name.surName': new RegExp(surName) });
      criancaatual.map((event, indice) => {
        query.forEach((mape, index,array) => {
         
          if(event.children.id==mape._id){
            
            array.splice(index,1)
          }
          
        })
      })
      return res.json(query);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
 

  //query.exec((err, result) => (err ? res.sendStatus(500) : teste(result, res)));
});

router.get('/indentifier/:id_Child', async (req, res) => {
  try {
    if (!req.params.id_Child) return res.sendStatus(400);

    const child = await Child.findById(req.params.id_Child);
    console.log(child);
    return res.json(child);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

/**
 * Rota para inserção de crianças no banco de dados
 * @param rota Rota usada para requisição
 * @param callback Função a ser executada
 * @return código de status HTTP
 */
router.post('/', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;

  const actualDate = new Date()/**< Data atual do sistema */
  const ChildDate = new Date(req.body.birthday) /**< Data de nascimento da criança */

  /**
   * Checa se a criança possui menos de 14 anos ou não
   * Se possuir menos de 14 anos, ela é adicionada ao sistema
   */

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
    Child.findOne({ number: req.body.number }, (err, ChildResult) => {

      if (err) {
        console.log("foi akii3")
        return res.sendStatus(500);
      }

      /** Checa se não existe uma criança no sistema */
      if (ChildResult === null) {
        const photoFile = req.files.file; /**< fileUpload.UploadedFile. Representa o arquivo de foto da criança  */

        const dados = {
          number: req.body.number,
          nacionality: req.body.nacionality,
          name: {
            firstName: req.body.firstName,
            surName: req.body.surName,
          },
          birthday: ChildDate,
          sexuality: req.body.sexuality,
          restrictions: req.body.restrictions,
          observations: req.body.observations,
          photo: '/',
        }; /**< Objeto. Contém os dados da criança para inserção no banco */

        /** Salva a criança no banco */
        Child.create(dados, (errChild, ChildCreateResult) => {
          if (errChild) {
            console.log("foi akii7")
            return res.sendStatus(500);
          }

          const fileName = `${config.pathChild}${ChildCreateResult._id}.png`; /**< url completa da localização do arquivo no computador */

          ChildCreateResult.photo = fileName /** Atualiza o nome do arquivo */
          ChildCreateResult.save((errSaveChildResult) => { /** Atualiza no banco a nova informação */
            if (errSaveChildResult) {
              Child.findOneAndRemove({ number: req.body.number }, (err) => {
                console.log("foi akii5")
                return res.sendStatus(500);
              })
            } else {
              /** Pega o arquivo e salva no servidor */
              photoFile.mv(config.pathPublic() + fileName, (errMvFile) => {
                if (errMvFile) {
                  Child.findOneAndDelete({ number: req.body.number }, (err) => {
                    console.log("foi akiih")
                    return res.sendStatus(500);
                  });
                } else {
                  return res.sendStatus(201);
                }
              });
            }
          });
          const log = {
            activity: 'Perfil Criança',
            action: 'Criação',
            dateOperation: new Date(),
            from: funcionario, //ajsuta o id dps de fazer o login funcionar
            to: req.body.firstName + " " + req.body.surName,
            id: ChildCreateResult._id
          }
          Logs.create(log, (errLog, logchil) => {

          })

        });
      } else {
        return res.sendStatus(409);
      }
    });

    //LOG sssssssssssssssssssssssss

  } else {
    return res.sendStatus(400);
  }

});

router.put('/:identifier', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;

  try {

    const child = await Child.findByIdAndUpdate(
      req.params.identifier,
      {
        $set: {
          name: {
            firstName: req.body.firstName,
            surName: req.body.lastName,
          },
          number: req.body.number,
          birthday: new Date(req.body.birthday),
          nacionality: req.body.nacionality,
          sexuality: req.body.sexuality,
          observations: req.body.observations,
          restrictions: req.body.restrictions,
        }
      },
    );
    const log = new Logs({
      activity: 'Pefil Criança',
      action: 'Edição',
      dateOperation: new Date(),
      from: funcionario, //ajsuta o id dps de fazer o login funcionar
      to: req.body.firstName + " " + req.body.lastName,
      id: req.params.identifier,


    })
    const newLog = await log.save();
    if (req.files) {
      return req.files.photo.mv(
        config.pathPublic() + child.photo,
        // errMvFile  => (errMvFile ? res.sendStauts(500) : res.sendStatus(204)),
      );
    }

    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(400);
  }


});
router.delete('/:identifier', async (req, res) => {
  try {
    const a = req.cookies.TOKEN_KEY;
    const b = jwt.verify(a, config.secret_auth);
    const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
    const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;

    const deletedService = await Child.findByIdAndRemove(req.params.identifier);

    const log = new Logs({
      activity: 'Perfil Criança',
      action: 'Excluir',
      dateOperation: new Date(),
      from: funcionario,
      id: req.params.identifier,
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
