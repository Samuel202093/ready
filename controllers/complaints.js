const Complaint = require("../models/Complaints")


// creating a complain

exports.createComplain = async(req, res)=>{
    try {
        const {name, email, subject, message} = req.body
        const newComplain = new Complaint({
            name: name,
            email: email,
            subject: subject,
            message: message
        })
        const complain = await newComplain.save()
        if (complain) {
            res.status(200).send(complain)
        } else {
            res.status(400).send({error: error.message || "cannot add a new complain"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}
