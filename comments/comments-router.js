const express = require("express");
const commentsModel = require("./comments-module");
const restrict = require("../auth/restrict");

const router = express.Router({
  // this allows url parameters to pass down from the parent router
  mergeParams: true
});

router.get("/", restrict, async (req, res, next) => {
  commentsModel.findByCommentsId();
  try {
    const { id } = req.params;
    const comment = await commentsModel.findByCommentsId(id);

    res.json(comment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
