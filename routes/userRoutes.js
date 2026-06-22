const express = require('express');
const validate = require('../middlewares/validate');
const userController = require('../controllers/userController');
const userValidation = require('../validations/user.validation');

const router = express.Router();

router.get('/:id', validate(userValidation.userIdSchema, "params"), userController.getUserById);

module.exports = router;

