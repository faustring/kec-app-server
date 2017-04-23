const express = require('express')
const router = express.Router()

const userView = require('./userView')
const authView = require('./authView')

router.use('/', authView)
router.use('/users', userView)

module.exports = router
