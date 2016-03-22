var Sequelize = require('sequelize');
var sha1 = require('sha1');
var interleave = require('interleave-values');
var salt = require('../config/salt.json').salt;

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

User.sync({force: true}).then(function () {
  // Table created
  User.create({
    username: 'admin',
    password: sha1(interleave('password',salt)),
    firstName: 'Admin',
    lastName: 'User'
  });
  User.create({
    username: 'nobody',
    password: ''
  })
}).then(function(){
  LinkedAccount.sync({force: true}).then(function(){
    LinkedAccount.create({
      userId: 1,
      service: 'tumblr',
      username: 'umsweatie'
    })
    LinkedAccount.create({
      userId: 1,
      service: 'tumblr',
      username: 'just-discourse-things'
    })
    LinkedAccount.create({
      userId: 2,
      service: 'twitter',
      username: 'twitter'
    })
  }).then(function(){
    return User.findAll({where: {id: 1}, include: [{model: LinkedAccount}]})
  }).then(function(u){
    console.log(JSON.stringify(u[0].dataValues));
  })
});
