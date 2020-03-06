const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

module.exports = {
  find,
  addProject,
  findProjectByID,
  findByProjectName,
  update,
  getById,
  remove,
  findByProjectsId
};

function find() {
  return db("projects").select("*");
}

async function addProject(project) {
  const [newProject] = await db("projects")
    .insert(project)
    .returning("*");

  return newProject;
}

// async function add(project) {
//   const [id] = await db("projects").insert(project);

//   return findProjectByID(id);
// }

function findProjectByID(id) {
  return (
    db("projects")
      // .select("*")
      .where({ id })
      .first()
  );
}

function findByProjectName(project_name) {
  return db("projects")
    .where({ project_name })
    .first();
}

async function update(changes, id) {
  const [updatedProject] = await db("projects")
    .where({ id })
    .update(changes)
    .returning("*");

  return updatedProject;
}
function getById(id) {
  return db("projects").where({ id });
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del()
    .then(project => {
      if (project) {
        return project;
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
