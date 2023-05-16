const mongoose = require('mongoose')

const passengerSchema = new mongoose.Schema({
    phone_number:{
        type: Number,
        required: true
    },
    otp:{
        type: Number
    },
     email:{
        type: String,
        trim: true,
        unique: true,
    },
   firstname:{
    type: String,
    trim: true
   },
   lastname:{
    type: String,
    trim: true
   },
   homeAddress:{
    type: String,
    trim: true
   },
   workAddress:{
    type: String,
    trim: true
   },
   payment:{
    mode:{
        type: String
    },
    card_holder_name:{
        type: String,
        trim: true
    },
    card_number:{
        type: Number
    },
    card_cvc:{
        type: Number,
    },
    card_expiry_date:{
        type: String
    }
   }
},{timestamps: true})

const Passenger = mongoose.model('Passenger', passengerSchema)

module.exports = Passenger



