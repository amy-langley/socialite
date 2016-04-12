exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments().primary()
    table.string('username')
    table.string('password')
    table.string('email')
    table.timestamps()
  }).then(function(){
    console.log('Created table \'users\'')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').then(function(){
    console.log('Dropped table \'users\'')
  })
};
