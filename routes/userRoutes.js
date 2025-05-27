const express = require('express')
const { createUser, getAllUsers, getuserById } = require('../controllers/userController')
const router = express.Router()

router.route('/').post(createUser)
router.route('/').get(getAllUsers)
router.route('/:id').get(getuserById)

module.exports = router