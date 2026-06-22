const express = require('express');
const validate = require("../middlewares/validate");
const authController = require('../controllers/authController');
const authValidation = require('../validations/auth.validation');

const router = express.Router();

router.post('/register', validate(authValidation.registerSchema) , authController.register);
router.post('/login', validate(authValidation.loginSchema) , authController.login);

module.exports = router;