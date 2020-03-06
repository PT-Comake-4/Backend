const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

module.exports = {
  find,
  findBy,
  // getById,
  addProject,
  // add,
  remove,
  findByProjectName,
  findProjectByID,
  findByProjectsId
};

function find() {
  return db("projects").select(
    "id",
    "project_name",
    "description",
    "vote",
    "state"
  );
}

function addProject(project) {
  const project = req.body;
  return db("projects")
    .insert(project, "id")
    .then(ids => {
      const [id] = ids;
      return findProjectByID(id);
    });
}

// async function add(project) {
//   const [id] = await db("projects").insert(project);

//   return findprojectByID(id);
// }

function findProjectByID([id]) {
  return db("projects")
    .where({ id })
    .first();
}
// function getById(id) {
//   return db("projects").where({ id });
// }

function findByProjectName(project_name) {
  return db("projects")
    .where({ project_name })
    .first();
}

function findBy(filter) {
  return db("projects").where(filter);
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del()
    .then(projects => {
      if (projects) {
        return projects;
      } else {
        return null;
      }
    });
}

function findByProjectsId(id) {
  return db("projects as p") // FROM projects AS p
    .join("projects as u", "u.id", "p.created_by") // INNER JOIN projects AS u ON u.id = p.created_by
    .where("p.created_by", id) // WHERE created_by = ?

    .select(
      "p.id",
      "p.project_name",
      "u.project_name",
      "p.description",
      "p.vote",
      "p.date",
      "p.state"
    ); // SELECT p.id, p.contents, u.project_name
}
