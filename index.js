const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const connection = require('./db/db')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const port = process.env.PORT || 8000

const app = express()

//connecting to database
connection()

//connecting to middlewares
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use('/', routes)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
} )