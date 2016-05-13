exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('linked_accounts').del(),

    // Inserts seed entries
    knex('linked_accounts').insert({user_id: 1, service: 'tumblr', username: 'umsweatie', token: '', secret: ''}),
    knex('linked_accounts').insert({user_id: 1, service: 'tumblr', username: 'just-discourse-things', token: '', secret: ''}),
    knex('linked_accounts').insert({user_id: 1, service: 'twitter', username: 'umsweatie', token: '', secret: ''}),
    knex('linked_accounts').insert({user_id: 2, service: 'twitter', username: 'slimegirlfriend', token: '', secret: ''}),
    knex('linked_accounts').insert({ user_id: 1
                                   , service: "facebook"
                                   , username: 'kitty.a.lovelace' })
  );
};
