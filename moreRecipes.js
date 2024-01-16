const cheerio = require("cheerio")
const axios = require("axios")
const Recipe = require("./models/recipe.model")
const connectToDb = require("./mongoose")
const cuisineLinks = require("./moreRecipesDb")

const arrayOfRecipes = []

async function performScraping(urlLink) {

    try {
        await connectToDb()
    } catch (error) {
        console.log(error)
    }
    
    const axiosResponse = await axios.request({
        method: "GET",
        url: urlLink,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })

    const $ = cheerio.load(axiosResponse.data)

    // get link and id of each recipe
    const recipeLinks = $(".mntl-card-list-items.mntl-document-card")
        
    for (const element of recipeLinks) {
        let finalIdResult;
        let recipeLink = $(element).attr("href")
        
        if (isNaN(recipeLink.slice(-1))) {
            const newRecipeLink = recipeLink.replace("https://www.allrecipes.com/recipe/", "")
            const lastSlashChar = newRecipeLink.indexOf("/")
            finalIdResult = newRecipeLink.substring(0, lastSlashChar)
        } else {
            const lastDashChar = recipeLink.lastIndexOf("-")
            finalIdResult = recipeLink.substring(lastDashChar + 1)
        }

        let obj = {
            url: recipeLink,
            allRecipesId: finalIdResult,
            cuisine: "Uncategorized",
            cuisineCategory: "Uncategorized"   
        }
     
        const res = await Recipe.find({allRecipesId: finalIdResult}) 
        
        // check if recipe already exists in db
        if(res.length > 0) {
            console.log("recipe already exists", finalIdResult)
        } else {
            arrayOfRecipes.push(obj)
        }
    }   
}

async function scrapeAllLinks() {
    for (const element of cuisineLinks) {
         await performScraping(element)
    }
    console.log(JSON.stringify(arrayOfRecipes))
}

scrapeAllLinks()