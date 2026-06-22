const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const bookController = require('../controllers/bookController');
const bookValidation = require('../validations/book.validation');

const router = express.Router();

router.post('/add', auth.verifyToken, auth.restrictTo('admin'), validate(bookValidation.bookAddSchema), bookController.addBook);

module.exports = router;