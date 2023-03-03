const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 25,
  },
  markdown: {
    type: String,
    required: true,
    maxLength: 25,
  },
  //   time: {
  //     type: Number,
  //   },
  description: {
    type: String,
    required: true,
    maxLength: 25,
  },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
