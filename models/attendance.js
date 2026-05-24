const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const AttendanceSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter a name"]
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true,'Please provide the user']
    },
    location:{
        type:{
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates:{
            type: [Number],
            required: [true,'Please provide your coordinates']
        }
    },
    checkInTime:{
        type: Date,
        default: Date.now
    },
    checkOutTime:{
        type: Date
    },
    totalHours: {
        type: Number        
    }
})

module.exports = mongoose.model('Attendace',AttendanceSchema)