const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 12);
  this.confirm_password = undefined;
  return next();
});
userSchema.methods.verifPassword = async function (password, userPassword) {
  return await bcryptjs.compare(password, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
