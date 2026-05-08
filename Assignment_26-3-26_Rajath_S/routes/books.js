import express from 'express';
import { books, authors } from '../data.js';

const router = express.Router();

// GET all books (with optional author population)
router.get('/', (req, res) => {
  const { includeAuthor } = req.query;
  
  if (includeAuthor === 'true') {
    const populatedBooks = books.map(book => {
      const author = authors.find(a => a.id === book.authorId);
      return { ...book, author };
    });
    return res.json(populatedBooks);
  }

  res.json(books);
});

// GET a single book by ID
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Optionally populate author
  if (req.query.includeAuthor === 'true') {
    const author = authors.find(a => a.id === book.authorId);
    return res.json({ ...book, author });
  }

  res.json(book);
});

// POST a new book
router.post('/', (req, res) => {
  const { title, authorId, year } = req.body;

  if (!title || !authorId || !year) {
    return res.status(400).json({ error: 'Missing required fields (title, authorId, year)' });
  }

  // Check if author exists
  const authorExists = authors.some(a => a.id === parseInt(authorId));
  if (!authorExists) {
    return res.status(400).json({ error: 'Invalid authorId: Author does not exist' });
  }

  const newBook = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title,
    authorId: parseInt(authorId),
    year: parseInt(year)
  };

  books.push(newBook);
  res.status(201).json({ message: 'Book created successfully', book: newBook });
});

export default router;
