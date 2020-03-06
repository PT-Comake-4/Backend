exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("comment")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comment").insert([
        { created_by: 1, project_id: 2, description: "Good Job" },
        { created_by: 2, project_id: 3, description: "Ok Job" },
        { created_by: 3, project_id: 1, description: "Bad Job" }
      ]);
    });
};
