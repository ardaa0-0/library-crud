const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const borrowController = require('../controllers/borrowController');
const borrowValidation = require('../validations/borrow.validation');

const router = express.Router();

router.post('/:id', auth.verifyToken, validate(borrowValidation.borrowBookSchema, 'params'), borrowController.borrowBook);
router.get('/myBooks', auth.verifyToken, borrowController.myBorrowedBooks);
router.put('/complete/:id', auth.verifyToken, validate(borrowValidation.borrowBookSchema, 'params'), borrowController.completeBorrow);
router.get('/', auth.verifyToken, auth.restrictTo('admin'), borrowController.getAllBorrowedBooks);

module.exports = router;