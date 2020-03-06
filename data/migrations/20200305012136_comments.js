exports.up = function(knex) {
  return knex.schema.createTable("comment", tbl => {
    tbl.increments();
    tbl
      .integer("created_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.text("description").notNullable();
    tbl.integer("vote").defaultTo(0);
    // tbl
    //   .dateTime("date")
    //   .notNullable()
    //   .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("comment");
};
