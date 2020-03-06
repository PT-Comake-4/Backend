const db = require("../data/dbConfig");

const bcrypt = require("bcryptjs");

module.exports = {
  find,
  addComment,
  findCommentsByID,
  getById,
  update,
  remove,
  findByCommentsId
};

function find() {
  return db("comments").select("*");
}
async function addComment(comment) {
  const [newComment] = await db("comments")
    .insert(comment)
    .returning("*");

  return newComment;
}

function findCommentsByID([id]) {
  return db("comments")
    .select("*")
    .where({ id })
    .first();
}

function getById(id) {
  return db("users").where({ id });
}

async function update(changes, id) {
  const [updatedComment] = await db("comments")
    .where({ id })
    .update(changes)
    .returning("*");

  return updatedComment;
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
