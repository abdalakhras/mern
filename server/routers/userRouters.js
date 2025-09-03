const express = require('express')
const {creatUser} = require('../controllers/userController')
const {getUser,getUserByName,deleteUserById,updateUserById,Profile,logInUser,checkUserRole} = require('../controllers/getUsers')
const {userAuth,adminAuth} = require('./userAuth')
const router = express.Router();

router.post('/create',creatUser)
router.get('/getusersdata',getUser)
router.post('/getusersdata',getUserByName)
router.delete('/delete/:id',deleteUserById)
router.put('/updateuser',userAuth,updateUserById)
//user profile
router.get('/userprofile',userAuth,Profile)
//login router
router.post('/userlogin',logInUser)
router.get('/userrole',userAuth,checkUserRole)

module.exports = router 