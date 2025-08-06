const User = require('../models/user')

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
    const id = req.params.id
    const name = req.body.username
    const email = req.body.email 
    const passWord = req.body.passWord
    try {
        const updateUser = await User.findByIdAndUpdate(id,{username:name,email:email,password:passWord})
        res.status(200).json({message:'user Updated successfully',updatedUser:updateUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}