const Product = require('../models/products')

exports.createProduct = async(req,res)=>{
    const name =req.body.name
    const discripton  =req.body.discripton
    const  catagory  =req.body.catagory
    const price = req.body.price
    const image = req.body.img


    try {
        const product = new Product({
            name : name,
            discripton: discripton, 
            catagory : catagory,
            price : price,
            image :image 

        })
        await product.save()
        res.status(201).json({message:"products created successfully",product})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getAllProducts = async(req,res)=>{
        const getProducts = await Product.find().populate('catagory')
    try {
        res.status(200).json(getProducts)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
} 

exports.deleteProduct = async(req,res)=>{
        id = req.params.id
     
    try {
           const deleteId = await Product.findByIdAndDelete(id)
          res.status(200).json(deleteId)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.updateProduct = async(req,res)=>{
     id = req.params.id
      const name =req.body.name
    const discripton  =req.body.discripton
    const  catagory  =req.body.catagory
    const price = req.body.price
    const image = req.body.image
    try {
        const updateProdcutID = await Product.findByIdAndUpdate(id,{name:name,discripton:discripton,price:price,image:image})
          res.status(200).json({message:"updated successfully"})
    } catch (error) {
          res.status(500).json({message:error.message})
    }
}

exports.findByName = async(req,res)=>{
      const Name = req.body.name
     
    try {
           const findName = await Product.findOne({name:Name})
           if(findName){
             res.status(200).json({message:"founded",product:findName})
           }
           else{
            res.status(400).json({message:'no such product name'})
            console.log('no match')
           }
         
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.findGreaterThan = async(req,res)=>{
            const range = req.body.price
            const range2 = req.body.price2
    try {
        const findgreater = await Product.find({price:{$gt:range,$lt:range2}})
        res.status(200).json({message:"founded",product:findgreater})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

