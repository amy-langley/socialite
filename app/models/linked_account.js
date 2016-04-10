var services  = require('../services');

module.exports = services.bookshelf.model('LinkedAccount', {
  tableName: 'linked_accounts',
  hasTimestamps: ['created_at', 'updated_at'],
  user: function(){
    return this.belongsTo('User')
  }
})
