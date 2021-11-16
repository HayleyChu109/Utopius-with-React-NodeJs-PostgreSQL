exports.up = function (knex) {
  return knex.schema.createTable("comment", (table) => {
    table.increments().primary();
    table.integer("commenterId").unsigned();
    table.foreign("commenterId").references("account.id");
    table.integer("requestId").unsigned();
    table.foreign("requestId").references("request.id");
    table.string("detail");
    table.boolean("private");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comment");
};
