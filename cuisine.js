const cheerio = require("cheerio")
const axios = require("axios")

// code to scrape cuisine types
async function performScraping() {
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://www.allrecipes.com/cuisine-a-z-6740455",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })

    const $ = cheerio.load(axiosResponse.data)

    const cuisine = []

    const foodType = $(".link-list__item")
    foodType.each((index, element) => {
        let temp = $(element).find("a").attr("href")
        cuisine.push(temp)
    })

    console.log(cuisine)
}

performScraping()


const latinAmerica = ["argentinian", "brazilian", "chilean", "colombian", "cuban", "jamaican", "peruvian", "puerto-rican"]
const european = ["austrian", "belgian", "danish", "dutch", "finnish", "french", "german", "greek", "italian", "norwegian", "polish", "portuguese", "russian", "scandinavian", "spanish", "swedish", "swiss"]
const australian = ["australian-and-new-zealander"] 
const asian = ["bangladeshi", "chinese", "filipino", "indian", "indonesian", "japanese", "korean", "malaysian", "pakistani", "thai", "vietnamese"]
const american = ["cajun-and-creole", "canadian", "jewish", "southern", "tex-mex"]
const middleEastern = ["israeli", "lebanese", "persian", "turkish"]
const african = ["south-african"]

// scraped cuisine links
const cuisineLinks = [
  'https://www.allrecipes.com/recipes/2432/world-cuisine/latin-american/south-american/argentinian/',
  'https://www.allrecipes.com/recipes/228/world-cuisine/australian-and-new-zealander/',
  'https://www.allrecipes.com/recipes/718/world-cuisine/european/austrian/',
  'https://www.allrecipes.com/recipes/16100/world-cuisine/asian/bangladeshi/',
  'https://www.allrecipes.com/recipes/719/world-cuisine/european/belgian/',
  'https://www.allrecipes.com/recipes/1278/world-cuisine/latin-american/south-american/brazilian/',
  'https://www.allrecipes.com/recipes/272/us-recipes/cajun-and-creole/',
  'https://www.allrecipes.com/recipes/733/world-cuisine/canadian/',
  'https://www.allrecipes.com/recipes/1277/world-cuisine/latin-american/south-american/chilean/',
  'https://www.allrecipes.com/recipes/695/world-cuisine/asian/chinese/',
  'https://www.allrecipes.com/recipes/14759/world-cuisine/latin-american/south-american/colombian/',
  'https://www.allrecipes.com/recipes/709/world-cuisine/latin-american/caribbean/cuban/',
  'https://www.allrecipes.com/recipes/1892/world-cuisine/european/scandinavian/danish/',
  'https://www.allrecipes.com/recipes/720/world-cuisine/european/dutch/',
  'https://www.allrecipes.com/recipes/696/world-cuisine/asian/filipino/',
  'https://www.allrecipes.com/recipes/1893/world-cuisine/european/scandinavian/finnish/',
  'https://www.allrecipes.com/recipes/721/world-cuisine/european/french/',
  'https://www.allrecipes.com/recipes/722/world-cuisine/european/german/',
  'https://www.allrecipes.com/recipes/731/world-cuisine/european/greek/',
  'https://www.allrecipes.com/recipes/233/world-cuisine/asian/indian/',
  'https://www.allrecipes.com/recipes/698/world-cuisine/asian/indonesian/',
  'https://www.allrecipes.com/recipes/1826/world-cuisine/middle-eastern/israeli/',
  'https://www.allrecipes.com/recipes/723/world-cuisine/european/italian/',
  'https://www.allrecipes.com/recipes/710/world-cuisine/latin-american/caribbean/jamaican/',
  'https://www.allrecipes.com/recipes/699/world-cuisine/asian/japanese/',
  'https://www.allrecipes.com/recipes/15965/us-recipes/jewish/',
  'https://www.allrecipes.com/recipes/700/world-cuisine/asian/korean/',
  'https://www.allrecipes.com/recipes/1824/world-cuisine/middle-eastern/lebanese/',
  'https://www.allrecipes.com/recipes/701/world-cuisine/asian/malaysian/',
  'https://www.allrecipes.com/recipes/1891/world-cuisine/european/scandinavian/norwegian/',
  'https://www.allrecipes.com/recipes/15974/world-cuisine/asian/pakistani/',
  'https://www.allrecipes.com/recipes/15937/world-cuisine/middle-eastern/persian/',
  'https://www.allrecipes.com/recipes/2433/world-cuisine/latin-american/south-american/peruvian/',
  'https://www.allrecipes.com/recipes/715/world-cuisine/european/eastern-european/polish/',
  'https://www.allrecipes.com/recipes/724/world-cuisine/european/portuguese/',
  'https://www.allrecipes.com/recipes/711/world-cuisine/latin-american/caribbean/puerto-rican/',
  'https://www.allrecipes.com/recipes/716/world-cuisine/european/eastern-european/russian/',
  'https://www.allrecipes.com/recipes/725/world-cuisine/european/scandinavian/',
  'https://www.allrecipes.com/recipes/15035/world-cuisine/african/south-african/',
  'https://www.allrecipes.com/recipes/15876/us-recipes/southern/',
  'https://www.allrecipes.com/recipes/726/world-cuisine/european/spanish/',
  'https://www.allrecipes.com/recipes/1890/world-cuisine/european/scandinavian/swedish/',
  'https://www.allrecipes.com/recipes/727/world-cuisine/european/swiss/',
  'https://www.allrecipes.com/recipes/17502/us-recipes/tex-mex/',
  'https://www.allrecipes.com/recipes/702/world-cuisine/asian/thai/',
  'https://www.allrecipes.com/recipes/1825/world-cuisine/middle-eastern/turkish/',
  'https://www.allrecipes.com/recipes/703/world-cuisine/asian/vietnamese/'
]