// const express = "express";
const express = require("express");
const router = express.Router();

const postDb = require("./postDb.js");
// const posts = require("../data/seeds/03-posts.js");

const data = require("../posts/postDb.js");

router.get("/", (req, res) => {
  postDb
    //get()
    .get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      //status(500)
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  postDb
    .remove(req.params.id)
    .then(post => {
      res.status(200).json({ message: "Post is gone, forever!!" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Internal server error, failed to delete" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postDb
    .update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      res.status(500).json({ error: "You know the drill, this is not good" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  console.log(req.params);
  postDb
    .getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res
          .status(404)
          .json({ error: "error in retrieving post data, validatePostId" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error:
          "O bummer, either its an internal server error or the end of the world"
      });
    });
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
}

module.exports = router;
