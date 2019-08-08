const express = require("express");
// const router = require("express").Router();
const router = express.Router();
const userDb = require("./userDb.js");
const postDb = require("../posts/postDb.js");
// const users = require("../data/seeds/02-users.js");

router.post("/", validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "internal server fire, every man for himself!" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.params.id;
  postDb
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Internal server error, thats not good" });
    });
});

router.get("/", (req, res) => {
  userDb
    //get()
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      //status(500)
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting posts" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  userDb
    .remove(req.params.id)
    .then(user => {
      res.status(200).json({ message: "User deleted, never comming back" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Internal server error, failed to delete" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  userDb
    .update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Internal server error, this is really really bad" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res
          .status(404)
          .json({ error: "error in retrieving data validatUserId" });
      }
      //   console.log(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Bruh, what are you doing? validatUserId" });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  if (!body) {
    res.status(400).json({ error: "missing user data" });
  } else if (!name) {
    res.status(400).json({ error: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  console.log(req.body);
  const body = req.body;
  const text = req.body.text;
  if (!body) {
    res.status(400).json({ error: "missing post data" });
  } else if (!text) {
    res.status(400).json({ error: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
