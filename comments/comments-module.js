const db = require("../data/dbConfig");

module.exports = {
  findByCommentsId,
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

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
function find() {
  return db("comments").select("*");
}

function findBy(filter) {
  return db("comments").where(filter);
}

function findById(id) {
  return db("comments")
    .where({ id })
    .first();
}

async function add(comments) {
  const [newComment] = await db("comments")
    .insert(comments)
    .returning("*");

  return newComment;
}

async function update(changes, id) {
  const [updatedComment] = await db("comments")
    .where({ id })
    .update(changes)
    .returning("*");

  return updatedComment;
}

function remove(id) {
  return db("comments")
    .where({ id })
    .del()
    .then(comments => {
      if (comments) {
        return comments;
      } else {
        return null;
      }
    });
}
function findUserComments(user_id) {
  return db("comments_").where({ user_id });
}

function findByCommentsId(trip_id) {
  return db("comments_").where({ trip_id });
}
