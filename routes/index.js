const express = require("express");
const app = express();
const router = express.Router();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
let word;

// app.listen(process.env.PORT || 3000, async () => {

// });

router.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      `http://api.wordnik.com/v4/words.json/randomWord?api_key=${API_KEY}&&minLength=5&maxLength=5`
    );
    word = result.data.word;
    console.log("Word: " + word);
    res.render("index", { word: word });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

const getRandomWord = async () => {};

getRandomWord();

module.exports = router;
