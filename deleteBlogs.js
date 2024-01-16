const Recipe = require("./models/recipe.model")
const connectToDb = require("./mongoose")

// The recipes are scraped from a website that mixes food recipes with blogs posts occassionally
// This script deletes all blog posts from db
async function deleteBlogs(urlLink) {

    try {
        await connectToDb()
    } catch (error) {
        console.log(error)
    }

    await Recipe.deleteMany({allRecipesId: "https:"})
    console.log("deleted all")
}

deleteBlogs()

