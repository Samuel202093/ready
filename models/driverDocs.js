const mongoose = require("mongoose")


const driverDocSchema = new mongoose.Schema({
    driverId:{
        type: mongoose.SchemaType.ObjectId,
        ref: 'Driver',
        required: [true, 'driver details needed']
    },
    vehicleType:{
        type: String,
        trim: true,
        required:[true, "please enter your car type"]
    },
    vehicleModel:{
        type: String,
        trim: true,
        required:[true, "please enter your car model"]
    },
    vehicleYear:{
        type: Number,
        required: [true, "please enter your car year"]
    },
    vehicleMake:{
        type: String,
        trim: true,
        required: [true, "please enter your car make"]
    },
    vehicleColor:{
        type: String,
        trim: true,
        required:[true, "please enter your car color"]
    },
    vehicleRegistrationNumber:{
        type: String,
        trim: true,
        required:[true, "please enter your car registration number"] 
    },
    vehicleNo:{
        type: Number,
        default: 1
    },
    
    bank_name:{
        type: String,
        required: [true, "please enter your bank name"],
        trim: true
    },
    bank_account_name:{
        type: String,
        required: [true, "please enter your account name"],
        trim: true
    },
    bank_account_number:{
        type: Number,
        required: [true, "please enter your account number"],
    },
    account_type:{
        type: String,
        required:[true, "please enter your account type"], 
        trim: true
    },
    driverDocumentsImgUrl:[
        {
            url: String,
            id: String
        }
    ],
},{timestamps: true})

const driverDocument = mongoose.model("driverDocument", driverDocSchema)

module.exports = driverDocument