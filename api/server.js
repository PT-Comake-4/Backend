const express = require("express");
const helmet = require("helmet");
const UsersRouter = require("../users/users-router");
const CommentsRouter = require("../comments/comments-router");
const ProjectsRouter = require("../projects/project-router");

const server = express();

//initial GET
server.get("/", (req, res) => {
  res.json({ message: "server is up and running" });
});

server.use(helmet());
server.use(express.json());

server.use("/api/users", UsersRouter);
server.use("/api/comments", CommentsRouter);
server.use("/api/projects", ProjectsRouter);

module.exports = server;
