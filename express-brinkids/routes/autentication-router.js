const express = require('express');

const userSystem = require('../models/userSystem-models');
const config = require('../config');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Cria usuario
router.post('/', (req, res) => {
  console.log(req.body)
  if (req.body.user && req.body.password) {
    let dados;
    // if(req.body.user ==="admin"){
    //   console.log("entrei")
      
    //    dados = {
    //     user: req.body.user,
    //     password: req.body.password,
    //     employees: true,
    //     admin:true,
    //   };
    // }else{
      dados = {
        user: req.body.user,
        password: req.body.password,
        employees: true,
        admin:true,
      };
    
  

    userSystem.create(dados, (err, small) => {
      if (err) {
        return res.sendStatus(500);
      }

      return res.sendStatus(201);
    });
  } else {
    return res.sendStatus(400);
  }
});

// Rota responsável por realizar a autenticação
router.get('/', (req, res) => {
  // Primeiro checa se existe um usuário no sistema
  userSystem.findOne({ user: req.query.user }, (err, user) => {
    console.log(req.query.user)
    if (err) {
      return res.sendStatus(500);
    }

    if (user) { // Se ele existir, prosseguimos
      if (req.query.password === user.password) { // Agora checamos se a senha é válida
        // Caso a senha do usuário seja válida iremos criar um token
        // Para criar o token, deve ser passado 3 parâmetros:
        // 1) O usuário no formato de Json
        // 2) Uma chave para usar na criação do token
        // 3) Um objeto com parâmetros opcionais (Nesse caso, eu adiciono o tempo de expiração)
        const token = jwt.sign(user.toJSON(), config.secret_auth, {
          expiresIn: 10000*60 * 60 * 24, // o token irá expirar em 24 horas
        });

        // Se tudo der certo, enviamos o token
        res.json({ token });
      } else {
        return res.sendStatus(401);
      }
    } else {
      return res.sendStatus(404);
    }
  });
});

// GET /logout (Obs.: Necessário refatorar o logout)
// router.get('/logout', function (req, res, next) {
//   if (req.session) {
//     // delete session object
//     req.session.destroy(function (err) {
//       return err ? res.sendStatus(500) : res.sendStatus(200)
//     })
//   } else {
//     return res.sendStatus(400)
//   }
// })

router.get('/mostra_usuarios/:identifier', (req, res) => {
  userSystem.find({ 'id': req.params.identifier }, (err, result) => {
    return err ? res.sendStatus(500) : res.status(200).json(result);
  });
});

module.exports = router;
