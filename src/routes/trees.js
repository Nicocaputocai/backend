const express = require('express');
const router = express.Router();
const TreesController = require('../controllers/TreesController')

router.get('/', TreesController.getAll);
router.post('/create', TreesController.create);

module.exports = router