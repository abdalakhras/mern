const mongoose = require('mongoose')

const catagorySchema = new mongoose.Schema({
  name:{type:String,required:true},
  description:{type:String,required:true},
  imageurl:{type:String,required:true}
})
const Catagory = mongoose.model('catagory',catagorySchema) 
module.exports = Catagory