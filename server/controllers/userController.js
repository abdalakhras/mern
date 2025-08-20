const User  =require('../models/user')
const bcrypt = require('bcrypt')

exports.creatUser = async (req,res)=>{
    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password
        // register new user
    try{
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = new User({
            username:userName,
        email:email,
        password:hashedPassword,
        })
        await user.save()
        res.status(200).json({message :'user data are created and saved in mongoDB',user})
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

