const express = require('express')

const {creatprojProdct,getprojProdct,deleteProjProd,updateProjProd,findgreatless,projfindbyname} = require("../controllers/projProdctContr")

const router = express.Router()

router.post('/creatprod',creatprojProdct)
router.get('/getallprod',getprojProdct)
router.put('/updateprojprod/:id',updateProjProd)
router.delete('/delprojprod/:id',deleteProjProd)
router.get('/findgretorless',findgreatless)
router.get('/findprodbyname',projfindbyname)


module.exports = router