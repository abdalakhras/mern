const Catagory = require('../models/catagory')

exports.creatCatagory = async (req,res) => {
    
    const {name,description,imageurl} = req.body

    try {
    const catagory = new Catagory({
        name :name,
        description:description,
        imageurl:imageurl      
    })    
    await catagory.save()
    res.status(200).json({message:'catagory created successfully',catagoryObj:catagory})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.getAllCatagories = async (req,res) => {
    
    const getCatagories = await Catagory.find()
    try {
        res.status(200).json(getCatagories)
    } catch (error) {
         res.status(500).json({message:error.message})
    }
}
exports.getctagabyId = async (req,res) => {
    const id = req.params.id
    try {
        const findcatag = await Catagory.findById(id)
        if(!findcatag){
           return res.status(400).json({message:"no such catagory"})
        }
        res.status(200).json({message:'catagory founded',catagoryObj:findcatag})
    } catch (error) {
        
     res.status(500).json({message:error.message})
    }
    
}
exports.updateCatagbyId = async (req,res) => {
    const id = req.params.id
    const {name,description,imageurl} = req.body
    try {
        const updateCatag = await Catagory.findByIdAndUpdate(id,{name,description,imageurl})
        if(!updateCatag){
           return res.status(400).json({message:'no such gatagory'})
        }
        res.status(200).json(updateCatag)
    } catch (error) {
         res.status(500).json({message:error.message})
    }
}
exports.deleteCatagbyId = async (req,res) => {
    const id = req.params.id
    try {
        const deletecatag = await Catagory.findByIdAndDelete(id)
        if(!deletecatag){
           return res.status(400).json({message:'no such gatagory'})
        }
        res.status(200).json({message:'deleted successfully',catagObj:deletecatag})
    } catch (error) {
            res.status(500).json({message:error.message})
            console.log({message:error.message})
    }
}