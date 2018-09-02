const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const keys = require("./config/keys");
require("./models/New");
const New = mongoose.model("newdata");

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//for public folder
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log("database is connected");
  })
  .catch(err => {
    console.log("database is down");
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/ifsc", (req, res) => {
  res.render("ifsc");
});
app.post("/ifsc", (req, res) => {
  New.findOne({ ifsc: req.body.password }).then(data => {
    res.render("ill", {
      rows: data
    });
  });
});

app.get("/namecity", (req, res) => {
  res.render("namecity");
});

app.post("/bncity", (req, res) => {
  New.find({
    bank_name: req.body.name,
    city: req.body.city
  }).then(data => {
    res.render("akk", {
      rows: data
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/akk", (req, res) => {
  New.find({})
    .limit(10)
    .then(data => {
      res.render("akk", {
        rows: data
      });
    });
});
app.listen(3000, () => {
  console.log("server is running ");
});
