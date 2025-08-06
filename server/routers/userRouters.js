const express = require('express')
const {creatUser} = require('../controllers/userController')
const router = express.Router();

router.post('/create',creatUser)

module.exports = router 