const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    subject:{
        type: String,
        trim: true
    },
    message:{
        type: String,
        trim: true
    }

})

const Complaint = mongoose.model("Complaint", complaintSchema)

module.exports = Complaint