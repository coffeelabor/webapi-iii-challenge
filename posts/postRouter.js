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

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

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

module.exports = router;
