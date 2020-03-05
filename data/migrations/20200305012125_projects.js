exports.up = function(knex) {
  return knex.schema.createTable("projects", tbl => {
    tbl.increments();
    tbl.text("project_name", 200).notNullable();

    tbl.text("description").notNullable();
    tbl.integer("vote").defaultTo(0);
    // tbl
    //   .dateTime("date")
    //   .notNullable()
    //   .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    tbl.string("state", 100).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects");
};
