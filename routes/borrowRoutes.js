const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const borrowController = require('../controllers/borrowController');
const borrowValidation = require('../validations/borrow.validation');

const router = express.Router();

router.post('/:id', auth.verifyToken, validate(borrowValidation.borrowBookSchema, 'params'), borrowController.borrowBook);
router.get('/myBooks', auth.verifyToken, borrowController.myBorrowedBooks);

module.exports = router;