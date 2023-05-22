const Driver = require("../models/driver");
const nodemailer = require("nodemailer");
const cloudinary = require("../utils/cloudinary");
const driverDocument = require("../models/driverDocs")
const dotenv = require("dotenv");
const otpGenerator = require("otp-generator");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { error } = require("console");

dotenv.config();

// nodemailer handler
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// register driver

exports.createDriver = async(req, res)=>{
  try {
      let OTP = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})

      const { phone_number } = req.body
      const driver = new Driver({
          phone_number: phone_number,
          otp: OTP
      })
      const newDriver = await driver.save()

      const driverSession = {
          id: newDriver._id,
        };
        
        req.session.registerDriver = driverSession;
        req.session.save();

  const result = client.messages.create({
      body: `Ready App: Your verification code is ${OTP}`,
      to: phone_number,
      from: '+15673721523'
  })
  .then(()=>{ console.log("otp sent")})
  .catch(error => console.log(error))
      res.status(200).send(newDriver)
  } catch (error) {
      res.status(500).send(error)
  }
}

exports.verifyDriverOtp = async(req, res)=>{
  try {
    const otpCode = req.body.code
    const result = await Driver.findOne({otp: otpCode})
    if (result) {
      result.otp = null
      result.save()
      res.status(200).send(result)
    } else {
      res.status(400).send({error:error.message || "cannot verify otp"})
    }
  } catch (error) {
    res.status(500).send({error:error.message || "server error"})
  }
}

exports.driverProfile = async(req, res)=>{
  try {
    const {email, firstname, lastname} = req.body
    const id = req.session.registerDriver.id
    // console.log(id)

    let OTP = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    })
    const profile = await Driver.findOneAndUpdate({_id:id}, {$set:{
      email: email,
      firstname: firstname,
      lastname: lastname,
      otp: OTP
    }}, {new: true})

    // res.status(200).send(profile)

        //nodemailer
    let mailOptions = {
      from: ` "Verify Your Email" <Ready_App@gmail.com`,
      to: profile.email,
      subject: "Ready_App - Verify your email",
      html: `<h2>Hello ${
        profile.firstname} ${profile.lastname
      } ! Thanks for registering on Ready App</h2>
        <h4> Please verify your email with the code below...</h4>
        <h1>${OTP}</h1>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Verification email is sent to your email account");
      }
    });

    if (profile) {
      res.status(200).send(profile)
      
    } else {
      res.status(400).send({error: error.message || "cannot update driver's profile"})
    }

   
  } catch (error) {
    res.status(500).send({error: error.message || "server error"})
  }
}

exports.driverPassword = async(req, res)=>{
  try {
    const password = req.body.password
    const id = req.session.registerDriver.id

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

// setting driver password to hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await Driver.findOneAndUpdate({_id:id}, {$set:{
      password: hashedPassword
    }}, {new: true})

    result.password = hashedPassword;

    if (result) {
      res.status(200).send(result)
    } else {
      res.status(400).send({error: error.message || "cannot update driver's password"})
    }

  } catch (error) {
    res.status(500).send({error:error.message || "server error"})
  }
}

// exports.createDriver = async (req, res) => {
//   try {
//     const { firstname, lastname, email, password, phone_number } = req.body;

//     let OTP = otpGenerator.generate(4, {
//       lowerCaseAlphabets: false,
//       upperCaseAlphabets: false,
//       specialChars: false,
//     });

//     const driver = new Driver({
//       email: email,
//       firstname: firstname,
//       lastname: lastname,
//       password: password,
//       token: crypto.randomBytes(64).toString("hex"),
//       phone_number: phone_number,
//     });

//     // generate salt to hash password
//     const salt = await bcrypt.genSalt(10);

//     // setting driver password to hashed password
//     const hashedPassword = await bcrypt.hash(driver.password, salt);
//     driver.password = hashedPassword;

//     //nodemailer
//     let mailOptions = {
//       from: ` "Verify Your Email" <Ready_App@gmail.com`,
//       to: driver.email,
//       subject: "Hi-Gadgets -Verify your email",
//       html: `<h2>Hello ${
//         driver.firstname + driver.lastname
//       } ! Thanks for registering on Ready App</h2>
//         <h4> Please verify your email with the code below...</h4>
//         <h1>${OTP}</h1>
//         `,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Verification email is sent to your email account");
//       }
//     });

//     const newDriver = await driver.save();

//     if (newDriver) {
//       res.status(200).send(newDriver);
//     } else {
//       res.status(400).send("cannot save new driver details");
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message || "server error" });
//   }
// };


//login driver
exports.loginDriver = async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    if (!phone_number || !password) {
      return res
        .status(400)
        .send("please enter your phone_number and password");
    }
    const driver = await Driver.findOne({ phone_number: phone_number });

    if (result) {
      const driverSession = {
        id: driver._id,
        name: driver.firstname,
      };

      req.session.driver = driverSession;
      req.session.save();
      res.status(200).send(result);
    } else {
      res.status(403).send("cannot login driver");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// upload driver document
exports.driverDoc = async(req, res)=>{
  try {
    const { vehicleType, vehicleMake, vehicleModel, vehicleColor, vehicleYear} = req.body
    const driverDoc = new driverDocument({
      driverId: req.params.id,
      vehicleType: vehicleType,
      vehicleMake: vehicleMake,
      vehicleModel: vehicleModel,
      vehicleColor: vehicleColor,
      vehicleYear: vehicleYear
    })
    const result = driverDoc.save()
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(400).send({error: error.message || "cannot add driver document"})
    }
  } catch (error) {
    res.status(500).send({error: error.message || "server error"})
  }
}

//uploading driver documents
exports.driverDocuments = async (req, res) => {
  const {
    vehicleType,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    vehicleColor,
    vehicleRegistrationNumber,
    bank_name,
    bank_account_name,
    bank_account_number,
    account_type,
  } = req.body;

  let OTP = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const uploader = async (path) => await cloudinary.uploads(path, "images");

  if (req.method === "POST") {
    const urls = [];

    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const newPath = await uploader(path);

      urls.push(newPath);
      console.log(urls);

      fs.unlinkSync(path);
    }

    const driverDocs = new driverDocument({
      driverId: req.params.id,
      vehicleType: vehicleType,
      vehicleModel: vehicleModel,
      vehicleYear: vehicleYear,
      vehicleMake: vehicleMake,
      vehicleColor: vehicleColor,
      vehicleRegistrationNumber: vehicleRegistrationNumber,
      bank_name: bank_name,
      bank_account_name: bank_account_name,
      bank_account_number: bank_account_number,
      account_type: account_type,
      driverDocumentsImgUrl: urls,
    });

    const result = driverDocs.save();
    result.then((data) => {
      res.status(200).send(data);
    });
    // res.status(200).json({mesage: 'uploaded', data: urls})
  } else {
    res.status(400).send(error);
  }
};

// reset password
exports.forgetPassword = async (req, res) => {
  const number = req.body.phone_number;
  const driver = await Driver.findOne({ phone_number: number });
  if (driver) {
    let OTP = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    driver.resetOtp = OTP;

    const output = await driver.save();
    
    const messageAlert = client.messages
      .create({
        body: `Ready App: Your verification code is ${OTP}`,
        to: number,
        from: "+15673721523",
      })

      .then((data) => res.status(201).send(data))
      .catch((error) => res.status(400).send(error));
  } else {
    res.status(405).send("no result");
  }
};

exports.updateDriverLocation = async (req, res) => {
  try {
    const location = await Driver.findOneAndUpdate(
      { _id: req.session.driver.id },
      { $set: { location: req.body.location } }
    );
    if (location) {
      res.status(200).send(location);
    } else {
      res
        .status(400)
        .send({ error: error.message || "cannot update driver's location" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message || "server error" });
  }
};
