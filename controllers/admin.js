const Driver = require('../models/driver')
const Passenger = require('../models/passenger')
const Bookings = require('../models/Bookings')

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
            res.status(400).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
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
            res.status(400).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

// api to get a single passenger
exports.getPassenger = async(req, res)=>{
    try {
        const result = await Passenger.findById({_id:req.params.id})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
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

