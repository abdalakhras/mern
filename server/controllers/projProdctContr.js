const projProducts = require('../models/porjProducts')

exports.creatprojProdct = async(req,res)=>{
const name = req.body.name
const discription = req.body.discription
const catagory = req.body.catagory
const price = req.body.price
const photo = req.body.photo

try {
    const projproduct  = new projProducts({
        name : name , 
        discription : discription, 
        catagory : catagory,
        price : price,
        photo : photo
    })
    await projproduct.save()
    res.status(200).json({message:'products created succefully',products : projproduct})
    console.log('success')
} catch (error) {
    res.status(500).json({message:error.message})
    console.log({message:error.message})
 }
}
exports.getprojProdct = async(req,res)=>{
     const getprojprod = await projProducts.find().populate('catagory')
    try {
       
        res.status(200).json(getprojprod)
    } catch (error) {
        res.status(500).json({message:error.message})
    console.log({message:error.message})
    }
}
exports.deleteProjProd = async(req,res)=>{
    const id = req.params.id
    try {
        const delProd = await projProducts.findByIdAndDelete(id)
        res.status(200).json({message:"deleted successfully", deletedprod : delProd})
    } catch (error) {
        res.status(500).json({message:error.message})
    console.log(error.message)
    }
}

exports.updateProjProd = async(req,res)=>{
        const id = req.params.id
        const name = req.body.name
        const discription  =req.body.discription
        const price = req.body.price
        const photo = req.body.photo
    try {
        const updateProd = await projProducts.findByIdAndUpdate(id,{name:name,discription:discription,price:price,photo:photo})
        res.status(200).json({message:"updated success",update:updateProd})
    } catch (error) {
         res.status(500).json({message:error.message})
    console.log(error.message)
    }
}
exports.findgreatless = async(req,res)=>{
        const pric1 = req.body.pric1
        const pric2 = req.body.pric2
    try {
        const greaterless  =await projProducts.find({price:{$gt:pric1,$lt:pric2}})
        res.status(200).json({message:"founde",product:greaterless})
    } catch (error) {
         res.status(500).json({message:error.message})
    console.log(error.message)
    }
}
exports.projfindbyname = async(req,res)=>{
    const name = req.body.name
    try {
        const findnameprod = await projProducts.find({name:name})
        if (!findnameprod){
            res.status(400).json({message:"not Founded"})
            console.log('not founded')
        }
        res.status(200).json({message:"founded",product:findnameprod})
    } catch (error) {
         res.status(500).json({message:error.message})
    console.log(error.message)
    }
}
