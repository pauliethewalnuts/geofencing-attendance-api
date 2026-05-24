const Office = require('../models/office')
const Attendance = require('../models/attendance')
const UnauthorizedError = require('../errors/UnauthorizedError')
const NotFoundError = require('../errors/notFound')


const setOffice = async (req,res) =>{
    // const {role} = req.user
    // if(role === 'employee'){
    //     throw new UnauthorizedError('You are not allowed to perform this action')
    // }
    const {officeName,coordinates,radius} = req.body
    const office = await Office.create({officeName,location:{coordinates},radius})

    res.status(201).json({office})
}


const getAllAttendance = async(req,res) =>{
    // const {role} = req.user
    // if(role === 'employee'){
    //     throw new UnauthorizedError('You are not allowed to perform this action')
    // }
    const attendance = await Attendance.find({})
    if(attendance.length < 1){
        throw new NotFoundError("No records found")
    }
    res.status(200).json({attendance})
}

const getEmployeeAttendance = async(req,res) =>{
    // const {role} = req.user
    // if(role === 'employee'){
    //     throw new UnauthorizedError('You are not allowed to perform this action')
    // }
    const {id} = req.params
    const attendance = await Attendance.findOne({_id:id})
    if(!attendance){
        throw new NotFoundError("No records found")
    }
    res.status(200).json({attendance})
}

module.exports = {setOffice,getAllAttendance,getEmployeeAttendance}