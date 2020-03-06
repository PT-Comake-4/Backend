const db = require("../data/dbConfig");

const bcrypt = require("bcryptjs");

module.exports = {
  find,
  findBy,
  getById,
  addUser,
  add,
  remove,
  findByUsername,
  findUserByID
};

function find() {
  return db("users").select("id", "username", "email", "name", "password");
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

function findByUsername(username) {
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

function remove(id) {
  return db("users")
    .where({ id })
    .del()
    .then(users => {
      if (users) {
        return users;
      } else {
        return null;
      }
    });
}
