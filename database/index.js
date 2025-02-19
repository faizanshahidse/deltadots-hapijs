import knex from 'knex';
import configs from '../knexfile.js';

const { NODE_ENV } = process.env;

export const database = knex(configs[NODE_ENV] || 'development');
