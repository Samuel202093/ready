const express = require("express")
const adminController = require("../controllers/admin")

const route = express.Router()

route.post("/login", adminController.loginAdmin)
route.get("/drivers", adminController.getAllDrivers)
route.put("/verify-driver", adminController.isVerifiedDriver)
route.delete("/driver", adminController.deleteDriver)
route.get("/passengers", adminController.getAllPassengers)
route.get("/passenger", adminController.getPassenger)
route.get("/booked", adminController.getBooking)
route.get("/review", adminController.getReviews)
route.get("/payments", adminController.getPayments)

module.exports = route