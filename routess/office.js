const express = require('express')

const router = express.Router()
const {setOffice,getAllAttendance,getEmployeeAttendance} = require('../controllers/office')

router.route('/location').post(setOffice)
router.route('/getallattendance').get(getAllAttendance)
router.route('/:id').get(getEmployeeAttendance)

module.exports = router