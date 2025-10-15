const projCatagory = require('../models/porjCatagory')

exports.createprojCatag = async(req,res)=>{
    const name = req.body.name 
    const description = req.body.description
    const photoUrl = req.body.photo
    try {
        const projectcatagory = new projCatagory({
            name:name ,
            description:description,
            photoUrl:photoUrl
        })
        await projectcatagory.save()
        res.status(200).json({message:"ctagory created", catagory : projectcatagory})
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error.message)
    }
}
exports.updateprojCatag = async(req,res)=>{
    const id = req.params.id
    const name = req.body.name
     const description = req.body.description
    const photoUrl = req.body.photo

    try {
        const updateCatagory = await projCatagory.findByIdAndUpdate(id,{name:name , description:description , photoUrl:photoUrl })
        res.status(200).json({message:"update success",update:updateCatagory})
    } catch (error) {
         res.status(500).json({message:error.message})
        console.log({message:error.message})
    }
}
exports.getprojCatag = async(req,res)=>{

    try {
        const getallCatags = await projCatagory.find()
        res.status(200).json(getallCatags)
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log({message:error.message})
    }
}
exports.getCatagsId = async(req,res)=>{
    const id = req.params.id
    try {
        const getallCatagbyId = await projCatagory.findById(id)
        res.status(200).json(getallCatagbyId)
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log({message:error.message})
    }
}
exports.deleCAtagsbyId = async(req,res)=>{
    const id = req.params.id
    try {
        const deleteCatagory = await projCatagory.findByIdAndDelete(id)
        res.status(200).json({message:"deleted success",deleted:deleteCatagory})
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log({message:error.message})
    }
}