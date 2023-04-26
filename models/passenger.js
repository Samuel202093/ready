const mongoose = require('mongoose')

const passengerSchema = new mongoose.Schema({
    username:{
        type: String
    },
    email:{
        type: String
    }
})

const Passenger = mongoose.model('passenger', passengerSchema)

module.exports = Passenger



