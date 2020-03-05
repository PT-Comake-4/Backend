exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments().primary();

    tbl
      .string("username", 50)
      .unique()
      .notNullable();
    tbl.text("name", 200).notNullable();
    tbl
      .string("email", 200)
      .unique()
      .notNullable();
    tbl.string("password", 200).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
