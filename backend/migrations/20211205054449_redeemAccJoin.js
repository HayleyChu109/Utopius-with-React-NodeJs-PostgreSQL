exports.up = function (knex) {
  return knex.schema.createTable("redeemAccJoin", (table) => {
    table.increments();
    table.integer("accountId").unsigned();
    table.foreign("accountId").references("account.id");
    table.integer("redeemDetailId").unsigned();
    table.foreign("redeemDetailId").references("redeemDetail.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("redeemAccJoin");
};
