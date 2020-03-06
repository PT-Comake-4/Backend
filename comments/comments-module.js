const db = require("../data/dbConfig");

const bcrypt = require("bcryptjs");

module.exports = {
  find, //
  // addComment,
  // add,
  // findBy,
  // findCommentsByID,
  // findUsersComments,
  findProjectComments, //
  getById, //
  // findById,
  // update,
  // remove,
  findByCommentsId
};

function find() {
  return db("comments").select("*");
}

async function addComment(comment) {
  try {
    const [id] = await db("comments").insert(comment);
    const newComment = await findById(id);
    return newComment;
  } catch (error) {
    console.error(error);
  }
}

async function add(comment_id, project_id, created_by, description, vote) {
  const [newComment] = await db("comments")
    .insert({ comment_id, project_id, created_by, description, vote })
    .returning("*");

  return newComment;
}

async function findById(id) {
  try {
    const comment = await db("comments")
      .where({ id })
      .first();
    if (comment) {
      return comment;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}
function findCommentsByID([id]) {
  return db("comments")
    .select("*")
    .where({ id })
    .first();
}

function findUsersComments(created_by) {
  return db("comments").where({ created_by });
}

function findProjectComments(project_id) {
  return db("comments").where({ project_id });
}

function getById(id) {
  return db("comments").where({ id });
}
function findBy(filter) {
  return db("comments").where(filter);
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
