const express = require('express');
const router = express.Router();
const CensusTreeController = require('../controllers/CensusTree');
const uploadImg = require('../middlewares/uploadImg')

router.get('/', CensusTreeController.getAll)
router.get('/species', CensusTreeController.getUniqueTrees)
router.post('/create', uploadImg.fields([
    { name: 'leafImg', maxCount: 1 },
    { name: 'profileImg', maxCount: 1 },
  ]), CensusTreeController.create);

module.exports = router