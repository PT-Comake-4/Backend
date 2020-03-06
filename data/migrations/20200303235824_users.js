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

// exports.up = async function(knex) {
//   await knex.schema.createTable("users", tbl => {
//     tbl.increments().primary();

//     tbl
//       .string("username", 50)
//       .unique()
//       .notNullable();
//     tbl.text("name", 200).notNullable();
//     tbl
//       .string("email", 200)
//       .unique()
//       .notNullable();
//     tbl.string("password", 200).notNullable();
//   });
//   await knex.schema.createTable("projects", tbl => {
//     tbl.increments();
//     tbl.text("project_name", 200).notNullable();

//     tbl.text("description").notNullable();
//     tbl.integer("vote").defaultTo(0);
//     tbl
//       .integer("created_by")
//       .notNullable()
//       .references("id")
//       .inTable("users")
//       .onUpdate("CASCADE")
//       .onDelete("CASCADE");
//     // tbl
//     //   .dateTime("date")
//     //   .notNullable()
//     //   .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
//     tbl.string("state", 100).notNullable();
//   });

//   await knex.schema.createTable("comments", tbl => {
//     tbl.increments();
//     tbl
//       .integer("created_by")
//       .notNullable()
//       .references("id")
//       .inTable("users")
//       .onUpdate("CASCADE")
//       .onDelete("CASCADE");
//     tbl
//       .integer("project_id")
//       .notNullable()
//       .references("id")
//       .inTable("projects")
//       .onUpdate("CASCADE")
//       .onDelete("CASCADE");
//     tbl.text("description").notNullable();
//     tbl.integer("vote").defaultTo(0);
//     // tbl
//     //   .dateTime("date")
//     //   .notNullable()
//     //   .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
//   });
//   await knex.schema.createTable("project_comments", tbl => {
//     tbl
//       .integer("projects_id")
//       .references("projects")
//       .inTable("id");
//     tbl
//       .integer("comments_id")
//       .references("comments")
//       .inTable("id");
//     tbl.primary(["projects_id", "comments_id"]);
//   });
// };

// exports.down = async function(knex) {
//   await knex.schema.dropTableIfExists("project_comments");
//   await knex.schema.dropTableIfExists("comment");
//   await knex.schema.dropTableIfExists("projects");
//   await knex.schema.dropTableIfExists("users");
// };
