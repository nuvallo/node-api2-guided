// Known as common JS 'require';
// Node doesn't support 'import' modules yet
const express = require("express");
const users = require("./users-model");

// Call Router
const router = express.Router();

// This handles the route 'GET /users/'
router.get("/", (req, res) => {
  users
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users",
      });
    });
});

// This handles the route 'GET /users/:id/'
router.get("/:id", (req, res) => {
  users
    .findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user",
      });
    });
});

// This handles the route 'POST /users/'
router.post("/", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Missing user name or email",
    });
  }

  users
    .add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the user",
      });
    });
});

// This handles the route 'PUT /users/:id'
router.put("/:id", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Missing user name or email",
    });
  }

  users
    .update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "The user could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user",
      });
    });
});

// This handles the route 'DELETE /users/id/'
router.delete("/:id", (req, res) => {
  users
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been nuked",
        });
      } else {
        res.status(404).json({
          message: "The user could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the user",
      });
    });
});

// Grabs users posts
router.get("/:id/posts", (req, res) => {
  users
    .findUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Could not get user posts",
      });
    });
});

module.exports = router;
