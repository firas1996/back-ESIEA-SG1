const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

exports.signUp = async (req, res) => {
  try {
    const { name, age, email, password, confirm_password } = req.body;
    const newUser = await User.create({
      name,
      age,
      email,
      password,
      confirm_password,
    });
    res.status(201).json({
      message: "User created !!!",
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1)
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required !!!!",
      });
    }
    // 2)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user does not exist !!!!",
      });
    }
    // 3)
    if (!(await user.verifPassword(password, user.password))) {
      return res.status(400).json({
        message: "password incorrect !!!!",
      });
    }
    const token = createToken(user._id, user.name);
    res.status(201).json({
      message: "Logged in !!!",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User created !!!",
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched !!!",
      data: { users },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};

exports.getuserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User fetched !!!",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "User updated !!!",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "User deleted !!!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};
