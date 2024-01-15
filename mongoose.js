const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

let isConnected = false

async function connectToDb () {
    mongoose.set("strictQuery", true)
    if (isConnected) return console.log("using existing connection")

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDb