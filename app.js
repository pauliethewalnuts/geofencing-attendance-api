const express = require('express')

const app = express()
const cors = require('cors')
const authRouter = require('./routess/auth')
const attendanceRouter = require('./routess/attendace')
const officeRouter = require('./routess/office')
const notFound = require('./middleware/notFound')
const connectDB = require('./db/connectdb')
require('dotenv').config()
const errorHandlerMiddleware =  require('./middleware/errorHandler')
const auth = require('./middleware/authentication')
const authorize = require('./middleware/authorization')


const xss = require('xss-clean')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

app.set('trust proxy',1)
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 100
})

app.use(limiter)

app.use(express.static('./public'))
app.use(express.json())
app.use(cors())


app.get('/',(req,res) =>{
    res.status(200).send("GEOFENCING-ATTENDANCE-API")
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/attendance',auth,authorize('employee'),attendanceRouter)
app.use('/api/v1/office',auth,authorize('admin'),officeRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

port = 3000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
        console.log(`Listening on port ${port}...`)
})
    } catch (error) {
        console.log(error)
    }
}

start()