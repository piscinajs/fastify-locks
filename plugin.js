'use strict';

const fp = require('fastify-plugin');
const { request, query } = require('piscina-locks');
const { name, version } = require('./package.json');

function locksPlugin (fastify, options, next) {
  fastify.decorate('locks', { request, query });
  next();
}

module.exports = fp(locksPlugin, { fastify: '>=1.0.0', name, version });
