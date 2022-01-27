const express = require("express");
const app = express();
const router = express.Router();
const server = require("../server");
const md5 = require("md5");

const axios = require("axios");
const API_KEY = process.env.API_KEY;
const fs = require("fs");
const wordListPath = require("word-list");
const wordArray = fs.readFileSync(wordListPath, "utf8").split("\n");

let hash = null;

router.get("/", async (req, res) => {
  hash = md5(server.word);
  res.render("index", { word: server.word });
  console.log("[CLIENT] Get Word: " + server.word);
});

router.post("/", async (req, res) => {
  const data = req.body;
  if (data.word != null) {
    checkGuess(req, res, data.word);
  }
});

const checkGuess = async (req, res, guess) => {
  console.log(`Checking ${guess} Valid. . .`);
  if (wordArray.some((word) => word === guess)) {
    // const result = await axios.get(
    //   `https://api.wordnik.com/v4/word.json/${guess}/definitions?limit=1&api_key=${API_KEY}`
    // );
    const correctness = checkGuessByCharater(guess);
    res.send({
      valid: true,
      correctness: correctness,
      hash: hash,
    }); // 01202
  } else {
    // console.log(error);
    res.send({
      valid: false,
    }); // prevent next row
  }
};

const checkGuessByCharater = (guess) => {
  const AnsChar = server.word.split(""); //apple
  const GuessChar = guess.split(""); //pupil
  let result = [];
  let win = true;
  for (let i = 0; i < guess.length; i++) {
    //check position correct
    if (AnsChar[i] == GuessChar[i]) {
      result[i] = 2;
    }
    //check exist
    else if (server.word.includes(GuessChar[i])) {
      result[i] = 1;
      win = false;
    } else {
      result[i] = 0;
      win = false;
    }
  }
  if (win) {
    server.getRandomWord();
    hash = md5(server.word);
  }
  return result;
};

module.exports = router;
