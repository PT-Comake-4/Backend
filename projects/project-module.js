const db = require("../data/dbConfig");

function findByProjectsId(id) {
  return db("projects as p") // FROM projects AS p
    .join("users as u", "u.id", "p.created_by") // INNER JOIN users AS u ON u.id = p.created_by
    .where("p.created_by", id) // WHERE created_by = ?

    .select(
      "p.id",
      "p.project_name",
      "u.username",
      "p.description",
      "p.vote",
      "p.date",
      "p.state"
    ); // SELECT p.id, p.contents, u.username
}

module.exports = {
  findByProjectsId
};
