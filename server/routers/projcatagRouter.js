const express = require('express')

const {createprojCatag,updateprojCatag,getprojCatag,getCatagsId,deleCAtagsbyId} = require('../controllers/projCatagoryControl') 

const router = express.Router()

router.post('/creatprojCatag',createprojCatag)
router.get('/getallCatags',getprojCatag)
router.get('getCatagbyId/:id',getCatagsId)
router.put('/updateprojCatag/:id',updateprojCatag)
router.delete('/deleteCatag/:id',deleCAtagsbyId)

module.exports = router