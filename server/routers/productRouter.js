const express = require('express')
const {createProduct,getAllProducts,deleteProduct,updateProduct,findByName,findGreaterThan} = require('../controllers/productController')
const { find } = require('../models/user')
 const router = express.Router()

 router.post('/createproducts',createProduct)
 router.get('/getAllProducts',getAllProducts)
 router.delete('/deleteProduct/:id',deleteProduct)
 router.put('/updateProduct/:id',updateProduct)
 router.get('/getbyname',findByName)
 router.get('/findgreater',findGreaterThan)

 module.exports = router