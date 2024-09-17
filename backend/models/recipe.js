const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", }
  },
  { timestamps: true }
);

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
  photo: {
    type: String,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [commentSchema],
},
{ timestamps: true }
);


const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;