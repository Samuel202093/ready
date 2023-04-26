const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    driverId:{
        type: Schema.Types.ObjectId,
        ref: "Driver"
    }, 
    driverLocations:[
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [ Number ],
            address: String,
            Date: Date.now()
        },
    ]
},)

const Location = mongoose.model('location', locationSchema)

module.exports = Location