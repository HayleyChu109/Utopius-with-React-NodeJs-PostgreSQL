exports.up = function (knex) {
  return knex.schema.createTable("reportMember", (table) => {
    table.increments().primary();
    table.integer("reporterId").unsigned();
    table.foreign("reporterId").references("account.id");
    table.integer("reporteeId").unsigned();
    table.foreign("reporteeId").references("account.id");
    table.string("email");
    table.string("title");
    table.string("message");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reportMember");
};
