const express = require("express");
const users = require("./users/users-model");
const usersRouter = require("./users/users-router");
const welcomeRouter = require("./welcome/welcome-model");

const server = express();
const port = 4000;

server.use(express.json());
server.use("/users", usersRouter);
server.use("/", welcomeRouter);

// create endpoint that returns all the posts for a user
// create endpoint for adding a new post for a user

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
