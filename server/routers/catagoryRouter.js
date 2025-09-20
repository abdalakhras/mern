const express = require('express')

const {creatCatagory,getAllCatagories,getctagabyId,updateCatagbyId,deleteCatagbyId} = require('../controllers/catagorycontrol')
const {userAuth,adminAuth} = require('./userAuth')

const router = express.Router()

router.post('/createcatag',adminAuth,creatCatagory)
router.get('/getgatag',getAllCatagories)
router.get('getcatagbyid/:id',getctagabyId)
router.put('/updateCatag/:id',adminAuth,updateCatagbyId)
router.delete('/delcatag/:id',adminAuth,deleteCatagbyId)

module.exports = router