const Driver = require('../models/driver')
const Passenger = require('../models/passenger')
const Bookings = require('../models/Bookings')
const DriverDocs = require("../models/driverDocs")
const driverDocument = require('../models/driverDocs')
// const cloudinary  = require("../utils/cloudinary")
const { cloudinary } = require("../utils/adminCloud")
const Vehicles = require('../models/vehicleType')

const Admin = {
    username: process.env.adminName,
    password: process.env.adminPassword
}

// api for admin login
exports.loginAdmin = (req, res)=>{
    try {
        const { username, password } = req.body
        if (Admin.username === username && Admin.password === password) {
            res.status(200).send('Welcome to the Admin Page')
        } else {
            res.status(400).send('Incorrect Username and Password')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


// api to get all drivers
exports.getAllDrivers = async(req, res)=>{
    try {
        const result = await Driver.find({})
        if (result){
            res.status(200).send(result)
        }else{
            res.status(400).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
    }
    
}


// api to get a particular driver
exports.getDriver = async(req, res)=>{
    try {
        const singleDriver = await Driver.findById({_id:req.params.id})
        if (singleDriver) {
            res.status(200).send(singleDriver)
        } else {
            res.status(400).send({error: error.message || "cannot get the driver details"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

exports.getDriversDocuments = async(req, res)=>{
    try {
        const result = await driverDocument.find({}).populate("driverId")
        if (result) {
            res.status(200).send(result)
        } else {
           res.status(400).send({error: error.message || "cannot get driver's document"}) 
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error" })
    }
}

// api to search for a driver
exports.searchDriver = async(req, res)=>{
    try {
        const result = await Passenger.findOne({username: req.body.name })
        if (result) {
            res.status(200).send(result)
        } else { 
            res.status(400).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

// api to verify a driver's document
exports.isVerifiedDriver = async(req, res)=>{
    try {
        const id = req.params.id
        const driver = await Driver.findById({_id: id})
        if (driver) {
            driver.isVerified = true
            await driver.save()

            res.status(200).send(driver)
        } else {
            res.status(400).send('Driver not verified')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

// api to delete a driver
exports.deleteDriver = async(req, res)=>{
    try {
        const result = await Driver.findByIdAndDelete({_id:req.params.id})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

//api to get all passengers
exports.getAllPassengers = async(req, res)=>{
    try {
        const result = await Passenger.find({})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "cannot get all passenger details"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}


// api to get a single passenger
exports.getPassenger = async(req, res)=>{
    try {
        const result = await Passenger.findById({_id:req.params.id})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "cannot get the passenger details"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

//api to suspend passenger
exports.suspendPassenger = async(req, res)=>{
    try {
        const result = await Passenger.findOne({_id: req.params.id})
        if (result) {
            result.isSuspended = true
            result.save()
            res.status(200).send(result)
        }else{
            res.status(400).send({error: error.message || "cannot suspend passenger"})
        }
    } catch (error) {
        res.status(500).send({error:error.message || "server error"})
    }
}


//api to unblock a passenger
exports.unSuspendPassenger =  async(req, res)=>{
   try {
    const result = await Passenger.findOne({_id: req.params.id})
    if (result) {
        result.isSuspended = false
        result.save()
        res.status(200).send(result)
    } else {
        res.status(400).send({error: error.message || "unable to unblock passenger"})
    }
   } catch (error) {
    res.status(500).send({error: error.message || "server error"})
   }
}

//api to delete a passenger
exports.deletePassenger = async(req, res)=>{
    try {
        const result = await Passenger.findByIdAndDelete({_id: req.params.id})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "cannot delete passenger"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

//api to get all bookings
exports.getBooking = async(req, res)=>{
    try {
        const result = await Bookings.find({})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "error getting booked ride"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error" })
    }
}


//api to get all reviews
exports.getReviews = async(req, res)=>{
    try {
        const result = await Bookings.find({}, {cancelledRide: 0, payment: 0, location: 0})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "cannot get review fields"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

// api to block a driver
exports.suspendDriver = async(req, res)=>{
    try {
        const suspendDriver = await Driver.findOne({_id: req.params.id})
        if (suspendDriver) {
            suspendDriver.isSuspended = true
            suspendDriver.save()
            res.status(200).send(suspendDriver)
        } else {
            res.status(400).send({error: error.message || "cannot initiate this request"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

//api to get a driver's licence image
exports.getDriverLicence = async(req, res)=>{
    try {
        const result = await DriverDocs.find({driverId: req.params.id}, {driverDocumentsImgUrl: 1})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error:error.message || "cannot get driver licence"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})    
    }
}


//api to get driver's car registration image
exports.getCarRegistration = async(req, res)=>{
    try {
        const result = await DriverDocs.find({ driverId: req.params.id}, {driverDocumentsImgUrl: 1})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "cannot get data"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})    
    }
}


// api to unblock a driver
exports.unSuspendDriver = async(req, res)=>{
    try {
        const result = await Driver.findOne({_id: req.params.id})
        if (result) {
            result.isSuspended = false
            result.save()
            res.status(200).send(result)
        } else {
           res.status(400).send({error: error.message || "unable to unblock driver"}) 
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

exports.getDriverVehicles = async(req, res)=>{
    try {
        const result = await driverDocument.find({}, {driverId: 1, vehicleType: 1, vehicleModel: 1, vehicleColor: 1, vehicleMake: 1, vehicleYear: 1, vehicleRegistrationNumber: 1 }).populate("driverId")
        if (result) {
            res.status(200).send(result)
        } else {
           res.status(400).send({error: error.message || "cannot get drivers car details"}) 
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}


//api to get all payment details
exports.getPayments = async(req, res)=>{
    try {
        const  result = await Bookings.find({}, {payment: 1, createAt: 1})
        if (result) {
            res.status(200).send(result)
        } else {
           res.status(400).send({error: error.message || "error  getting payment details"}) 
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

//api for adding vehicle
exports.createVehicleType = async(req, res)=>{
    try {

        const cloudResult = await cloudinary.uploader.upload(req.file.path)

        const {vehicleName, pricePerKm, capacity, commission, costPerMin, baseFare} = req.body

        const newVehicleType = new Vehicles({
            vehicleName: vehicleName,
            pricePerKm: pricePerKm,
            capacity: capacity,
            commission: commission,
            costPerMin: costPerMin,
            baseFare: baseFare,
            vehicleImgUrl: cloudResult.secure_url
        })

        const result = await newVehicleType.save()
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "cannot create a new vehicle type by the admin"})
        }
    } catch (error) {
        res.status(500).send("server error")
    }
}

//api to delete vehicleType
exports.deleteVehicleType = async(req, res)=>{
    try {
        const result = await Vehicles.findByIdAndDelete({_id: req.params.id})
        if(result){
            res.status(200).send(result)
        }else{
            res.status(400).send({error: error.message || "cannot delete vehicleType"})
        }
    } catch (error) {
        res.status(200).send({error: error.message || "server error"})
    }
}


// api to update vehicleType
exports.updateVehicleType = async(req, res)=>{
    try {
        const result = await Vehicles.findOneAndUpdate({_id: req.params.id}, {$set:{
            vehicleName: req.body.vehicleName,
            baseFare: req.body.baseFare,
            capacity: req.body.capacity,
            commission: req.body.commission,
            pricePerKm: req.body.pricePerKm,
            costPerMin: req.body.costPerMin
        }}, {new: true})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error:error.message || "cannot update details"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}



