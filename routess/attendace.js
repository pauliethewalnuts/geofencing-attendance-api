const express = require('express')
const {checkIn,getMyAttendance,checkOut} = require('../controllers/attendace')
const router = express.Router()

router.route('/checkin').post(checkIn)
router.route('/checkout').post(checkOut)
router.route('/myattendance').get(getMyAttendance)


module.exports = router