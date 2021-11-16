exports.up = function (knex) {
  return knex.schema.createTable("bookmark", (table) => {
    table.increments().primary();
    table.integer("accountId").unsigned();
    table.foreign("accountId").references("account.id");
    table.integer("requestId").unsigned();
    table.foreign("requestId").references("request.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bookmark");
};
