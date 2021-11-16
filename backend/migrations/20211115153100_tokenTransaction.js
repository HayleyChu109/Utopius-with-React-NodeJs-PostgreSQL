exports.up = function (knex) {
  return knex.schema.createTable("tokenTransaction", (table) => {
    table.increments().primary();
    table.integer("requestId").unsigned();
    table.foreign("requestId").references("request.id");
    table.integer("payerId").unsigned();
    table.foreign("payerId").references("account.id");
    table.integer("payeeId").unsigned();
    table.foreign("payeeId").references("account.id");
    table.integer("amount");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tokenTransaction");
};
