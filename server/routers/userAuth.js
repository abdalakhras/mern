const jwt = require('jsonwebtoken')

//building the middelware
const userAuth = async(req,res,next)=>{

const token =req.headers.auth    
try {
    const decode = jwt.verify(token,process.env.JWT_SECRET)
         req.user = decode  //req.user => (user) is optional name , you can name it whaterver , important is req obj => ex: req.authorised
         next();
} catch (error) {
    res.status(401).json({message:'invalid/not-Authorized'})
}
}

//exporting the middelware
module.exports = userAuth