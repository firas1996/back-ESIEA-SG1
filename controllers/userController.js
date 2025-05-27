const User = require('../models/userModel')

exports.createUser = async (req,res)=>{
    try {
        const newUser = await User.create(req.body)
        res.status(201).json({
            message:"User created !!!",
            data:{newUser}
        })
    } catch (error) {
        res.status(400).json({
            message:"Fail !!",
            error:error
        })
    }
}

exports.getAllUsers = async (req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json({
            message:"Users fetched !!!",
            data:{users}
        })
    } catch (error) {
        res.status(400).json({
            message:"Fail !!",
            error:error
        })
    }
}


exports.getuserById = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({
            message:"User fetched !!!",
            data:{user}
        })
    } catch (error) {
        res.status(400).json({
            message:"Fail !!",
            error:error
        })
    }
}


exports.updateUser = async (req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({
            message:"User updated !!!",
            data:{user}
        })
    } catch (error) {
        res.status(400).json({
            message:"Fail !!",
            error:error
        })
    }
}


exports.deleteUser = async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(204).json({
            message:"User deleted !!!",
        })
    } catch (error) {
        res.status(400).json({
            message:"Fail !!",
            error:error
        })
    }
}