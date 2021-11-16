exports.up = function (knex) {
  return knex.schema.createTable("redeem_detail", (table) => {
    table.increments();
    table.integer("token_transaction_id").unsigned();
    table.foreign("token_transaction_id").references("tokenTransaction.id");
    table.integer("redeem_item_id").unsigned();
    table.foreign("redeem_item_id").references("redeem_item.id");
    table.integer("amount");
    table.string("status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("redeem_detail");
};
