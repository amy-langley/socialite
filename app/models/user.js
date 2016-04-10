var services  = require('../services');

module.exports = services.bookshelf.Model('User', {
  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],
  linkedAccounts: function(){
    return this.hasMany('LinkedAccount')
  }
})
