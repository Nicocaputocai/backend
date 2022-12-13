const express = require('express');
const router = express.Router();
const publicWork = require('../controller/PublicWorkController')

router.get('/', publicWork.getAll);
router.get('/doc', publicWork.doc)
//router.post('/create', publicWork.create);

module.exports = router