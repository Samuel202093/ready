const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const connection = require('./db/db')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const adminRoute = require("./routes/admin")
const testRoute = require("./routes/test")
const session = require('express-session')
const cookieParser = require("cookie-parser")
const MongoDBStore = require("connect-mongodb-session")(session)
const fs = require('fs')
// const { Server } = require("socket.io")
const port = process.env.PORT || 8000
// const io = new Server(8000)

const MAX_AGE = 1000 * 60 * 60 * 3

const app = express()

//connecting to database
connection()

// storing sessions in mongoDB
const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "sessions"
})

//connecting to middlewares
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//session details
app.use(
    session({
        name: "readyApp",
        secret:'readyApp123',
        resave: true,
        saveUninitialized: false,
        store: mongoDBstore,
        cookie:{
            maxAge: MAX_AGE,
            sameSite: true,
            secure: false
        }
    }))

app.use("/", routes)
app.use("/admin", adminRoute)
app.use("/api/test", testRoute)

// io.on("connection", (socket)=>{
//     socket.emit('hello from server')
// })

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
} )