const router = require("express").Router();
const commentsModel = require("./comments-module");
const restrict = require("../auth/restrict");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets/secrets.js");

router.get("/", (req, res) => {
  commentsModel
    .find()
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Check comment-router get section", ...err })
    );
});

router.get("/:id", (req, res) => {
  commentsModel
    .findByCommentsId()
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Check comment-router get section", ...err })
    );
});

function genToken(users) {
  const payload = {
    username: users.username,
    subject: users.id
  };
  const secret = "its a secret! dont tell anyone";
  const options = {
    expiresIn: "2h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
