const express = require('express')
const router = express.Router()
const controller = require('../Controllers/authControllers') 


router.post('/signup',controller.register)

router.post('/login',controller.login)

module.exports = router;