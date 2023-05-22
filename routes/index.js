const express = require("express")
const fs = require('fs')
const passengerController = require('../controllers/passenger')
const bookingController = require("../controllers/booking")
const driverController = require('../controllers/driver')
const adminController = require('../controllers/admin')
const upload = require('../utils/multer')


const route = express.Router()




//Booking Api
route.post("/booking", bookingController.createBooking )
route.put("/booking", bookingController.cancelledRide)
route.put("/booking/payment", bookingController.makePayment)
route.put("/booking/rate", bookingController.rateRide)



//route api for Passenger
route.post('/register', passengerController.createPassenger)
route.post('/forget/passenger', passengerController.forgetPassword)
route.post('/verify-otp', passengerController.verifyOtp)
route.put('/reset/password', passengerController.resetPassword)
route.post('/send-message', passengerController.sendTextMessage)
route.post('/location', passengerController.createLocation)


//route api for Driver
// route.post('/uploaded-images', 
// upload.fields([
//     {name: 'driverLicenseImageUrl', maxCount: 1},
//     {name:'carImageUrl', maxCount:1}, 
//     {name: 'driverImageUrl', maxCount: 1},
//     {name: 'carRegistrationCertificateImgUrl', maxCount: 1},
//     {name: 'carInsuranceImgUrl', maxCount: 1}
// ]), driverController.driverDocuments)

route.post("/driver/register", driverController.createDriver)
route.post("/driver/verify-otp", driverController.verifyDriverOtp)
route.post("/driver/profile", driverController.driverProfile)
route.post("/driver/password", driverController.driverPassword)
route.post("/driver/:id", driverController.driverDoc)
route.post("/:id", upload.array('images'), driverController.driverDocuments)



module.exports = route