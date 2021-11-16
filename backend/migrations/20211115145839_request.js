exports.up = function (knex) {
  return knex.schema.createTable("request", (table) => {
    table.increments().primary();
    table.integer("requesterId").unsigned().notNullable();
    table.foreign("requesterId").references("account.id");
    table.string("title");
    table.string("detail");
    table.integer("reward");
    table.integer("requiredPpl");
    table.string("district");
    table.string("status");
    table.string("reqPhotoPath");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("request");
};
