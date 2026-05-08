const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Map endpoints to CRUD operations
router.post('/', bookController.createBook);         // C
router.get('/', bookController.getAllBooks);         // R
router.get('/:id', bookController.getBookById);      // R
router.put('/:id', bookController.updateBook);       // U
router.delete('/:id', bookController.deleteBook);    // D

module.exports = router;