const mongoose = require("mongoose")

const vehicleType  = new mongoose.Schema({
    vehicleName:{
        type: String,
        trim: true
    },
    pricePerKm:{
        type: String,
        trim: true
    },
    capacity:{
        type: Number
    },
    baseFare:{
        type: Number
    },
    costPerMin:{
        type: Number
    },
    commission:{
        type: Number
    },
    vehicleImgUrl:{
        type: String
    }
}, {timestamps: true})

const Vehicles = mongoose.model("vehicleType", vehicleType)

module.exports = Vehicles