const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const port = 5000;
const path = require("path");
const Article = require("./models/model");

mongoose
  .connect("mongodb://localhost:27017/article")
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));
app.use(express.static(path.join(__dirname, "public", "js")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  try {
    // return res.render("home", { articles: articles });
    const articles = await Article.find({});
    return res.render("home", { articles: articles });
  } catch (err) {
    console.log("error:- ", err);
  }
});

app.get("/articles/new", (req, res) => {
  return res.render("newArticles");
});

app.post("/articles/new", async (req, res) => {
  try {
    const { title, description, markdown } = req.body;
    const articles = new Article({
      title: title,
      description: description,
      markdown: markdown,
    });

    const id = articles.id;

    return res.render(`alone`, {
      title: title,
      description: description,
      markdown: markdown,
      id: id,
    });
    // console.log(series);
    // res.status(200).json(movies);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/edit", async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const articleData = await Article.findById(id);
  console.log(articleData);
  const title = articleData[0].title;
  const description = articleData[0].description;
  const markdown = articleData[0].markdown;

  return res.render("edit", {
    title: title,
    description: description,
    markdown: markdown,
  });
});

app.get("/delete", async (req, res) => {
  const { id } = req.query;
  console.log(id);

  await Article.findByIdAndDelete(id);
  return res.redirect("back");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("listening on port", port);
});
