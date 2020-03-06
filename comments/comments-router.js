const router = require("express").Router();
const commentsModel = require("./comments-module");
const restrict = require("../auth/restrict");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets/secrets.js");

// const router = express.Router({
//   // this allows url parameters to pass down from the parent router
//   mergeParams: true
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const comments = await commentsModel.findBycommentsId(id);

//     res.json(comments);
//   } catch (err) {
//     next(err);
//   }
// });
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
router.get("/comments/:id", (req, res) => {
  const { id } = req.params;

  commentsModel
    .getById(id)
    .then(comment => {
      if (!comment[0]) {
        res.status(404).json({ message: "Invalid comment ID" });
      } else {
        res.status(200).json(comment);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching comment from database" });
    });
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
