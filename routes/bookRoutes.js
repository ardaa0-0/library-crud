const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const bookController = require('../controllers/bookController');
const bookValidation = require('../validations/book.validation');

const router = express.Router();

router.post('/add', auth.verifyToken, auth.restrictTo('admin'), validate(bookValidation.bookAddSchema), bookController.addBook);
router.put('/update/:id', auth.verifyToken, auth.restrictTo('admin'), validate(bookValidation.bookIdSchema, 'params'),  validate(bookValidation.bookUpdateSchema), bookController.updateBook);
router.delete('/delete/:id', auth.verifyToken, auth.restrictTo('admin'), validate(bookValidation.bookIdSchema, 'params'), bookController.deleteBook);
router.get('/:id', auth.verifyToken, validate(bookValidation.bookIdSchema, 'params'), bookController.getBook);

module.exports = router;