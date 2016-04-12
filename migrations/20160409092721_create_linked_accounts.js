
exports.up = function(knex, Promise) {
  return knex.schema.createTable('linked_accounts', function(table){
    table.increments().primary()
    table.integer('user_id').references('users.id')
    table.string('service')
    table.string('username')
    table.string('token')
    table.string('secret')
    table.timestamps()
  }).then(function(){
    console.log('Created table \'linked_accounts\'')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('linked_accounts').then(function(){
    console.log('Dropped table \'linked_accounts\'')
  })
};
