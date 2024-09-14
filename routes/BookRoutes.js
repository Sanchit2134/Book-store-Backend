const express = require('express')
const GetBooks  = require('../controller/BookController')
const router = express.Router()

router.get('/', GetBooks)

module.exports = router;