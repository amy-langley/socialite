import knex from 'knex'
var knex_config  = require('../../knexfile')[process.env.NODE_ENV || 'development']

var bookshelf = require('bookshelf')(knex(knex_config))
bookshelf.plugin('registry')

module.exports = bookshelf
