const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {type:String,required:true},
    discripton:{type:String,required:true},
    catagory :{type:mongoose.Schema.Types.ObjectId,ref:'catagory',required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true, validate:{validator:function(v){return /^(http|https):\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v)},
                                                message: props => `${props.value} is not a valid image URL!`}
}
})
//the name of the collection in mongoDB
const Product = mongoose.model("Product",productSchema) 
module.exports = Product;