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
    .getById(req.params.id)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/users/:id", async (req, res) => {
  try {
    const projectsComments = await commentsModel.findprojectsComments(
      req.params.id
    );

    if (projectsComments.length) {
      const commentsIds = [];

      projectsComments.forEach(comments => {
        commentsIds.push(comments.id);
      });

      var projectIds = [];

      await commentsIds.forEach(async (id, index, array) => {
        const response = await commentsModel.getById(id);
        projectIds.push(response.project_id);
        if (index === array.length - 1) {
          const result = projectsComments.map((comments, index) => {
            return { ...comments, project_id: projectIds[index] };
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

router.get("/projects/:id", async (req, res) => {
  try {
    const projectsComments = await commentsModel.findProjectComments(
      req.params.id
    );

    if (projectsComments.length) {
      const commentsIds = [];

      projectsComments.forEach(comments => {
        commentsIds.push(comments.id);
      });

      var projectIds = [];

      await commentsIds.forEach(async (id, index, array) => {
        const response = await commentsModel.getById(id);
        projectIds.push(response.project_id);
        if (index === array.length - 1) {
          const result = projectsComments.map((comments, index) => {
            return { ...comments, project_id: projectIds[index] };
          });
          res.status(200).json(result);
        }
      });
    } else {
      res
        .status(404)
        .json({ message: "No comments-router found for provided user id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
