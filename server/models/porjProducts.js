const mongoose = require('mongoose')

const projProductSchema = new mongoose.Schema({
    name : {type : String , required:true},
    discription : {type : String , required : true},
    catagory : {type:mongoose.Schema.Types.ObjectId,ref:'projCatagory',required:true}, //later we edit
    price : {type : Number , required : true},
    photo : {type:String,required:true, validate:{validator:function(v){return /^(http|https):\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v)},
                                                message: props => `${props.value} is not a valid image URL!`}}
})

const projProducts = mongoose.model('projectProducts',projProductSchema)
module.exports = projProducts