const _ = require('lodash');

const env = process.env.NODE_ENV || 'dev';
const config = _.assign({ env: env }, require('./env/config.dev'), require('./env/config.' + env));

module.exports = config;