const jwt = require('jsonwebtoken')

//building the middelware
const userAuth = async(req,res,next)=>{

const token =req.headers.auth    
try {
    if(!token){
        res.status(400).json({message:"token not found"})
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)
         req.user = decode  //req.user => (user) is optional name , you can name it whaterver , important is req obj => ex: req.authorised
         next();
} catch (error) {
    res.status(500).json({message:error.message})
}
}

const adminAuth = async(req,res,next)=>{
const token = req.headers.auth
try {
    if(!token){
        res.status(400).json({message:"token not found"})
    }
    const verified = jwt.verify(token,process.env.JWT_SECRET)
    if(verified.role !== "admin"){
        res.status(400).json({message:'you are not Admin/Authorized'})
    }
    req.user = verified
    next()

} catch (error) {
    res.status(500).json({message:error.message})
}
}

//exporting the middelware
module.exports ={ userAuth,adminAuth}