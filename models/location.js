const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const locationSchema = new mongoose.Schema({
    passengerId:{
        type: mongoose.Schema.ObjectId,
        ref: "Passenger",
        required: true,
        trim: true,
        unique: true
    }, 

    location:{
        type:{
            type: String,
            enum: ['Point']
        },
        coordinates:{
            type: [Number],
            index: "2dsphere"
        },
        startAddress: {
            type: String,
            trim: true
        },
        endAddress:{
            type: String,
            trim: true
        }
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

    
}) 

//Geocode & Create Location

// locationSchema.pre('save', async(next)=>{
//     const loc = await geocoder.geocode(this.address)
//     // console.log(loc)
//     this.lo
// })

const Location = mongoose.model('L ocation', locationSchema)

module.exports = Location