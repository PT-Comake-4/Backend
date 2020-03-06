exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        { created_by: 1, project_id: 2, description: "Good Job", vote: 3 },
        { created_by: 2, project_id: 3, description: "Ok Job", vote: 1 },
        { created_by: 3, project_id: 1, description: "Bad Job" }
      ]);
    });
};
