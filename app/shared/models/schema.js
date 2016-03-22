var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite://socialite.db')

var User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

var LinkedAccount = sequelize.define('linked_account', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  service: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  },
  secret: {
    type: Sequelize.STRING
  }
});

User.hasMany(LinkedAccount);
LinkedAccount.belongsTo(User);

module.exports = {
  user: User,
  linkedAccount: LinkedAccount
}
