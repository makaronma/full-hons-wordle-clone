const express = require("express");
const app = express();
const router = express.Router();
const server = require("../server");

router.get("/", async (req, res) => {
  res.render("index", {word: server.word});
  console.log(server.word);
});

module.exports = router;
