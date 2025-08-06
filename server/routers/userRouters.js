const express = require('express')
const {creatUser} = require('../controllers/userController')
const {getUser,getUserByName,deleteUserById,updateUserById} = require('../controllers/getUsers')

const router = express.Router();

router.post('/create',creatUser)
router.get('/getusersdata',getUser)
router.post('/getusersdata',getUserByName)
router.delete('/delete/:id',deleteUserById)
router.put('/updateuser/:id',updateUserById)

module.exports = router 