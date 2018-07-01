/*
 * Aqui será desenvolvido um CRUD para as crianças
 */

// Lembrete: Colocar o middleware que necessita do uso do token
// Para acessar essas rotas

var express = require('express')
var child = require('../models/userChild')
var config = require('../config')
var router = express.Router()

var _MS_PER_DAY = 1000 * 60 * 60 * 24

// a and b are javascript Date objects
function dateDiffInYears (a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor(((utc2 - utc1) / _MS_PER_DAY)/365)
}

// Resgata todas as crianças
router.get('/', function (req, res) {
	child.find({}, function (err, result) {
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

	let date = req.body.date.split('/')
	let newDate = date[1] + '/' + date[0] + '/' + date[2]
	let date1 = new Date()
	let date2 = new Date(newDate) //  Se passar no teste de data, será usado no construtos da criança

	// Checar se a criança já existe
	// Checar se ela tem menos de 14 anos
	if (dateDiffInYears(date2, date1) >= 14 || date2 > date1) { // Tbm acusa erro se colocar uma data maior que a atual
		return res.status(400).json({'msg': 'A criança possui 14 anos ou mais'})
	}

	// Checa se os dados foram enviados
	if (req.body.number &&
			req.body.firstName &&
			req.body.surname &&
			req.body.date &&
			req.body.sexuality) {

		child.findOne({number: req.body.number}, function (err, child_result) { // Checa se já existem crianças com essas credenciais
			if (err) {
				return res.status(500).json({'err': err})
			}

			if (child_result === null) {
				let photoFile = req.files.fileField

				let dados = {
					number: req.body.number,
					name: {
						first: req.body.firstName,
						surname: req.body.surname
					},
					birthday: date2,
					sexuality: req.body.sexuality,
					restrictions: req.body.restrictions,
					observations: req.body.observations,
					photo: '/blablabla/'
				}

				// Salva a criança no banco de dados
				child.create(dados, function (err, child_result) {
					if (err) {
						return res.status(500).json({'err': err})
					}

					let fileName = config.dir_base + '/media/child/' + child_result._id + photoFile.name
					child_result.photo = fileName
					child_result.save(function (err) {
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
				})
			} else {
				return res.status(400).json({'err': '', 'msg': 'A criança já foi adicionada ao sistema'})
			}
		})
	} else {
		return res.status(400).json({'err': 'Dados faltando'})
	}
})

// Rota preparada para fazer as alterações
// Ainda a definir como deve funcionar de maneira robusta
router.put('/', function(req, res) {
	if (req.body.identifier && req.body.restrictions) {
		child.findById(req.body.identifier, function (err, child_result) {
			if (err)
				return res.status(500).json({'err': err})

			child_result.set({restrictions: req.body.restrictions})
			return res.status(200).json({'err': '', 'crianca': child_result})
		})
	} else {
		return res.status(400).json({'err': 'Falta o identificador'})
	}
})

// Deleta crianças pelo seu identificador
router.delete('/', function(req, res) {
	if(req.body.identifier) {
		child.deleteOne({_id: req.body.identifier}, function (err) {
			if (err)
				return res.status(500).json({'err': err})

			return res.status(200).json({'err': '', 'msg': 'Criança removida com sucesso'})
		})
	}
})

module.exports = router