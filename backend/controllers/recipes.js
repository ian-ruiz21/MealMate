const express = require("express");
const verifyToken = require("../middleware/checkToken.js");
const Recipe = require("../models/recipe.js");
const router = express.Router();

// Protected routes

router.use(verifyToken);

// GET /api/recipes INDEX FUNCTIONALITY
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// POST /api/recipes NEW FUNCTIONALITY
router.post("/", async (req, res) => {
  try {
    req.body.author = req.user._id;
    const recipe = await Recipe.create(req.body);
    recipe._doc.author = req.user;
    res.status(201).json(recipe);
  } catch (err) {
    console.log(error);
    res.status(400).json(err);
  }
});

// GET /api/recipes/:id SHOW FUNCTIONALITY
router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate(
      "author").populate({path: "comments", populate: {path: "author"}});
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/recipes/:id UPDATE FUNCTIONALITY
router.put("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );

    updatedRecipe._doc.author = req.user;

    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE /api/recipes/:id DELETE FUNCTIONALITY
router.delete("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    res.status(200).json(deletedRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE recipe comment
router.post("/:recipeId/comments", async (req, res) => {
  try {
    req.body.author = req.user._id;
    const recipe = await Recipe.findById(req.params.recipeId);
    recipe.comments.push(req.body);
    await recipe.save();

    const newComment = recipe.comments[recipe.comments.length - 1];

    newComment._doc.author = req.user;

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE recipe comment
router.put("/:recipeId/comments/:commentId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const comment = recipe.comments.id(req.params.commentId);

    comment.text = req.body.text;
    await recipe.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE recipe comment
router.delete("/:recipeId/comments/:commentId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    recipe.comments.remove({ _id: req.params.commentId });
    await recipe.save();

    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
