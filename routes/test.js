const express = require("express")
const testController = require("../controllers/test")


const route = express.Router()


route.post("/address", testController.createAddress )
route.post("/movies", testController.createMovies )
route.post("/user/:movies/:id", testController.createSampleUser)
route.get("/users", testController.getUsers)


module.exports = route