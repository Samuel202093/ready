const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const bookingSchema = new mongoose.Schema({
    // driverId:{
    //     type: ObjectId,
    //     ref: 'Driver',
    //     required: [true, 'driver details needed']
    // },
    // passengerId:{
    //     type: ObjectId,
    //     ref: "Passenger",
    //     required: [true, "passengers details required"]
    // },
    payment:{
        payment_mode:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required: true
        }
    },
    location:{
        startAddress:{
            type: String,
            trim: true
        },
        endAddress:{
            type: String,
            trim: true
        },
        distanceOfRide:{
            type: String
        }
    },
    ratings:{
        type: Number
    },
    cancelledRide:{
        passengerReason:{
            type: String,
            trim: true
        },
        driverReason:{
            type: String,
            trim: true
        }
    },
    reviews:{
       madeBy:{
        type: String
       },
       comments:{
        type: String,
        trim: true
       },
    },
    createAt:{
        type: Date,
        default: Date.now()
    }

})

const Bookings = mongoose.model("booking", bookingSchema)

module.exports = Bookings