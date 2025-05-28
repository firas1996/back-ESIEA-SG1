const express = require("express");
const {
  createUser,
  getAllUsers,
  getuserById,
  updateUser,
  deleteUser,
  signUp,
  signIn,
} = require("../controllers/userController");
const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/").post(createUser).get(getAllUsers);

router.route("/:id").get(getuserById).patch(updateUser).delete(deleteUser);

module.exports = router;
