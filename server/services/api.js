const path = require('path');

const express = require('express');
const routeBuilder = require('express-routebuilder');

const Endpoints = require('endpoints');

console.log(__dirname)

module.exports = new Endpoints.Application({
  searchPaths: [path.join(__dirname, '..', 'models')],
  routeBuilder: function (routes, prefix) {
    return routeBuilder(express.Router(), routes, prefix);
  },
  Controller: Endpoints.Controller.extend({
    baseUrl: '/v1',
    store: Endpoints.Store.bookshelf,
    format: Endpoints.Format.jsonapi,
    validators: [Endpoints.ValidateJsonSchema]
  })
});
