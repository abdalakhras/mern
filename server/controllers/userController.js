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

    }catch(error){
        res.status(500).jason({message:error})
    }
}

module.exports = {creatUser}