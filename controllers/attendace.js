const Attendance = require('../models/attendance')
const Office = require('../models/office')
const BadRequestError = require('../errors/BadRequest')
const UnauthorizedError = require('../errors/UnauthorizedError')
const NotFoundError = require('../errors/notFound')
const office = require('../models/office')
const formatDate = require('../utils/formatDate')

const checkIn = async (req,res)=>{
    const {role} = req.user

    if(role === 'admin'){
        throw new UnauthorizedError('This is only for employees')
    }

    const {coordinates} = req.body
    if (!coordinates || coordinates.length !== 2) {
        throw new BadRequestError('Invalid Coordinates, Please enter valid Coordinates')
    }
   
    const office = await Office.findOne({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates
                },
                $maxDistance: 100
            }
        }
    })
    if(!office){
        return res.status(401).send('You are not in the office Premises')
    }


    const {userId} = req.user

    const startOfDay = new Date()
    startOfDay.setHours(0,0,0,0)

    const endOfDay = new Date()
    endOfDay.setHours(23,59,59,999)

    const existingAttendance = await Attendance.findOne({user:userId,checkInTime:{
        $gte: startOfDay, $lte: endOfDay
    }})

    if(existingAttendance){
        return res.status(400).send('You have already checked in today')
    }

    const attendance = await Attendance.create({user:userId,location:{coordinates:coordinates}})

    currDate = formatDate(attendance.checkInTime)
    const time = currDate.split(',')[1]
    const date = currDate.split(',')[0]

    res.status(200).send(`You checked in at ${time} on ${date}.`)
 }

const getMyAttendance = async (req,res) =>{
    const {role,userId} = req.user
    if(role === 'admin'){
        throw new UnauthorizedError('This is only for Employees')
    }
    const attendance = await Attendance.find({user: userId})
    if(attendance.length < 1){
        throw new NotFoundError("No records found")
    }
    res.status(200).json({attendance,length:attendance.length})
}

module.exports = {checkIn,getMyAttendance}