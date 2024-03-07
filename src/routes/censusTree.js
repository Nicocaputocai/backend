const express = require('express');
const router = express.Router();
const CensusTreeController = require('../controllers/CensusTree');
const uploadImg = require('../middlewares/uploadImg')

router.get('/', CensusTreeController.getAll)
router.get('/species', CensusTreeController.getUniqueTrees)
router.post('/create', uploadImg.any(), CensusTreeController.create)

module.exports = router