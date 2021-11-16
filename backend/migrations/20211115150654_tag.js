exports.up = function (knex) {
  return knex.schema.createTable("tag", (table) => {
    table.increments().primary();
    table.string("tagName").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tag");
};
