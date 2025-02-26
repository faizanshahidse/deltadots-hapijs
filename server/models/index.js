import { database } from '../database/index.js';

export const Model = (tableName = '') => {
  if (!tableName) {
    throw new Error('The table name must be defined for the model.');
  }
  console.log('database::::::::::::::::', database.client.config.connection);
  return database(tableName);
};
