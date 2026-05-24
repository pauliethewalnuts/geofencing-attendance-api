const express = require('express')

const app = express()

const authRouter = require('./routess/auth')
const attendanceRouter = require('./routess/attendace')
const officeRouter = require('./routess/office')
const notFound = require('./middleware/notFound')
const connectDB = require('./db/connectdb')
require('dotenv').config()
const errorHandlerMiddleware =  require('./middleware/errorHandler')
const auth = require('./middleware/authentication')
app.use(express.json())


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/attendance',auth,attendanceRouter)
app.use('/api/v1/office',auth,officeRouter)

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