const sampleUser = require("../models/SampleUser")
const Address = require("../models/address")
const Movies = require("../models/movies")

exports.createMovies = async(req, res)=>{
    try {
        const {location, name, director} = req.body
        const result = new Movies({
            name,
            location,
            director
        })
        const output = await result.save()
        if (output) {
            res.status(200).send(output)
        } else {
            res.status(400).send("cannot create new movie")
        }
    } catch (error) {
        res.status(500).send("server error")
    }
}


exports.createAddress = async(req, res)=>{
    try {
        const {state, address, pincode} = req.body
        const result = new Address({
            address,
            state,
            pincode
        })
        const output = await result.save()
        if (output) {
            res.status(200).send(output)
        } else {
            res.status(400).send("error saving address")
        }
    } catch (error) {
        res.status(500).send("server error")
    }
}

exports.createSampleUser = async(req, res)=>{
    try {
        const {username, destination} = req.body
        const addressId = req.params.id
        const movieId = req.params.movies
        const result = new sampleUser({
            username,
            destination,
            address: addressId,
            movie: movieId
        })
        const output = await result.save()
        if (output) {
            res.status(200).send(output)
        } else {
            res.status(400).send("error saving user and its address")
        }
    } catch (error) {
        res.status(500).send("server error")
    }
}

exports.getUsers = async(req, res)=>{
//    const result = await sampleUser.find({}).populate([{path: 'address', populate:"address"}, {path: 'movie', populate: "movies"}]).exec()
const result = await sampleUser.find({}).populate("movie").populate("address")
   if(result){
    res.status(200).send(result)
   }else{
    res.status(400).send("could not fetch data")
   }
}