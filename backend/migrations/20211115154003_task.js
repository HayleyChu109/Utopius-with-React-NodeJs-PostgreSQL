exports.up = function (knex) {
  return knex.schema.createTable("task", (table) => {
    table.increments().primary();
    table.integer("guestMsgId").unsigned();
    table.foreign("guestMsgId").references("guestMsg.id");
    table.integer("reportMemberId").unsigned();
    table.foreign("reportMemberId").references("reportMember.id");
    table.string('solution')
    table.string("status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("task");
};
