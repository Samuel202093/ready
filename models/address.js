const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    address: String,
    state: String,
    pincode: Number
})


const Address = mongoose.model("address", addressSchema)

module.exports = Address