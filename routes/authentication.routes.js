const authentication_controller = require('../controllers/authentication.controller.js');
const express = require('express');
const router = express.Router();

router.post('user/login',authentication_controller.loginUser),
router.post('user/register',authentication_controller.registerUser)

module.exports = router;