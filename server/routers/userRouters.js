const express = require('express')
const {creatUser} = require('../controllers/userController')
const {getUser} = require('../controllers/getUsers')
const {getUserByName}= require('../controllers/getUsers')
const router = express.Router();

router.post('/create',creatUser)
router.get('/getusersdata',getUser)
router.post('/getusersdata',getUserByName)

module.exports = router 