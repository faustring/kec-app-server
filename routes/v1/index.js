const express = require('express')
const router = express.Router()

const userView = require('./userView')

router.use('/users', userView)

module.exports = router
