exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "doanmade",
          name: "Joshua Doan",
          email: "josh.doan1@gmail.com",
          password:
            "$2a$08$4TTRfzvZhB6JniG8B/O2o.JG.teNOPKrsH.vPzmpmo3EmOhCM4xgu"
        },
        {
          username: "doanmade1",
          name: "Joshua the beard Doan",
          email: "josh.doan2@gmail.com",
          password:
            "$2a$08$4TTRfzvZhB6JniG8B/O2o.JG.teNOPKrsH.vPzmpmo3EmOhCM4xgu"
        },
        {
          username: "doanmade2",
          name: "mr Doaner",
          email: "josh.doan3@gmail.com",
          password:
            "$2a$08$4TTRfzvZhB6JniG8B/O2o.JG.teNOPKrsH.vPzmpmo3EmOhCM4xgu"
        },
        {
          username: "doanmade3",
          name: "sunshine",
          email: "josh.doan4@gmail.com",
          password:
            "$2a$08$4TTRfzvZhB6JniG8B/O2o.JG.teNOPKrsH.vPzmpmo3EmOhCM4xgu"
        }
      ]);
    });
};
