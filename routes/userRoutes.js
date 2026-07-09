const express = require('express');
const validate = require('../middlewares/validate');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const userValidation = require('../validations/user.validation');

const router = express.Router();

router.post('/favorites/:bookId', auth.verifyToken, userController.addFavoriteBook);
router.get('/favorites', auth.verifyToken, userController.addFavoriteBook);
router.get('/:id', validate(userValidation.userIdSchema, "params"), userController.getUserById);


module.exports = router;

