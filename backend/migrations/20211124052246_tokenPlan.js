exports.up = function (knex) {
  return knex.schema.createTable("tokenPlan", (table) => {
    table.increments().primary();
    table.string("planName").unique().notNullable();
    table.integer("noOfToken").notNullable();
    table.integer("hkd").notNullable();
    table.string("detail");
    table.string("photoPath");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tokenPlan");
};
