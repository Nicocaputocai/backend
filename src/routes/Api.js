const express = require('express');
const router = express.Router();
const ApiController = require('../controllers/ApiController')

router.get('/', ApiController.index);


module.exports = router