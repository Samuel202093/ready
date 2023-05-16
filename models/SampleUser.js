const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema


const sampleSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true
    },
    destination:{
        type: String,
        trim: true
    },
    address:{
        type: ObjectId,
        ref: "address"
    },
    movie:{
        type: ObjectId,
        ref: "movie"
    }
})

const sampleUser =  mongoose.model("sampleUser", sampleSchema)

module.exports = sampleUser