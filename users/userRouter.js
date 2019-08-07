const express = "express";
const router = require("express").Router();

const users = require("../data/seeds/02-users.js");

// router.post("/", (req, res) => {
//   const name = req.body;
//   if (name) {
//     res
//       .status(400)
//       .json({ message: "Please provide name and bio for the user." });
//   } else {
//     users
//       .insert(req.body)
//       .then(user => {
//         res.status(201).json(user);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ message: "The users information could not be retrieved." });
//       });
//   }
// });

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
