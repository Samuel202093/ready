const Passenger = require('../models/passenger')
const Location = require('../models/location')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const otpGenerator = require("otp-generator")
const crypto = require('crypto')
const bcrypt = require('bcrypt')

exports.sendTextMessage = async(req, res)=>{
    const { phone_number } = req.body

    const saveUser = async()=>{
        const newUser = await Passenger({
            phone_number: phone_number,
        })
        newUser.save()
    }

    let OTP = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})

    // console.log(OTP)

    const result = client.messages.create({
        body: `Ready App: Your verification code is ${OTP}`,
        to: phone_number,
        from: '+15673721523'

    })
    .then(saveUser())
    .catch(error => console.log(error))


    res.status(200).send("success")  
}

exports.createPassenger = async(req, res)=>{
    try {
        let OTP = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})

        const { phone_number } = req.body
        const passenger = new Passenger({
            phone_number: phone_number,
            otp: OTP
        })
        const newPassenger = await passenger.save()

        const registerSession = {
            id: newPassenger._id,
          };
          
          req.session.registration = registerSession;
          req.session.save();

    const result = client.messages.create({
        body: `Ready App: Your verification code is ${OTP}`,
        to: phone_number,
        from: '+15673721523'

    })
    .then(()=>{ console.log("otp sent")})
    .catch(error => console.log(error))

        res.status(200).send(newPassenger)
    } catch (error) {
        res.status(500).send(error)
    }
}


exports.verifyOtp = async (req, res)=>{
    try {
     
        const otp = req.body.code
        const result = await Passenger.findOne({ otp: otp})
        if(result){
            result.otp = null
            await result.save()
            res.status(200).send(result)
        }else {
            res.status(400).send("otp not verified")
        }

    } catch (error) {
        res.status(500).send(error)
    }

}

exports.updateRegistration = async(req, res)=>{
    // const { email, }
}

exports.forgetPassword = async(req,res)=>{
    const number = req.body.phone_number
    const passenger = await Passenger.findOne({phone_number: number})
    if (passenger) {
        let OTP = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
      
       passenger.resetOtp = OTP

       const output = await passenger.save()
       const resetSession = {
        id: output._id,
      };
      
      req.session.reset = resetSession;
      req.session.save();
            const messageAlert = client.messages.create({
                body: `Ready App: Your verification code is ${OTP}`,
                to: number,
                from: '+15673721523'
            })
            
            .then(data => res.status(201).send(data))
            .catch(error => res.status(400).send(error))
    }
    else{
        res.status(405).send('no result')
    }
}

exports.resetPassword = async(req,res)=>{
     let resetPassword = req.body.password
     const salt = await bcrypt.genSalt(10)

     // setting driver password to hashed password
 
     const hashedPassword = await bcrypt.hash(resetPassword, salt)
     resetPassword = hashedPassword
    const result = await Passenger.findOneAndUpdate({_id: req.session.reset.id}, {
        $set: { password: hashedPassword} 
    } )

    if(result){
        res.status(200).send(result)
    }else{
        res.status(400).send('could not reset password')
    }
}



exports.createLocation = async(req, res)=>{
    try {
        const {passengerId, coordinates, street } = req.body

        const result = new Location({
            passengerId: passengerId, 
            location: coordinates
            })
        if(result){
            const output = await result.save()
            res.status(200).send(output)
        }else{
            res.status(400).send('could not send location')
        }
    } catch (error) {
        res.status(500).send({error: error.message || "server error"})
    }
}