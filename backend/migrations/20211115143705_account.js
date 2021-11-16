exports.up = function (knex) {
  return knex.schema.createTable("account", (table) => {
    table.increments().primary();
    table.boolean("isAdmin").notNullable();
    table.string("username").unique();
    table.string("email").unique();
    table.string("facebookId");
    table.string("gmailId");
    table.string("password").notNullable();
    table.string("firstName");
    table.string("lastName");
    table.integer("phone");
    table.string("district");
    table.string("profilePath");
    table.string("grade");
    table.integer("token").notNullable();
    table.boolean("blacklist").notNullable();
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
