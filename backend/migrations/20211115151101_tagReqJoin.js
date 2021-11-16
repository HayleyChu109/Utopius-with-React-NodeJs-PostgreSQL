exports.up = function (knex) {
  return knex.schema.createTable("tagReqJoin", (table) => {
    table.increments().primary();
    table.integer("tagId").unsigned();
    table.foreign("tagId").references("tag.id");
    table.integer("requestId").unsigned();
    table.foreign("requestId").references("request.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tagReqJoin");
};
