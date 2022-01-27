const express = require("express");
const app = express();
const router = express.Router();
const server = require("../server");

const axios = require("axios");
const API_KEY = process.env.API_KEY;

router.get("/", async (req, res) => {
  res.render("index", { word: server.word, wordDef: server.wordDef });
  console.log("[CLIENT] Get Word: " + server.word);
});

router.post("/", async (req, res) => {
  const data = req.body;
  if (data.word != null) {
    checkGuess(req, res, data.word);
  }
});

router.get("/ans", async (req, res) => {
  console.log(`[Client] See The Answer`);
  res.send(server.word);
});

const checkGuess = async (req, res, guess) => {
  console.log(`Checking ${guess} Valid. . .`);
  try {
    const result = await axios.get(
      `https://api.wordnik.com/v4/word.json/${guess}/definitions?limit=1&api_key=${API_KEY}`
    );
    const correctness = checkGuessByCharater(guess);
    res.send({
      valid: true,
      correctness: correctness,
    });
  } catch (error) {
    console.log("Search Word Error");
    res.send({
      valid: false,
    });
  }
};

const checkGuessByCharater = (guess) => {
  const AnsChar = server.word.split("");
  const GuessChar = guess.split("");
  let result = [];
  for (let i = 0; i < guess.length; i++) {
    //check position correct
    if (AnsChar[i] == GuessChar[i]) {
      result[i] = 2;
    }
    //check exist
    else if (server.word.includes(GuessChar[i])) {
      result[i] = 1;
    } else {
      result[i] = 0;
    }
  }
  return result;
};

module.exports = router;
