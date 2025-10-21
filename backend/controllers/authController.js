const userModel=require("../models/userModel")
const jwt=require("jsonwebtoken")

exports.registerUser=async (req,res)=>{
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
        const newUser=new userModel({name,phone,email,password})
        await newUser.save()
        res.status(201).json({message:"User registered successfully"})
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
}

exports.loginUser=async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    if(password!=user.password){
        return res.status(400).json({message:"Invalid password"})
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.json({ message: "User logged in", token });
}

exports.loginAdmin=async(req,res)=>{
    const {email,password}=req.body
    if(email!==process.env.ADMIN_EMAIL||password!==process.env.ADMIN_PASSWORD){
        return res.status(401).json({message:"Invalid credintials"})
    }
    const token=jwt.sign({admin:true},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.json({ message: "Admin logged in", token });
}