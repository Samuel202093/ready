const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[ true, 'Please Enter your username'],
        trim: true
    },
    email:{
        type: String,
        required:[true, 'Please insert your password'],
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    phone_number:{
        type: Number
    },
    licence_number:{
        type: String,
        required: true,
        trim: true
    },
    driverLicenseImageUrl:{
        type: String
    },
    carType:{
        type: String,
        required: true,
        trim: true
    },
    carModel:{
        type: String,
        required: true,
        trim: true
    },
    carYear:{
        type: Number,
        required: true
    },
    carMake:{
        type: String,
        required: true,
        trim: true
    },
    carColor:{
        type: String,
        required: true,
        trim: true
    },
    carImageUrl:{
        type: String
    },
    carRegistrationNumber:{
        type: String,
        required: true,
        trim: true
    },
    driverImageUrl:{
        type: String,
        required: true
    },
    carRegistrationCertificateImgUrl:{
        type: String,
        required: true
    },
    carInsuranceImgUrl:{
        type: String,
        required: true
    },
    bank_account_name:{
        type: String,
        required: true,
        trim: true
    },
    bank_type:{
        type: String,
        required: true,
        trim: true
    },
    account_number:{
        type: Number,
        required: true
    },
    account_type:{
        type: String,
        required: true,
        trim: true
    },
    isVerified:{
        type: Boolean,
        default: false
    }

}, {timestamps: true})

const Driver = mongoose.model('driver', driverSchema)

module.exports = Driver