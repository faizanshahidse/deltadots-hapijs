import dotenv from 'dotenv';
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_CLIENT } = process.env;

export default {
   development: {
      client: DB_CLIENT,
      connection: {
         host: DB_HOST,
         port: DB_PORT,
         user: DB_USER,
         database: DB_NAME,
      },
      migrations: {
         directory: './database/migrations',
      },
      seeds: {
         directory: './database/seeds',
      },
   },

   staging: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user: 'username',
         password: 'password',
      },
      migrations: {
         directory: './database/migrations',
      },
      seeds: {
         directory: './database/seeds',
      },
   },

   production: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user: 'username',
         password: 'password',
      },
      migrations: {
         directory: './database/migrations',
      },
      seeds: {
         directory: './database/seeds',
      },
   },
};
