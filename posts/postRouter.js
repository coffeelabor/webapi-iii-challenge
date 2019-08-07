// const express = "express";
const router = require("express").Router();

const posts = require("../data/seeds/03-posts.js");

router.get("/", (req, res) => {
  posts
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

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
