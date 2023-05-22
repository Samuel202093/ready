const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema


const driverSchema = new mongoose.Schema({
    phone_number:{
        type: Number,
        required:[true, "please enter your phone number"]
    },
    otp:{
      type: Number  
    },
    email:{
        type: String,
        unique: true,
        trim: true
    },
    firstname:{
        type: String,
        trim: true
    },
    lastname:{
        type: String,
        trim: true
    },
    token:{
        type: String
    },
    password:{
        type: String,
        trim: true
    },
    resetOtp:{
        type: Number,
        default: null
    },
    isSuspended:{
        type: Boolean,
        default: false
    },
    isLoggedIn:{
        type: Boolean,
        default: false
    },
    location:{
        type: String,
        trim: true
    },
    isVerified:{
        type: Boolean,
        default: false
    }

}, {timestamps: true})

const Driver = mongoose.model('Driver', driverSchema)

module.exports = Driver