const Booking = require("../models/Bookings")

// Booking a ride Api
exports.createBooking = async(req, res)=>{
    try {
        // const {} = req.body
        const locationData = {
            startAddress: req.body.startAddress,
            endAddress: req.body.endAddress,
            distanceOfRide: req.body.distance
        }
        // const driverId = req.params.driver
        // const passengerId = req.params.passenger
        const newBooking = new Booking({
            // driverId: driverId,
            // passengerId: passengerId,
            location: locationData,
        })
        const result = await newBooking.save()
        if (result) {
            const bookingSession =  {
                id: result._id
            }
            req.session.booking = bookingSession
            req.session.save()
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "cannot create booking"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}


// api for cancelled ride
exports.cancelledRide =  async(req, res)=>{
    try {
        // const id = req.session.id
        const reason = {
            driverReason: req.body.driverReason,
            passengerReason: req.body.passengerReason
        }
        const result = await Booking.findOneAndUpdate({_id: req.session.booking.id}, { $set:{ cancelledRide: reason}}, { new: true })
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "error updating booking"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

//api for payment details
exports.makePayment = async(req, res)=>{
    try {
        const paymentDetails = {
          payment_mode: req.body.mode,
          amount: req.body.amount
        }
        const result =  await Booking.findOneAndUpdate({_id: req.session.booking.id}, {
            $set:{
                payment: paymentDetails
            }
        }, { new: true })
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error: error.message || "cannot update payment details"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}

exports.rateRide = async(req, res)=>{
    try {
        const result = await Booking.findOneAndUpdate({_id: req.session.booking.id}, {
            $set:{
                ratings: req.body.rate,
                reviews: req.body.comment
            }
        },{ new: true })
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({error:error.message || "cannot rate or send comment about the ride"})
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}