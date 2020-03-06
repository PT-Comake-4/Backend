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
    .getById(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/users/:id", async (req, res) => {
  try {
    const usersProjects = await projectModel.findUsersProjects(req.params.id);

    if (usersProjects.length) {
      const projectsIds = [];

      usersProjects.forEach(projects => {
        projectsIds.push(projects.id);
      });

      var usersIds = [];

      await projectsIds.forEach(async (id, index, array) => {
        const response = await projectModel.getById(id);
        usersIds.push(response.created_by);
        if (index === array.length - 1) {
          const result = usersProjects.map((projects, index) => {
            return { ...projects, created_by: usersIds[index] };
          });
          res.status(200).json(result);
        }
      });
    } else {
      res
        .status(404)
        .json({ message: "No projectModel found for provided user id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
