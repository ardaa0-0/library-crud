const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');
const userValidation = require('../validations/user.validation');

const router = express.Router();

router.get('/favorites', auth.verifyToken, userController.getFavoriteBooks);
router.post('/favorites/:bookId', auth.verifyToken, userController.addFavoriteBook);
router.delete('/favorites/:bookId', auth.verifyToken, userController.deleteFavoriteBook);
router.get('/:id', validate(userValidation.userIdSchema, "params"), userController.getUserById);


module.exports = router;

