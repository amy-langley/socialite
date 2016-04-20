'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({ username: 'admin', password: '', email: 'admin@sociali.te' }),
    knex('users').insert({ username: 'user', password: '', email: 'user@sociali.te' })
  );
};
