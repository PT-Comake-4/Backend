const express = require("express");
const projectModel = require("./project-module");

const router = express.Router({
  // this allows url parameters to pass down from the parent router
  mergeParams: true
});

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.params;
    const projects = await projectModel.findByProjectsId(id);

    res.json(projects);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
