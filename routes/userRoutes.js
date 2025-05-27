const express = require('express')
const { createUser, getAllUsers, getuserById, updateUser, deleteUser } = require('../controllers/userController')
const router = express.Router()

router.route('/').post(createUser)
router.route('/').get(getAllUsers)
router.route('/:id').get(getuserById)
router.route('/:id').patch(updateUser)
router.route('/:id').delete(deleteUser)

module.exports = router