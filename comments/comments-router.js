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
    const projectsComments = await commentsModel.findProjectsComments(
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

//POST EXPENSE
router.post("/comments", async (req, res) => {
  const comment = req.body.comment;
  const project_id = comment.project_id;
  const created_by = comment.created_by;
  const description = comment.description;
  const vote = comment.vote;
  const commentsArray = req.body.users;

  if (!comment.created_by || !commentsArray || !comment.description) {
    res.status(500).json({
      message: "Must include expense created_by, users array, and trip_id"
    });
  }

  commentsModel
    .add(comment)
    .then(saved => {
      //change to saved.id for postgres-------------------------------->
      const comment_id = saved.id;

      commentsArray.forEach(user => {
        commentsModel
          .add(comment_id, user, created_by, description, vote)
          .then(saved => {
            console.log(saved);
          })
          .catch(err =>
            res.status(500).json({
              err,
              message: "error adding individual expenses to users"
            })
          );
      });
      res.status(201).json(saved);
    })
    .catch(err => res.status(500).json({ err, message: "error out here" }));
});
// //UPDATE EXPENSE
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   if (changes.id) {
//     res.status(500).json({ message: "id cannot be changed" });
//   } else {
//     try {
//       const expense = await Expenses.findById(id);

//       if (expense) {
//         const updatedExpense = await Expenses.update(changes, id);
//         res.status(200).json(updatedExpense);
//       } else {
//         res
//           .status(404)
//           .json({ message: "Could not find expense with given ID" });
//       }
//     } catch (err) {
//       res.status(500).json({ message: "Something went wrong" });
//     }
//   }
// });

// //DELETE EXPENSE
// router.delete("/:id", restricted, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deleted = await Expenses.remove(id);

//     if (deleted) {
//       res.json({ removed: deleted });
//     } else {
//       res.status(404).json({ message: "Could not find expense with given ID" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

module.exports = router;
