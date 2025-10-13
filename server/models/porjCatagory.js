const mongoose = require('mongoose')

const projCatagSchema = new mongoose.Schema({
    name : {type:String,required:true},
    description : {type:String,required:true},
    photoUrl : {type:String,required:true, validate:{validator:function(v){return /^(http|https):\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v)},
                                                message: props => `${props.value} is not a valid image URL!`}}
})
const projCatagory = mongoose.model('projCatagory',projCatagSchema)
module.exports = projCatagory