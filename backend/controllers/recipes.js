const express = require('express');
const verifyToken = require('../middleware/checkToken.js');
const Recipe = require('../models/recipe.js');
const router = express.Router();

// Protected routes

router.use(verifyToken);

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(400).json({ message: err });
    }
})

router.post('/', async (req, res) => {
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

module.exports = router;