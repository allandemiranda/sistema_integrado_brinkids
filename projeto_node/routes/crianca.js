/*
 * Aqui será desenvolvido um CRUD para as crianças
 */

// Lembrete: Colocar o middleware que necessita do uso do token
// Para acessar essas rotas

var express = require('express')
var crianca = require('../models/usuarioCrianca')
var config = require('../config')
var router = express.Router()

// Resgata todas as crianças
router.get('/', function (req, res) {
	crianca.find({}, function (err, result) {
		if (err)
			return res.status(500).json({'err': err})

		res.status(200).json({'criancas': result})
	})
})

// Cria uma nova criança
router.post('/', function (req, res) {
	if (!req.files) { // Checa se existe arquivos sendo enviados
		return res.status(400).json({'msg': 'Não há arquivos'})
	}

	// Checa se os dados foram enviados
	if (req.body.number &&
			req.body.firstName &&
			req.body.surname &&
			req.body.date &&
			req.body.sexuality &&
			req.body.register) {

		let photoFile = req.files.fileField
		let fileName = config.dir_base + '/media/' + req.body.register + photoFile.name // Modifica o nome do arquivo na tentativa de deixar ele único. Há uma possibilidade de usar uma função de hash para alterar o nome e deixar ele único
		let date = req.body.date.split('/')
		let newDate = date[1] + '/' + date[0] + '/' + date[2] // Necessário converter para um formato que o mongo aceite inserir

		let dados = {
			number: parseFloat(req.body.number),
			name: {
				first: req.body.firstName,
				surname: req.body.surname
			},
			birthday: new Date(newDate),
			sexuality: req.body.sexuality,
			restrictions: req.body.restrictions,
			observations: req.body.observations,
			photo: fileName,
			register: req.body.register
		}

		// Salva a criança no banco de dados
		crianca.create(dados, function (err, small) {
			if (err) {
				return res.status(500).json({'err': err})
			}
		})

		// Pega o arquivo e salva no banco
		photoFile.mv(fileName, function (err) {
			if (err) {
				return res.status(500).json({'err': err})
			}
		})

		return res.status(201).json({'err': '', 'msg': 'Criança cadastrada com sucesso'})
	} else {
		return res.status(400).json({'err': 'Dados faltando'})
	}
})

// Rota preparada para fazer as alterações
// Ainda a definir como deve funcionar de maneira robusta
router.put('/', function(req, res) {
	if (req.body.identifier && req.body.restrictions) {
		crianca.findById(req.body.identifier, function (err, crianca_result) {
			if (err)
				return res.status(500).json({'err': err})

			crianca_result.set({restrictions: req.body.restrictions})
			return res.status(200).json({'err': '', 'crianca': crianca_result})
		})
	} else {
		return res.status(400).json({'err': 'Falta o identificador'})
	}
})

// Deleta crianças pelo seu identificador
router.delete('/', function(req, res) {
	if(req.body.identifier) {
		crianca.deleteOne({_id: req.body.identifier}, function (err) {
			if (err)
				return res.status(500).json({'err': err})

			return res.status(200).json({'err': '', 'msg': 'Criança removida com sucesso'})
		})
	}
})

module.exports = router
