const Driver = require('../models/driver')
const nodemailer = require('nodemailer')
const {cloudinary} = require('../utils/cloudinary')
const fs = require('fs')
const path = require('path')


const createToken = (_id)=>{
    const token =  process.env.TOKEN_KEY
  
    return jwt.sign({_id}, token, {expiresIn: '3d'})
  }
  
  // nodemailer handler
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.USER,
        pass: process.env.PASSWORD
  
    },
    tls:{
      rejectUnauthorized: false
    }
  })

  exports.driverDocuments = async(req, res)=>{

    console.log(req.files)
    // const uploaders = async (path) => await cloudinary.uploader.upload(path, "Images")

    // if(req.method === "POST"){
    //     const urls = []
    //     files = req.files
    //     for(const file of files){
    //         const { path } = file
    //         const newPath = await uploaders(path)
    //         urls.push(newPath)
    //         fs.unlinkSync(path)
    //     }
    //     res.status(200).json({
    //         message: 'images uploaded successfully',
    //         data: urls
    //     })
    // }else{
    //     res.status(400).json({err: `${req.method} method not allowed`})
    // }
  }

exports.createDriver = async(req, res)=>{

}

exports.forgetPassword = async(req, res)=>{
    try {
        const result = Driver.findOne({email: req.body.email})
    } catch (error) {
        
    }
}

exports.loginDriver = async(req, res)=>{
    try {
        const {email, password} = req.body
        const result = await Driver.findOne({email: email})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.updateDriversProfile = async(req, res)=>{
    Driver.findOneAndUpdate({_id: req.params.id}, {
        $set:{
            username: req.body.username,
            phone_number: req.body.phone_number,
            licence_number: req.body.licence_number,
            carType: req.body.car_type,
            carModel: req.body.car_model,
            carModel: req.body.car_model,
            carYear: req.body.car_year,
            carColor: req.body.car_color,
            carRegistrationNumber: req.body.registration_number,
            bank_account_name: req.body.account_name,
            bank_type: req.body.bank_type,
            account_number: req.body.account_number,
            account_type: req.body.account_type
        }
    })
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}





