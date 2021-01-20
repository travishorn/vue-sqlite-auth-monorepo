exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.string("username").index().notNullable().primary().unique();
      table.string("password_hash").notNullable();
      table.boolean("active").defaultTo(true).notNullable();
    })
    .createTable("sessions", (table) => {
      table.string("key").index().notNullable().primary().unique();
      table.string("user_username").notNullable();
      table.boolean("active").defaultTo(true).notNullable();
      table
        .foreign("user_username")
        .references("users.username")
        .onDelete("CASCADE");
    });
};

exports.down = (knex) => {
  return knex.schema.dropTable("sessions").dropTable("users");
};
