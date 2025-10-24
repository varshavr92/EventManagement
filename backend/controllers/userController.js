const userModel=require("../models/userModel")
const jwt=require("jsonwebtoken")

exports.registerUser=async(req,res)=>{
    try{
        const {name,email,phone,password,confirmPassword}=req.body
        if(!name||!email||!phone||!password||!confirmPassword){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password!=confirmPassword){
            return res.status(400).json({message:"Passwords do not match"})
        }
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User with this email already exists"})
        }
        const newUser=new userModel({
            name,email,phone,password
        })
        await newUser.save()
        res.status(201).json({message:"User registered successfully"})
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
}
exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({message:"Email and Password are required"})
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        if(password!=user.password){
            return res.status(400).json({message:"Invalid password"})
        }
        res.status(200).json({
            message:"Login successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone
            }
        })
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
}