const tableName = 'users';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.hasTable(tableName).then(function (exists) {
    if (!exists) {
      return knex.schema.createTable(tableName, function (t) {
        t.increments('id').primary();
        t.string('name', 100).notNullable();
        t.string('email', 100).unique().notNullable();
        t.string('password', 100).notNullable();
        t.string('role', 20).notNullable().defaultTo('user');
        t.timestamps(true, true);
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable(tableName);
};
