module.exports = {
  database: 'mongodb://localhost/sistema_brinkids',
  configName: 'node-auth',
  secret_session: 'brinkids',
  dir_base: __dirname,
  pathChild: 'img_users/child/',
  pathAdult: 'img_users/adult/',
  pathPublic: function () {
    return this.dir_base + '/public/'
  }
}
