exports.up = function (knex) {
  return knex.schema.createTable("guestMsg", (table) => {
    table.increments().primary();
    table.string("name");
    table.string("email");
    table.string("title");
    table.string("message");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("guestMsg");
};
