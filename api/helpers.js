const db = require("../data/dbConfig");

const bcrypt = require("bcryptjs");

module.exports = {
  find,
  findBy,
  getById,
  addUser,
  add,
  update,
  findByUserName,
  findProjectByUserId,
  findCommentsByUserId,
  findUserByID
};

function find() {
  return db("users").select("id", "username", "department", "password");
}

function addUser(user) {
  const { username, password } = user;

  if (username && password) {
    const hash = bcrypt.hashSync(password, 8);
    user.password = hash;

    return db("users")
      .insert(user, "id")
      .then(id => findUserByID(id));
  }
}
async function add(user) {
  const [id] = await db("users").insert(user);

  return findUserByID(id);
}

function findUserByID([id]) {
  return db("users")
    .where({ id })
    .first();
}

function findByUserName(username) {
  return db("users")
    .where({ username })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function getById(id) {
  return db("users").where({ id });
}

function findProjectByUserId(id) {
  return db("projects as p")
    .join("users as u", "u.id", "p.created_by")
    .where("p.created_by", id)

    .select(
      "p.id",
      "p.project_name",
      "u.username",
      "p.description",
      "p.vote",
      "p.date",
      "p.state"
    );
}

function findCommentsByUserId(id) {
  return db("comments as c")
    .join("users as u", "u.id", "c.created_by")
    .where("c.created_by", id)
    .join("projects as p", "p.id", "c.project_id")
    .where("c.project_id", id)
    .select(
      "c.id",
      "p.project_name",
      "u.username",
      "c.description",
      "c.vote",
      "c.date"
    );
}
