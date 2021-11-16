exports.up = function (knex) {
  return knex.schema.createTable("announcement", (table) => {
    table.increments();
    table.string("title");
    table.json("content");
    table.date("start_date");
    table.date("end_date");
    table.boolean("isPrivate");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("announcement");
};
