const express = require('express')
const { createUser, getAllUsers, getuserById, updateUser, deleteUser } = require('../controllers/userController')
const router = express.Router()

router.route('/').post(createUser).get(getAllUsers)

router.route('/:id').get(getuserById).patch(updateUser).delete(deleteUser)

module.exports = router