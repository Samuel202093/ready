const express = require("express")
const adminController = require("../controllers/admin")
const { upload } = require("../utils/adminCloud")

const route = express.Router()

route.post("/login", adminController.loginAdmin)

// api for drivers 
route.get("/drivers", adminController.getAllDrivers)
route.put("/verify-driver", adminController.isVerifiedDriver)
route.delete("/driver", adminController.deleteDriver)
route.get("/driver/:id", adminController.getDriver)
route.post("/driver/:id", adminController.suspendDriver)
route.post("/driver/unsuspend/:id", adminController.unSuspendDriver)
route.get("/drivers/docs", adminController.getDriversDocuments)
route.get("/drivers/vehicle", adminController.getDriverVehicles)

//api for vehicle types
route.post("/driver/vehicle/type", upload.single("image"), adminController.createVehicleType)
route.delete("/driver/vehicle/type/:id", adminController.deleteVehicleType)
route.put("/driver/vehicle/type/:id", adminController.updateVehicleType)


// api for passengers
route.get("/passengers", adminController.getAllPassengers)
route.get("/passenger/:id", adminController.getPassenger)
route.post("/passenger/:id", adminController.suspendPassenger)
route.post("/passenger/unsuspend/:id", adminController.unSuspendPassenger)

// api for booking
route.get("/booked", adminController.getBooking)
route.get("/review", adminController.getReviews)
route.get("/payments", adminController.getPayments)

module.exports = route