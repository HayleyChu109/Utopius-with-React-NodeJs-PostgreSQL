exports.up = function (knex) {
  return knex.schema.createTable("review", (table) => {
    table.increments().primary();
    table.integer("requestId").unsigned();
    table.foreign("requestId").references("request.id");
    table.integer("reviewerId").unsigned();
    table.foreign("reviewerId").references("account.id");
    table.integer("revieweeId").unsigned();
    table.foreign("revieweeId").references("account.id");
    table.integer("rating");
    table.boolean("contributed");
    table.string("ratingComment");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("review");
};
