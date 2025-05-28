const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Email is not valid !!!"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirm_password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return this.password === cPass;
      },
      message: "cPass does not match !!!",
    },
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  last_pass_update_time: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
