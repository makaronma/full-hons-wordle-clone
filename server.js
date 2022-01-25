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

app.listen(process.env.PORT || 3000, () =>
  console.log(`listen to port ${process.env.PORT || 3000}`)
);
