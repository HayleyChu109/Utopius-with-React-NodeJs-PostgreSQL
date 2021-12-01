exports.up = function (knex) {
  return knex.schema.createTable("friendship", (table) => {
    table.increments().primary();
    table.integer("followerId").unsigned().notNullable();
    table.foreign("followerId").references("account.id");
    table.integer("followingId").unsigned().notNullable();
    table.foreign("followingId").references("account.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("friendship");
};
