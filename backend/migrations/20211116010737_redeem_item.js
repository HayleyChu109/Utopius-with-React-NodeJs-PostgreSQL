
exports.up = function(knex) {
    return knex.schema.createTable("redeem_item", (table) => {
        table.increments()
        table.string("name");
        table.integer('token_cost')
        table.string('item_pic')
        table.integer('stock')
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("redeem_item");
};
