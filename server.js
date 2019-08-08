const express = require("express");
const router = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use(logger);
// server.use("api/users", userRouter);
server.use("/api/users", router);
server.use("/api/posts", router);
// const userRouter = require("./users/userRouter.js");

server.get("/", (req, res) => {
  res.status(200).json({ SecretDeployMsg: process.env.SECRET });
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.method} request to ${req.url} at ${new Date().toISOString()}`
  );
  next();
}

module.exports = server;

// const express = require("express");
// const helmet = require("helmet");

// const userRouter = require("./users/userRouter.js");
// // const postRouter = require("./posts/postRouter.js");

// const server = express();

// //custom middleware
// //logger()
// function logger(req, res, next) {
//   console.log(
//     `${req.method} request to ${req.url} at ${new Date().toISOString()}`
//   );
//   next();
// }

// server.use(express.json());
// server.use(helmet());
// server.use(logger);

// // server.use("/posts", postRouter);
// server.use("/users", userRouter);

// server.get("/", logger, (req, res) => {
//   // res.send(`<h2>Let's write some middleware!</h2>`);
//   const queryParameters = req.query;
//   res.status(200).json({ message: "Howdy", queryParameters });
// });

// module.exports = server;
// server.listen(8000, () => console.log("\n Lok'tar \n"));

// const express = 'express';

// const server = express();

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`)
// });

// //custom middleware

// function logger(req, res, next) {

// };

// module.exports = server;
