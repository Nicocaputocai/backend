const express = require('express');
const router = express.Router();
const TreesController = require('../controllers/TreesController')

router.get('/', TreesController.getAll);
router.get('/native', TreesController.getNativeTrees)
router.post('/create', TreesController.create);

module.exports = router