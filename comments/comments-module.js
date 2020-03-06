const db = require("../data/dbConfig");

const bcrypt = require("bcryptjs");

module.exports = {
  find,
  findBy,
  getById,
  addUser,
  add,
  remove,
  findByUserName,
  findByCommentsId,
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

function findByCommentsId(id) {
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
// function findUserComments(user_id) {
//   return db("comments_").where({ user_id });
// }

// function findByCommentsId(trip_id) {
//   return db("comments_").where({ trip_id });
// }
