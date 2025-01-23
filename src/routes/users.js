const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController.js');

// Rutas para usuarios
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/test', UserController.test);

module.exports = router;
