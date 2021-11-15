exports.up = function (knex) {
  return knex.schema.createTable("response", (table) => {
    table.increments().primary();
    table.integer("responserId").unsigned();
    table.foreign("responserId").references("account.id");
    table.integer("requestId").unsigned();
    table.foreign("requestId").references("request.id");
    table.string("detail");
    table.boolean("matched");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("response");
};
