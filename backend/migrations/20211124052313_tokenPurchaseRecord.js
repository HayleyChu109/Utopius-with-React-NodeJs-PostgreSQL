exports.up = function (knex) {
  return knex.schema.createTable("tokenPurchaseRecord", (table) => {
    table.increments().primary();
    table.integer("accountId").unsigned().notNullable();
    table.foreign("accountId").references("account.id");
    table.integer("tokenPlanId").unsigned().notNullable();
    table.foreign("tokenPlanId").references("tokenPlan.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tokenPurchaseRecord");
};
