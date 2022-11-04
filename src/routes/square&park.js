const express = require('express');
const router = express.Router();
const SquareParkController = require('../controller/Square&ParkController')

router.get('/', SquareParkController.getAll);
// router.get('/doc', SquareParkController.doc)
//router.post('/create', SquareParkController.create);

module.exports = router