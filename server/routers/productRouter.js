const express = require('express')
const {createProduct,getAllProducts,deleteProduct,updateProduct} = require('../controllers/productController')
 const router = express.Router()

 router.post('/createproducts',createProduct)
 router.get('/getAllProducts',getAllProducts)
 router.delete('/deleteProduct/:id',deleteProduct)
 router.put('/updateProduct/:id',updateProduct)

 module.exports = router