const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: Array,
    directions: Array,
    image: String,
    taste: {type: String, default: "uncategorized"},
    allRecipesId: String,
    url: String,
    cuisine: String,
    cuisineCategory: String,
    description: String,
    tags: Array,
    foodCategory: {type: String, default: "uncategorized"},
    recipeDetails: Object,
    publishedOn: String,
})

const Recipe = mongoose.model.Recipe || mongoose.model("Recipe", recipeSchema)

module.exports = Recipe