const cheerio = require("cheerio")
const axios = require("axios")
const connectToDb = require("./mongoose")
const Recipe = require("./models/recipe.model")
// arrayOfRecipes is the result of getRecipeLinks.js
const arrayOfRecipes = require("./db")

async function performScraping(dataObject) {

    try {
        await connectToDb()
    } catch (error) {
        console.log(error)
    }

    const axiosResponse = await axios.request({
        method: "GET",
        url: dataObject.url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })

    const $ = cheerio.load(axiosResponse.data)

    // get recipe title
    const title = $("#article-heading_1-0").text().trim()

    // get ingredient list from recipe
    const ingredients = []
    const ingredientUL = $(".mntl-structured-ingredients__list").find(".mntl-structured-ingredients__list-item")
    ingredientUL.each((index, element) => {
       const singleIngredient = $(element).children().text()
       ingredients.push(singleIngredient)
    })

    // get date
    const publishedOn = $(".mntl-attribution__item-date").text().trim()
    let formattedDate;
    if(publishedOn.includes("Published")) {
        formattedDate = publishedOn.replace("Published on ", "")
    } else {
        formattedDate = publishedOn.replace("Updated on ", "")
    }
    
    // get recipe image
    const imageURL = $(".primary-image__image").attr("src")
    let imageSRC;

    if(typeof(imageURL) === "undefined") {
        imageSRC = $("img#mntl-sc-block-image_1-0-1").attr("data-src");
    } else {
        imageSRC = imageURL
    }

    // get recipe description
    const description = $("#article-subheading_1-0").text().trim()

    // get recipe tags
    const tags = []
    const labels = $("li.mntl-breadcrumbs__item")
    labels.each((index, element) => {
        const singleLabel = $(element).text().trim()
        tags.push(singleLabel)
    })

    // based on recipe tags identify food category and taste
    let taste;
    let foodCategory
    switch (true) {
        case (tags.includes("Desserts" || "Cakes" || "Sponge Cake Recipes" || "Cookies" || "Bar Cookie Recipes" || "Pies" || "Cupcake Recipes" || "Ice Cream")):
            taste = "sweet"
            foodCategory = "desserts"
            break;
        case (tags.includes("Appetizers and Snacks" || "Wraps and Rolls" || "Appetizers" || "Dips and Spreads Recipes" || "Snacks" || "Sauces and Condiments")):
            taste = "salty"
            foodCategory = "snacks"
            break;
        case (tags.includes("Main Dishes" || "Soups, Stews, and Chili Recipes" || "Meat and Poultry" || "Salad" || "Side Dish" || "Pasta and Noodles")):
            taste = "salty"
            foodCategory = "main dishes"
            break;
        case (tags.includes("Breakfast and Brunch" || "Eggs")):
            taste = "salty"
            foodCategory = "breakfast"
            break;
        default:
            taste = "uncategorized"
            foodCategory = "uncategorized"
            break;
    }

    // get recipe details
    const recipeDetailsLabel = $(".mntl-recipe-details__content .mntl-recipe-details__label")
    const recipeDetailsValue = $(".mntl-recipe-details__content .mntl-recipe-details__value")

    const recipeLabels = []
    const values = []

    recipeDetailsLabel.each((i, element) => {
        let label = $(element).text().trim()
        label = label.slice(0, -1)

        if(label.includes(" ")) {
            label = label.replace(" ", "")  
        }
        label = label.charAt(0).toLowerCase() + label.slice(1)
        recipeLabels.push(label)
    })

    recipeDetailsValue.each((i, element) => {
        const value = $(element).text().trim()
        values.push(value)
    })

    let recipeDetails = {}

    recipeLabels.forEach((element, index) => {
        recipeDetails[element] = values[index]
    })


    // get recipe directions
    const directions = []

    const directionsList = $("div#recipe__steps-content_1-0 ol li.mntl-sc-block-group--LI")
    directionsList.each((index, element) => {
        // trim is needed here to remove \n that would be added to the beginning and end of each direction
        const singleDirection = $(element).children("p").text().trim()
        directions.push(singleDirection)
     })

    // create object to be added to database
     let obj = {... dataObject,
        title: title,
        ingredients: ingredients,
        directions: directions,
        image: imageSRC,
        description: description,
        tags: tags,
        taste: taste,
        foodCategory: foodCategory,
        recipeDetails: recipeDetails,
        publishedOn: formattedDate
     }
    
    //  adding obj to database
    await Recipe.create(obj)

}


async function scrapeAllRecipes() {
    for (const element of arrayOfRecipes) {
        await performScraping(element)
    }
    console.log("all recipes scraped")
}

scrapeAllRecipes()