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

app.use("/", indexRouter);

const axios = require("axios");
const API_KEY = process.env.API_KEY;

const getRandomWord = async () => {
  try {
    const result = await axios.get(
      `http://api.wordnik.com/v4/words.json/randomWord?api_key=${API_KEY}&&minLength=5&maxLength=5`
    );
    const word = result.data.word;
    console.log("Word: " + word);
    exports.word = word;
  } catch (error) {
    console.log(error);
  }
};

app.listen(process.env.PORT || 3000, () => {
  console.log(`listen to port ${process.env.PORT || 3000}`);
  getRandomWord();
});
