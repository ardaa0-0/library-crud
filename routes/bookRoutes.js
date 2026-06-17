const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookController');
const auth = require('../middlewares/auth');
const restrictTo = require('../middlewares/restrictTo');
const validate = require('../middlewares/validate');
const bookValidation = require('../validations/book.validation');

router.post('/add', auth, restrictTo('admin'), validate(bookValidation.bookAddSchema), bookController.addBook);

module.exports = router;