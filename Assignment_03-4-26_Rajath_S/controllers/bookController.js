const Book = require('../models/Book');

// CREATE: Add a new book
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// READ: Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ: Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE: Modify an existing book
exports.updateBook = async (req, res) => {
  try {
    // { new: true } returns the updated document rather than the old one
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!updatedBook) return res.status(404).json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE: Remove a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, message: 'Book successfully deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};