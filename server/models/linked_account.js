var services  = require('../services');

module.exports = services.bookshelf.model('LinkedAccount', {
  tableName: 'linked_accounts',
  user: function(){
    return this.belongsTo('User')
  }
})
