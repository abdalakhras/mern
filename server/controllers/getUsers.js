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