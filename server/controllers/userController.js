const User  =require('../models/user')

const creatUser = async (req,res)=>{
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
        res.status(2001).jason({message :'user data are created and saved in mongoDB',user})
    }catch(error){
        res.status(500).jason({message:error})
    }
}

module.exports = {creatUser}