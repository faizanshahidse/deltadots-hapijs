import knex from 'knex';
import configs from '../knexfile.js';

const { NODE_ENV } = process.env;

const database = knex(configs[NODE_ENV] || 'development');
console.log('knex::::::::::::::::', database.client.config.connection);
export { database };
