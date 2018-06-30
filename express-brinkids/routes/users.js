var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  
  //Editado por Allan para testes
    //Tentando fazer login com estes usuários
  res.json([
      {
          id: 1,
          username: "admin",
          password: "teste123"
      },
      {
          id: 2,
          username: "root",
          password: "toor"
      }
  ]);
});

module.exports = router;
