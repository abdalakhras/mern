const User  =require('../models/user')

exports.creatUser = async (req,res)=>{
    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password

    try{
        const user = new User({
            username:userName,
        email:email,
        password:password,
        })
        await user.save()
        res.status(200).json({message :'user data are created and saved in mongoDB',user})
    }catch(error){
        res.status(500).json({message:error})
    }
}

