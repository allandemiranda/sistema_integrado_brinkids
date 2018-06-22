var express = require('express')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var usuarioSistema = require('../models/usuarioSistema')
var router = express.Router()

// Middleware para autenticar token
var autenticaToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
      jwt.verify(token, 'secret', function(err, decoded) {      
          if (err) {
              return res.json({ success: false, message: 'Falha ao tentar autenticar o token!' });    
          } else {
          //se tudo correr bem, salver a requisição para o uso em outras rotas
          req.decoded = decoded;    
          next();
          }
      });

      } else {
      // se não tiver o token, retornar o erro 403	
      return res.status(403).send({ 
          success: false, 
          message: 'Não há token.' 
      });       
  }
}

router.get('/', autenticaToken, function(req, res) {
	res.json({'ok': 'ok'})
})

// Cria usuario
router.post('/', function (req, res) {
	if (req.body.user && req.body.password) {
		let dados = {
			user: req.body.user,
			password: req.body.password,
			status: '',
			observations: []
		}
		usuarioSistema.create(dados, function (err, small) {
			if (err) {
				res.json({'err': 'Erro ao criar o usuário', 'msg': ''})
			} else {
				res.json({'err': '', 'msg': 'O usuario foi criado com sucesso'})
			}
		})
	} else {
		res.json({'err': 'Faltam dados para criar o usuario', 'msg': ''})
	}
})

// Devolve um Token para o usuário
router.post('/autentica', function (req, res) {
	// Aqui estaremos buscando o usuário
  usuarioSistema.findOne({
    user: req.body.user
  }, function(err, usuario) {
    if (err) throw err

    if (!usuario) {
      res.json({ success: false, message: 'Autenticação do Usuário falhou. Usuário não encontrado!' });
    } else if (usuario) {
    	bcrypt.compare(req.body.password, usuario.password, function (err, result) {
        if (result === true) {
        	console.log(result)
	        var token = jwt.sign(usuario.toJSON(), 'secret', {
	          expiresIn: '24h' // o token irá expirar em 24 horas
	        });
	        res.json({
	          success: true,
	          message: 'Token Criado!',
	          token: token
	        })
        } else {
          res.json({ success: false, message: 'Autenticação do Usuário falhou. Senha incorreta!' })
        }
      })
    }
  })
})

module.exports = router
