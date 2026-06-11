const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const validate = require("../middlewares/validate");
const authValidation = require('../validations/auth.validation');

router.post('/register', validate(authValidation.registerSchema) , authController.register);
router.post('/login', validate(authValidation.loginSchema) , authController.login);

module.exports = router;