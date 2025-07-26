const mongoose = require('mongoose')
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MonfoDB connected succefully')
    }catch(error){
        console.log(`Error: ${error.massage}`)
        process.exit(1)
    }



}
module.exports = connectDB