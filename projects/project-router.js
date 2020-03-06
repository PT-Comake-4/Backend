const router = require("express").Router();
const projectModel = require("./project-module");
const restrict = require("../auth/restrict");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets/secrets.js");

router.get("/", (req, res) => {
  projectModel
    .find()
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Check project-router get section", ...err })
    );
});

router.get("/:id", (req, res) => {
  projectModel
    .findByProjectsId(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json(err));
});

// projectModel
//   .findByProjectsId()

//     .then(project => {
//       res.status(201).json(project);
//     })
//     .catch(err =>
//       res
//         .status(500)
//         .json({ message: "Check project-router get section", ...err })
//     );
// });
// router.get("/projects/:id", (req, res) => {
//   const { id } = req.params;

//   projectModel
//     .getById(id)
//     .then(projects => {
//       if (!projects[0]) {
//         res.status(404).json({ message: "Invalid projects ID" });
//       } else {
//         res.status(200).json(projects);
//       }
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ message: "Error fetching projects from database" });
//     });
// });

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
