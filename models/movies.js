const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    name: String,
    director: String,
    location: String
})


const Movies = mongoose.model("movie", movieSchema)

module.exports = Movies