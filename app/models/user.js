var services  = require('../services');

module.exports = services.bookshelf.model('User', {
  tableName: 'users',
  linkedAccounts: function(){
    return this.hasMany('LinkedAccount')
  }
})
