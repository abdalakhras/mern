
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.getUser = async(req,res)=>{

try{
const getUserData = await User.find()
res.status(201).json(getUserData)
}catch(error){
res.status(500).json({message:error.message})
}

}

exports.getUserByName = async(req,res)=>{
        const {username} = req.body
    try{
        const getByName = await User.find({username:username})
        res.status(201).json(getByName)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.deleteUserById = async(req,res)=>{
    const id = req.params.id
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(201).json({message:"user deleted",deltedUser:deleteUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.updateUserById = async(req,res)=>{
    const id = req.user.id // this is from userAuth middelware
    const name = req.body.username
    const email = req.body.email 
    try {
        const updateUser = await User.findByIdAndUpdate(id,{username:name,email:email})
        res.status(200).json({message:'user Updated successfully',updatedUser:updateUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.Profile = async(req,res)=>{
        const id = req.user.id // req.user is from userAuth, and then we extract the id that was hidden in the token 
    try {
        const userProfile = await User.findById(id)
        res.status(200).json(userProfile)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.logInUser = async(req,res)=>{
        const {email,password}=req.body
    try {
        const user = await User.findOne({email:email})
        const ismatched = await bcrypt.compare(password,user.password)    
        if(!ismatched){
            return res.status(401).json({message:"invalid email or password"})
        }
    
         if(user){
             const token = jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET,{expiresIn:"1h"})
             res.status(200).json({message:'login successfully',user,token})
        
        }else{
                res.status(401).json({message:'invalid email or password'})
                console.log({message:error.message})
        }
        
    } catch (error) {
         res.status(500).json({message:error.message})
         console.log({message:error.message})
    }
}

exports.checkUserRole = async(req,res)=>{
    const id = req.user.id
    try {
        const userRole = await User.findById(id)
        if(userRole.role !== 'Admin'){
            console.log("admin is not found")
            res.status(403).json({message:'access denied'})
        }
        res.status(200).json({message:'access garanteed',userRole})
        
    } catch (error) {
          res.status(500).json({message:error.message})
         console.log({message:error.message})
    }
}