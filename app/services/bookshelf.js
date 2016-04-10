import knex from 'knex'
import knex_config from '/knexfile'

var bookshelf = module.exports = require('bookshelf')(knex(knex_config))
bookshelf.plugin('registry')
