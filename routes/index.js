const express = require("express")
const passengerController = require('../controllers/passenger')
const driverController = require('../controllers/driver')
const adminController = require('../controllers/admin')
const upload = require('../utils/multer')


const route = express.Router()


//route api for Admin
route.post('/login/admin', adminController.loginAdmin)
route.get('/get/drivers', adminController.getAllDrivers)
route.put('/verify/driver', adminController.isVerifiedDriver)
route.delete('/delete/driver', adminController.deleteDriver)
route.get('/search/driver', adminController.searchDriver)
route.get('/get/passengers', adminController.getAllPassengers)
route.get('/get/single/passenger', adminController.getPassenger)


//route api for Passenger
route.post('/create/passenger', passengerController.createPassenger)
route.put('update/profile')

//route api for Driver
route.post('/uploaded-images', 
upload.fields([
    {name: 'driverLicenseImageUrl', maxCount: 1},
    {name:'carImageUrl', maxCount:1}, 
    {name: 'driverImageUrl', maxCount: 1},
    {name: 'carRegistrationCertificateImgUrl', maxCount: 1},
    {name: 'carInsuranceImgUrl', maxCount: 1}
]), driverController.driverDocuments)


module.exports = route