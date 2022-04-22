require('dotenv').config()

let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let cors = require('cors')

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')

var compression = require('compression')
var helmet = require('helmet')

const mongoDB = process.env.URI

const mongoose = require('mongoose')

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

let app = express()
// CORS permissions

app.use(compression()) //Compress all routes
app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err)
})
module.exports = app
