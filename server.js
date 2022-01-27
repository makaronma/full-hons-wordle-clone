const express = require("express");
const app = express();
if (app.get("env") !== "production") {
  require("dotenv").config();
}
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded());

app.use("/", indexRouter);

const axios = require("axios");
const API_KEY = process.env.API_KEY;

const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;

const getRandomWord = async () => {
  try {
    const result = await axios.get(
      `http://api.wordnik.com/v4/words.json/randomWord?api_key=${API_KEY}&&minLength=5&maxLength=5`
    );
    const word = result.data.word.toLowerCase();

    // Prevent word contain special charactars
    if (specialChars.test(word)) {
      getRandomWord();
    } else {
      console.log("[SERVER] Initialize Word: " + word);
      getWordDef(word);
      exports.word = word;
    }
  } catch (error) {
    console.log("[SERVER] Get Random Word Error: " + error);
  }
};

const getWordDef = async (word) => {
  try {
    const result = await axios.get(
      `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&api_key=${API_KEY}`
    );
    const wordDef = result.data;
    // console.log(wordDef[0]);
    exports.wordDef = wordDef[0];
  } catch (error) {
    console.log(error);
  }
};

app.listen(process.env.PORT || 3000, () => {
  console.log(`[SERVER] listen to port ${process.env.PORT || 3000}`);
  getRandomWord();
});
