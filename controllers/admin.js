const Driver = require('../models/driver')
const Passenger = require('../models/passenger')

const Admin = {
    username: process.env.adminName,
    password: process.env.adminPassword
}


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

