const Attendance = require('../models/attendance')
const Office = require('../models/office')
const BadRequestError = require('../errors/BadRequest')
const UnauthorizedError = require('../errors/UnauthorizedError')
const NotFoundError = require('../errors/notFound')
const office = require('../models/office')
const formatDate = require('../utils/formatDate')
const today = require('../utils/today')
const attendance = require('../models/attendance')

const checkIn = async (req,res)=>{
    const {role,name} = req.user

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

    // const startOfDay = new Date()
    // startOfDay.setHours(0,0,0,0)

    // const endOfDay = new Date()
    // endOfDay.setHours(23,59,59,999)

    arr = today()

    const existingAttendance = await Attendance.findOne({user:userId,checkInTime:{
        $gte: arr[0], $lte: arr[1]
    }})

    if(existingAttendance){
        return res.status(400).send('You have already checked in today')
    }

    const attendance = await Attendance.create({name,user:userId,location:{coordinates:coordinates}})

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
    res.status(200).json({attendance,days:attendance.length})
}

const checkOut = async (req,res) =>{
    const {userId,name,role} = req.user
    if(role === 'admin'){
        throw new UnauthorizedError('Only employees can perform this action')
    }
    arr = today()
    
    const attendance = await Attendance.findOne({user:userId,checkInTime:{
        $gte: arr[0], $lte: arr[1]
    }})
    if(!attendance){
        return res.status(400).send('You have not checked in today')
    }
    if(attendance.checkOutTime){
        return res.status(400).send(`You have already checked out today.`)
    }
    // currDate = formatDate(Date.now)
    attendance.checkOutTime = new Date()
    arry = formatDate(attendance.checkOutTime)
    const milliseconds = attendance.checkOutTime - attendance.checkInTime
    const totalHours = (milliseconds / (1000 * 60 * 60)).toFixed(2)
    attendance.totalHours = totalHours

    await attendance.save()

    res.status(200).send(`You have checked out on ${arry.split(' ')[0]} at ${arry.split(' ')[1]} and worked for ${totalHours} hours`)
}
    

module.exports = {checkIn,getMyAttendance,checkOut}