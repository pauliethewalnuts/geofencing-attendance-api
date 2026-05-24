const express = require('express')
const {checkIn,getMyAttendance} = require('../controllers/attendace')
const router = express.Router()

router.route('/checkin').post(checkIn)
router.route('/myattendance').get(getMyAttendance)


module.exports = router