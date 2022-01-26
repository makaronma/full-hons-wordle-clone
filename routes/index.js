const express = require("express");
const app = express();
const router = express.Router();
const server = require("../server");

const axios = require("axios");
const API_KEY = process.env.API_KEY;

router.get("/", async (req, res) => {
  res.render("index", { word: server.word });
  console.log("[CLIENT] Get Word: " + server.word);
});

router.post("/", async (req, res) => {
  const data = req.body;
  if (data.word != null) {
    if (data.word == server.word) {
      res.send("Correct!");
    }
    checkWordValid(req, res, data.word);
  }
});

const checkWordValid = async (req, res, word) => {
  console.log(`Checking ${word} Valid. . .`);
  try {
    const result = await axios.get(
      `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&api_key=${API_KEY}`
    );
    console.log("[SERVER] Valid Result: ");
    console.log(result.data);
    res.send("Valid!");
  } catch (error) {
    res.send("Invalid!");
  }
};

module.exports = router;
