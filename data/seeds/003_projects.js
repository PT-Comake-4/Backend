exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          project_name: "Test Project 1",
          description: "Testing Everything",
          created_by: 1,
          vote: 2,
          state: "MO"
        },
        {
          project_name: "Test Project 2",
          description: "Stuff Needs Fixed",
          created_by: 2,

          state: "MO"
        },
        {
          project_name: "Test Project 3",
          description: "Whys all the rum gone",
          created_by: 3,

          state: "MO"
        },
        {
          project_name: "Test Project 4",
          description: "Here we go again",
          created_by: 2,
          vote: 2,

          state: "MO"
        }
      ]);
    });
};
