// EXPRESS APP STARTING POINT
const express = require("express");
const router = require("vite-express");
const app = express();

require("dotenv").config();

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static("public"));

const client = require("./db/client");
client.connect();

// Routes
const apiRouter = require("./api");
app.use("/api", apiRouter);

// Listener
router.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

module.exports = router;