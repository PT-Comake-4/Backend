const router = require("express").Router();
const authModel = require("./users-module.js");
const restrict = require("../auth/restrict");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets/secrets.js");

//GET ALL USERS
router.get("/", (req, res) => {
  authModel
    .find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Check users-router get section", ...err })
    );
});

//GET USER BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  authModel
    .getById(id)
    .then(users => {
      if (!users[0]) {
        res.status(404).json({ message: "Invalid users ID" });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching users from database" });
    });
});

//GET USER BY USERNAME
router.get("/name/:username", (req, res) => {
  console.log(req.params.username);
  authModel
    .findByUsername(req.params.username)
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
});

router.post("/register", (req, res) => {
  const user = req.body;
  if (user.username && user.password) {
    authModel
      .addUser(user)
      .then(p => {
        res.status(201).json(p);
      })
      .catch(err => {
        res.status(400).json({ message: "check server File", ...err });
      });
  } else {
    res.status(500).json({ message: "need username and password" });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  authModel
    .findBy({ username })
    .first()
    .then(users => {
      if (users && bcryptjs.compareSync(password, users.password)) {
        const token = genToken(users);
        res.status(200).json({ message: `Welcome ${users.username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// router.get("/logout", (req, res) => {
//   if (req.users) {
//     req.users.destroy(err => {
//       res.status(200).json("you have been knock out");
//     });
//   } else {
//     res.status(400).json("your already logged out! your drunk go home!");
//   }
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
