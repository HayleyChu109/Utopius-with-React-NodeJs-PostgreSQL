exports.up = function (knex) {
  return knex.schema.createTable("redeemDetail", (table) => {
    table.increments();
    table.integer("redeemItemId").unsigned();
    table.foreign("redeemItemId").references("redeemItem.id");
    table.integer("quantity");
    table.integer("amount");
    table.string("status");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("redeemDetail");
};
