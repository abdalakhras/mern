const User = require('../models/user')

const getUser = async(req,res)=>{

try{
const getUserData = await User.find()
res.status(201).json(getUserData)
}catch(error){
res.status(500).json({message:error.message})
}

}
module.exports = {getUser}