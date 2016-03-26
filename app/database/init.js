var Sequelize = require('sequelize');
var sha1 = require('sha1');
var interleave = require('interleave-values');
var salt = require('../config/salt.json').salt;
var schema = require('../shared/models/schema.js')

var User = schema.user;
var LinkedAccount = schema.linkedAccount;

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
      username: 'umsweatie'
    })
  }).then(function(){
    return User.findAll({where: {id: 1}, include: [{model: LinkedAccount}]})
  }).then(function(u){
    console.log(JSON.stringify(u[0].dataValues));
  })
});
