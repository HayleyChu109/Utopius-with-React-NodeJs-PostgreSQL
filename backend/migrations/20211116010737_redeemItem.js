exports.up = function (knex) {
  return knex.schema.createTable("redeemItem", (table) => {
    table.increments();
    table.string("name");
    table.integer("requiredToken");
    table.integer("stock");
    table.string("itemPhotoPath");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("redeemItem");
};
