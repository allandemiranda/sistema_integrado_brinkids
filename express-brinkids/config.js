module.exports = {
  database_name: 'sistema_brinkids',
  secret_session: 'brinkids',
  dir_base: __dirname,
  pathChild: 'img_users/child/',
  pathAdult: 'img_users/adult/',
  pathPublic: function() {
    return this.dir_base + '/public/'
  },
}
