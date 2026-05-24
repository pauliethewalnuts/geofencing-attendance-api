const mongoose = require('mongoose')

const OfficeSchema = mongoose.Schema({
    officeName:{
        type: String,
        required: [true,"Please provide the name of the office"],
        maxLength:75
    },
    location:{
        type: {
            type:String,
            enum:['Point'],
            default: 'Point'
        },
        coordinates:{
            type:[Number],
            required:[true,"Plase provide coordinates"]
        }
    },
    radius:{
        type: Number,
        default: 100
    }

})

OfficeSchema.index({location:'2dsphere'})

module.exports = mongoose.model('Office',OfficeSchema)