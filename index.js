// code away!
require("dotenv").config();
const server = require("./server.js");

const port = process.env.PORT;
server.listen(port, () =>
  console.log(`\n Lok'tar on http://localhost:${port}\n`)
);
