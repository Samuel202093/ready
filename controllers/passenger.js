const Passenger = require('../models/passenger')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const otpGenerator = require("otp-generator")

exports.sendTextMessage = async(req, res)=>{
    const { phone_number } = req.body

    const saveUser = async()=>{
        const newUser = await Passenger({
            phone_number: phone_number,
            Otp_No: OTP
        })
        newUser.save()
    }

    let OTP = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})

    const result = client.messages.create({
        body: `Ready App: Your verification code is ${OTP}`,
        to: phone_number,
        from: '+15673721523'

    })
    .then(saveUser())
    .catch(error => console.log(error))


    res.status(200).send("success")  
}

exports.verifyOtp = async (req, res)=>{
    try {
     
        const otp = req.body.code
        const result = await Passenger.findOne({ Otp_No: otp})
        if(result){
            result.Otp_No = null
            await result.save()
            res.status(200).send(result)
        }

    } catch (error) {
        res.status(400).send(error)
    }

}
exports.createPassenger = async(req, res)=>{
    try {
        const {username, email} = req.body
        const newPassenger = new Passenger({
            username,
            email
        })
        const result = newPassenger.save()
        result.then((data)=>{
            res.status(200).send(data)
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.loginPassenger = async(req,res)=>{

}

exports.updatePassengerProfile = async(req, res)=>{
    
}