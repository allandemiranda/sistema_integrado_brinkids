module.exports = {
  database: 'sistema_brinkids',
  secret_auth: 'node-auth-brinkids',
  dir_base: __dirname,
  pathChild: 'img_users/child/',
  pathAdult: 'img_users/adult/',
  pathProduct: 'product/',
  pathPublic() {
    return `${this.dir_base}/public/`;
  },
};
