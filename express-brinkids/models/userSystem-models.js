/** Schema para usuarios do sistema */

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')
const config = require('../config');

const UserSchema = new mongoose.Schema({ /**< Criação do Schema que conterá 4 campos */
  user: String, /**< Um campo de usuário do tipo texto e servirá autenticação e consulta no banco */
  password: String, /**< Um campo de senha. Obs.: Ela é deve ser criptografada antes de ser salva */
  employees: Boolean, /**< Checa se é um funcionário ou não */
});

/**
 * Antes de salconst um novo usuário no banco a senha deve ser criptografada.
 * Para isso, utilizamos a biblioteca bcrypt
 */
/*
UserSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
}) */

mongoose.connect(`mongodb://localhost/${config.database}`);
const userSystem = mongoose.model('User', UserSchema);

/**
 * Função responsável pela autenticação de usuários
 * Obs.: Caso não encontre usuários no banco de dados, 'user' possuirá valor 'null'
 * @param userName Nome do usuário
 * @param password Senha do Usuário
 * @param callback função que manipulará a resposta
 * @return callback com dois parâmetros: erro e o usuário do sistema
 */
UserSchema.statics.authenticate = (userName, password, callback) => {
  userSystem.findOne({ user: userName }, (err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user) {
      const error = new Error();
      error.status = 404;
      return callback(error);
    }
    if (password === user.password) {
      return callback(null, user);
    }
    const error = new Error();
    error.status = 401;
    return callback(error);
    /* bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        callback(err)
      }
      if (result === true) {
        return callback(null, user)
      } else {
        return callback()
      }
    }) */
  });
};

module.exports = userSystem;
